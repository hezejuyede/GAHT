const express = require("express");                            //引入express框架
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

app.listen(3001);                                                 //监听3000端口

console.log("SERVER START");                                     //控制台打印服务器成功启动信息
