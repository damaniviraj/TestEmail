var express = require('express');
var async = require("async");
var fs = require('fs');
var images = require('../helpers/images');
var constants = require('../config/constants');
var mongo = require('mongodb');
var router = express.Router();


router.get('/testMongo',
    function (req, res) {
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/mydb";

        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            console.log("Database created!");
            db.close();
        });

    }
);




module.exports = router;