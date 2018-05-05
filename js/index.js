//全局变量
var itemlist = new Array(); //商品列表
itemlist["1"] = {
    id: "1",
    name: "CPU",
    price: 1200,
    sellerid: "0",
    seller: "zhangzheng"
};
itemlist["2"] = {
    id: "2",
    name: "SSD",
    price: 400,
    sellerid: "0",
    seller: "zhangzheng"
};
var url_submitorder = "";
var url_itemlist = "";

var cart = new Array();//购物车
var username;
var usertype;

//页面加载时执行
$().ready(function () {
    $("#year").html(new Date().getFullYear());
    

    showItems();//显示商品列表
    showUserLogin();//显示用户登录
});

//显示用户登录状态
function showUserLogin() {
    if (username = Cookies.get("username")) {
        $("#usrinfo").html(`<h5>${username} <a href="" onclick="signout()"><span class="badge badge-success">退出</span></a></h5>`);
    }
    if (usertype == "seller") {

    }
    else
        if (usertype == "customer") {
            $("#link-seller-center").hide();
        }
    switch (usertype) {
        case "customer":
            $("#link-admin-center").hide();
            $("#link-seller-center").hide();
            break;
        case "seller":
            $("#link-customer-center").hide();
            $("#link-admin-center").hide();
            break;
        case "admin":
            $("#link-customer-center").hide();
            $("#link-seller-center").hide();
            break;
        default:
            break;
    }
}

//注销
function signout() {
    Cookies.remove("username");
    Cookies.remove("signin");
}

//显示商品列表
function showItems() {
    table = $("#item_table");
    itemlist.forEach(item => {
        str = `<tr><td>${item["id"]}</td>`;
        str += `<td>${item["name"]}</td>`;
        str += `<td>${item["price"]}</td>`;
        str += `<td>${item["seller"]}</td>`;
        str += `<td>${getItemButton(item["id"])}</td></tr>`;
        table.append(str);
    });
    /* $.get(url_itemlist, function (data,status) {
         itemlist=JSON.parse(data);
         table = $("#item_table");
         itemlist.forEach(item => {
             table.append(`<tr><td>${item["id"]}</td><td>${item["name"]}</td><td>${item["price"]}</td><td>${item["seller"]}</td><td>${getItemButton(item["id"])}</td></tr>`);
         });
     });
     */
}
function getItemButton(itemid) {
    return `<button class="btn btn-sm btn-info" onclick="addCart(${itemid})">加入购物车</button>`;
}
//加到购物车
function addCart(itemid) {
    if (cart[itemid]) cart[itemid].num++;
    else cart[itemid] = { id: itemid, item: itemlist[itemid], num: 1 };
    create_alertbox("#area_bottom", "加到购物车成功", "alert-success");
}
//创建一个提示框，在parent中，消息为message，类型type(alert-success,alert-warning)
function create_alertbox(parent, message, type) {
    $(parent).html(`<div class="alert ${type}">${message}<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button></div>`);
}