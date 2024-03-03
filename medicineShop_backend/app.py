from static.info import database, host, user, password, appId, appSecret

import requests
import json
import time
from flask import Flask, jsonify, request
from mysql.connector import errors
from tools import no_data, paging
from read_sql_data import read_sql_data
from search_sql import search_sql, search_sql_id, search_sql_id_in
from cart import insert_into_cart, find_cart_info, update_into_cart
from order import find_order_into, insert_into_order, update_into_order

app = Flask(__name__)


@app.route('/api/login', methods=['GET', 'POST'])
def login():
    post = request.values.get('post')
    url = f"https://api.weixin.qq.com/sns/jscode2session?appid={appId}&secret={appSecret}&js_code={post[1:-1]}&grant_type=authorization_code"
    response = requests.get(url)  # 发送GET请求并获取响应结果
    response = json.loads(response.text)
    if "errmsg" in response.keys():
        print("用户登录失败")
        return jsonify({"status": 400, "data": {"result": "登录失败"}})
    else:
        print("用户登录成功")
        return jsonify({"status": 200, "data": {"result": response}})


# 搜索商品列表（在goods表的title列）
@app.route('/api/search/<int:page>', methods=['GET', 'POST'])
def search_good(page):
    post = request.values.get('post')
    # 获取wx:request中data里面post对应的值（只能这样，离谱）
    # 另外注意一下接收到的信息两端包含引号，调用数据库搜索的时候需要删掉
    # resp = {"status": 200, "data": {"result": post}}
    print(f"用户进行了搜索，搜索内容为{post[1:-1]}")
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
        print("获取轮播图成功")
        return jsonify({"status": 200, "data": {"result": result}})
    else:
        print("获取轮播图失败")
        return jsonify(no_data)


# 获取商品列表（分页）
@app.route('/api/goods/<int:page>')
def get_goods(page):
    dic = read_sql_data('goods', database, host, user, password)
    page_result = paging(dic)
    good = next((good for good in page_result if good['page'] == page), None)
    if good:
        print(f"用户获取商品列表成功，当前页数为{page}")
        return jsonify(good)
    else:
        print(f"用户获取商品列表失败，当前页数为{page}")
        return jsonify(no_data)


# 获取商品详情
@app.route('/api/goods/detail/<int:goodId>', methods=['GET', 'POST'])
def good_detail(goodId):
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
    good = next((good for good in [result] if good['data']['result']['id'] == goodId), None)
    if dic:
        print(f"用户获取商品详情成功，当前商品id为{goodId}")
        return jsonify(good)
    else:
        print(f"用户获取商品详情失败，当前商品id为{goodId}")
        return jsonify(no_data)


# 获取分类列表（分页）
@app.route('/api/category/<int:page>', methods=['GET', 'POST'])
def get_category(page):
    post = request.values.get('post')
    dic = search_sql_id('goods', 'tag', post[1:-1], database, host, user, password)
    page_result = paging(dic)
    good = next((good for good in page_result if good['page'] == page), None)
    if good:
        print(f"用户获取分类列表成功，当前页数为{page}")
        return jsonify(good)
    else:
        print(f"用户获取分类列表失败，当前页数为{page}")
        return jsonify(no_data)


# 获取购物车信息
# 接收前端传来的openid，返回该openid的购物车信息
@app.route('/api/cart', methods=['GET', 'POST'])
def get_cart():
    post = request.values.get('post')
    openid = post[1:-1]
    print(f"用户{openid}请求获取购物车信息")
    try:
        result = find_cart_info(openid, database, host, user, password)
        print("获取用户购物车信息成功")

        if result:
            resule_dic = json.loads(result[0][1])
            return jsonify({"status": 200, "data": {"result": resule_dic}})
        else:
            return jsonify(no_data)
    except errors.ProgrammingError as e:
        if e.errno == 1054:
            print("查无此人")
            return jsonify(no_data)
        else:
            return jsonify(no_data)


# 添加购物车信息
# 接收前端传来的openid和商品id及数量，三者依次用&&分割
@app.route('/api/cart/add', methods=['POST'])
def add_cart():
    post = request.values.get('post')
    result_dic = json.loads(post)
    openid = result_dic['openid']
    goodId = result_dic['goodId']
    goodAmount = result_dic['goodAmount']
    # 这里转换后的result_dic是一个字典，示例内容如下.注意goodId的值是字符型
    # {'openid': 'onXxF6Y7VAsxPZ76WJ5MzqidFKCQ', 'goodId': '1', 'goodAmount': 1}

    try:
        result = find_cart_info(openid, database, host, user, password)
        if result:
            data = json.loads(result[0][1])
            if goodId in data.keys():
                data[goodId] += goodAmount
            else:
                data[goodId] = goodAmount
            update_into_cart(openid, data, database, host, user, password)
        else:
            data = {result_dic['goodId']: result_dic['goodAmount']}
            insert_into_cart(result_dic['openid'], data, database, host, user, password)
    except errors.ProgrammingError as e:
        if e.errno == 1054:
            data = {result_dic['goodId']: result_dic['goodAmount']}
            insert_into_cart(result_dic['openid'], data, database, host, user, password)
        else:
            raise
    finally:
        print(f"用户{openid}添加购物车信息成功")
        return jsonify({"status": 200, "data": {"result": "添加购物车信息成功"}})


