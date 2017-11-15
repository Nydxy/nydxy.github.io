# QQ空间API说明（一） 基本部分
## 一、登录
### 1.1 获取登陆签名（pt_login_sig）
URL
```
http://ui.ptlogin2.qq.com/cgi-bin/login?  
```
方式
```
POST
```
POST参数
```
hide_title_bar=1&low_login=0&qlogin_auto_login=0&no_verifyimg=1&link_target=blank&appid=549000912&target=self&s_url=http://qzone.qq.com
```
Cookie
```
不需要
```
返回值
```
无
在Cookie中取pt_login_sig字段即可
```
### 1.2 帐号状态检查, 获取验证码
URL
```
https://ssl.ptlogin2.qq.com/check?regmaster=&pt_tea=2&pt_vcode=1&uin={QQ号}&appid=549000912&js_ver=20218&js_type=1&login_sig={pt_login_sig}&u1=https%3A%2F%2Fqzs.qzone.qq.com%2Fqzone%2Fv5%2Floginsucc.html%3Fpara%3Dizone%26from%3Diqq&r=0.{随机数}&pt_uistyle=40

说明：
QQ号  
pt_login_sig：上一步获取的。但是也可以是任意字符串，如"xkiwzdA8rpuiegknK9XtIJD0Vkab4r5AdHRMT3*qdbXavHR6OCDN7amx0veyjfQl"，测试无影响。  
随机数：16位左右的随机数，用13位的时间也可以，测试无影响。  
```
方式
```
GET
```
Cookie
```
需要
```
返回值
```
ptui_checkVC('0','!UZA','\x00\x00\x00\x00\x2b\xdd\x5d\x8f','c90adfddc6ddb025a54ef4e5326c08748e48114983f1f7f426d1b9b74d95d960c1bb6c6b064f7970cab41ccb1b666a550f001f220deb0371','2');  

说明：
一共4个参数。
第1个：0说明不需要验证码，此时应保存第2个参数。否则，应获取验证码，并提交验证码登录。
第2个：验证码（verifycode）
第3个：salt。用于密码的加密。很重要
第4个：pt_verifysession。很重要
第5个：没什么意义
```

### 1.3 密码的加密
由于腾讯的密码加密算法很复杂（RSA+MD5+TEA），我没办法自己实现，网上能找到的也基本没法用。因此我们**直接拿腾讯的js来用**。  

该JS的下载地址：
```
https://imgcache.qq.com/ptlogin/ver/10230/js/c_login_2.js?max_age=604800&ptui_identifier=000E010783BF2B0C8F7B970D42C97FA36767F9354B5CE216035725242F
```
由于用.NET或者Python直接执行该JS会出错（因为他们的模拟JS环境没有DOM结构），因此需要修改后再调用。  

给密码加密的JS函数：  
```js
window.$pt.Encryption.getEncryption('{Password}', '{salt}', '{verifycode}', undefined)
```
一共有4个参数，分别是密码、salt（第2步获取的）、验证码（第2步获取或者手动输入），最后一个没有什么意义。

这样就能得到加密后的密码了，最新版是**344位**，2017年5月11日测试通过。

附上C#中调用js的代码
```csharp
//使用MSScriptControl执行JS
//code是js代码
MSScriptControl.ScriptControl scriptControl = new MSScriptControl.ScriptControl();
scriptControl.UseSafeSubset = false;
scriptControl.Language = "javascript";
scriptControl.AddCode(code);
string EncryptedPassword= scriptControl.Eval($@"window.$pt.Encryption.getEncryption('{Password}', '{salt}', '{Vcode}', undefined)");
```


