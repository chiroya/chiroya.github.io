import asyncio
import json
import aiohttp
from bs4 import BeautifulSoup

async def fetch(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.text()

async def get_image_list():
    url = "https://m.site.naver.com/18ns6"
    
    # HTML 내용을 비동기적으로 가져오기
    html_content = await fetch(url)
    
    soup = BeautifulSoup(html_content, "lxml")
    script_tag = soup.find('script', {'id': '__NEXT_DATA__'})
    
    if not script_tag:  # script_tag가 None인지 확인
        print("No script tag found.")
        return []
    
    json_data = json.loads(script_tag.contents[0])

    img_web_urls = [attachment.get('imgWebUrl') for d in json_data['props']['pageProps']['qrDetail']['sessions'] if 'attachments' in d for attachment in d.get('attachments', [])]

    # 이미지 링크를 리스트 화
    img_list = list(set(img_web_urls) - {None})[0:]  # None 값 제거

    # images.json 파일로 저장
    with open('module/crawler/images.json', 'w', encoding='utf-8') as f:
        json.dump(img_list, f, ensure_ascii=False, indent=4)

    return img_list

async def main():
    img_list = await get_image_list()
    print(img_list)

if __name__ == "__main__":
    asyncio.run(main())


