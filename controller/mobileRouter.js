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

let xzData=[
    {"text":"有功负荷指令","id":"1"},
    {"text":"有功负荷指令","id":"2"},
    {"text":"有功负荷指令","id":"3"},
    {"text":"有功负荷指令","id":"4"},
    {"text":"有功负荷指令","id":"5"},
    {"text":"有功负荷指令","id":"6"},
    {"text":"有功负荷指令","id":"7"},
    {"text":"有功负荷指令","id":"8"},
    {"text":"有功负荷指令","id":"9"},
    {"text":"有功负荷指令","id":"10"},
    {"text":"有功负荷指令","id":"11"},
    {"text":"有功负荷指令","id":"12"},
    {"text":"有功负荷指令","id":"13"},
    {"text":"有功负荷指令","id":"14"},
    {"text":"有功负荷指令","id":"15"},
    {"text":"有功负荷指令","id":"16"},
    {"text":"有功负荷指令","id":"17"},
    {"text":"有功负荷指令","id":"18"}
    ];

exports.showChooseDate = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        res.json({
            "state": "1",
            "message": "请求成功",
            "data": xzData
        })
    })

};

let addXzData = [];
exports.deleteXz = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        let id = fields.id;
        for (let i = 0; i < xzData.length; i++) {
            if (id === xzData[i].id) {
                addXzData.push(xzData[i]);
                xzData.splice(i, 1)
            }
        }
        res.json({
            "state": "1",
            "message": "请求成功",
            "data": xzData
        })
    })

};

exports.addXzData = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        res.json({
            "state": "1",
            "message": "请求成功",
            "data": addXzData
        })
    })

};

exports.addInToXzData = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        let id = fields.id;
        for (let i = 0; i < addXzData.length; i++) {
            if (id === addXzData[i].id) {
                xzData.push(addXzData[i]);
                addXzData.splice(i, 1)
            }
        }
        res.json({
            "state": "1",
            "message": "请求成功",
            "addXzData": addXzData,
            "xzData":xzData
        })
    });
};

let  szxzData=[
    {"text":"#1","valueName":"炉侧主气温度","maxValue":"","minValue":"","id":"1"},
    {"text":"#2","valueName":"炉侧主气温度","maxValue":"","minValue":"","id":"2"},
    {"text":"#3","valueName":"炉侧主气温度","maxValue":"","minValue":"","id":"3"},
    {"text":"#4","valueName":"炉侧主气温度","maxValue":"","minValue":"","id":"4"},
    {"text":"#5","valueName":"炉侧主气温度","maxValue":"","minValue":"","id":"5"},
    {"text":"#6","valueName":"炉侧主气温度","maxValue":"","minValue":"","id":"6"}
    ];

exports.showXzSet = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        res.json({
            "state": "1",
            "message": "请求成功",
            "data":szxzData
        })
    })
};

exports.setXzValue = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        szxzData = fields.data;
        res.json({
            "state": "1",
            "message": "设置成功",
            "data":szxzData
        })
    })
};


let schedulingPlanLineData1 = [{
    "xAxis":['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'],
    "present":[4501, 3501, 4515, 4585, 5900, 4530, 5510,4501, 5501, 4515, 4585, 5200, 4530, 5510,4501, 4501, 4515, 4585, 5500, 4530, 3510,4501, 4501,4501,],
    "intraday":[4001, 3001, 3015, 3085, 3600, 4830, 3710,4001, 3001, 4015, 4085, 3600, 4830, 3710,4001, 3001, 4015, 4085, 3600, 4830, 3710,4001, 3001,4001,],
    "realTime":[4001, 3011, 3025, 3095, 3610, 4840, 3720,4101, 3101, 4115, 4185, 3700, 4730, 3810,4101, 3101, 4115, 4185, 3500, 4930, 3810,4101, 3101,4101,]
}];

let schedulingPlanLineData2 = [{
    "xAxis":['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'],
    "present":[3501, 2501, 3515, 3585, 4900, 4530, 4510,3501, 4501, 3515, 3585, 4200, 3530, 4510,3501, 3501, 3515, 3585, 4500, 3530, 4510,3501, 3501,3501,],
    "intraday":[3001, 4001, 4015, 4085, 4600, 3830, 4710,3001, 4001, 3015, 3085, 4600, 3830, 4710,3001, 4001, 3015, 3085, 4600, 3830, 4710,3001, 4001,3001,],
    "realTime":[3001, 4011, 4025, 4095, 4610, 3840, 4720,3101, 4101, 3115, 3185, 4700, 3730, 4810,3101, 4101, 3115, 3185, 4500, 3930, 4810,3101, 4101,3101,]
}];

