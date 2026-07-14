/* ==========================================================
   Smart Typing
   Brand : SmartApps Studio
   File : ads.js
   Version : 1.0
   Purpose : Advertisement Management

   Supports:
   - Google AdSense
   - Responsive Ads
   - Header Banner
   - Middle Banner
   - Bottom Banner
   - Sticky Desktop Ads
   - Result Ads

   Future:
   - Auto Ads
   - Premium Remove Ads
========================================================== */


/* ==========================================================
   ADS MANAGER
========================================================== */


const AdsManager = {


    enabled:true,


    premiumUser:false,


    loadedAds:[],


};




/* ==========================================================
   INITIALIZE ADS
========================================================== */


AdsManager.init = function(){



    if(
        this.premiumUser
    ){


        this.disableAds();


        return;


    }



    this.loadAds();



};




/* ==========================================================
   LOAD ADS
========================================================== */


AdsManager.loadAds = function(){



    /*

    Google AdSense Script

    Example Future:

    (adsbygoogle =
    window.adsbygoogle || [])
    .push({});


    */



    console.log(

        "Ads System Initialized"

    );



};




/* ==========================================================
   HEADER AD
========================================================== */


AdsManager.headerBanner = function(){



    const ad =

        document.getElementById(

            "header-ad"

        );



    if(ad){


        ad.style.display="block";


    }



};




/* ==========================================================
   RESPONSIVE MIDDLE AD
========================================================== */


AdsManager.middleBanner = function(){



    const ad =

        document.getElementById(

            "middle-ad"

        );



    if(ad){


        ad.style.display="block";


    }



};




/* ==========================================================
   BOTTOM MOBILE AD
========================================================== */


AdsManager.mobileBottom = function(){



    const ad =

        document.getElementById(

            "mobile-bottom-ad"

        );



    if(ad){


        ad.style.display="flex";


    }



};




/* ==========================================================
   RESULT PAGE AD
========================================================== */


AdsManager.resultAd = function(){



    const ad =

        document.getElementById(

            "result-ad"

        );



    if(ad){


        ad.style.display="block";


    }



};
/* ==========================================================
   DESKTOP STICKY ADS
========================================================== */


AdsManager.desktopSticky = function(){



    if(
        window.innerWidth < 1024
    ){

        return;

    }



    const leftAd =

        document.getElementById(

            "sticky-left-ad"

        );



    const rightAd =

        document.getElementById(

            "sticky-right-ad"

        );



    if(leftAd){


        leftAd.style.display="block";


    }



    if(rightAd){


        rightAd.style.display="block";


    }



};




/* ==========================================================
   DISABLE ADS PREMIUM
========================================================== */


AdsManager.disableAds = function(){



    this.enabled=false;



    const ads =

        document.querySelectorAll(

            ".ad-container, .ads-box"

        );



    ads.forEach(

        ad=>{


            ad.style.display="none";


        }

    );



};




/* ==========================================================
   ENABLE ADS
========================================================== */


AdsManager.enableAds = function(){



    this.enabled=true;



    this.loadAds();



};




/* ==========================================================
   PREMIUM STATUS
========================================================== */


AdsManager.setPremium = function(
    status
){



    this.premiumUser =

        Boolean(status);



    if(
        this.premiumUser
    ){


        this.disableAds();


    }

    else{


        this.enableAds();


    }



};




/* ==========================================================
   AD EVENT TRACKING
========================================================== */


AdsManager.trackAdEvent = function(
    eventName
){



    /*

    Future Google Analytics:

    gtag(
        'event',
        eventName
    );


    */



    console.log(

        "Ad Event:",

        eventName

    );



};




/* ==========================================================
   AUTO INITIALIZATION
========================================================== */


document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        AdsManager.init();


        AdsManager.headerBanner();


        AdsManager.middleBanner();


        AdsManager.mobileBottom();


        AdsManager.desktopSticky();



    }

);




/* ==========================================================
   GLOBAL EXPORT
========================================================== */


window.AdsManager =

    AdsManager;


/* ==========================================================
   END OF FILE
========================================================== */
