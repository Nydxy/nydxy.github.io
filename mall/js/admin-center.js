function load_admin_center()
{
    //show_user_manage();
    //商家
    $.getJSON(API_GET_SELLERLIST, function (data, status)
    {
        sellers = [];
        for (var a of data) sellers[a.id] = a;
        $("#sellerTable").raytable({
            datasource: { data: sellers, keyfield: 'id' },
            columns: [
                { field: "id", title: "ID" },
                { field: "name", title: "名称" },
                { field: "phone", title: "联系电话" },
                { field: "income", title: "总收入" },
                {
                    title: "操作", button: [
                        { title: "修改", class: 'btn btn-sm btn-info mr-1', handler: function () { alert("暂未开放"); } },
                    ]
                },
            ],
        });
    });

    //客户
    $.getJSON(API_GET_USERLIST, function (data, status)
    {
        users = [];
        for (var a in data) users[data[a]["id"]] = data[a];
        $("#userTable").raytable({
            datasource: { data: users, keyfield: 'id' },
            columns: [
                { field: "id", title: "ID" },
                { field: "name", title: "名称" },
                { field: "phone", title: "联系电话" },
                { field: "adress", title: "地址" },
                { field: "total_consumption", title: "消费总额" },
                {
                    title: "操作", button: [
                        { title: "修改", class: 'btn btn-sm btn-info mr-1', handler: function () { alert("暂未开放"); } },
                    ]
                },
            ],
        });
    });




}