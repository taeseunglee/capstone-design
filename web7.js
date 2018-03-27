const express = require('express');
const app = express();

// json to csv config
const fields = ['seq', 'device', 'unit', 'type', 'value', 'ip', 'time'];
const opts = { fields };
const json2csv = require('json2csv').parse;
const mysql= require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'me',
    password: 'mypassword',
    database: 'mydb'
});
connection.connect();

function insert_sensor(device, unit, type, value, seq, ip) {
    obj= {};
    obj.seq= seq;
    obj.device= device;
    obj.unit= unit;
    obj.type= type;
    obj.value= value;
    obj.ip= ip.replace(/^.*:/, '');
    var query = connection.query('insert into sensors set ?', obj, function(err, rows, cols) {
        if (err) throw err;
        console.log("database insertion ok= %j", obj);
    });
}

app.get('/', function(req, res) {
    res.end('Nice to meet you');
});

app.get('/log', function(req, res) {
    r = req.query;
    console.log("GET %j", r);
    insert_sensor(r.device, r.unit, r.type, r.value, r.seq, req.connection.remoteAddress);
    res.end('OK:' + JSON.stringify(req.query));
});

app.get('/download', function(req, res) {
    connection.query('SELECT * FROM sensors ',
            function (err, rows, fields) {
                var objs = [];
                console.log(rows);
                for (var i = 0; i < rows.length; ++i) {
                    objs.push({
                        seq : rows[i].seq,
                        device : rows[i].device,
                        unit : rows[i].unit,
                        type : rows[i].type,
                        value : rows[i].value,
                        ip : rows[i].ip,
                        time : rows[i].time
                    });
                }
                const csv = json2csv(objs, opts);
                console.log(csv);
                res.setHeader('Content-disposition', 'attachment; filename=data.csv');
                res.set('Content-Type', 'text/csv');
                res.status(200).send(csv);
            });
});

var server = app.listen(8007, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening at http://%s:%s', host, port);
});
