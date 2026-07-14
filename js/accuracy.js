/* ==========================================================
   Smart Typing
   Brand : SmartApps Studio
   File : accuracy.js
   Version : 1.0
   Purpose : Accuracy Calculation Engine
========================================================== */


/* ==========================================================
   ACCURACY ENGINE
========================================================== */


const AccuracyEngine = {


    totalCharacters:0,


    correctCharacters:0,


    wrongCharacters:0,


    accuracy:100,


};




/* ==========================================================
   INITIALIZE
========================================================== */


AccuracyEngine.init = function(){


    this.reset();


};




document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        AccuracyEngine.init();


    }

);




/* ==========================================================
   RESET DATA
========================================================== */


AccuracyEngine.reset = function(){



    this.totalCharacters=0;


    this.correctCharacters=0;


    this.wrongCharacters=0;


    this.accuracy=100;



    this.updateDisplay();



};




/* ==========================================================
   CALCULATE ACCURACY
========================================================== */


AccuracyEngine.calculate = function(
    typed,
    original
){



    this.totalCharacters =
        typed.length;



    this.correctCharacters=0;


    this.wrongCharacters=0;



    for(
        let i=0;
        i<typed.length;
        i++
    ){



        if(
            typed[i] ===
            original[i]
        ){


            this.correctCharacters++;


        }

        else{


            this.wrongCharacters++;


        }



    }



    if(this.totalCharacters===0){


        this.accuracy=100;


    }

    else{


        this.accuracy =

            (
                this.correctCharacters /
                this.totalCharacters
            )

            *

            100;


    }



    this.accuracy =
        Number(
            this.accuracy.toFixed(2)
        );



    this.updateDisplay();



    return this.accuracy;



};




/* ==========================================================
   UPDATE ACCURACY UI
========================================================== */


AccuracyEngine.updateDisplay = function(){



    const accuracy =
        document.getElementById(
            "accuracy"
        );



    const errors =
        document.getElementById(
            "errors"
        );



    if(accuracy){


        accuracy.innerText =

            this.accuracy + "%";


    }



    if(errors){


        errors.innerText =

            this.wrongCharacters;


    }



};




/* ==========================================================
   CONNECT WITH TYPING ENGINE
========================================================== */


AccuracyEngine.trackTyping = function(){



    if(
        !window.TypingEngine
    ){

        return;

    }



    this.calculate(

        TypingEngine.input,

        TypingEngine.passage

    );



};
/* ==========================================================
   AUTO UPDATE WITH TYPING INPUT
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


                    AccuracyEngine.trackTyping();



                }

            );



        }



    }

);




/* ==========================================================
   GET RESULT DATA
========================================================== */


AccuracyEngine.getResult = function(){



    return {


        total:

            this.totalCharacters,


        correct:

            this.correctCharacters,


        errors:

            this.wrongCharacters,


        accuracy:

            this.accuracy



    };



};




/* ==========================================================
   SAVE RESULT HISTORY READY
   Future Firebase Integration
========================================================== */


AccuracyEngine.saveHistory = function(){



    const result =
        this.getResult();



    let history =
        JSON.parse(

            localStorage.getItem(
                "typingHistory"
            )

        )

        ||

        [];



    history.push({


        date:
            new Date()
            .toISOString(),


        result:result


    });



    localStorage.setItem(

        "typingHistory",

        JSON.stringify(history)

    );



};




/* ==========================================================
   RESULT SECTION UPDATE
========================================================== */


AccuracyEngine.updateResultSection = function(){



    const result =
        this.getResult();



    const resultAccuracy =
        document.getElementById(
            "result-accuracy"
        );



    const resultErrors =
        document.getElementById(
            "result-errors"
        );



    const resultCharacters =
        document.getElementById(
            "result-characters"
        );



    if(resultAccuracy){


        resultAccuracy.innerText =

            result.accuracy + "%";


    }



    if(resultErrors){


        resultErrors.innerText =

            result.errors;


    }



    if(resultCharacters){


        resultCharacters.innerText =

            result.total;


    }



};




/* ==========================================================
   RESET FROM OUTSIDE
========================================================== */


window.resetAccuracy = function(){



    AccuracyEngine.reset();



};




/* ==========================================================
   GLOBAL EXPORT
========================================================== */


window.AccuracyEngine =
    AccuracyEngine;


/* ==========================================================
   END OF FILE
========================================================== */
