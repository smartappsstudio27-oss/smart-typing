/* ==========================================================
   Smart Typing
   Brand : SmartApps Studio
   File : typing.js
   Version : 1.0
   Purpose : Typing Engine
========================================================== */


/* ==========================================================
   TYPING ENGINE OBJECT
========================================================== */


const TypingEngine = {


    /* Current Passage */

    passage:"",


    /* Character List */

    characters:[],


    /* Current Position */

    index:0,


    /* User Input */

    input:"",


    /* Status */

    started:false,

    finished:false,


    /* Default Passage */

    defaultText:

    "The quick brown fox jumps over the lazy dog. " +
    "Typing practice improves speed and accuracy. " +
    "Regular practice helps you become a professional typist.",


};




/* ==========================================================
   INITIALIZE TYPING
========================================================== */


TypingEngine.init = function(){


    this.loadPassage();


    this.renderPassage();


    this.bindEvents();


};




/* ==========================================================
   DOM READY
========================================================== */


document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        TypingEngine.init();


    }

);




/* ==========================================================
   LOAD PASSAGE
========================================================== */


TypingEngine.loadPassage = function(){



    this.passage =
        this.defaultText;



    this.characters =
        this.passage.split("");



    this.index=0;



};




/* ==========================================================
   RENDER PASSAGE
========================================================== */


TypingEngine.renderPassage = function(){



    const container =
        document.getElementById(
            "typing-passage"
        );



    if(!container){

        return;

    }



    container.innerHTML="";



    this.characters.forEach(

        (character,position)=>{


            const span =
                document.createElement(
                    "span"
                );


            span.innerText =
                character;



            span.dataset.index =
                position;



            if(position===0){


                span.classList.add(
                    "current"
                );


            }



            container.appendChild(
                span
            );



        }

    );


};




/* ==========================================================
   EVENT HANDLER
========================================================== */


TypingEngine.bindEvents = function(){



    const input =
        document.getElementById(
            "typing-input"
        );



    if(!input){

        return;

    }



    input.addEventListener(

        "input",

        (event)=>{


            this.handleTyping(
                event.target.value
            );


        }

    );



};




/* ==========================================================
   HANDLE TYPING
========================================================== */


TypingEngine.handleTyping = function(value){



    if(!this.started){


        this.started=true;



        SmartTyping.typing.started=true;



    }



    this.input=value;



    this.updateCharacters();



    this.updatePosition();



};




/* ==========================================================
   CHARACTER CHECK
========================================================== */


TypingEngine.updateCharacters = function(){



    const spans =
        document.querySelectorAll(
            "#typing-passage span"
        );



    spans.forEach(

        (span,index)=>{


            span.classList.remove(

                "correct",

                "incorrect"

            );



            const typed =
                this.input[index];



            if(typed===undefined){

                return;

            }



            if(
                typed ===
                this.characters[index]
            ){


                span.classList.add(
                    "correct"
                );


            }

            else{


                span.classList.add(
                    "incorrect"
                );


            }



        }

    );



};
/* ==========================================================
   UPDATE CURRENT CHARACTER POSITION
========================================================== */


TypingEngine.updatePosition = function(){



    const spans =
        document.querySelectorAll(
            "#typing-passage span"
        );



    spans.forEach(
        span=>{


            span.classList.remove(
                "current"
            );


        }
    );



    const current =
        spans[this.input.length];



    if(current){


        current.classList.add(
            "current"
        );


        this.autoScroll(
            current
        );


    }

    else{


        this.complete();


    }



};




/* ==========================================================
   AUTO SCROLL
========================================================== */


TypingEngine.autoScroll = function(element){



    const container =
        document.getElementById(
            "typing-passage"
        );



    if(!container || !element){

        return;

    }



    const position =
        element.offsetTop;



    if(
        position >
        container.scrollTop +
        container.clientHeight -
        60
    ){


        container.scrollTop =
            position -
            container.clientHeight +
            80;


    }



};




/* ==========================================================
   COMPLETE TEST
========================================================== */


TypingEngine.complete = function(){



    this.finished=true;


    SmartTyping.typing.completed=true;



    const input =
        document.getElementById(
            "typing-input"
        );



    if(input){


        input.disabled=true;


    }



    SmartTyping.showMessage(

        "Typing Test Completed"

    );



};




/* ==========================================================
   RESTART PRACTICE
========================================================== */


TypingEngine.restart = function(){



    this.index=0;


    this.input="";


    this.started=false;


    this.finished=false;



    const input =
        document.getElementById(
            "typing-input"
        );



    if(input){


        input.value="";


        input.disabled=false;


        input.focus();


    }



    this.renderPassage();



};




/* ==========================================================
   NEXT PASSAGE
========================================================== */


TypingEngine.nextPassage = function(){



    const passages=[


        "Practice makes perfect. Keep improving your typing speed every day.",


        "Programming requires accuracy, focus and consistent learning.",


        "Smart Typing helps students and professionals improve keyboard skills.",


        "Fast typing saves time and increases productivity."

    ];



    const random =
        Math.floor(
            Math.random() *
            passages.length
        );



    this.passage =
        passages[random];



    this.characters =
        this.passage.split("");



    this.restart();



};




/* ==========================================================
   JSON PASSAGE LOADER READY
========================================================== */


TypingEngine.loadFromJSON = async function(
    file
){



    try{


        const response =
            await fetch(file);



        const data =
            await response.json();



        if(data.text){


            this.passage =
                data.text;


        }



        this.characters =
            this.passage.split("");



        this.restart();



    }

    catch(error){


        console.error(

            "Passage loading error:",
            error

        );


    }



};




/* ==========================================================
   BUTTON EVENTS
========================================================== */


document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        const restart =
            document.getElementById(
                "restart-button"
            );


        if(restart){


            restart.addEventListener(

                "click",

                ()=>{


                    TypingEngine.restart();


                }

            );


        }




        const next =
            document.getElementById(
                "next-button"
            );


        if(next){


            next.addEventListener(

                "click",

                ()=>{


                    TypingEngine.nextPassage();


                }

            );


        }



    }

);




/* ==========================================================
   GLOBAL EXPORT
========================================================== */


window.TypingEngine =
    TypingEngine;


/* ==========================================================
   END OF FILE
========================================================== */
