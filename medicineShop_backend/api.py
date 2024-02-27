from flask import Flask, jsonify
from all_goods import all_goods
import json
from read_sql_data import read_sql_data

app = Flask(__name__)

# 商品信息 API
# @app.route('/api/goods/<int:id>')
# def get_good(id):
#     good = next((good for good in all_goods if good['id'] == id), None)
#     if good:
#         return jsonify(good)
#     else:
#         return jsonify({'error': '商品不存在'}), 404
#

# 轮播图 API
with open('no_data.json', 'r', encoding='utf-8') as file:
    no_data = json.load(file)


@app.route('/api/swiper')
def get_swiper():
    dic = read_sql_data('swiper')
    result = list(dic.values())
    result = {"status": 200, "data": {"result": result}}
    return jsonify(result)


@app.route('/api/goods/<int:page>')
def get_goods(page):
    result = []
    page_result = []
    dic = read_sql_data('goods')
    lst = list(dic.values())
    for i in range(0, len(dic), 10):
        result.append(lst[i:i + 10])
    k = 0
    for i in result:
        k += 1
        tmp = {"status": 200, "page": k, "data": {"result": i}}
        page_result.append(tmp)

    good = next((good for good in page_result if good['page'] == page), None)
    if good:
        return jsonify(good)
    else:
        return jsonify(no_data), 404


if __name__ == '__main__':
    app.run(debug=True)
