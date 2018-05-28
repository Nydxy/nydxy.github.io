
//显示用户登录状态
function showUserLogin()
{
    usertype = Cookies.get("usertype");
    username = Cookies.get("username");
    userid = Cookies.get("userid");
    if (username!=null)
    {
        signin = true;
        $("#usrinfo").html(`<h5>${username} <a href="" onclick="signout()"><span class="badge badge-success">退出</span></a></h5>`);
    }
    console.log("username=" + username);
    console.log("userid=" + userid);
    console.log("usertype=" + usertype);
}

//注销
function signout()
{
    Cookies.remove("username");
}

//加载导航栏
function loadNavigateBar(setactive)
{
    $("#navigate_bar").load("navigate_bar.html",function (){
        if (setactive!=null) $("#"+setactive).addClass("active");
        showUserLogin();
    });
}