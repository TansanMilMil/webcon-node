const firebase = require("firebase");
const exec = require("child_process").exec;
const nodeEnv = require('./nodeEnv.js');

console.log(nodeEnv);

// firebase init
const firebaseConfig = {
  apiKey: nodeEnv.apiKey,
  authDomain: nodeEnv.authDomain,
  databaseURL: nodeEnv.databaseURL,
  projectId: nodeEnv.projectId,
  storageBucket: nodeEnv.storageBucket,
  messagingSenderId: nodeEnv.messagingSenderId,
};
firebase.initializeApp(firebaseConfig);

// DB参照を準備
const powerRef = firebase.database().ref().child('airconPower');
const bedroomLightRef = firebase.database().ref().child('bedroomLight');
const diningLightRef = firebase.database().ref().child('diningLight');
const tvRef = firebase.database().ref().child('tv');
let command;

// エアコンON/OFF
powerRef.on("value", function(snapshot){
  switch(snapshot.val()) {
    case null:
      console.log('error: snapshot.val() is null...<(+p+)>');
      break;
    case 'cool':
      command = "python3 /home/pi/webcon-node/irrp.py -p -g17 -f /home/pi/webcon-node/codes coolairOn";
      break;
    case 'hot':
      command = "python3 /home/pi/webcon-node/irrp.py -p -g17 -f /home/pi/webcon-node/codes hotairOn";      
      break;   
    default:
      command = "python3 /home/pi/webcon-node/irrp.py -p -g17 -f /home/pi/webcon-node/codes powerOff";
      break;
  }

  exec(command, function(err, stdout, stderr){
      console.log('execute => ' + command);
      if(!err) {  
          console.log("stdout: " + stdout);
          console.log("stderr: " + stderr);
      } else {
        console.log(err);
      }
  });
});

// 寝室ライト
bedroomLightRef.on("value", function(snapshot){
  switch(snapshot.val()) {
    case null:
      console.log('error: snapshot.val() is null...<(+p+)>');
      break;
    case 'on':
      command = "python3 /home/pi/webcon-node/irrp.py -p -g17 -f /home/pi/webcon-node/codes bedroomLightOn";
      break;
    case 'off':
      command = "python3 /home/pi/webcon-node/irrp.py -p -g17 -f /home/pi/webcon-node/codes bedroomLightOff";      
      break;   
    default:
      console.log('error: snapshot.val() is invalid value...<(+p+)>');
      break;
  }

  exec(command, function(err, stdout, stderr){
      console.log('execute => ' + command);
      if(!err) {  
          console.log("stdout: " + stdout);
          console.log("stderr: " + stderr);
      } else {
        console.log(err);
      }
  });
});

// ダイニングライト
diningLightRef.on("value", function(snapshot){
  switch(snapshot.val()) {
    case null:
      console.log('error: snapshot.val() is null...<(+p+)>');
      break;
    case 'on':
      command = "python3 /home/pi/webcon-node/irrp.py -p -g17 -f /home/pi/webcon-node/codes diningLightOn";
      break;
    case 'off':
      command = "python3 /home/pi/webcon-node/irrp.py -p -g17 -f /home/pi/webcon-node/codes diningLightOff";      
      break;   
    default:
      console.log('error: snapshot.val() is invalid value...<(+p+)>');
      break;
  }

  exec(command, function(err, stdout, stderr){
      console.log('execute => ' + command);
      if(!err) {  
          console.log("stdout: " + stdout);
          console.log("stderr: " + stderr);
      } else {
        console.log(err);
      }
  });
});

// TV
tvRef.on("value", function(snapshot){
  switch(snapshot.val()) {
    case null:
      console.log('error: snapshot.val() is null...<(+p+)>');
      break;
    case 'on':
      command = "python3 /home/pi/webcon-node/irrp.py -p -g17 -f /home/pi/webcon-node/codes tvOn";
      break;
    case 'off':
      command = "python3 /home/pi/webcon-node/irrp.py -p -g17 -f /home/pi/webcon-node/codes tvOff";      
      break;   
    default:
      console.log('error: snapshot.val() is invalid value...<(+p+)>');
      break;
  }

  exec(command, function(err, stdout, stderr){
      console.log('execute => ' + command);
      if(!err) {  
          console.log("stdout: " + stdout);
          console.log("stderr: " + stderr);
      } else {
        console.log(err);
      }
  });
});