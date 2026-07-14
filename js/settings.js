/* ==========================================================
   Smart Typing
   Brand : SmartApps Studio
   File : settings.js
   Version : 1.0
   Purpose : User Settings Management
========================================================== */


/* ==========================================================
   SETTINGS ENGINE
========================================================== */


const SettingsEngine = {


    settings:{


        language:"english",


        category:"beginner",


        fontFamily:"Segoe UI",


        fontSize:24,


        panelWidth:85


    }


};




/* ==========================================================
   INITIALIZE
========================================================== */


SettingsEngine.init = function(){



    this.load();


    this.bindEvents();


    this.apply();



};




document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        SettingsEngine.init();


    }

);




/* ==========================================================
   LOAD SETTINGS
========================================================== */


SettingsEngine.load = function(){



    const saved =

        localStorage.getItem(
            "smartTypingSettings"
        );



    if(saved){


        this.settings =

            Object.assign(

                this.settings,

                JSON.parse(saved)

            );


    }



};




/* ==========================================================
   SAVE SETTINGS
========================================================== */


SettingsEngine.save = function(){



    localStorage.setItem(

        "smartTypingSettings",

        JSON.stringify(
            this.settings
        )

    );



};




/* ==========================================================
   APPLY SETTINGS
========================================================== */


SettingsEngine.apply = function(){



    const passage =

        document.getElementById(
            "typing-passage"
        );



    const input =

        document.getElementById(
            "typing-input"
        );



    if(passage){


        passage.style.fontFamily =

            this.settings.fontFamily;



        passage.style.fontSize =

            this.settings.fontSize
            +"px";


    }



    if(input){


        input.style.fontFamily =

            this.settings.fontFamily;



        input.style.fontSize =

            this.settings.fontSize
            +"px";


    }



};




/* ==========================================================
   EVENT BINDING
========================================================== */


SettingsEngine.bindEvents = function(){



    const fontFamily =

        document.getElementById(
            "font-family"
        );



    if(fontFamily){



        fontFamily.value =

            this.settings.fontFamily;



        fontFamily.addEventListener(

            "change",

            ()=>{


                this.settings.fontFamily =

                    fontFamily.value;



                this.save();


                this.apply();



            }

        );



    }



    const fontSize =

        document.getElementById(
            "font-size"
        );



    if(fontSize){



        fontSize.value =

            this.settings.fontSize;



        fontSize.addEventListener(

            "input",

            ()=>{


                this.settings.fontSize =

                    Number(
                        fontSize.value
                    );



                this.save();


                this.apply();



            }

        );



    }



};
/* ==========================================================
   PANEL WIDTH CONTROL
========================================================== */


SettingsEngine.panelResize = function(){



    const panelWidth =

        document.getElementById(
            "panel-width"
        );



    const typingWrapper =

        document.querySelector(
            ".typing-wrapper"
        );



    if(!panelWidth || !typingWrapper){

        return;

    }



    panelWidth.value =

        this.settings.panelWidth;



    panelWidth.addEventListener(

        "input",

        ()=>{


            this.settings.panelWidth =

                Number(
                    panelWidth.value
                );



            typingWrapper.style.width =

                this.settings.panelWidth
                + "%";



            this.save();



        }

    );



};




/* ==========================================================
   LANGUAGE SETTINGS
========================================================== */


SettingsEngine.setLanguage = function(
    language
){



    this.settings.language =

        language;



    this.save();



    if(window.SmartTyping){


        SmartTyping.typing.settings.language =

            language;


    }



};




/* ==========================================================
   CATEGORY SETTINGS
========================================================== */


SettingsEngine.setCategory = function(
    category
){



    this.settings.category =

        category;



    this.save();



    if(window.SmartTyping){


        SmartTyping.typing.settings.category =

            category;


    }



};




/* ==========================================================
   CONNECT SELECT CONTROLS
========================================================== */


SettingsEngine.connectSelectors = function(){



    const language =

        document.getElementById(
            "language-select"
        );



    if(language){



        language.value =

            this.settings.language;



        language.addEventListener(

            "change",

            ()=>{


                this.setLanguage(

                    language.value

                );


            }

        );



    }




    const category =

        document.getElementById(
            "category-select"
        );



    if(category){



        category.value =

            this.settings.category;



        category.addEventListener(

            "change",

            ()=>{


                this.setCategory(

                    category.value

                );


            }

        );



    }



};




/* ==========================================================
   RESET SETTINGS
========================================================== */


SettingsEngine.reset = function(){



    this.settings = {


        language:"english",

        category:"beginner",

        fontFamily:"Segoe UI",

        fontSize:24,

        panelWidth:85


    };



    this.save();


    this.apply();



};




/* ==========================================================
   INIT EXTRA CONTROLS
========================================================== */


document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        SettingsEngine.panelResize();


        SettingsEngine.connectSelectors();


    }

);




/* ==========================================================
   GLOBAL EXPORT
========================================================== */


window.SettingsEngine =

    SettingsEngine;


/* ==========================================================
   END OF FILE
========================================================== */
