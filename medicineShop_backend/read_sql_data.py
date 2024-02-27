import mysql.connector
from mysql.connector import Error
import pandas as pd


def read_sql_data(table_name: str) -> dict:
    """
    从数据库中读取全部数据，并转化为字典，默认只在本项目中使用，所以开头的数据写死了。
    :param table_name: 要读取的表的名称
    :return:
    """
    host = "localhost"  # MySQL服务器地址
    user = "root"  # 用户名
    password = ""  # 密码
    database = "medicine_shop"  # 要访问的数据库名称
    data = []
    try:
        connection = mysql.connector.connect(host=host, user=user, password=password, database=database)

        if connection.is_connected():
            db_Info = connection.get_server_info()
            print("成功连接到MySQL服务器版本", db_Info)

            cursor = connection.cursor()
            query = f"SELECT * FROM {table_name};"  # 修改为你想要查询的表格名称
            cursor.execute(query)

            column_names = [i[0] for i in cursor.description]

            for row in cursor:
                data.append(row)

            cursor.close()
            connection.close()

        df = pd.DataFrame(data, columns=column_names)
        df.set_index('id')
        return df.T.to_dict()

    except Error as e:
        print("MySQL连接出错", e)

dic = read_sql_data('goods')

def get_goods():
    result = []
    page_result = []
    dic = read_sql_data('goods')
    lst = list(dic.values())
    for i in range(0, len(dic), 5):
        result.append(lst[i:i + 5])
    k = 0
    for i in result:
        k += 1
        tmp = {"status": 200, "page": k, "data": i}
        page_result.append(tmp)

    print(page_result)
    good = next((good for good in page_result if good['page'] == id), None)
    print(good)

get_goods()
