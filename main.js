/*
    ======================
        YOUTUBE IFRAME
    ======================
*/
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

const screenW = window.innerWidth;
const screenH = window.innerHeight;

setTimeout(function(){
    document.querySelector('h1').classList.add('playbutton-visible');
}, 1000);

function onYouTubeIframeAPIReady() {
    player = new YT.Player('background-video', {
        videoId: 'Kn4fee6GzPA',
        width: screenW,
        height: screenH,
        host: 'https://www.youtube.com',
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'loop': 1,
            'modestbranding': 1,
            'showinfo': 1,
            'rel': 0,
            'playlist': ['Kn4fee6GzPA',
            'Kn4fee6GzPA', 'Kn4fee6GzPA',
            'Kn4fee6GzPA', 'Kn4fee6GzPA'],
            },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}
let videotime = 0;
let timeupdater;



function onProgress(currentTime) {
    if (currentTime > 107) {
        document.querySelector('header').classList.add('border-white');
    }
    if (currentTime > 110.5) {
        player.pauseVideo();
        clearInterval(timeupdater);
    }
}


function onPlayerReady(event) {
    document.getElementById('background-video').setAttribute('allow', 'autoplay');
    
    
    player.setLoop(true);

    function updateTime() {
        var oldTime = videotime;
        if(player && player.getCurrentTime) {
          videotime = player.getCurrentTime();
        }
        if(videotime !== oldTime) {
          onProgress(videotime);
        }
    }
    timeupdater = setInterval(updateTime, 100);
}




function resizeIframe() {
    if ((screenW <= 785) && (screen.orientation.angle == 0)) {
        let iframeH = screenW * 9 /16;
        document.getElementById('background-video').style.height = `${iframeH}px`;
        document.querySelector('.header-principal-container').style.minHeight = `${iframeH}px`;
        document.querySelector('header').classList.add('border-transparent');
    }
}

function resetIframe() {
    if ((screenW < 500) && (screen.orientation.angle == 90)) {
        let iframeH = screenW * 9 /16;
        document.getElementById('background-video').style.height = "100vh";
        document.querySelector('.header-principal-container').style.minHeight = "100vh";
    }
}

window.addEventListener("orientationchange", function() {
    if (screen.orientation.angle == 90) {
        resetIframe();
    } else if (screen.orientation.angle == 0) {
        resizeIframe();
    }
});

function onPlayerStateChange(event) {
    resizeIframe();
    if (event.data == 1) {
        document.querySelector('h1').classList.add('nobutton');
        document.getElementById('background-video').classList.remove('stealth');
    }

}





const soundControl = document.getElementById('sound');
const ecosysteme = document.getElementById("ecosysteme");
const scrollBox = document.getElementById("scrollbox");
const mainMenu = document.querySelector('.menu-menu-principal-container');
// const menuContainer = document.getElementById('menu-menu-principal-container');
let menuPlaceHolder = document.createElement("div");
menuPlaceHolder.id = 'menu-old-space';
mainMenu.appendChild(menuPlaceHolder);




soundControl.addEventListener('change', function() {
    if(this.checked) {
        player.mute();
    } else {
        player.unMute();
    }
});


/*
    =============================================
        GENERAL: STUFF TO DO WHEN DOM'S READY
    =============================================
*/
document.addEventListener("DOMContentLoaded", function(event) {

    soundControl.checked = false;

});


