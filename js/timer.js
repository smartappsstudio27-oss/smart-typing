/* ==========================================================
   Smart Typing
   Brand : SmartApps Studio
   File : timer.js
   Version : 1.0
   Purpose : Typing Timer Engine
========================================================== */


/* ==========================================================
   TIMER OBJECT
========================================================== */


const TimerEngine = {


    /* Default Time */

    totalSeconds:60,


    /* Remaining Time */

    remainingSeconds:60,


    /* Timer State */

    running:false,


    completed:false,


    interval:null,


};




/* ==========================================================
   INITIALIZE TIMER
========================================================== */


TimerEngine.init = function(){



    this.loadDuration();


    this.updateDisplay();


};




document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        TimerEngine.init();


    }

);




/* ==========================================================
   SET DURATION
========================================================== */


TimerEngine.setDuration = function(seconds){



    this.totalSeconds =
        Number(seconds);



    this.remainingSeconds =
        this.totalSeconds;



    this.updateDisplay();



};




/* ==========================================================
   START TIMER
========================================================== */


TimerEngine.start = function(){



    if(this.running){

        return;

    }



    this.running=true;



    this.completed=false;



    this.interval =
        setInterval(

            ()=>{


                this.tick();


            },

            1000

        );



};




/* ==========================================================
   TIMER TICK
========================================================== */


TimerEngine.tick = function(){



    if(this.remainingSeconds<=0){


        this.finish();



        return;


    }



    this.remainingSeconds--;



    this.updateDisplay();



};




/* ==========================================================
   UPDATE TIMER DISPLAY
========================================================== */


TimerEngine.updateDisplay = function(){



    const timer =
        document.getElementById(
            "timer"
        );



    if(!timer){

        return;

    }



    timer.innerText =
        this.formatTime(
            this.remainingSeconds
        );



};




/* ==========================================================
   FORMAT TIME
========================================================== */


TimerEngine.formatTime = function(seconds){



    const minutes =
        Math.floor(
            seconds / 60
        );



    const secondsPart =
        seconds % 60;



    return (

        String(minutes)
        .padStart(2,"0")

        +

        ":"

        +

        String(secondsPart)
        .padStart(2,"0")

    );



};




/* ==========================================================
   LOAD SELECTED DURATION
========================================================== */


TimerEngine.loadDuration = function(){



    const selector =
        document.getElementById(
            "timer-select"
        );



    if(!selector){

        return;

    }



    this.setDuration(
        selector.value
    );



    selector.addEventListener(

        "change",

        ()=>{


            this.reset();



            this.setDuration(
                selector.value
            );


        }

    );



};
/* ==========================================================
   FINISH TIMER
========================================================== */


TimerEngine.finish = function(){



    this.running=false;


    this.completed=true;



    clearInterval(
        this.interval
    );



    this.remainingSeconds=0;



    this.updateDisplay();



    if(window.TypingEngine){


        TypingEngine.complete();


    }



    if(window.SmartTyping){


        SmartTyping.showMessage(

            "Time Completed"

        );


    }



};




/* ==========================================================
   STOP TIMER
========================================================== */


TimerEngine.stop = function(){



    this.running=false;



    clearInterval(
        this.interval
    );



};




/* ==========================================================
   RESET TIMER
========================================================== */


TimerEngine.reset = function(){



    this.stop();



    this.remainingSeconds =
        this.totalSeconds;



    this.completed=false;



    this.updateDisplay();



};




/* ==========================================================
   START TIMER WHEN USER TYPES
========================================================== */


document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        const input =
            document.getElementById(
                "typing-input"
            );



        if(input){



            input.addEventListener(

                "input",

                ()=>{


                    if(
                        !TimerEngine.running
                        &&
                        input.value.length > 0
                    ){


                        TimerEngine.start();


                    }



                }

            );



        }



    }

);




/* ==========================================================
   TIMER SELECT CONTROL
========================================================== */


document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        const selector =
            document.getElementById(
                "timer-select"
            );



        if(selector){


            selector.addEventListener(

                "change",

                ()=>{


                    TimerEngine.reset();


                    TimerEngine.setDuration(

                        selector.value

                    );


                }

            );


        }



    }

);




/* ==========================================================
   VISIBILITY HANDLING
   Prevent Timer Issues On Tab Switch
========================================================== */


document.addEventListener(

    "visibilitychange",

    ()=>{


        if(
            document.hidden
            &&
            TimerEngine.running
        ){


            TimerEngine.stop();


        }



    }

);




/* ==========================================================
   GLOBAL EXPORT
========================================================== */


window.TimerEngine =
    TimerEngine;


/* ==========================================================
   END OF FILE
========================================================== */
