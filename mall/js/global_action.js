//注销
function signout()
{
    Cookies.remove("username");
    Cookies.remove("usertype");
    Cookies.remove("userid");
}

//加载导航栏
function loadNavigateBar(setactive)
{
    $("#navigate_bar").load("navigate_bar.html", function ()
    {
        if (setactive != null) $("#" + setactive).addClass("active font-weight-bold");
        if (username != null)
        {
            signin = true;
            $("#usrinfo").html(`<b>${username}</b> <a href="" onclick="signout()"><span class="badge badge-success"><big>退出</big></span></a>`);
        }
    });
}