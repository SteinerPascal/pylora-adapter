"use strict";
exports.__esModule = true;
var spawn = require('child_process').spawn;
var PyLoraAdapter = /** @class */ (function () {
    function PyLoraAdapter() {
        this.listeners = [];
        this.sensor = spawn('python3', [__dirname + "/sensor.py"]);
        this.startListening();
    }
    PyLoraAdapter.prototype.startListening = function () {
        var _this = this;
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
                type: 'humidity',
                value: parseFloat(data)
            };
            // Log to debug
            console.log('temperatures');
            _this.listeners.forEach(function (cb) {
                cb(msg);
            });
        });
    };
    PyLoraAdapter.prototype.listen = function (messageCB) {
        console.log('listener registered');
        this.listeners.push(messageCB);
    };
    PyLoraAdapter.prototype.end = function () {
        this.sensor.kill('SIGINT');
    };
    return PyLoraAdapter;
}());
exports["default"] = PyLoraAdapter;
