import mysql.connector


def update_into_goods(data, database, host, user, password):
    """
    本函数仅用于修改本项目goods表的内容，data为字典
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
    update_statement = ', '.join(f"{key}='{value}'" for key, value in data.items() if key != 'id')
    sql = f"UPDATE goods SET {update_statement} WHERE id={data['id']};"
    cursor.execute(sql)
    connection.commit()
    cursor.close()
    connection.close()