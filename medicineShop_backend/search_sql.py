import mysql.connector
import pandas as pd


def search_sql(table_name, column_name, keyword, database, host, user, password) -> dict:
    """
    搜索内容包含关键字的数据
    :param password:
    :param user:
    :param host:
    :param database:
    :param table_name:
    :param keyword:
    :param column_name:
    :return:
    """
    # 建立与MySQL服务器的连接
    connection = mysql.connector.connect(user=user, host=host,
                                         database=database, password=password)
    cursor = connection.cursor()

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
        cursor.close()
        connection.close()

        return df.T.to_dict()

    except Exception as e:
        print("MySQL连接错误: ", str(e))


def search_sql_id(table_name, column_name, keyword, database, host, user, password):
    """
    搜索内容完全匹配的数据
    :param password:
    :param user:
    :param host:
    :param database:
    :param table_name:
    :param keyword:
    :param column_name:
    :return:
    """
    # 建立与MySQL服务器的连接
    connection = mysql.connector.connect(user=user, host=host,
                                         database=database, password=password)
    cursor = connection.cursor()

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
        cursor.close()
        connection.close()

        return df.T.to_dict()

    except Exception as e:
        print("MySQL连接错误: ", str(e))


def search_sql_id_in(table_name, column_name, keyword, searched_column, database, host, user, password):
    """
    搜索内容完全匹配的数据对应行的某一列的值
    :param searched_column:
    :param password:
    :param user:
    :param host:
    :param database:
    :param table_name:
    :param keyword:
    :param column_name:
    :return:
    """
    # 建立与MySQL服务器的连接
    connection = mysql.connector.connect(user=user, host=host,
                                         database=database, password=password)
    cursor = connection.cursor()

    # 定义查询语句
    query = f"SELECT {searched_column} FROM {table_name} WHERE {column_name} = '{keyword}'"

    try:
        # 执行查询语句
        cursor.execute(query)

        # 获取所有结果集
        result = cursor.fetchall()
        column_names = [i[0] for i in cursor.description]
        # 输出每条记录
        df = pd.DataFrame(result, columns=column_names)
        df.set_index('id')
        cursor.close()
        connection.close()

        return df.T.to_dict()

    except Exception as e:
        print("MySQL连接错误: ", str(e))