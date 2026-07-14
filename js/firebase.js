/* ==========================================================
   Smart Typing
   Brand : SmartApps Studio
   File : firebase.js
   Version : 1.0
   Purpose : Firebase Integration Layer

   Current:
   - Firebase Ready Architecture

   Future:
   - Firebase Authentication
   - Google Login
   - Email Login
   - Firestore
   - User Profile
   - Cloud History
========================================================== */


/* ==========================================================
   FIREBASE CONFIGURATION

   IMPORTANT:
   Replace values after creating Firebase Project

========================================================== */


const FirebaseConfig = {


    apiKey:"YOUR_FIREBASE_API_KEY",


    authDomain:
        "YOUR_PROJECT.firebaseapp.com",


    projectId:
        "YOUR_PROJECT_ID",


    storageBucket:
        "YOUR_PROJECT.appspot.com",


    messagingSenderId:
        "YOUR_MESSAGING_ID",


    appId:
        "YOUR_APP_ID"


};




/* ==========================================================
   FIREBASE MANAGER
========================================================== */


const FirebaseManager = {


    initialized:false,


    user:null,


};




/* ==========================================================
   INITIALIZE FIREBASE

   Firebase SDK will be added later

========================================================== */


FirebaseManager.init = function(){



    /*

    Future Code:


    firebase.initializeApp(
        FirebaseConfig
    );


    this.initialized=true;


    */



    console.log(

        "Firebase Ready"

    );



};




/* ==========================================================
   AUTH STATE LISTENER
========================================================== */


FirebaseManager.checkUser = function(){



    /*

    Future:


    firebase.auth()
    .onAuthStateChanged(
        user=>{
        
        }

    );


    */



    return this.user;



};




/* ==========================================================
   GOOGLE LOGIN READY
========================================================== */


FirebaseManager.googleLogin = function(){



    /*

    Future:

    const provider =
    new firebase.auth.GoogleAuthProvider();


    firebase.auth()
    .signInWithPopup(provider);


    */



    console.log(

        "Google Login Coming Soon"

    );



};




/* ==========================================================
   EMAIL LOGIN READY
========================================================== */


FirebaseManager.emailLogin = function(
    email,
    password
){



    /*

    Future:


    firebase.auth()
    .signInWithEmailAndPassword(
        email,
        password
    );


    */



    console.log(

        "Email Login Ready"

    );



};




/* ==========================================================
   CREATE ACCOUNT READY
========================================================== */


FirebaseManager.createAccount = function(
    email,
    password
){



    /*

    Future:


    firebase.auth()
    .createUserWithEmailAndPassword(
        email,
        password
    );


    */



    console.log(

        "Account Creation Ready"

    );



};
/* ==========================================================
   USER PROFILE MANAGEMENT
========================================================== */


FirebaseManager.createProfile = function(
    userData
){



    const profile = {


        uid:

            userData.uid || null,


        name:

            userData.name || "User",


        email:

            userData.email || "",


        createdAt:

            new Date()
            .toISOString()



    };



    localStorage.setItem(

        "smartTypingUser",

        JSON.stringify(profile)

    );



    this.user = profile;



};




/* ==========================================================
   GET LOCAL USER
========================================================== */


FirebaseManager.getUser = function(){



    const user =

        localStorage.getItem(

            "smartTypingUser"

        );



    if(user){


        this.user =

            JSON.parse(user);


    }



    return this.user;



};




/* ==========================================================
   LOGOUT
========================================================== */


FirebaseManager.logout = function(){



    /*

    Future:

    firebase.auth()
    .signOut();


    */



    this.user=null;



    localStorage.removeItem(

        "smartTypingUser"

    );



    if(window.SmartTyping){



        SmartTyping.user = {


            isLoggedIn:false,


            name:null,


            email:null



        };


    }



};




/* ==========================================================
   SAVE TYPING HISTORY
========================================================== */


FirebaseManager.saveHistory = function(
    data
){



    /*

    Future Firestore:


    users/{uid}/history


    */



    let history =

        JSON.parse(

            localStorage.getItem(
                "typingHistory"
            )

        )

        ||

        [];



    history.push({

        data:data,

        date:

            new Date()
            .toISOString()


    });



    localStorage.setItem(

        "typingHistory",

        JSON.stringify(history)

    );



};




/* ==========================================================
   GET HISTORY
========================================================== */


FirebaseManager.getHistory = function(){



    return JSON.parse(

        localStorage.getItem(
            "typingHistory"
        )

    )

    ||

    [];



};




/* ==========================================================
   FIRESTORE READY
========================================================== */


FirebaseManager.firestore = {


    saveDocument:function(
        collection,
        data
    ){


        /*

        Future:


        firebase.firestore()
        .collection(collection)
        .add(data)


        */



        console.log(

            "Firestore Ready",

            collection,

            data

        );


    }



};




/* ==========================================================
   INITIAL CALL
========================================================== */


document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        FirebaseManager.init();


    }

);




/* ==========================================================
   GLOBAL EXPORT
========================================================== */


window.FirebaseManager =

    FirebaseManager;


/* ==========================================================
   END OF FILE
========================================================== */
