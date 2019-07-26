﻿const express = require("express");                            //引入express框架
const mobileRouter = require('./controller/mobileRouter');    //引入移动端客户路由
const session = require("express-session");                  //引入session模块


const app = express();                                   //实例化express


//引入中间件
app.use(session({                                     //使用session中间件
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static("./public"));                             //静态PUBLIC
app.use(express.static("./static"));                             //静态static

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});


//移动端部分
app.post("/app/getPlantWideLoad", mobileRouter.getPlantWideLoad);
app.post("/app/getPlantWideLoadRate", mobileRouter.getPlantWideLoadRate);
app.post("/app/getPlantWideElectricQuantity", mobileRouter.getPlantWideElectricQuantity);
app.post("/app/getPlantWideCrewRate", mobileRouter.getPlantWideCrewRate);

app.post("/app/getNumberOEquipment", mobileRouter.getNumberOEquipment);   //获得机组数据

app.post("/app/getEquipmentTableData", mobileRouter.getEquipmentTableData);//获得下面table的数据

app.post("/app/getEquipmentLineData", mobileRouter.getEquipmentLineData);//获得曲线的接口

app.post("/app/getOtherEquipmentLineData", mobileRouter.getOtherEquipmentLineData); //获得曲线的接口

app.post("/app/getTimeEquipmentLineData", mobileRouter.getTimeEquipmentLineData); //根据时间查询



app.listen(3001);                                                 //监听3000端口

console.log("SERVER START");                                     //控制台打印服务器成功启动信息
