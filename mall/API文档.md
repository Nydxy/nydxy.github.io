# API列表

## 客户管理

### 登录

post
/user/signin

发送：
{
    "username":
    "password":
}

返回：

```js
{
    "code":0=成功,1000=用户名或密码错误,2000=用户不存在
    "type":"customer/seller/admin",
    "message":"成功/用户名或密码错误/用户不存在"
}
```

### 注册

post
/user/signup

发送：
{
    "username":
    "password":
    "type":
}

返回：

```js
{
    "code":0=成功,1000=用户名重复 / 其他失败原因
    "message":"成功"
}
```

## 商品管理

### 商品列表

get
/items/list

返回json数组

```js
[
    {
        //可以是SQL查出来的字典
        "id":"1",
        "name":"CPU",
        "price":1200,
        "sellerid":"0",
        "seller":"zhangzheng"
    },
    {
        ...
    }
]

```

### 下单

post
/items/submit

发送：

```js
{
    id:"1",
    num:1,
}
```

返回

```js
{
    "code":0=成功
    "message":"成功"
}
```

### 商户添加商品

post
/items/add

发送