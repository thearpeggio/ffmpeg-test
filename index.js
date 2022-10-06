const WebSocket = require('ws')

const child_process = require('child_process');


const wss = new WebSocket.Server({ port: 8080 })


wss.on('connection', ws => {
  const ffmpeg = child_process.spawn('ffmpeg', [
    "-f",
    "lavfi",
    "-i",
    "anullsrc",
    "-i",
    "-",
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-tune",
    "zerolatency",
    "-c:a",
    "aac",
    "-f",
    "flv",
     'rtmps://a779fce7834f.global-contribute.live-video.net:443/app/sk_us-east-1_6dAdF9GLXIyx_eXuWRenvKTavDJzqQD6rxMjZFLULnE'

   ]);

  ws.on('message', message => {
    console.log(message);
    ffmpeg.stdin.write(message)
  })

  ffmpeg.on('close', (code, signal) => {
    console.log('FFmpeg child process closed, code ' + code + ', signal ' + signal);
  });
  

  ffmpeg.stdin.on('error', (e) => {
    // console.log('FFmpeg STDIN Error', e);
  });
  
  ffmpeg.stderr.on('data', (data) => {
    console.log('FFmpeg STDERR:', data.toString());
  });

})