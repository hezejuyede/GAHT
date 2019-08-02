var formidable = require("formidable");                         //引入formidable
var mongodb = require("../models/mongodb");                    //引入models操作数据模块
var md5 = require("../models/md5");                           //引入md5加密


let  jizugonglv = [
    {"number":"246","load":"mw","name":"#1号机组"},
    {"number":"247","load":"mw","name":"#2号机组"},
    {"number":"248","load":"mw","name":"#3号机组"},
    {"number":"249","load":"mw","name":"#4号机组"},
    {"number":"250","load":"mw","name":"#5号机组"},
    {"number":"251","load":"mw","name":"#6号机组"}
];


let navBar =[{jz:"全部","id":"1"},{jz:"#1","id":"2"},{jz:"#2","id":"3"},{jz:"#3","id":"4"},{jz:"#4","id":"5"},{jz:"#5","id":"6"},{jz:"#6","id":"7"}];

let loadManagementData = [
    {type:"全部",rj:"76.61%",hb:"1.82",AGC:"1411kw",ss:"1415mv"},
    {type:"#1",rj:"76.61%",hb:"1.82",AGC:"1411kw",ss:"1415mv"},
    {type:"#2",rj:"76.61%",hb:"1.82",AGC:"1411kw",ss:"1415mv"},
    {type:"#3",rj:"76.61%",hb:"1.82",AGC:"1411kw",ss:"1415mv"},
    {type:"#4",rj:"76.61%",hb:"1.82",AGC:"1411kw",ss:"1415mv"},
    {type:"#5",rj:"76.61%",hb:"1.82",AGC:"1411kw",ss:"1415mv"},
    {type:"#6",rj:"76.61%",hb:"1.82",AGC:"1411kw",ss:"1415mv"}
];

let loadManagementData2 = [
    {type:"全部",rj:"86.61%",hb:"2.82",AGC:"2411kw",ss:"2415mv"},
    {type:"#1",rj:"86.61%",hb:"2.82",AGC:"2411kw",ss:"2415mv"},
    {type:"#2",rj:"86.61%",hb:"2.82",AGC:"2411kw",ss:"2415mv"},
    {type:"#3",rj:"86.61%",hb:"2.82",AGC:"2411kw",ss:"2415mv"},
    {type:"#4",rj:"86.61%",hb:"2.82",AGC:"2411kw",ss:"2415mv"},
    {type:"#5",rj:"86.61%",hb:"2.82",AGC:"2411kw",ss:"2415mv"},
    {type:"#6",rj:"86.61%",hb:"2.82",AGC:"2411kw",ss:"2415mv"}
];


let equipmentLine = [{
    "xAxis":['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'],
    "todayData":[3501, 2501, 3515, 3585, 2900, 3530, 2510,3501, 2501, 3515, 3585, 2200, 3530, 2510,3501, 2501, 3515, 3585, 2500, 3530, 2510,3501, 2501,3501,],
    "yesterdayData":[3001, 2001, 3015, 3085, 2600, 3830, 2710,3001, 2001, 3015, 3085, 2600, 3830, 2710,3001, 2001, 3015, 3085, 2600, 3830, 2710,3001, 2001,3001,]
}];

let equipmentLine1 = [{
    "xAxis":['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'],
    "todayData":[4501, 3501, 4515, 4585, 5900, 4530, 5510,4501, 5501, 4515, 4585, 5200, 4530, 5510,4501, 4501, 4515, 4585, 5500, 4530, 3510,4501, 4501,4501,],
    "yesterdayData":[4001, 3001, 3015, 3085, 3600, 4830, 3710,4001, 3001, 4015, 4085, 3600, 4830, 3710,4001, 3001, 4015, 4085, 3600, 4830, 3710,4001, 3001,4001,]
}];