### 1.4 登录
URL
```
https://ssl.ptlogin2.qq.com/login?u={QQ号}&verifycode={verifycode}&pt_vcode_v1=0&pt_verifysession_v1={pt_verifysession}&p={加密后的密码}&pt_randsalt=2&u1=https%3A%2F%2Fqzs.qzone.qq.com%2Fqzone%2Fv5%2Floginsucc.html%3Fpara%3Dizone%26from%3Diqq&ptredirect=0&h=1&t=1&g=1&from_ui=1&ptlang=2052&action=3-33-1494424448339&js_ver=20218&js_type=1&login_sig={pt_login_sig}&pt_uistyle=40&aid=549000912&daid=5

例如：https://ssl.ptlogin2.qq.com/login?u=73592***&verifycode=!VFN&pt_vcode_v1=0&pt_verifysession_v1=e30a5c8fc740c41ca13a673462e3b6874111d173eda549fe011b95fd2ebfe5ee5fa6aeacd6cfa619ed4e68612737b1fba1b1b7662639fe92&p=hc6kdycN2DNjYXA5*T0*ggGzwLC5wmqp6AV94LYMa-sGSB1DyinvWyZsofL9DL47MnS4W6ZuSpVSyjOtZOH7BdeGrxBEGNweZTX1zhjkCRy5601KHOmlYdGIeEcT*NzEmO4-J1j-BoT5SpYgpCWpXMg4meX2lXQzD0Av25nQhoTd53f6T8fopowPT3gL1pKBpbupoExdPdgoT3YftG6750ngqXFkNOA8AHTtOZrflwbpmhEMsfSuyCNUM2zPE0OaAh6fHnI-iw4a*qsSAueaOeeZrE7ywwp-lgJLood8VDNBT7GIzctG69SelTstN2X0Y4WlIsg*qddAyLrjigIi1w__&pt_randsalt=2&pt_jstoken=3606267738&u1=https%3A%2F%2Fqzs.qzone.qq.com%2Fqzone%2Fv5%2Floginsucc.html%3Fpara%3Dizone%26from%3Diqq&ptredirect=0&h=1&t=1&g=1&from_ui=1&ptlang=2052&action=2-15-1507295358022&js_ver=10230&js_type=1&login_sig=HifCg39xNHZ7pt-Df5qpERglO7rdChp-cYGuYgN31*wzi9TfFQq9CCKeImQW5kMC&pt_uistyle=40&aid=549000912&daid=5&has_onekey=1

说明：
QQ号
verifycode
pt_verifysession
加密后的密码
pt_login_sig
```
方式
```
GET
```
Cookie
```
需要
```
返回值
```
ptuiCB('0','0','https://ptlogin2.qzone.qq.com/check_sig?pttype=1&uin={QQ号}&service=login&nodirect=0&ptsigx=c79ab0eb5ef5a222b0e1f4e15b62ab13f82a4233e7f33ef0608ad956be51c5e90e8f7fee3bf2550b607d8bb4629182b2f599c49b83f130678410717a68e1112f&s_url=https%3A%2F%2Fqzs.qzone.qq.com%2Fqzone%2Fv5%2Floginsucc.html%3Fpara%3Dizone%26from%3Diqq&f_url=&ptlang=2052&ptredirect=100&aid=549000912&daid=5&j_later=0&low_login_hour=0&regmaster=0&pt_login_type=1&pt_aid=0&pt_aaid=0&pt_light=0&pt_3rd_aid=0','0','登录成功！', '你眼带笑意');
```

### 1.5 请求返回地址，从Cookie得到skey、p_skey
URL：第4步返回字符串中的第3项  
方法：GET  
**从Cookie得到**skey（用于计算gtk）、p_skey（用于计算p_skey）

### 1.6 gtk的计算方法
**gtk**是一个很重要的参数，几乎所有的空间操作都需要用到   
 
有些情况下需要用到**p_gtk**  

gtk和p_gtk的计算方法相同，仅仅是代入的参数不同：  
skey对应gtk（10位）  
p_skey对应p_gtk（8位）  

C#版的计算方法如下（其他语言类似）
```csharp
public int CalGTK(string skey, int init_str = 5381)
{
	int e = init_str, i = 0, n = skey.Length;
	for (; n > i; ++i)
		e += (e << 5) + skey[i];
	return 2147483647 & e;
}
```
### 1.7 获取QzoneToken（可选）
QzoneToken在某些情况下会用到，例如获取好友动态。  

