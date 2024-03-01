from static.info import database, host, user, password

from flask import Flask, jsonify, request
from tools import no_data, paging
from read_sql_data import read_sql_data
from search_sql import search_sql, search_sql_id

app = Flask(__name__)


@app.route('/api/login', methods=['GET', 'POST'])
def login():
    post = request.values.get('post')


# 搜索商品列表（在goods表的title列）
@app.route('/api/search/<int:page>', methods=['GET', 'POST'])
def search_good(page):
    post = request.values.get('post')
    # 获取wx:request中data里面post对应的值（只能这样，离谱）
    # 另外注意一下接收到的信息两端包含引号，调用数据库搜索的时候需要删掉
    # resp = {"status": 200, "data": {"result": post}}
    dic = search_sql('goods', 'title', post[1:-1], database, host, user, password)
    page_result = paging(dic)
    good = next((good for good in page_result if good['page'] == page), None)
    if good:
        return jsonify(good)
    else:
        return jsonify(no_data)


# 获取轮播图
@app.route('/api/swiper')
def get_swiper():
    dic = read_sql_data('swiper', database, host, user, password)
    result = list(dic.values())
    if result:
        return jsonify({"status": 200, "data": {"result": result}})
    else:
        return jsonify(no_data)


# 获取商品列表（分页）
@app.route('/api/goods/<int:page>')
def get_goods(page):
    dic = read_sql_data('goods', database, host, user, password)
    page_result = paging(dic)
    good = next((good for good in page_result if good['page'] == page), None)
    if good:
        return jsonify(good)
    else:
        return jsonify(no_data)


# 获取商品详情
@app.route('/api/goods/detail/<int:page>', methods=['GET', 'POST'])
def good_detail(page):
    post = request.values.get('post')
    # 获取wx:request中data里面post对应的值（只能这样，离谱）
    # 另外注意一下接收到的信息两端包含引号，调用数据库搜索的时候需要删掉
    # resp = {"status": 200, "data": {"result": post}}
    dic = search_sql_id('goods', 'id', int(post[1:-1]), database, host, user, password)
    result = {"status": 200, "data": {"result": list(dic.values())}}
    result['data']['result'] = result['data']['result'][0]
    result['data']['result']['details'] = result['data']['result']['details'].split('&&')
    result['data']['result']['topimage'] = result['data']['result']['topimage'].split('&&')
    # 上面一行因为这里的搜索一定只有一个结果，所以让result直接等于搜索到的json对象
    good = next((good for good in [result] if good['data']['result']['id'] == page), None)
    if dic:
        return jsonify(good)
    else:
        return jsonify(no_data)


# 获取分类列表（分页）
@app.route('/api/category/<int:page>', methods=['GET', 'POST'])
def get_category(page):
    post = request.values.get('post')
    dic = search_sql_id('goods', 'tag', post[1:-1], database, host, user, password)
    page_result = paging(dic)
    good = next((good for good in page_result if good['page'] == page), None)
    if good:
        return jsonify(good)
    else:
        return jsonify(no_data)


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
