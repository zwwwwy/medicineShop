from flask import Flask, jsonify, request
from all_goods import all_goods
import json
from read_sql_data import read_sql_data
from search_sql import search_sql

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


# 搜索商品列表（在goods表的title列）
@app.route('/api/search', methods=['GET', 'POST'])
def search_good():
    post = request.values.get('post')
    # 获取wx:request中data里面post对应的值（只能这样，离谱）
    # 另外注意一下接收到的信息两端包含引号，调用数据库搜索的时候需要删掉
    # resp = {"status": 200, "data": {"result": post}}
    dic = search_sql('goods', 'title', post[1:-1])
    result = list(dic.values())
    if result:
        resp = {"status": 200, "data": {"result": result}}
    else:
        resp = no_data
    return jsonify(resp)


@app.route('/api/swiper')
def get_swiper():
    dic = read_sql_data('swiper')
    result = list(dic.values())
    if result:
        return jsonify({"status": 200, "data": {"result": result}})
    else:
        return jsonify(no_data)


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
        return jsonify(no_data)


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
