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
    usertype = Cookies.get("usertype");
    username = Cookies.get("username");
    userid = parseInt(Cookies.get("userid"));
    console.log("username=" + username);
    console.log("userid=" + userid);
    console.log("usertype=" + usertype);
    $("#navigate_bar").load("navigate_bar.html", function ()
    {
        if (setactive != null) $("#" + setactive).addClass("active font-weight-bold");
        if (username != null)
        {
            signin = true;
            $("#usrinfo").html(`<b>${username}</b> <a href="index.html" onclick="signout()"><span class="badge badge-success"><big>退出</big></span></a>`);
        }
    });
}