# 这个用来在步进器操作购物车后更新数量，仅用于步进器！！！
# 本函数默认传入的商品id已经存在于购物车里，这里只更新数量，不添加新的商品
@app.route('/api/cart/change', methods=['POST'])
def change_cart():
    post = request.values.get('post')
    result_dic = json.loads(post)
    openid = result_dic['openid']
    goodId = result_dic['goodId']
    goodAmount = result_dic['goodAmount']

    result = find_cart_info(openid, database, host, user, password)
    data = json.loads(result[0][1])
    data[str(goodId)] = goodAmount
    update_into_cart(openid, data, database, host, user, password)
    return jsonify({"status": 200, "data": {"result": "更新购物车信息成功"}})


# 这个函数接收openid和商品信息，返回该商品的库存和该用户对应商品的购物车数量
# 这是用来在前端计算步进器的最大数量的
@app.route('/api/stepper', methods=['GET', 'POST'])
def get_stepper():
    post = request.values.get('post')
    result_dic = json.loads(post)

    openid = result_dic['openid']
    goodId = result_dic['goodId']

    result_stock = search_sql_id('goods', 'id', goodId, database, host, user, password)
    stock = result_stock[0]['stock']

    result_cart = find_cart_info(openid, database, host, user, password)

    # 这里是防止在购物车没有查询的商品时报错
    result_cart = json.loads(result_cart[0][1])
    if not result_cart:
        return_result = {"stock": stock, "cart_amount": 0}
    else:
        print("用户的购物车信息是", result_cart)
        if str(goodId) not in result_cart.keys():
            cart_amount = 0
        else:
            cart_amount = result_cart[str(goodId)]
        return_result = {"stock": stock, "cart_amount": cart_amount}

    return jsonify({"status": 200, "data": {"result": return_result}})


# 这个函数用来清理用户购物车中amount为0的商品，接收openid
@app.route('/api/cart/fresh', methods=['POST'])
def fresh_cart():
    post = request.values.get('post')
    openid = post[1:-1]
    result = find_cart_info(openid, database, host, user, password)
    if result:
        data = json.loads(result[0][1])
        for key in list(data.keys()):
            if data[key] == 0:
                del data[key]
        update_into_cart(openid, data, database, host, user, password)
    return jsonify({"status": 200, "data": {"result": "清理购物车成功"}})


# 删除购物车商品，接收openid和商品id
@app.route('/api/cart/delete', methods=['POST'])
def delete_cart():
    post = request.values.get('post')
    result_dic = json.loads(post)
    openid = result_dic['openid']
    goodId = result_dic['goodId']

    result = find_cart_info(openid, database, host, user, password)
    data = json.loads(result[0][1])
    del data[str(goodId)]
    update_into_cart(openid, data, database, host, user, password)
    return jsonify({"status": 200, "data": {"result": "删除购物车信息成功"}})

# 这里接收前端传入的openid、商品id、数量，并加上时间和订单状态0，插入到order表中
# 在前端设置了只有选择商品才会结算，所以不用判断post是否为空
@app.route('/api/order', methods=['POST'])
def add_order():
    post = request.values.get('post')
    result_dic = json.loads(post)
    openid = result_dic['openid']
    current_time = time.strftime('%Y%m%d%H%M%S', time.localtime())
    order_list = result_dic['orderList']
    # result = {current_time: {str(i['goodId']): {"amount": i["amount"], "status": 0} for i in order_list}}
    # insert_into_order(openid, result, database, host, user, password)
    try:
        result = find_order_into(openid, database, host, user, password)
        print(result)
        if result:
            data = json.loads(result[0][1])
            data[current_time] = {str(i['goodId']): {"amount": i["amount"], "status": 0} for i in order_list}
            update_into_order(openid, data, database, host, user, password)
        else:
            data = {current_time: {str(i['goodId']): {"amount": i["amount"], "status": 0} for i in order_list}}
            insert_into_order(openid, data, database, host, user, password)
    except errors.ProgrammingError as e:
        if e.errno == 1054:
            data = {current_time: {str(i['goodId']): {"amount": i["amount"], "status": 0} for i in order_list}}
            insert_into_order(openid, data, database, host, user, password)
        else:
            raise
    finally:
        print(f"用户{openid}添加订单信息成功")
        return jsonify({"status": 200, "data": {"result": "添加购物车信息成功"}})


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
