import json

with open('shop_src/no_data.json', 'r', encoding='utf-8') as file:
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
