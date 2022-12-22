const { spawn } = require('child_process');
declare var require: any


const testFolder = '.';
const fs = require('fs');



export default class PyLoraAdapter{
    sensor
    constructor() {
        fs.readdir(testFolder, (err, files) => {
            files.forEach(file => {
            //console.log('file')
              //console.log(file);
            });
          });
        this.sensor = spawn('python3', ['./sensor.py']);
        
    }

    listen(messageCB:({id,value}:{id:number,value:number})=>void){
        this.sensor.on('exit', function (code, signal) {
            console.log('child process exited with ' +
                        `code ${code} and signal ${signal}`);
          });

          this.sensor.stderr.on('data', (data) => {
            console.error(`child stderr:\n${data}`);
          });
       
        this.sensor.stdout.on('data', function(data) {
    
            // Coerce Buffer object to Float
            const msg= {
                id: 1,
                value: parseFloat(data)
            }
            // Log to debug
            console.log('temperatures');
            messageCB(msg)
        });

       console.log('finish listening end of method')
    }

    end() {
        //sensor.kill('SIGINT');
    }
}

const cl = new PyLoraAdapter()
cl.listen((data)=>{
    console.log(data)
})