exports.getSchedulingPlanLineData = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        if(fields.id==="1"){
            res.json({
                "state":"1",
                "message":"请求成功",
                "data":schedulingPlanLineData1
            })
        }
        else {
            res.json({
                "state":"1",
                "message":"请求成功",
                "data":schedulingPlanLineData2
            })
        }
    })
};

let getSchedulingPlanTableData =[
    {"time":"23:55","mqjh":"2411kw","rnjh":"2411kw","sscl":"2411kw"},
    {"time":"22:55","mqjh":"2411kw","rnjh":"2411kw","sscl":"2411kw"},
    {"time":"22:55","mqjh":"2411kw","rnjh":"2411kw","sscl":"2411kw"},
    {"time":"22:55","mqjh":"2411kw","rnjh":"2411kw","sscl":"2411kw"},
    {"time":"22:55","mqjh":"2411kw","rnjh":"2411kw","sscl":"2411kw"},
    {"time":"22:55","mqjh":"2411kw","rnjh":"2411kw","sscl":"2411kw"},
    {"time":"22:55","mqjh":"2411kw","rnjh":"2411kw","sscl":"2411kw"}
];

let getSchedulingPlanTableData2 =[
    {"time":"13:55","mqjh":"3411kw","rnjh":"2411kw","sscl":"2411kw"},
    {"time":"12:55","mqjh":"3411kw","rnjh":"2411kw","sscl":"2411kw"},
    {"time":"12:55","mqjh":"3411kw","rnjh":"2411kw","sscl":"2411kw"},
    {"time":"12:55","mqjh":"3411kw","rnjh":"2411kw","sscl":"2411kw"},
    {"time":"12:55","mqjh":"3411kw","rnjh":"2411kw","sscl":"2411kw"},
    {"time":"12:55","mqjh":"3411kw","rnjh":"2411kw","sscl":"2411kw"},
    {"time":"12:55","mqjh":"3411kw","rnjh":"2411kw","sscl":"2411kw"}
];



exports.getSchedulingPlanTableData = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        if(fields.id==="1"){
            res.json({
                "state":"1",
                "message":"请求成功",
                "data":getSchedulingPlanTableData
            })
        }
        else {
            res.json({
                "state":"1",
                "message":"请求成功",
                "data":getSchedulingPlanTableData2
            })
        }
    })
};

let dutyLogData =[
    {"name":"郑建强","time":"2019-08-07 12:00","content":"这是测试内容，哈哈哈哈哈哈哈哈哈哈哈哈"},
    {"name":"郑建强","time":"2019-08-07 12:00","content":"这是测试内容，哈哈哈哈哈哈哈哈哈哈哈哈"},
    {"name":"郑建强","time":"2019-08-07 12:00","content":"这是测试内容，哈哈哈哈哈哈哈哈哈哈哈哈"},
    {"name":"郑建强","time":"2019-08-07 12:00","content":"这是测试内容，哈哈哈哈哈哈哈哈哈哈哈哈"},
    {"name":"郑建强","time":"2019-08-07 12:00","content":"这是测试内容，哈哈哈哈哈哈哈哈哈哈哈哈"},
    {"name":"郑建强","time":"2019-08-07 12:00","content":"这是测试内容，哈哈哈哈哈哈哈哈哈哈哈哈"},
    {"name":"郑建强","time":"2019-08-07 12:00","content":"这是测试内容，哈哈哈哈哈哈哈哈哈哈哈哈"},
    {"name":"郑建强","time":"2019-08-07 12:00","content":"这是测试内容，哈哈哈哈哈哈哈哈哈哈哈哈"},
    {"name":"郑建强","time":"2019-08-07 12:00","content":"这是测试内容，哈哈哈哈哈哈哈哈哈哈哈哈"},
    {"name":"郑建强","time":"2019-08-07 12:00","content":"这是测试内容，哈哈哈哈哈哈哈哈哈哈哈哈"}
];

let dutyLogData2 =[
    {"name":"郑建强","time":"2019-08-06 09:00","content":"这是测试内容，哈哈哈哈哈哈哈哈哈哈哈哈"},
    {"name":"郑建强","time":"2019-08-06 09:00","content":"这是测试内容，哈哈哈哈哈哈哈哈哈哈哈哈"},
    {"name":"郑建强","time":"2019-08-06 09:00","content":"这是测试内容，哈哈哈哈哈哈哈哈哈哈哈哈"},
    {"name":"郑建强","time":"2019-08-06 09:00","content":"这是测试内容，哈哈哈哈哈哈哈哈哈哈哈哈"},
    {"name":"郑建强","time":"2019-08-06 09:00","content":"这是测试内容，哈哈哈哈哈哈哈哈哈哈哈哈"},
    {"name":"郑建强","time":"2019-08-06 09:00","content":"这是测试内容，哈哈哈哈哈哈哈哈哈哈哈哈"},
    {"name":"郑建强","time":"2019-08-06 09:00","content":"这是测试内容，哈哈哈哈哈哈哈哈哈哈哈哈"},
    {"name":"郑建强","time":"2019-08-06 09:00","content":"这是测试内容，哈哈哈哈哈哈哈哈哈哈哈哈"},
    {"name":"郑建强","time":"2019-08-06 09:00","content":"这是测试内容，哈哈哈哈哈哈哈哈哈哈哈哈"},
    {"name":"郑建强","time":"2019-08-06 09:00","content":"这是测试内容，哈哈哈哈哈哈哈哈哈哈哈哈"}
];

