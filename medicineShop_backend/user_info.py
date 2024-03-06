import json
import mysql.connector


def insert_into_info(openid, data, database, host, user, password):
    """
    本函数仅用于把信息插入本项目的信息表，data为字典
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

    # 提取data字典中的值
    a = data.get('家庭慢性病情况')
    b = data.get('过敏情况')
    c = data.get('是否有孩子')

    sql = "INSERT INTO info (openid, 家庭慢性病情况, 过敏情况, 是否有孩子) VALUES (%s, %s, %s, %s);"
    cursor.execute(sql, (openid, a, b, c))
    connection.commit()
    cursor.close()
    connection.close()


def find_info(openid, database, host, user, password):
    """
    本函数查找某openid的信息，返回结果为列表套元组，元组第二项为json字符串
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
    sql = "SELECT * FROM info WHERE openid = %s;"
    cursor.execute(sql, (openid,))
    result = cursor.fetchall()
    cursor.close()
    connection.close()
    return result


def update_info(openid, data, database, host, user, password):
    """
    本函数仅用于更新本项目的信息表，data为字典
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

    # 提取data字典中的值
    a = data.get('家庭慢性病情况')
    b = data.get('过敏情况')
    c = data.get('是否有孩子')

    sql = "UPDATE info SET 家庭慢性病情况 = %s, 过敏情况 = %s, 是否有孩子 = %s WHERE openid = %s;"
    cursor.execute(sql, (a, b, c, openid))
    connection.commit()
    cursor.close()
    connection.close()