let dayMonthYearData = [
    [
        {
            "id": "1",
            "yield": "242.22",
            "proportion": "28.32%",
            data: [
                {"text": "日平均负荷", "data": "221", "measurement": "mw"},
                {"text": "昨日电量", "data": "461.28", "measurement": "万千瓦时"},
                {"text": "日利用小时数", "data": "3.00", "measurement": "小时"}
            ]
        }
    ],
    [
        {
            "id": "2",
            "yield": "16603.70",
            "proportion": "76.23%",
            data: [
                {"text": "剩余日均电量", "data": "545.43", "measurement": "万千瓦时"},
                {"text": "本月计划电量", "data": "18000.00", "measurement": "万千瓦时"},
                {"text": "本月计划完成率", "data": "92.25", "measurement": "%"},
                {"text": "月利用小时数", "data": "211.27", "measurement": "小时"}
            ]
        }
    ],
    [
        {
            "id": "3",
            "yield": "10.8662",
            "proportion": "-23.32%",
            data: [
                {"text": "年计划电量", "data": "25.0600", "measurement": "亿千瓦时"},
                {"text": "年计划完成率", "data": "43.36", "measurement": "%"},
                {"text": "年利用小时数", "data": "1382.48", "measurement": "小时"}
            ]
        }
    ]
];

let dailyElectricityLineData=[{
    "range":"2019-09-29 - 2019-07-29",
    "data":[3501, 2501, 3515, 3585, 2900, 3530, 2510,3501, 2501, 3515, 3585, 2200, 3530, 2510,3501, 2501, 3515, 3585, 2500, 3530, 2510,3501, 2501,3501,3585, 2500, 3530, 2510,3501, 2501,3501],
    "time":[1, 2, 3, 4, 5, 6, 7,8,9, 10, 11, 12, 13, 14,15, 16, 17, 18, 19, 20, 21,22,23,24,25,26,27,28,29,30,31]
}];

let dailyElectricityTableData = [
    {"date":"2019-06-29","fadianliang":"559.52","fuhelv":"58.95"},
    {"date":"2019-06-30","fadianliang":"559.52","fuhelv":"58.95"},
    {"date":"2019-07-01","fadianliang":"559.52","fuhelv":"58.95"},
    {"date":"2019-07-02","fadianliang":"559.52","fuhelv":"58.95"},
    {"date":"2019-07-03","fadianliang":"559.52","fuhelv":"58.95"},
    {"date":"2019-07-04","fadianliang":"559.52","fuhelv":"58.95"},
    {"date":"2019-07-05","fadianliang":"559.52","fuhelv":"58.95"},
    {"date":"2019-07-06","fadianliang":"559.52","fuhelv":"58.95"},
    {"date":"2019-07-07","fadianliang":"559.52","fuhelv":"58.95"},
    {"date":"2019-07-08","fadianliang":"559.52","fuhelv":"58.95"},
    {"date":"2019-07-09","fadianliang":"559.52","fuhelv":"58.95"},
    {"date":"2019-07-10","fadianliang":"559.52","fuhelv":"58.95"},
    {"date":"2019-07-11","fadianliang":"559.52","fuhelv":"58.95"},
    {"date":"2019-07-12","fadianliang":"559.52","fuhelv":"58.95"},
    {"date":"2019-07-13","fadianliang":"559.52","fuhelv":"58.95"},
    {"date":"2019-07-14","fadianliang":"559.52","fuhelv":"58.95"},
    {"date":"2019-07-15","fadianliang":"559.52","fuhelv":"58.95"},
    {"date":"2019-07-16","fadianliang":"559.52","fuhelv":"58.95"},
    {"date":"2019-07-17","fadianliang":"559.52","fuhelv":"58.95"},
    {"date":"2019-07-18","fadianliang":"559.52","fuhelv":"58.95"},
    {"date":"2019-07-19","fadianliang":"559.52","fuhelv":"58.95"},
    {"date":"2019-07-20","fadianliang":"559.52","fuhelv":"58.95"},
    {"date":"2019-07-21","fadianliang":"559.52","fuhelv":"58.95"},
    {"date":"2019-07-22","fadianliang":"559.52","fuhelv":"58.95"},
    {"date":"2019-07-23","fadianliang":"559.52","fuhelv":"58.95"},
    {"date":"2019-07-24","fadianliang":"559.52","fuhelv":"58.95"},
    {"date":"2019-07-25","fadianliang":"559.52","fuhelv":"58.95"},
    {"date":"2019-07-26","fadianliang":"559.52","fuhelv":"58.95"},
    {"date":"2019-07-27","fadianliang":"559.52","fuhelv":"58.95"},
    {"date":"2019-07-28","fadianliang":"559.52","fuhelv":"58.95"},
    {"date":"2019-07-29","fadianliang":"559.52","fuhelv":"58.95"},
    {"date":"2019-07-30","fadianliang":"559.52","fuhelv":"58.95"},
];


