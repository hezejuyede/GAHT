const express = require("express");                            //引入express框架
const mobileRouter = require('./controller/mobileRouter');    //引入移动端客户路由
const session = require("express-session");                  //引入session模块
const mongodb = require("./models/mongodb");        //引入mongodb的数据库

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

app.post("/app/getDayMonthYearData", mobileRouter.getDayMonthYearData); //根据时间查询



app.post("/app/Electricity/dailyElectricityLineData", mobileRouter.dailyElectricityLineData);
app.post("/app/Electricity/dailyElectricityTableData", mobileRouter.dailyElectricityTableData);

app.post("/app/Electricity/monthlyElectricityLineData", mobileRouter.monthlyElectricityLineData);
app.post("/app/Electricity/monthlyElectricityTableData", mobileRouter.monthlyElectricityTableData);


app.post("/app/Electricity/yearlyElectricityLineData", mobileRouter.yearlyElectricityLineData);
app.post("/app/Electricity/yearlyElectricityTableData", mobileRouter.yearlyElectricityTableData);


app.post("/app/Electricity/yearlyElectricityLineData", mobileRouter.yearlyElectricityLineData);
app.post("/app/Electricity/yearlyElectricityTableData", mobileRouter.yearlyElectricityTableData);

app.post("/app/Electricity/yearlyElectricityLineData", mobileRouter.yearlyElectricityLineData);
app.post("/app/Electricity/yearlyElectricityTableData", mobileRouter.yearlyElectricityTableData);

app.post("/app/Electricity/fillInMonthData", mobileRouter.fillInMonthData);
app.post("/app/Electricity/fillInDayData", mobileRouter.fillInDayData);
app.post("/app/Electricity/fillInYearData", mobileRouter.fillInYearData);


app.post("/app/loadForecasting/getMaximumAverageLoad", mobileRouter.getMaximumAverageLoad);
app.post("/app/loadForecasting/loadForecastingLineData", mobileRouter.loadForecastingLineData);


app.post("/app/economicIndicators/getEconomicIndicators", mobileRouter.getEconomicIndicators);
app.post("/app/economicIndicators/showChooseDate", mobileRouter.showChooseDate);
app.post("/app/economicIndicators/deleteXz", mobileRouter.deleteXz);
app.post("/app/economicIndicators/addXzData", mobileRouter.addXzData);
app.post("/app/economicIndicators/addInToXzData", mobileRouter.addInToXzData);
app.post("/app/economicIndicators/showXzSet", mobileRouter.showXzSet);
app.post("/app/economicIndicators/setXzValue", mobileRouter.setXzValue);


app.post("/app/schedulingPlan/getSchedulingPlanLineData", mobileRouter.getSchedulingPlanLineData);
app.post("/app/schedulingPlan/getSchedulingPlanTableData", mobileRouter.getSchedulingPlanTableData);


app.post("/app/dutyLog/dutyLogData", mobileRouter.dutyLogData);
app.post("/app/unitStartStop/unitStartStop", mobileRouter.unitStartStop);

app.post("/app/openingMode/getOpeningMode", mobileRouter.getOpeningMode);

const server = app.listen(3001);                    //监听3000端口
console.log("SERVER START");                       //控制台打印服务器成功启动信息
const io = require('socket.io').listen(server);   //引入socket.io模块

let arrAllSocket = [];
io.on("connection", (socket) => {
    //监控客服端
    socket.on("CustomerService", (msg) => {
        let user = msg.username;
        arrAllSocket[user] = socket;
    });

    //监控用户端
    socket.on("privateMessage", (from, to, msg) => {
        console.log(from);
        console.log(to);
        console.log(msg);


        if (arrAllSocket[to]) {
            arrAllSocket[to].emit("privateMsg", from,to,msg);
            arrAllSocket[from].emit("privateMsg", from,to,msg);
        }
        else {
            arrAllSocket[from].emit("privateMsg",from,to,msg);
            let username = to;
            let onMessage = [];
            let t = msg.time;
            let time = t.slice(5);
            let b = {
                'direction':"right",
                'time':time,
                'rightContent': msg.message,
                'rightAvatar': msg.avatar,
                'state':"2"
            };

            onMessage.push(b);

            mongodb.find("userinfos", {"username": username}, (err, result) => {
                if (err) {
                    console.log(err)
                }
                else {
                    let chatList = result[0].chatList;
                    let c = chatList.concat(onMessage);
                    mongodb.updateMany('userinfos', {"username": username},
                        {
                            $set: {"chatList": c}
                        },
                        (err, result) => {
                            if (err) {
                                console.log(err)
                            }
                            else {

                                console.log("1")

                            }
                        }
                    )

                }
            })
        }

    })

});
