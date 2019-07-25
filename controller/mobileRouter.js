var formidable = require("formidable");                         //引入formidable
var mongodb = require("../models/mongodb");                    //引入models操作数据模块
var md5 = require("../models/md5");                           //引入md5加密


let  jizugonglv = [
    {"number":"246","load":"mw","name":"#1号机组"},
    {"number":"247","load":"mw","name":"#2号机组"},
    {"number":"248","load":"mw","name":"#3号机组"},
    {"number":"249","load":"mw","name":"#4号机组"},
    {"number":"250","load":"mw","name":"#5号机组"}
];


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

