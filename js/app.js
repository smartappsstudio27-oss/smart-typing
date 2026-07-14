/* ==========================================================
   Smart Typing
   Brand : SmartApps Studio
   File : app.js
   Version : 1.0
   Purpose : Main Application Controller
========================================================== */


/* ==========================================================
   GLOBAL APPLICATION OBJECT

   Future Modules:
   - Firebase
   - Analytics
   - Leaderboard
   - Premium
   - AI Generator
========================================================== */

const SmartTyping = {


    /* Application Information */

    appName : "Smart Typing",

    version : "1.0",


    /* Current User */

    user : {

        isLoggedIn:false,

        name:null,

        email:null

    },


    /* Typing State */

    typing : {


        started:false,

        completed:false,

        currentText:"",

        currentIndex:0,


        settings:{


            language:"english",

            category:"beginner",

            duration:60,

            font:"Segoe UI",

            fontSize:24


        }

    },


    /* Statistics */

    stats:{


        wpm:0,

        grossWpm:0,

        accuracy:100,

        errors:0,

        characters:0


    }


};



/* ==========================================================
   DOM READY
========================================================== */


document.addEventListener(
    "DOMContentLoaded",
    function(){


        SmartTyping.init();


    }
);



/* ==========================================================
   INITIALIZE APPLICATION
========================================================== */


SmartTyping.init = function(){


    console.log(

        `${this.appName} v${this.version} Loaded`

    );


    this.bindEvents();


    this.loadSettings();


    this.initializeUI();


};




/* ==========================================================
   EVENT BINDING
========================================================== */


SmartTyping.bindEvents = function(){



    /*
        Theme Toggle
    */


    const themeButton = document.getElementById(
        "theme-toggle"
    );


    if(themeButton){


        themeButton.addEventListener(
            "click",
            ()=>{


                this.toggleTheme();


            }
        );


    }




    /*
        Login Button Future Firebase Hook
    */


    const loginButton =
        document.getElementById(
            "login-button"
        );


    if(loginButton){


        loginButton.addEventListener(
            "click",
            ()=>{


                this.showMessage(
                    "Login feature coming soon"
                );


            }
        );


    }




    /*
        Mobile Menu
    */


    const mobileMenu =
        document.getElementById(
            "mobile-menu-button"
        );


    if(mobileMenu){


        mobileMenu.addEventListener(
            "click",
            ()=>{


                this.toggleMobileMenu();


            }
        );


    }




    /*
        Practice Cards
    */


    const practiceCards =
        document.querySelectorAll(
            ".practice-card"
        );


    practiceCards.forEach(
        card=>{


            card.addEventListener(
                "click",
                ()=>{


                    this.startPractice(
                        card.querySelector("h3").innerText
                    );


                }
            );


        }
    );


};




/* ==========================================================
   UI INITIALIZATION
========================================================== */


SmartTyping.initializeUI = function(){



    const input =
        document.getElementById(
            "typing-input"
        );



    if(input){


        input.value="";


    }



};




/* ==========================================================
   THEME MANAGEMENT
========================================================== */


SmartTyping.toggleTheme = function(){



    document.body.classList.toggle(
        "dark-mode"
    );


    const enabled =
        document.body.classList.contains(
            "dark-mode"
        );



    localStorage.setItem(
        "smartTypingTheme",
        enabled ? "dark" : "light"
    );



};




/* ==========================================================
   LOAD USER SETTINGS
========================================================== */


SmartTyping.loadSettings = function(){


    const savedTheme =
        localStorage.getItem(
            "smartTypingTheme"
        );



    if(savedTheme==="dark"){


        document.body.classList.add(
            "dark-mode"
        );


    }



};

/* ==========================================================
   MOBILE MENU
========================================================== */


SmartTyping.toggleMobileMenu = function(){


    const navigation =
        document.getElementById(
            "main-navigation"
        );


    if(!navigation){

        return;

    }


    navigation.classList.toggle(
        "show"
    );


};




/* ==========================================================
   START PRACTICE
========================================================== */


SmartTyping.startPractice = function(mode){



    this.typing.settings.category =
        mode;



    const panel =
        document.getElementById(
            "typing-panel"
        );



    if(panel){


        panel.scrollIntoView({

            behavior:"smooth"

        });


    }



    this.showMessage(

        `${mode} practice selected`

    );



};




/* ==========================================================
   UPDATE APPLICATION SETTINGS
========================================================== */


SmartTyping.updateSetting = function(
    key,
    value
){



    if(
        this.typing.settings.hasOwnProperty(key)
    ){


        this.typing.settings[key]=value;


        this.saveSettings();


    }


};




/* ==========================================================
   SAVE SETTINGS
========================================================== */


SmartTyping.saveSettings = function(){



    localStorage.setItem(

        "smartTypingSettings",

        JSON.stringify(
            this.typing.settings
        )

    );


};




/* ==========================================================
   RESTORE SETTINGS
========================================================== */


SmartTyping.restoreSettings = function(){



    const saved =
        localStorage.getItem(
            "smartTypingSettings"
        );



    if(saved){


        this.typing.settings =
            JSON.parse(saved);


    }



};




/* ==========================================================
   RESET APPLICATION
========================================================== */


SmartTyping.reset = function(){



    this.typing.started=false;


    this.typing.completed=false;


    this.typing.currentIndex=0;


    this.stats={


        wpm:0,

        grossWpm:0,

        accuracy:100,

        errors:0,

        characters:0


    };



};




/* ==========================================================
   MESSAGE SYSTEM
   Future Toast Notification
========================================================== */


SmartTyping.showMessage = function(message){



    console.log(
        message
    );



    const toast =
        document.createElement(
            "div"
        );



    toast.className =
        "toast";



    toast.innerText =
        message;



    document.body.appendChild(
        toast
    );



    setTimeout(
        ()=>{


            toast.remove();


        },
        3000
    );



};




/* ==========================================================
   CHECK LOGIN STATUS
   Firebase Integration Ready
========================================================== */


SmartTyping.checkLogin = function(){



    /*
        Future:

        Firebase Authentication
        Google Login
        Email Login

    */



    return this.user.isLoggedIn;



};




/* ==========================================================
   ANALYTICS READY
========================================================== */


SmartTyping.trackEvent = function(
    eventName,
    data={}
){



    /*
        Future Google Analytics

    */



    console.log(

        "Event:",
        eventName,
        data

    );



};




/* ==========================================================
   EXPORT GLOBAL OBJECT
========================================================== */


window.SmartTyping = SmartTyping;


/* ==========================================================
   END OF FILE
========================================================== */