exports.dutyLogData = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        if (fields.time === "2019-08-06") {
            res.json({
                "state": "1",
                "message": "请求成功",
                "data": dutyLogData
            })
        }
        else {
            res.json({
                "state": "1",
                "message": "请求成功",
                "data": dutyLogData2
            })
        }
    })
};


let unitStartStop1 = [{
    "count": "2",
    "duration": "164.5天",
    "data": [
        {"state": "运行", "time": "2019-08-01", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-02", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-03", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-04", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-05", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-06", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-07", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-01", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-02", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-03", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-04", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-05", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-06", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-07", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-01", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-02", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-03", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-04", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-05", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-06", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-07", "jxsc": "2.4天"},
    ]
}];

let unitStartStop2 = [{
    "count": "3",
    "duration": "124.5天",
    "data": [
        {"state": "运行", "time": "2019-08-01", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-02", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-03", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-04", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-05", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-06", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-07", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-01", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-02", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-03", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-04", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-05", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-06", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-07", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-01", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-02", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-03", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-04", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-05", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-06", "jxsc": "2.4天"},
        {"state": "运行", "time": "2019-08-07", "jxsc": "2.4天"},
    ]
}];


exports.unitStartStop = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        if (fields.id === "1") {
            res.json({
                "state": "1",
                "message": "请求成功",
                "data": unitStartStop1
            })
        }
        else  if (fields.time === "2018") {
            res.json({
                "state": "1",
                "message": "请求成功",
                "data": unitStartStop2
            })
        }
        else {
            res.json({
                "state": "1",
                "message": "请求成功",
                "data": unitStartStop2
            })
        }
    })
};

let  openingModeData=[
        {"unit":"#1","state":"运行","time":"2019-08-05 07:23:00","status":"1"},
        {"unit":"#2","state":"停机","time":"2019-08-06 01:23:00","status":"2"},
        {"unit":"#3","state":"运行","time":"2019-08-05 02:23:00","status":"1"},
        {"unit":"#4","state":"运行","time":"2019-08-05 03:23:00","status":"1"},
        {"unit":"#5","state":"运行","time":"2019-08-05 04:23:00","status":"1"},
        {"unit":"#6","state":"停机","time":"2019-08-08 09:23:00","status":"2"}
        ];

exports.getOpeningMode = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        res.json({
            "state": "1",
            "message": "请求成功",
            "data": openingModeData
        })
    })
};

exports.userLogin = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        var password = fields.password;
        var Password = md5(md5(password).substr(4, 7) + md5(password));
        mongodb.find("userInfo", {"username": fields.username}, (err, result) => {
            if (result.length === 0) {
                res.json({
                    "state": "2",
                    "message": "该用户未注册",
                    "data": []
                })
            }
            else {
                var mongodbPassword = result[0].password;
                if (mongodbPassword === Password) {
                    req.session.login = "1";
                    res.json({
                        "state": "1",
                        "message": "登录成功",
                        "data": fields.username
                    })
                }
                else {
                    res.json({
                        "state": "-1",
                        "message": "密码错误",
                        "data": []
                    })
                }
            }
        })
    })
};

exports.userRegister = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        var password = fields.password;
        var Password = md5(md5(password).substr(4, 7) + md5(password));
        var code = fields.code;
        if (code === "10086") {
            mongodb.find("userInfo", {"username": fields.username}, (err, result) => {
                if (err) {
                    res.json({
                        "state": "-4",
                        "message": "数据库查询错误",
                        "data": []
                    });
                    return;
                }
                if (result.length !== 0) {
                    res.json({
                        "state": "-1",
                        "message": "该用户已注册",
                        "data": []
                    });
                }
                else {
                    mongodb.insertOne("userInfo", {
                        "username": fields.username,
                        "password": Password,
                        "userPhone": fields.phone,
                    }, function (err, result) {
                        if (err) {
                            res.json({
                                "state": "-4",
                                "message": "数据库新增错误",
                                "data": []
                            });
                        }
                        else {
                            res.json({
                                "state": "1",
                                "message": "注册成功",
                                "data": {"username":fields.username}
                            });
                        }
                    })
                }
            })
        }
        else {
            res.json({
                "state": "-2",
                "message": "注册码错误",
                "data": []
            });
        }
    })
};
