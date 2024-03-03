import mysql.connector
from mysql.connector import Error


def update_sql(table_name, column_name, value, condition, database, host, user, password):
    try:
        connection = mysql.connector.connect(host=host, database=database, user=user,
                                             password=password)
        cursor = connection.cursor()

        update_query = f"UPDATE {table_name} SET {column_name}={value} WHERE {condition}"
        cursor.execute(update_query)
        connection.commit()
        print("记录更新成功")

        cursor.close()
        connection.close()
    except Error as e:
        print("MySQL连接错误：", e)


def delete_sql(table_name, condition, database, host, user, password):
    try:
        connection = mysql.connector.connect(host=host, database=database, user=user,
                                             password=password)
        cursor = connection.cursor()

        delete_query = f"DELETE FROM {table_name} WHERE {condition}"
        cursor.execute(delete_query)
        connection.commit()
        print("记录删除成功")

        cursor.close()
        connection.close()
    except Error as e:
        print("MySQL连接错误：", e)


def insert_sql(table_name, columns, values, database, host, user, password):
    # 建立与MySQL服务器的连接
    try:
        connection = mysql.connector.connect(user=user, password=password, host=host,
                                             database=database)
        cursor = connection.cursor()

        try:
            # 定义要插入的数据
            columns_str = ""
            values_str = ""
            for i in columns:
                columns_str += f"{i},"
            for i in values:
                values_str += f"'{i}',"

            print(columns_str, values_str)

            # 构造INSERT语句
            insert_query = f"INSERT INTO {table_name} ({columns_str[:-1]}) VALUES ({values_str[:-1]})"
            print(insert_query)

            # 执行INSERT语句
            cursor.execute(insert_query)

            # 提交更改到数据库
            connection.commit()

            print("记录添加成功")
        except Exception as e:
            # 发生错误时进行回滚
            connection.rollback()
            print("记录添加失败：", str(e))
        finally:
            # 关闭游标和连接
            cursor.close()
            connection.close()
    except Error as e:
        print("MySQL连接错误：", e)
