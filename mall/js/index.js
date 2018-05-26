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

$(document).ready(function ()
{
    GetItemsList();
});

function GetItemsList() 
{
    $.getJSON(API_GETITEMS, function (data, status)
    {
        items = []; //商品列表
        for (var item of data) items[item.id] = item;
        GetSellers();
    }
    );
}

function RenderTable(itemList)
{
    itemTable = $("#itemTable").raytable({
        datasource: { data: itemList, keyfield: 'id' },
        columns: [
            { field: "id", title: "ID" },
            { field: "name", title: "名称" },
            { field: "price", title: "价格" },
            { field: "mer_id", title: "商家ID" },
            { field: "seller_name", title: "商家" },
            { title: "操作", button: [{ title: "加入购物车", class: 'btn btn-sm btn-info', handler: addCartClick }] }
        ],
    });
}

function GetSellers()
{
    $.getJSON(API_GET_SELLERLIST, function (data, status)
    {
        sellers = []; //卖家列表
        for (var a of data) sellers[a.id] = a;
        for (var item in items)
        {
            items[item].seller_name = sellers[items[item].mer_id].name;
        }
        RenderTable(items);
    });
}