/* ==========================================================
   Smart Typing
   Brand : SmartApps Studio
   File : leaderboard.js
   Version : 1.0
   Purpose : Leaderboard Management
========================================================== */


/* ==========================================================
   LEADERBOARD ENGINE

   Current:
   - Local Storage Leaderboard

   Future:
   - Firebase Firestore
   - Global Ranking
   - User Profiles
========================================================== */


const LeaderboardEngine = {


    storageKey:
        "smartTypingLeaderboard",


    players:[],


};




/* ==========================================================
   INITIALIZE
========================================================== */


LeaderboardEngine.init = function(){



    this.load();



};




document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        LeaderboardEngine.init();


    }

);




/* ==========================================================
   LOAD LEADERBOARD
========================================================== */


LeaderboardEngine.load = function(){



    const data =

        localStorage.getItem(

            this.storageKey

        );



    if(data){


        this.players =

            JSON.parse(data);


    }

    else{


        this.players=[];


    }



};




/* ==========================================================
   SAVE LEADERBOARD
========================================================== */


LeaderboardEngine.save = function(){



    localStorage.setItem(

        this.storageKey,

        JSON.stringify(

            this.players

        )

    );



};




/* ==========================================================
   ADD SCORE
========================================================== */


LeaderboardEngine.addScore = function(
    player
){



    const newPlayer = {


        id:

            Date.now(),


        name:

            player.name || "Guest",


        wpm:

            Number(
                player.wpm || 0
            ),


        accuracy:

            Number(
                player.accuracy || 0
            ),


        date:

            new Date()
            .toISOString()



    };



    this.players.push(

        newPlayer

    );



    this.sort();



    this.save();



};




/* ==========================================================
   SORT RANKING
========================================================== */


LeaderboardEngine.sort = function(){



    this.players.sort(

        (a,b)=>{


            if(
                b.wpm === a.wpm
            ){


                return (

                    b.accuracy -
                    a.accuracy

                );


            }



            return (

                b.wpm -
                a.wpm

            );


        }

    );



    this.players =

        this.players.slice(
            0,
            100
        );



};




/* ==========================================================
   GET TOP PLAYERS
========================================================== */


LeaderboardEngine.getTop = function(
    limit=10
){



    return this.players.slice(

        0,

        limit

    );



};




/* ==========================================================
   CURRENT USER RANK
========================================================== */


LeaderboardEngine.getRank = function(
    wpm
){



    const rank =

        this.players.findIndex(

            player=>

                player.wpm <= wpm

        );



    return rank === -1

        ? this.players.length + 1

        : rank + 1;



};
/* ==========================================================
   DISPLAY LEADERBOARD
========================================================== */


LeaderboardEngine.render = function(){



    const container =

        document.getElementById(

            "leaderboard-list"

        );



    if(!container){

        return;

    }



    container.innerHTML="";



    const topPlayers =

        this.getTop(10);



    topPlayers.forEach(

        (player,index)=>{


            const item =

                document.createElement(

                    "div"

                );



            item.className =

                "leaderboard-item";



            item.innerHTML = `

                <span>

                    #${index+1}

                </span>

                <strong>

                    ${player.name}

                </strong>

                <span>

                    ${player.wpm} WPM

                </span>

                <span>

                    ${player.accuracy}%

                </span>

            `;



            container.appendChild(

                item

            );



        }

    );



};




/* ==========================================================
   SAVE CURRENT TEST RESULT
========================================================== */


LeaderboardEngine.saveCurrentResult = function(){



    if(
        !window.WPMEngine ||
        !window.AccuracyEngine
    ){

        return;

    }



    const result = {


        name:

            SmartTyping.user.name
            ||
            "Guest",



        wpm:

            WPMEngine.netWPM,



        accuracy:

            AccuracyEngine.accuracy



    };



    this.addScore(

        result

    );



};




/* ==========================================================
   FIREBASE READY FUNCTION

   Future:
   Firestore Collection:
   leaderboard

========================================================== */


LeaderboardEngine.syncOnline = function(){



    /*

        Future Firebase Code:

        firebase.firestore()
        .collection("leaderboard")
        .add(data)

    */



    console.log(

        "Online leaderboard coming soon"

    );



};




/* ==========================================================
   CLEAR LEADERBOARD
========================================================== */


LeaderboardEngine.clear = function(){



    this.players=[];



    this.save();



    this.render();



};




/* ==========================================================
   AUTO UPDATE
========================================================== */


document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        LeaderboardEngine.render();



    }

);




/* ==========================================================
   GLOBAL EXPORT
========================================================== */


window.LeaderboardEngine =

    LeaderboardEngine;


/* ==========================================================
   END OF FILE
========================================================== */
