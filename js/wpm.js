/* ==========================================================
   Smart Typing
   Brand : SmartApps Studio
   File : wpm.js
   Version : 1.0
   Purpose : WPM Calculation Engine
========================================================== */


/* ==========================================================
   WPM ENGINE
========================================================== */


const WPMEngine = {


    startTime:null,


    endTime:null,


    elapsedSeconds:0,


    characters:0,


    words:0,


    grossWPM:0,


    netWPM:0,


};




/* ==========================================================
   INITIALIZE
========================================================== */


WPMEngine.init = function(){


    this.reset();


};




document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        WPMEngine.init();


    }

);




/* ==========================================================
   START CALCULATION
========================================================== */


WPMEngine.start = function(){



    if(this.startTime){

        return;

    }



    this.startTime =
        new Date();



};




/* ==========================================================
   UPDATE LIVE WPM
========================================================== */


WPMEngine.update = function(
    text
){



    if(!this.startTime){


        this.start();


    }



    this.characters =
        text.length;



    this.words =
        text.trim()
        .split(/\s+/)
        .filter(Boolean)
        .length;



    this.calculate();



    this.updateDisplay();



};




/* ==========================================================
   CALCULATE WPM
========================================================== */


WPMEngine.calculate = function(){



    if(!this.startTime){

        return;

    }



    const now =
        new Date();



    this.elapsedSeconds =

        (
            now -
            this.startTime

        )

        /

        1000;



    if(
        this.elapsedSeconds <=0
    ){

        return;

    }



    const minutes =

        this.elapsedSeconds / 60;



    this.grossWPM =

        (
            this.characters / 5
        )

        /

        minutes;



    this.grossWPM =

        Number(
            this.grossWPM.toFixed(2)
        );



    let errors = 0;



    if(
        window.AccuracyEngine
    ){


        errors =
            AccuracyEngine.wrongCharacters;


    }



    this.netWPM =


        this.grossWPM -

        (

            errors / 5

        );



    if(this.netWPM < 0){


        this.netWPM=0;


    }



    this.netWPM =

        Number(
            this.netWPM.toFixed(2)
        );



};




/* ==========================================================
   UPDATE UI
========================================================== */


WPMEngine.updateDisplay = function(){



    const gross =
        document.getElementById(
            "gross-wpm"
        );



    const net =
        document.getElementById(
            "net-wpm"
        );



    if(gross){


        gross.innerText =

            Math.round(
                this.grossWPM
            );


    }



    if(net){


        net.innerText =

            Math.round(
                this.netWPM
            );


    }



};
/* ==========================================================
   INPUT CONNECTION
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


                    WPMEngine.update(

                        input.value

                    );



                }

            );



        }



    }

);




/* ==========================================================
   STOP CALCULATION
========================================================== */


WPMEngine.stop = function(){



    this.endTime =
        new Date();



    this.calculate();



    this.updateDisplay();



};




/* ==========================================================
   RESET
========================================================== */


WPMEngine.reset = function(){



    this.startTime=null;


    this.endTime=null;


    this.elapsedSeconds=0;


    this.characters=0;


    this.words=0;


    this.grossWPM=0;


    this.netWPM=0;



};




/* ==========================================================
   RESULT DATA
========================================================== */


WPMEngine.getResult = function(){



    return {


        grossWPM:

            Math.round(
                this.grossWPM
            ),


        netWPM:

            Math.round(
                this.netWPM
            ),


        characters:

            this.characters,


        words:

            this.words,


        time:

            Math.round(
                this.elapsedSeconds
            )



    };



};




/* ==========================================================
   RESULT SECTION UPDATE
========================================================== */


WPMEngine.updateResultSection = function(){



    const result =
        this.getResult();



    const gross =
        document.getElementById(
            "result-gross-wpm"
        );



    const net =
        document.getElementById(
            "result-net-wpm"
        );



    const chars =
        document.getElementById(
            "result-characters"
        );



    const time =
        document.getElementById(
            "result-time"
        );



    if(gross){


        gross.innerText =
            result.grossWPM;


    }



    if(net){


        net.innerText =
            result.netWPM;


    }



    if(chars){


        chars.innerText =
            result.characters;


    }



    if(time){


        time.innerText =

            result.time +
            " sec";


    }



};




/* ==========================================================
   SAVE PERFORMANCE
========================================================== */


WPMEngine.savePerformance = function(){



    const result =
        this.getResult();



    let data =

        JSON.parse(

            localStorage.getItem(
                "wpmHistory"
            )

        )

        ||

        [];



    data.push({


        date:

            new Date()
            .toISOString(),


        result:result



    });



    localStorage.setItem(

        "wpmHistory",

        JSON.stringify(data)

    );



};




/* ==========================================================
   GLOBAL EXPORT
========================================================== */


window.WPMEngine =
    WPMEngine;


/* ==========================================================
   END OF FILE
========================================================== */
