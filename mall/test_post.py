import requests
import json
# Create your tests here.

'''info = {'id': 1, 'name': '方玉', 'phone': '15366030966', 'adress': '菊苑17#403-1', 'way': 'change'}
r = requests.post(" http://127.0.0.1:8000/update/client/", data=json.dumps(info))'''
'''info = {'id': 1, 'name': '铮哥牛逼', 'phone': '15646541', 'way': 'change'}
r = requests.post(" http://127.0.0.1:8000/update/marchant/", data=json.dumps(info))'''
'''info = {'id': 6, 'name': '铮哥牛逼药剂', 'price': 2222, 'way': 'insert', 'mer_id': 1}
r = requests.post(" http://127.0.0.1:8000/update/goods/", data=json.dumps(info))'''
info = {'username': 'DSSV', 'password': 'lll1111', 'name': '剁手', 'phone': '1565456211', 'gener': 'C',  'adress': 'my'}
r = requests.post(" http://127.0.0.1:8000/signup/", data=json.dumps(info))
'''info = {'cli_id': 1, 'amount': 3, 'method': ['Alipay',], 'goods_id': [1,3,4], 'num': [2,1,1]}
r = requests.post(" http://127.0.0.1:8000/update/indent/", data=json.dumps(info))'''
'''info = {'ind_id': 1, 'goods_id': 2}
r = requests.post(" http://127.0.0.1:8000/return/", data=json.dumps(info))'''
'''info = {'username': '方皓玉11', 'password': "B15040412"}
r = requests.post(" http://127.0.0.1:8000/login/", data=json.dumps(info))'''
print(r.text)

{
    userid:1,
    goods:[
        {
            id:1,
            amount:1,
            payment:"Alipay"
        },
        {
            id:2,
            amount:2
            payment:"Alipay"
        },
        ...
    ],
    amount:2
}