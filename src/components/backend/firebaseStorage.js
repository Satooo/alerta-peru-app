import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

export var firebaseStorage=(function () {
    var instance;
    const firebaseConfig = {
        // ...
        // The value of `databaseURL` depends on the location of the database
        apiKey: "AIzaSyAd7c-Cu2SS3Hci6qGIfFl8qydbP61BOpY",
        authDomain: "alertaperuapp-403c9.firebaseapp.com",
        projectId: "alertaperuapp-403c9",
        storageBucket: "alertaperuapp-403c9.appspot.com",
        messagingSenderId: "956646036975",
        appId: "1:956646036975:web:2a1c0d948cea5a9c1c921a",
        measurementId: "G-4NNFHGK28F",
        databaseURL:"https://alertaperuapp-403c9-default-rtdb.firebaseio.com/"
      };
    function createInstance() {
        const app = initializeApp(firebaseConfig);
        const storage = getStorage(app,"gs://alertaperuapp-403c9.appspot.com");
        return storage
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();