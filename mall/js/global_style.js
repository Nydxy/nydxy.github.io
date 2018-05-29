//创建提示框
function create_alertbox(message, type) {
    if (type==undefined) type='alert-success';
    var alert_box = jQuery(`<div class="alert ${type}" id="alert_box"></div>`);
    alert_box.append(message);
    alert_box.append('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>');
    $("#container").append(alert_box);
    alert_box.fadeOut(3000);
}

//全局函数 在页面底部显示版权
$(function () {
    var date = new Date();
    $("#container").append(`<p class="mt-5 mb-3 text-muted text-center">403 Studio &copy; 2017-${date.getFullYear()}</p>`);
});

function create_alertbox_new(message,title,titlecolor)
{
    if (title==undefined) title="";
    if (titlecolor==undefined) titlecolor="";
    var m=$(`<div class="modal fade " tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title ${titlecolor}">${title}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          ${message}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal">关闭</button>
        </div>
      </div>
    </div>
  </div>`);
  m.modal('show');
}