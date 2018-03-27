const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
};

var seq = 0;
app.get('/update', function(req, res) {
    console.log("%j", req.query);
    var date = new Date();

    result = date.getFullYear() + ""
            + Number(date.getMonth()+1).pad() + ""
            + Number(date.getDate()).pad() + ","
            + Number(date.getHours()).pad() + ":"
            + Number(date.getMinutes()).pad() + ","
            + Number(req.query.field1).toFixed(2);
    
    fs.appendFile("data.txt", result+"\n", function(err) {
        if (err) throw err;
        console.log(result);
    });

    res.end();
    seq++;
});

app.get('/get', function(req, res){
//    fs.readFileSync("data.txt").toString().split(String.fromCharCode(10));

    fs.readFile('data.txt', 'utf8', function(err, data) {
        if (err) throw err;
        var arr = data.toString().split(String.fromCharCode(10));
        var i = 0;
        var result_body = "";
        for (i = 0; i < arr.length; ++i) {
            result_body += arr[i]+"<br>";
        }

        res.send(result_body);
        res.end();
    });
});

app.listen(8000, () => console.log('Example app listening on port 8000!'))
