from flask import Flask, jsonify, request
from all_goods import all_goods
import json
from read_sql_data import read_sql_data
from search_sql import search_sql, search_sql_id

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


def paging(dic):
    """
    对从数据库中读取的字典数据进行分页操作
    :param dic:
    :return: 返回一个含多个json对象的数据（每个json对象代表一页数据）
    """
    result = []
    page_result = []
    lst = list(dic.values())
    for i in range(0, len(dic), 10):
        result.append(lst[i:i + 10])
    k = 0
    for i in result:
        k += 1
        tmp = {"status": 200, "page": k, "data": {"result": i}}
        page_result.append(tmp)
    return page_result


# 搜索商品列表（在goods表的title列）
@app.route('/api/search/<int:page>', methods=['GET', 'POST'])
def search_good(page):
    post = request.values.get('post')
    # 获取wx:request中data里面post对应的值（只能这样，离谱）
    # 另外注意一下接收到的信息两端包含引号，调用数据库搜索的时候需要删掉
    # resp = {"status": 200, "data": {"result": post}}
    dic = search_sql('goods', 'title', post[1:-1])
    page_result = paging(dic)
    good = next((good for good in page_result if good['page'] == page), None)
    if good:
        return jsonify(good)
    else:
        return jsonify(no_data)


# 获取轮播图
@app.route('/api/swiper')
def get_swiper():
    dic = read_sql_data('swiper')
    result = list(dic.values())
    if result:
        return jsonify({"status": 200, "data": {"result": result}})
    else:
        return jsonify(no_data)


# 获取商品列表（分页）
@app.route('/api/goods/<int:page>')
def get_goods(page):
    dic = read_sql_data('goods')
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
    dic = search_sql_id('goods', int(post[1:-1]))
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
    dic = search_sql_id('goods', post[1:-1], 'tag')
    page_result = paging(dic)
    good = next((good for good in page_result if good['page'] == page), None)
    if good:
        return jsonify(good)
    else:
        return jsonify(no_data)


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