URL
```
https://user.qzone.qq.com/{QQ号}/infocenter
```
方式
> GET  

Cookie
>需要

在网页源代码的最后找到如下一段js
```js
<script type="text/javascript">
window.g_qzonetoken = (function(){ try{return "2faf68800addd889004efc749f39b3af765899f66cb60c0db5d03167a0d248ae6ce10014a441afb127";} catch(e) {var xhr = new XMLHttpRequest();xhr.withCredentials = true;xhr.open('post', '//h5.qzone.qq.com/log/post/error/qzonetoken', true);xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');xhr.send(e);}})();
```
return后的字符串就是qzonetoken

## 二、 一些基本信息的获取
### 2.1 根据QQ号获取昵称和头像
URL
``` 
http://r.pengyou.com/fcg-bin/cgi_get_portrait.fcg?uins={QQ号}  
```
方式
> GET  

Cookie
>不需要

返回值
```
portraitCallBack({"{QQ号}":["http://qlogo4.store.qq.com/qzone/{QQ号}/{QQ号}/100",41596,-1,0,0,0,"你的昵称",0]})
```
请求中间的URL可获得头像，后面的字符串是昵称

### 2.2 根据QQ号获得头像
URL
```
http://r.pengyou.com/fcg-bin/cgi_get_portrait.fcg?uins={QQ号}  
```
方法
> GET  

Cookie
>不需要
### 2.3 获取空间个人信息
URL
```
https://h5.qzone.qq.com/proxy/domain/base.qzone.qq.com/cgi-bin/user/cgi_userinfo_get_all?uin={QQ号}&vuin={QQ号}&fupdate=1&rd=0.3363856981386508&g_tk={p_gtk}&format=json

参数列表：
QQ号
p_gtk
```
注意：这里要用p_gtk（8位）  

方法
> GET  

Cookie
>不需要

返回值类型
>json

返回值示例
```json
{
  "code": 0,
  "subcode": 0,
  "message": "获取成功",
  "default": 0,
  "data": {
    "uin": 735927695,
    "is_famous": false,
    "famous_custom_homepage": false,
    "nickname": "你眼带笑意",    //昵称
    "emoji": [
      
    ],
    "spacename": "你眼带笑意",   //空间名称
    "desc": "我欲乘风破浪 相敬流年 不负相识一场",   //空间说明
    "signature": "[ft=#ff0000,2,]一生痴绝处 无梦到徽州[/ft]", //空间签名档
    "avatar": "http://b232.photo.store.qq.com/psb?/473dd27a-aba6-4fc1-88da-4e0f050ce359/MwVkqe6I.o3J.yqCi6Jg.3tKiww7OwNjXKi2ZWBzse8!/b/dEyqV4poDwAA&amp;bo=kADiAAAAAAABAFU!",   //空间头像
    "sex_type": 0,  
    "sex": 1,   //性别
    "animalsign_type": 0,
    "constellation_type": 0,
    "constellation": 7, //星座（的序号）
    "age_type": 0,
    "age": 19,  //年龄
    "islunar": 0,   //是否是农历
    "birthday_type": 0,
    "birthyear": 1997,  //生日
    "birthday": "10-29",
    "bloodtype": 2, //血型（1-A 2-B 3-O 4-AB）
    "address_type": 0,
    "country": "中国",    //现居地
    "province": "江苏",
    "city": "镇江",
    "home_type": 0,
    "hco": "中国",    //故乡
    "hp": "江苏",
    "hc": "镇江",
    "marriage": 1,  //婚姻情况
    "career": "学生", //职业
    "company": "Calamansi Inc.",    //公司
    "cco": "中国",    //公司所在地
    "cp": "江苏",
    "cc": "镇江",
    "cb": "",
    "mailname": "",
    "mailcellphone": "",
    "mailaddr": "", //邮箱地址
    "qzworkexp": [
      
    ],
    "qzeduexp": [
      
    ],
    "ptimestamp": 1481729788
  }
}
```