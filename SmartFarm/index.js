$().ready(function () {
    //Javascript从这里开始执行
    console.log("begin script");
    initiateCanvas();  //初始化canvas
    getMap("map1");  //默认绘制地图1
})

//获取并绘制指定地图
function getMap(filename) {
    $.getJSON({
        url: `${filename}.json`,
        dataType: "json",
        success: function (data) {
            map = data.data;
            drawMap(map);
        },

        error: function () {
            alert('地形加载失败！');
        }
    });
}

//初始化canvas
function initiateCanvas() {
    myCanvas = document.getElementById("myCanvas"); //canvas对象
    var container = $("#myCanvas-container");
    var f_height = container.height();
    var f_width = container.width();
    canvasLength = f_height > f_width ? f_width : f_height;  //全局变量：canvas的边长

    var ratio = window.devicePixelRatio;
    myCanvas.style.height = canvasLength + 'px';
    myCanvas.style.width = canvasLength + 'px';
    myCanvas.width = canvasLength * ratio;
    myCanvas.height = canvasLength * ratio;

    ctx = myCanvas.getContext("2d");        //全局变量：画笔对象
    ctx.scale(ratio, ratio);

    img_drone = new Image();   // 创建一个<img>元素
    img_drone.src = 'images/drone_1219960_easyicon.net.svg'; // 设置图片源地址
    //img_drone=document.getElementById("img_drone");
}

//绘制地图
//网格的坐标统一用 x:横坐标/列 y:纵坐标/行
function drawMap(map) {
    ctx.lineWidth = 1;
    ctx.font = "13px 微软雅黑";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    map_height = map.length;        //全局变量：地图高（格）
    map_width = map[0].length;      //全局变量：地图宽（格）
    pixel_length = Math.floor(canvasLength / map_height);   //全局变量：每格的边长（像素）

    ctx.clearRect(0, 0, canvasLength, canvasLength);

    //画网格
    ctx.strokeStyle = "#444444";
    ctx.lineWidth = 1;
    for (var i = 0; i <= map_height; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * pixel_length);
        ctx.lineTo(map_width * pixel_length, i * pixel_length);
        ctx.stroke();
    }
    for (var i = 0; i <= map_height; i++) {
        ctx.beginPath();
        ctx.moveTo(i * pixel_length, 0);
        ctx.lineTo(i * pixel_length, map_width * pixel_length);
        ctx.stroke();
    }

    //填充颜色和数字
    for (var i = 0; i < map_height; i++) {
        for (var j = 0; j < map_width; j++) {
            var x = j * pixel_length;     //左上角的横坐标
            var y = i * pixel_length;     //左上角的纵坐标
            drawSquare(x, y, map[i][j], pixel_length);
        }
    }
}

//画一个小方格 x:横坐标/列 y:纵坐标/行
function drawSquare(x, y, value, length) {
    var color = 255 - 255 * value / 5;              //计算填充颜色
    ctx.fillStyle = `rgb(255,${color},${color})`;   //填充
    ctx.fillRect(x + 1, y + 1, length - 2, length - 2);
    ctx.fillStyle = "black";                        //文字颜色
    ctx.fillText(value, x + length / 2, y + length / 2);  //数字
}


//var path = [0,17,34,51,68,85,102,119,136];
var path = [[0, 2], [0, 3], [1, 3], [1, 2], [1, 1], [1, 0], [2, 0], [2, 1], [2, 2],[2,3],
    [2,4],[3,4],[3,3],[2,3],[2,2],[2,1],[3,1],[4,1],[4,2],[4,3],[3,3],[2,3],[2,2],[3,2]];

//网格的序号转坐标  x:横坐标/列 y:纵坐标/行  左上角的index定义为0
function indexToCordinates(index) {
    var x = index % map_height;
    var y = Math.floor(index / map_width);
    return [x, y];
}

//在给定坐标绘制无人机
//cord为坐标：cord=[横坐标,纵坐标]
//cord也可以为方格的序号，例如cord=5
function drawUAV(cord) {
    var x, y;
    if (cord.length == undefined) {
        //序号转坐标
        cord = indexToCordinates(cord);
    }
    x = cord[0];
    y = cord[1];
    if (map1[y][x] > 0) map1[y][x]--;
    drawMap(map1);
    ctx.drawImage(img_drone, x * pixel_length, y * pixel_length, pixel_length, pixel_length);
}

//绘制路径
//path是存储路径标号或者坐标的一维数组，例如[1,2,3,4] 或者[[0,0],[0,1],[0,2]]
//interval为刷新速度(ms)
function drawPath(path, interval = 400) {
    var drawPathIndex = 0;
    map1 = [];
    for (var i = 0; i < map.length; i++)
    {
        map1[i]=[];
        for (var j = 0; j < map[i].length; j++) {
            map1[i][j] = map[i][j];
        }
    }
    action = setInterval(() => {
        drawUAV(path[drawPathIndex]);
        drawPathIndex++;
        if (drawPathIndex >= path.length) clearInterval(action);
    }, interval);
}