//全局变量
var cart = [];//购物车
var signin = false; //判断用户是否登录
var username;  //用户名
var usertype;  //用户类型
var itemTable;  //首页数据表
var cartTable;
var userID;

//页面加载完毕后执行
$().ready(function ()
{
    showUserLogin();//显示用户登录
});

//显示用户登录状态
function showUserLogin()
{
    usertype = Cookies.get("usertype");
    username = Cookies.get("username");
    userid = Cookies.get("userid");
    if (username)
    {
        signin = true;
        $("#usrinfo").html(`<h5>${username} <a href="" onclick="signout()"><span class="badge badge-success">退出</span></a></h5>`);
    }
    console.log("usertype=" + usertype);
    $("#link-customer-center").show();
    $("#link-seller-center").show();
    $("#link-admin-center").show();
    switch (usertype)
    {
        case "customer":
            $("#link-customer-center").show();
            break;
        case "seller":
            $("#link-seller-center").show();
            break;
        case "admin":
            $("#link-admin-center").show();
            break;
        default:
            break;
    }
}

//注销
function signout()
{
    Cookies.remove("username");
}