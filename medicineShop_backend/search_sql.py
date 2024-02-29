import mysql.connector
import pandas as pd


def search_sql(table_name, column_name, keyword):
    """
    搜索内容包含关键字的数据
    :param table_name:
    :param keyword:
    :param column_name:
    :return:
    """
    # 建立与MySQL服务器的连接
    cnx = mysql.connector.connect(user='root', host='localhost',
                                  database='medicine_shop')
    cursor = cnx.cursor()

    # 定义查询语句
    query = f"SELECT * FROM {table_name} WHERE {column_name} LIKE '%{keyword}%'"

    try:
        # 执行查询语句
        cursor.execute(query)

        # 获取所有结果集
        result = cursor.fetchall()
        column_names = [i[0] for i in cursor.description]
        # 输出每条记录
        df = pd.DataFrame(result, columns=column_names)
        df.set_index('id')

    except Exception as e:
        print("Error: ", str(e))
        return
    finally:
        # 关闭游标和连接
        cursor.close()
        cnx.close()

    return df.T.to_dict()


def search_sql_id(table_name, keyword, column_name='id'):
    """
    搜索内容完全匹配的数据
    :param table_name:
    :param keyword:
    :param column_name:
    :return:
    """
    # 建立与MySQL服务器的连接
    cnx = mysql.connector.connect(user='root', host='localhost',
                                  database='medicine_shop')
    cursor = cnx.cursor()

    # 定义查询语句
    query = f"SELECT * FROM {table_name} WHERE {column_name} = '{keyword}'"

    try:
        # 执行查询语句
        cursor.execute(query)

        # 获取所有结果集
        result = cursor.fetchall()
        column_names = [i[0] for i in cursor.description]
        # 输出每条记录
        df = pd.DataFrame(result, columns=column_names)
        df.set_index('id')

    except Exception as e:
        print("Error: ", str(e))
        return
    finally:
        # 关闭游标和连接
        cursor.close()
        cnx.close()

    return df.T.to_dict()


dic = search_sql_id('goods', "感冒药", 'tag')
print(dic)
