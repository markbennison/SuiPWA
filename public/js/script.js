/* ********** ************** ********** */
/* ********** Service Worker ********** */
/* ********** ************** ********** */

// Check that this browser supports serviceWorker
if ('serviceWorker' in navigator) {

    // Wait for the page to completely load, including all resources like the above photo
    window.addEventListener('load', function () {

        // Register the service worker
        navigator.serviceWorker.register("../serviceworker.js").then(function (registration) {

            // Promise resolved successfully - print registration info to the console
            console.log("Service worker registration was successful!", registration);

        }, function (err) {

            // Promise failed, registration did not work
            console.log("Service worker registration failed!", err);
        });
    });
}

/* ********** ************** ********** */
/*  Skill's SubNav (Large Screens Only) */
/* ********** ************** ********** */

var dropbtn_down = false;
var subnav_down = false;
var dropbtn = document.getElementById("dropbtn-skills");
var subnav = document.getElementById("subnav-skills");


dropbtn.onmouseover = function() {
  dropbtn_down = true;
  menuEvents();
};
subnav.onmouseover = function() {
  subnav_down = true;
  menuEvents();
};
dropbtn.onmouseout = function() {
  dropbtn_down = false;
  menuEvents();
};
subnav.onmouseout = function() {
  subnav_down = false;
  menuEvents();
};

function menuEvents() {
  //var resWidth = window.innerWidth;
  //if(resWidth >= 800){
    if((dropbtn_down || subnav_down)){
      //subnav.style.display = 'block';
      subnav.classList.add("showOnFull")
    }else{
      //subnav.style.display = 'none';
      subnav.classList.remove("showOnFull")
    }
  //}
}

/* ********** ************************* ********** */
/* ********** Network Connection Alerts ********** */
/* ********** ************************* ********** */
var alertOnline = document.getElementById("alertOnline");
var alertOffline = document.getElementById("alertOffline");
var alertOnlineClose = document.getElementById("alertOnlineClose");
var alertOfflineClose = document.getElementById("alertOfflineClose");

alertOnlineClose.onclick = function(){
    alertOnline.style.display = "none";
    setTimeout(function(){ alertOnline.style.display = "none"; }, 600);
}

alertOfflineClose.onclick = function(){
    alertOffline.style.display = "none";
    setTimeout(function(){ alertOffline.style.display = "none"; }, 600);
}

function handleStateChange() {
    if(navigator.onLine){
        alertOffline.style.display = "none";
        alertOnline.style.display = "initial";
    }else{
        alertOnline.style.display = "none";
        alertOffline.style.display = "initial";
    }
}

window.addEventListener('online', handleStateChange);
window.addEventListener('offline', handleStateChange);