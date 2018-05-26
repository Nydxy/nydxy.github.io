//切换到客户中心
function load_customer_center()
{
    showCart();
    showUserInfo();
}

function showUserInfo() 
{
    $.getJSON(API_GET_USERLIST,function(data){
        for (a of data)
        {
            if (a.id==userid)
            {
                $("#customer_user_name").val(a.name);
                $("#customer_user_id").val(a.id);
                $("#customer_user_tel").val(a.phone);
                $("#customer_user_addr").val(a.adress);
                $("#customer_user_total").val(a.total_consumption);
            }
        }
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

function add_cart_num(event)
{
    cart[event.data.key].num++;
    showCart();
}

function sub_cart_num(event)
{
    cart[event.data.key].num--;
    if (cart[event.data.key].num == 0) delete cart[event.data.key];
    showCart();
}


function calculate_totPrice()
{
    total = 0;
    for (item in cart)
        total += cart[item]["price"] * cart[item]["num"];
    $("#tot_price").val(total);
}

function modify_customerinfo()
{
    alert("用户信息修改成功！");
}

function submit_order()
{
    alert("订单已提交");
}
