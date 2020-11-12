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

// コマンドライン引数から参照するＤＢの値を決定
if (!process.argv || process.argv.length === 0 || !process.argv[2] || !process.argv[3]) {
    console.log('no command line args...');
    return;
}

// DBをUPDATE
console.log(`update => {${[process.argv[2]]}: ${process.argv[3]}}`);
const dbKeyName = firebase.database().ref().child(process.argv[2]);
firebase.database().ref().update({
    [process.argv[2]]: process.argv[3]
});

setTimeout(() => {
    process.exit();    
}, 3000);
