
var config = {
}

config.generateDB=()=>{
    const admin = require('firebase-admin');

    var serviceAccount = require("../../pubdev-968b9-firebase-adminsdk-i9atd-d4e7d40b63.json")
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://pubdev-968b9.firebaseio.com/"
      });
    
    return admin;
}

config.generateFirebasecliente=()=>{
    

    const firebase = require('firebase');
    var app = firebase.initializeApp({
        apiKey: "AIzaSyAkAne3jmc5QVjIWCDVd0nGMDevlKLuhig",
        authDomain: "pubdev-968b9.firebaseapp.com",
        databaseURL: "https://pubdev-968b9.firebaseio.com/",
        projectId: "pubdev-968b9",
        storageBucket: "pubdev-968b9.appspot.com",
        messagingSenderId: "873812772334",
        appId: "1:873812772334:web:6ad03ca3af78f457627aff",
        measurementId: "G-KXBQE6HPF5"
      });
      return app;

}
module.exports = config;

/*
module.exports = {
    ejecutarEstadoDb: function(){
        const admin = require('firebase-admin');

        var serviceAccount = require("../../pubdev-968b9-firebase-adminsdk-i9atd-d4e7d40b63.json")
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://pubdev-968b9.firebaseio.com/"
          });
        
        return admin;
    }

    
}
module.exports = {
    ejecutarclientefirebase: function(){
        const firebasecliente = require('firebase');
        var app = firebase.initializeApp({
            apiKey: "AIzaSyAkAne3jmc5QVjIWCDVd0nGMDevlKLuhig",
            authDomain: "pubdev-968b9.firebaseapp.com",
            databaseURL: "https://pubdev-968b9.firebaseio.com/",
            projectId: "pubdev-968b9",
            storageBucket: "pubdev-968b9.appspot.com",
            messagingSenderId: "873812772334",
            appId: "1:873812772334:web:6ad03ca3af78f457627aff",
            measurementId: "G-KXBQE6HPF5"
          });

          return app;
    }

}*/
