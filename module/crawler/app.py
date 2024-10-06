from flask import Flask, render_template
from logic import get_image_list

app = Flask(__name__)#, template_folder='../../')

@app.route('/')
def index():
    # 크롤링한 데이터를 가져옵니다 (your_crawler_module에서 가져오는 함수를 호출합니다)
    data = get_image_list()

    # 가져온 데이터를 템플릿으로 전달하여 렌더링합니다
    return render_template('index.html', data=data)

if __name__ == '__main__':
    app.run(debug=True)