let monthlyElectricityTableData = [
    {"date":"2019-01","fadianliang":"559.52","jihuawanchenglv":"98%","fuhelv":"58.95"},
    {"date":"2019-02","fadianliang":"559.52","jihuawanchenglv":"98%","fuhelv":"58.95"},
    {"date":"2019-03","fadianliang":"559.52","jihuawanchenglv":"98%","fuhelv":"58.95"},
    {"date":"2019-04","fadianliang":"559.52","jihuawanchenglv":"98%","fuhelv":"58.95"},
    {"date":"2019-05","fadianliang":"559.52","jihuawanchenglv":"98%","fuhelv":"58.95"},
    {"date":"2019-06","fadianliang":"559.52","jihuawanchenglv":"98%","fuhelv":"58.95"},
    {"date":"2019-07","fadianliang":"559.52","jihuawanchenglv":"98%","fuhelv":"58.95"},
    {"date":"2019-08","fadianliang":"559.52","jihuawanchenglv":"98%","fuhelv":"58.95"},
    {"date":"2019-09","fadianliang":"559.52","jihuawanchenglv":"98%","fuhelv":"58.95"},
    {"date":"2019-10","fadianliang":"559.52","jihuawanchenglv":"98%","fuhelv":"58.95"},
    {"date":"2019-11","fadianliang":"559.52","jihuawanchenglv":"98%","fuhelv":"58.95"},
    {"date":"2019-12","fadianliang":"559.52","jihuawanchenglv":"98%","fuhelv":"58.95"},
];

let monthlyElectricityLineData=[{
    "range":"2019-01 - 2019-12",
    "data":[3501, 2501, 3515, 3585, 2900, 3530, 2510,3501, 2501, 3515, 3585, 2200],
    "time":[1, 2, 3, 4, 5, 6, 7,8,9, 10, 11, 12]
}];


let yearlyElectricityLineData = [
    {
        "range":"2010 - 2019",
        "data":[3501, 2501, 3515, 3585, 2900, 3530, 2510,3501, 2501],
        "time":[2010, 2012, 2013, 2014, 2015, 2016, 2017,2018,2019]
    }
];

let yearlyElectricityTableData=[
    {"date":"2010","fadianliang":"559.52","jihuawanchenglv":"98%","fuhelv":"58.95"},
    {"date":"2011","fadianliang":"559.52","jihuawanchenglv":"98%","fuhelv":"58.95"},
    {"date":"2012","fadianliang":"559.52","jihuawanchenglv":"98%","fuhelv":"58.95"},
    {"date":"2013","fadianliang":"559.52","jihuawanchenglv":"98%","fuhelv":"58.95"},
    {"date":"2014","fadianliang":"559.52","jihuawanchenglv":"98%","fuhelv":"58.95"},
    {"date":"2015","fadianliang":"559.52","jihuawanchenglv":"98%","fuhelv":"58.95"},
    {"date":"2016","fadianliang":"559.52","jihuawanchenglv":"98%","fuhelv":"58.95"},
    {"date":"2017","fadianliang":"559.52","jihuawanchenglv":"98%","fuhelv":"58.95"},
    {"date":"2018","fadianliang":"559.52","jihuawanchenglv":"98%","fuhelv":"58.95"},
    {"date":"2019","fadianliang":"559.52","jihuawanchenglv":"98%","fuhelv":"58.95"}
];

let getMaximumAverageLoad=[
    {"max":"2222", "average":"2459"},
    {"max":"2222", "average":"2459"},
    {"max":"2222", "average":"2459"},
    {"max":"2222", "average":"2459"},
    {"max":"2222", "average":"2459"},
    {"max":"2222", "average":"2459"},
    {"max":"2222", "average":"2459"}
    ];

