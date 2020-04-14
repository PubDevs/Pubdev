
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
