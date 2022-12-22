"use strict";
exports.__esModule = true;
var spawn = require('child_process').spawn;
var testFolder = '.';
var fs = require('fs');
var PyLoraAdapter = /** @class */ (function () {
    function PyLoraAdapter() {
        fs.readdir(testFolder, function (err, files) {
            files.forEach(function (file) {
                //console.log('file')
                //console.log(file);
            });
        });
        this.sensor = spawn('python3', ['./sensor.py']);
    }
    PyLoraAdapter.prototype.listen = function (messageCB) {
        this.sensor.on('exit', function (code, signal) {
            console.log('child process exited with ' +
                ("code " + code + " and signal " + signal));
        });
        this.sensor.stderr.on('data', function (data) {
            console.error("child stderr:\n" + data);
        });
        this.sensor.stdout.on('data', function (data) {
            // Coerce Buffer object to Float
            var msg = {
                id: 1,
                value: parseFloat(data)
            };
            // Log to debug
            console.log('temperatures');
            messageCB(msg);
        });
        console.log('finish listening end of method');
    };
    PyLoraAdapter.prototype.end = function () {
        //sensor.kill('SIGINT');
    };
    return PyLoraAdapter;
}());
exports["default"] = PyLoraAdapter;
var cl = new PyLoraAdapter();
cl.listen(function (data) {
    console.log(data);
});
