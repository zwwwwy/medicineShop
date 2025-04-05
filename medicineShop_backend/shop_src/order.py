import json
import mysql.connector


def insert_into_order(openid, data, database, host, user, password):
    """
    本函数仅用于把信息插入本项目的订单信息，data为字典
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
    json_str = json.dumps(data, ensure_ascii=False)
    sql = "INSERT INTO orderinfo (openid, orderInfo) VALUES (%s,%s);"
    cursor.execute(sql, (openid, json_str))
    connection.commit()
    cursor.close()
    connection.close()


def find_order_info(openid, database, host, user, password):
    """
    本函数查找某openid的订单信息，返回结果为列表套元组，元组第二项为json字符串
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
    sql = "SELECT * FROM orderinfo WHERE openid = %s;"
    cursor.execute(sql, (openid,))
    result = cursor.fetchall()
    cursor.close()
    connection.close()
    return result


def update_into_order(openid, data, database, host, user, password):
    """
    本函数仅用于修改本项目order表的内容，data为字典
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
    json_str = json.dumps(data, ensure_ascii=False)
    sql = "UPDATE orderinfo SET orderInfo=(%s) WHERE openid=(%s);"
    cursor.execute(sql, (json_str, openid))
    connection.commit()
    cursor.close()
    connection.close()