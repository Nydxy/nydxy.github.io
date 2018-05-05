$().ready(function(){
    $("#customer_user_name").val(username);
})

//显示购物车
function showCart() {
    table = $("#cart_table");
    table.html("");
    cart.forEach(item => {
        str = `<tr id="${item["id"]}"><td>${item["id"]}</td>`;
        str += `<td>${item["item"]["name"]}</td>`;
        str += `<td name="price">${item["item"]["price"] * item["num"]}</td>`;
        str += `<td><input type="number" class="form-control numbox" value="${item["num"]}" onchange="change_cart_num(${item['id']},$(this).val())"></td></tr>`;
        table.append(str);
        calculate_totPrice();
    });
}
function change_cart_num(id, value) {
    cart[id]["num"] = value;
    price = cart[id]["item"]["price"] * cart[id]["num"];
    $("#" + id).children("td[name='price']").text(price);
    calculate_totPrice();
}
function submit_order() {
    alert("订单已提交");
}
function calculate_totPrice() {
    total = 0;
    cart.forEach(item => total += item["item"]["price"] * item["num"]);
    $("#tot_price").val(total);
}
function modify_customerinfo() {
    alert("用户信息修改成功！");
}