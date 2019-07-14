'use strict';

let Options = {
  Language: 'en',
  ZoneName:{
    en:{
    },
    cn:{
    },
  },
  Regex:{
  },
};


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function hideSekiroDeath() {
  $('#death-image').addClass('hide');
}

function showSekiroDeath() {
  $('#death-image').removeClass('hide');
}

function showSekiroUnseenThenHide() {
  $('#unseen-image').removeClass('hide');
  window.setTimeout(function(){ $('#unseen-image').addClass('hide'); }, 5000);
}

let gTracker;
class SekiroTracker {
  constructor(options) {
    this.options = options;
    this.zoneInfo = null;
    this.ResetZone();
    this.updateTimesHandle = null;
  }


 
}


document.addEventListener("onPlayerChangedEvent", function (e) {
    if(e.detail.currentHP == 0){
        showSekiroDeath();
    }else{
        if(!$('#death-image').hasClass('hide')){
            hideSekiroDeath();
            showSekiroUnseenThenHide();
        }else{
            hideSekiroDeath();
        }
    }
});

// document.addEventListener('onLogEvent', function(e) {
// });

// UserConfig.getUserConfigLocation('eureka', function(e) {
// });