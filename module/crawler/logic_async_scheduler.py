import requests
from bs4 import BeautifulSoup
import asyncio
import json
import aiohttp
import schedule
import time

################################
# 이미지 크롤링 - 비동기 처리


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
    json_data = json.loads(script_tag.contents[0])

    img_web_urls = [attachment.get('imgWebUrl') for d in json_data['props']['pageProps']['qrDetail']['sessions'] if 'attachments' in d for attachment in d.get('attachments', [])]

    # 결과 출력
    img_urls = []
    for img_web_url in img_web_urls:
        img_urls.append(img_web_url)

    # 첫 번째 이미지 URL을 제외한 고유한 이미지 URL을 출력
    img_list = list(set(img_urls))[1:]

    return img_list

async def main():
    img_list = await get_image_list()
    print(img_list)

def job():
    asyncio.run(main())



# 매주 월요일 오전 04시에 작동
schedule.every().monday.at("04:00").do(job)

if __name__ == "__main__":
    while True:
        schedule.run_pending()
        time.sleep(1)