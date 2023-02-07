const { spawn } = require('child_process');
declare var require: any


export default class PyLoraAdapter{
    private sensor
    protected listeners: Array<({}:{[key:string]: any})=>void> = []
    constructor() {
        this.sensor = spawn('python3', [`${__dirname}/sensor.py`]);
        this.startListening()
    }

    private startListening() {
        this.sensor.on('exit', function (code, signal) {
            console.log('child process exited with ' +
                        `code ${code} and signal ${signal}`);
          });

          this.sensor.stderr.on('data', (data) => {
            console.error(`child stderr:\n${data}`);
          });
       
        this.sensor.stdout.on('data', (data)=> {
    
            // Coerce Buffer object to Float
            const msg= {
                id: 1,
                type:'humidity',
                value: parseFloat(data)
            }
            // Log to debug
            console.log('temperatures');
            this.listeners.forEach(cb => {
                cb(msg)
            });
        });
    }

    listen(messageCB:({}:{[key:string]: any})=>void){
        console.log('listener registered')
        this.listeners.push(messageCB)
    }

    end() {
        this.sensor.kill('SIGINT');
    }
}