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