let loadForecastingLineData1 = [{
    "xAxis":['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'],
    "actual": [4501, 3501, 4515, 4585, 5900, 4530, 5510,4501, 5501, 4515, 4585, 5200, 4530],
    "forecast":[4501, 3501, 4515, 4585, 5900, 4530, 5510,4501, 5501, 4515, 4585, 5200, 4530, 5510,4501, 4501, 4515, 4585, 5500, 4530, 3510,4501, 4501,4501,]
}];

let loadForecastingLineData2=[{
    "xAxis":['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'],
    "forecast":[4501, 3501, 4515, 4585, 5900, 4530, 5510,4501, 5501, 4515, 4585, 5200, 4530, 5510,4501, 4501, 4515, 4585, 5500, 4530, 3510,4501, 4501,4501,]
}];
exports.getPlantWideLoad = function (req, res, next) {
    res.json({
        "state":"1",
        "message":"请求成功",
        data:{"data":"1487"}
    })
};

exports.getPlantWideLoadRate = function (req, res, next) {
    res.json({
        "state":"1",
        "message":"请求成功",
        "data":{"data":"74"}
    })
};

exports.getPlantWideElectricQuantity = function (req, res, next) {
    res.json({
        "state":"1",
        "message":"请求成功",
        "data":{"data":"2487"}
    })
};

exports.getPlantWideCrewRate = function (req, res, next) {
    res.json({
        "state":"1",
        "message":"请求成功",
        "data":jizugonglv
    })
};

exports.getNumberOEquipment = function (req, res, next) {
    res.json({
        "state":"1",
        "message":"请求成功",
        "data":navBar
    })
};

exports.getEquipmentTableData = function (req, res, next) {
    res.json({
        "state":"1",
        "message":"请求成功",
        "data":loadManagementData
    })
};

exports.getEquipmentLineData = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        if(fields.id==="1"){
            res.json({
                "state":"1",
                "message":"请求成功",
                "data":equipmentLine1
            })
        }
        else {
            res.json({
                "state":"1",
                "message":"请求成功",
                "data":equipmentLine
            })
        }
    })
};

exports.getOtherEquipmentLineData = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        if(fields.id==="1"){
            res.json({
                "state":"1",
                "message":"请求成功",
                "data":equipmentLine1
            })
        }
        else {
            res.json({
                "state":"1",
                "message":"请求成功",
                "data":equipmentLine
            })
        }
    })

};

exports.getTimeEquipmentLineData = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        res.json({
            "state":"1",
            "message":"请求成功",
            "data":[{
                "xAxis":['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'],
                "data":[2501, 1501, 2515, 2585, 1900, 2530, 1510,2501, 1501, 2515, 2585, 1200, 2530, 1510,2501, 1501, 2515, 2585, 1500, 2530, 1510,2501, 1501,2501],
                "date":fields.time
            }]
        })
    })

};

exports.getDayMonthYearData = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        res.json({
            "state":"1",
            "message":"请求成功",
            "data":dayMonthYearData
        })
    })

};

exports.dailyElectricityLineData = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        res.json({
            "state":"1",
            "message":"请求成功",
            "data":dailyElectricityLineData
        })
    })

};

exports.dailyElectricityTableData = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        res.json({
            "state":"1",
            "message":"请求成功",
            "data":dailyElectricityTableData
        })
    })

};

exports.monthlyElectricityLineData = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        res.json({
            "state":"1",
            "message":"请求成功",
            "data":monthlyElectricityLineData
        })
    })

};

exports.monthlyElectricityTableData = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        res.json({
            "state":"1",
            "message":"请求成功",
            "data":monthlyElectricityTableData
        })
    })

};

exports.yearlyElectricityLineData = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        res.json({
            "state":"1",
            "message":"请求成功",
            "data":yearlyElectricityLineData
        })
    })

};

exports.yearlyElectricityTableData = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        res.json({
            "state":"1",
            "message":"请求成功",
            "data":yearlyElectricityTableData
        })
    })

};


exports.fillInMonthData = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        console.log(fields.historyTime);
        console.log(fields.historyData);
        console.log(fields.payTime);
        console.log(fields.payData);
        res.json({
            "state":"1",
            "message":"保存成功",
            "data":[]
        })
    })

};

