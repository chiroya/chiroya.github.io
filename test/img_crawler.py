import requests
from bs4 import BeautifulSoup
import json

################################
# 이미지 크롤링 

def get_image_list():

    url = "https://m.site.naver.com/18ns6"
    res = requests.get(url)
    soup = BeautifulSoup(res.content, "lxml")
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

get_image_list()

################################



from flask import Flask, render_template

# 홈 페이지 라우트
@app.route('/')
def home():
    # 이미지 웹크롤링
    img_urls = get_image_list()

    # 이미지 URL을 HTML 템플릿으로 전달
    return render_template('test.html', img_urls=img_urls)

if __name__ == '__main__':
    app.run(debug=True)