import json
import mysql.connector


def insert_into_cart(openid, data, database, host, user, password):
    """
    本函数仅用于把信息插入本项目的购物车，data为字典
    :param openid:
    :param data:
    :param database:
    :param host:
    :param user:
    :param password:
    :return:
    """
    connection = mysql.connector.connect(user=user, host=host,
                                         database=database, password=password)
    cursor = connection.cursor()
    json_str = json.dumps(data)
    sql = "INSERT INTO cart (openid, infoJson) VALUES (%s,%s);"
    cursor.execute(sql, (openid, json_str))
    connection.commit()
    cursor.close()
    connection.close()


def find_cart_info(openid, database, host, user, password):
    """
    本函数查找某openid的购物车信息，返回结果为列表套元组，元组第二项为json字符串
    :param openid:
    :param database:
    :param host:
    :param user:
    :param password:
    :return:
    """
    connection = mysql.connector.connect(user=user, host=host,
                                         database=database, password=password)
    cursor = connection.cursor()
    sql = "SELECT * FROM cart WHERE openid = %s;"
    cursor.execute(sql, (openid,))
    result = cursor.fetchall()
    cursor.close()
    connection.close()
    return result


def update_into_cart(openid, data, database, host, user, password):
    """
    本函数仅用于修改本项目cart表的内容，data为字典
    :param openid:
    :param data:
    :param database:
    :param host:
    :param user:
    :param password:
    :return:
    """
    connection = mysql.connector.connect(user=user, host=host,
                                         database=database, password=password)
    cursor = connection.cursor()
    json_str = json.dumps(data)
    sql = "UPDATE cart SET infoJson=(%s) WHERE openid=(%s);"
    cursor.execute(sql, (json_str, openid))
    connection.commit()
    cursor.close()
    connection.close()


# from static.info import database, host, user, password
#
# insert_into_cart('onXxF6Y7VAsxPZ76WJ5MzqidFKCQ', {'1': 1}, database, host, user, password)
# print(find_cart_info('onXxF6Y7VAsxPZ76WJ5MzqidFKCQ', database, host, user, password))