exports.fillInDayData = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        console.log(fields.time);
        console.log(fields.data);
        res.json({
            "state":"1",
            "message":"保存成功",
            "data":[]
        })
    })

};

exports.fillInYearData = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        console.log(fields.historyTime);
        console.log(fields.historyData);
        console.log(fields.payTime);
        console.log(fields.payData);
        res.json({
            "state":"1",
            "message":"保存成功",
            "data":[]
        })
    })

};

exports.getMaximumAverageLoad = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        res.json({
            "state":"1",
            "message":"保存成功",
            "data":getMaximumAverageLoad
        })
    })

};

exports.loadForecastingLineData = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        console.log(fields.id)
        if (fields.id === 1) {
            res.json({
                "state": "1",
                "message": "保存成功",
                "data": loadForecastingLineData1
            })
        }
        else if (fields.id === 2) {
            res.json({
                "state": "1",
                "message": "保存成功",
                "data": loadForecastingLineData2
            })
        }
        else {
            res.json({
                "state": "1",
                "message": "保存成功",
                "data": loadForecastingLineData1
            })
        }
    })

};

let getEconomicIndicators=[
    {"zhibiao":"原烟气NQx浓度(mg/Nm3)","yihaoji":"17.18","erhaoji":"18.18","sanhaoji":"18.18","sihaoji":"18.18","wuhaoji":"18.18","liuhaoji":"18.18"},
    {"zhibiao":"原烟气NQx浓度(mg/Nm3)","yihaoji":"17.18","erhaoji":"18.18","sanhaoji":"18.18","sihaoji":"18.18","wuhaoji":"18.18","liuhaoji":"18.18"},
    {"zhibiao":"原烟气NQx浓度(mg/Nm3)","yihaoji":"17.18","erhaoji":"18.18","sanhaoji":"18.18","sihaoji":"18.18","wuhaoji":"18.18","liuhaoji":"18.18"},
    {"zhibiao":"原烟气NQx浓度(mg/Nm3)","yihaoji":"17.18","erhaoji":"18.18","sanhaoji":"18.18","sihaoji":"18.18","wuhaoji":"18.18","liuhaoji":"18.18"},
    {"zhibiao":"原烟气NQx浓度(mg/Nm3)","yihaoji":"17.18","erhaoji":"18.18","sanhaoji":"18.18","sihaoji":"18.18","wuhaoji":"18.18","liuhaoji":"18.18"},
    {"zhibiao":"原烟气NQx浓度(mg/Nm3)","yihaoji":"17.18","erhaoji":"18.18","sanhaoji":"18.18","sihaoji":"18.18","wuhaoji":"18.18","liuhaoji":"18.18"},
    {"zhibiao":"原烟气NQx浓度(mg/Nm3)","yihaoji":"17.18","erhaoji":"18.18","sanhaoji":"18.18","sihaoji":"18.18","wuhaoji":"18.18","liuhaoji":"18.18"},
    {"zhibiao":"原烟气NQx浓度(mg/Nm3)","yihaoji":"17.18","erhaoji":"18.18","sanhaoji":"18.18","sihaoji":"18.18","wuhaoji":"18.18","liuhaoji":"18.18"},
    {"zhibiao":"原烟气NQx浓度(mg/Nm3)","yihaoji":"17.18","erhaoji":"18.18","sanhaoji":"18.18","sihaoji":"18.18","wuhaoji":"18.18","liuhaoji":"18.18"},
    {"zhibiao":"原烟气NQx浓度(mg/Nm3)","yihaoji":"17.18","erhaoji":"18.18","sanhaoji":"18.18","sihaoji":"18.18","wuhaoji":"18.18","liuhaoji":"18.18"},
    {"zhibiao":"原烟气NQx浓度(mg/Nm3)","yihaoji":"17.18","erhaoji":"18.18","sanhaoji":"18.18","sihaoji":"18.18","wuhaoji":"18.18","liuhaoji":"18.18"},
    {"zhibiao":"原烟气NQx浓度(mg/Nm3)","yihaoji":"17.18","erhaoji":"18.18","sanhaoji":"18.18","sihaoji":"18.18","wuhaoji":"18.18","liuhaoji":"18.18"},
    {"zhibiao":"原烟气NQx浓度(mg/Nm3)","yihaoji":"17.18","erhaoji":"18.18","sanhaoji":"18.18","sihaoji":"18.18","wuhaoji":"18.18","liuhaoji":"18.18"},
    {"zhibiao":"原烟气NQx浓度(mg/Nm3)","yihaoji":"17.18","erhaoji":"18.18","sanhaoji":"18.18","sihaoji":"18.18","wuhaoji":"18.18","liuhaoji":"18.18"},
    {"zhibiao":"原烟气NQx浓度(mg/Nm3)","yihaoji":"17.18","erhaoji":"18.18","sanhaoji":"18.18","sihaoji":"18.18","wuhaoji":"18.18","liuhaoji":"18.18"},
    {"zhibiao":"原烟气NQx浓度(mg/Nm3)","yihaoji":"17.18","erhaoji":"18.18","sanhaoji":"18.18","sihaoji":"18.18","wuhaoji":"18.18","liuhaoji":"18.18"},
    {"zhibiao":"原烟气NQx浓度(mg/Nm3)","yihaoji":"17.18","erhaoji":"18.18","sanhaoji":"18.18","sihaoji":"18.18","wuhaoji":"18.18","liuhaoji":"18.18"},
    {"zhibiao":"原烟气NQx浓度(mg/Nm3)","yihaoji":"17.18","erhaoji":"18.18","sanhaoji":"18.18","sihaoji":"18.18","wuhaoji":"18.18","liuhaoji":"18.18"},
    {"zhibiao":"原烟气NQx浓度(mg/Nm3)","yihaoji":"17.18","erhaoji":"18.18","sanhaoji":"18.18","sihaoji":"18.18","wuhaoji":"18.18","liuhaoji":"18.18"},
    {"zhibiao":"原烟气NQx浓度(mg/Nm3)","yihaoji":"17.18","erhaoji":"18.18","sanhaoji":"18.18","sihaoji":"18.18","wuhaoji":"18.18","liuhaoji":"18.18"},
    {"zhibiao":"原烟气NQx浓度(mg/Nm3)","yihaoji":"17.18","erhaoji":"18.18","sanhaoji":"18.18","sihaoji":"18.18","wuhaoji":"18.18","liuhaoji":"18.18"},
    {"zhibiao":"原烟气NQx浓度(mg/Nm3)","yihaoji":"17.18","erhaoji":"18.18","sanhaoji":"18.18","sihaoji":"18.18","wuhaoji":"18.18","liuhaoji":"18.18"},
    {"zhibiao":"原烟气NQx浓度(mg/Nm3)","yihaoji":"17.18","erhaoji":"18.18","sanhaoji":"18.18","sihaoji":"18.18","wuhaoji":"18.18","liuhaoji":"18.18"},
    {"zhibiao":"原烟气NQx浓度(mg/Nm3)","yihaoji":"17.18","erhaoji":"18.18","sanhaoji":"18.18","sihaoji":"18.18","wuhaoji":"18.18","liuhaoji":"18.18"},
    {"zhibiao":"原烟气NQx浓度(mg/Nm3)","yihaoji":"17.18","erhaoji":"18.18","sanhaoji":"18.18","sihaoji":"18.18","wuhaoji":"18.18","liuhaoji":"18.18"},
    {"zhibiao":"原烟气NQx浓度(mg/Nm3)","yihaoji":"17.18","erhaoji":"18.18","sanhaoji":"18.18","sihaoji":"18.18","wuhaoji":"18.18","liuhaoji":"18.18"},
    {"zhibiao":"原烟气NQx浓度(mg/Nm3)","yihaoji":"17.18","erhaoji":"18.18","sanhaoji":"18.18","sihaoji":"18.18","wuhaoji":"18.18","liuhaoji":"18.18"},
    {"zhibiao":"原烟气NQx浓度(mg/Nm3)","yihaoji":"17.18","erhaoji":"18.18","sanhaoji":"18.18","sihaoji":"18.18","wuhaoji":"18.18","liuhaoji":"18.18"}
];

exports.getEconomicIndicators = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        res.json({
            "state": "1",
            "message": "请求成功",
            "data": getEconomicIndicators
        })
    })

};
