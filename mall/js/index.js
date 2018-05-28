cart = [];  //购物车

$(document).ready(function ()
{
    loadNavigateBar("nav_home");
    GetItemsList();
});

//显示商品列表
function GetItemsList() 
{
    $.getJSON(API_GETITEMS, function (data1, status)
    {
        items = []; //商品列表
        //获取商品的卖家名称
        $.getJSON(API_GET_SELLERLIST, function (data2, status)
        {
            sellers = [];
            for (var a of data2) sellers[a.id] = a;
            for (var item of data1) 
            {
                item.seller_name = sellers[item.mer_id].name;
                items[item.id] = item;
            }
            RenderTable(items);
        });
    }
    );
}

//渲染表格
function RenderTable(itemList)
{
    itemTable = $("#itemTable").raytable({
        datasource: { data: itemList, keyfield: 'id' },
        columns: [
            { field: "id", title: "ID" },
            { field: "name", title: "名称" },
            { field: "price", title: "价格" },
            { field: "seller_name", title: "商家" },
            { title: "操作", button: [{ title: "加入购物车", class: 'btn btn-sm btn-info', handler: addCartClick }] }
        ],
    });
}

//显示购物车
function showCart()
{
    $("#cartTable").raytable({
        datasource: { data: cart, keyfield: 'id' },
        columns: [
            { field: "id", title: "ID" },
            { field: "name", title: "名称" },
            { field: "seller_name", title: "商家" },
            { field: "price", title: "单价" },
            { field: "num", title: "数量" },
            { field: "total_price()", title: "总价", isFunc: true },
            {
                title: "操作", button: [
                    { title: "+", class: 'btn btn-sm btn-info mr-1', handler: add_cart_num },
                    { title: "-", class: 'btn btn-sm btn-info mr-1', handler: sub_cart_num }
                ]
            },
        ],
    });
    calculate_totPrice();
}

//addCart按钮点击事件
function addCartClick(event)
{
    if (!signin)
    {
        create_alertbox("<a href='signin.html'>请先登录！</a>", "alert-warning");
        return;
    }
    addCart(event.data.key);
}

//加到购物车
function addCart(itemid)
{
    if (cart[itemid]) cart[itemid].num++;
    else
    {
        cart[itemid] =
            {
                id: itemid,
                num: 1,
                name: items[itemid]["name"],
                price: items[itemid]["price"],
                seller_name: items[itemid]["seller_name"],
                total_price: function () { return this.num * this.price; }
            };
    }
    create_alertbox(`商品[${items[itemid].name}] 加到购物车成功`, "alert-success");
}

//数量+1
function add_cart_num(event)
{
    cart[event.data.key].num++;
    showCart();
}

//数量-1
function sub_cart_num(event)
{
    cart[event.data.key].num--;
    if (cart[event.data.key].num == 0) delete cart[event.data.key];
    showCart();
}

//计算总价
function calculate_totPrice()
{
    var total = 0;
    for (var item in cart)
        total += cart[item]["price"] * cart[item]["num"];
    $("#tot_price").val(total);
}

function SubmitOrder()
{
    if (cart.count == 0) 
    {
        alert("购物车为空！");
        return;
    }
    var arr = [];
    var amount=0;
    for (var item in cart)
    {
        arr.push({ id: cart[item].id, num: cart[item].num, method: "Alipay" });
        amount++;
    }
    data = {
        cli_id: userid,
        item: arr,
        amount: amount
    };
    alert(JSON.stringify(data));
    
}