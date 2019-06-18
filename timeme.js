var leaving_certificate_higher_total_marks = {"accounting": 400};

var leaving_certificate_higher_total_time = {"accounting": 180}

var marks;
var cd_interval;
var time;

function getInfo(){
  url = (window.location.href).split("/");

  if(url.length == 8){
    marks = window[url[4].replace("-", "_") + "_" + url[5] + "_total_marks"][url[6]]
    time = window[url[4].replace("-", "_") + "_" + url[5] + "_total_time"][url[6]]
  }else{
    return false
  }
}

function resetTimer(){
  clearInterval(cd_interval);
  $(".countdown-timer").hide();
  $(".time-me").html("Time Me!");
  $(".time-me").show();
  $(".time-me").css('background-color', '#e9369a');
  $(".time-me").css('border-color', '#e9369a');
  $(".time-me").removeClass("start-timer");
  $(".questionTimer").hide();
}

function startTimer(caller, duration){
  //Show this timer
  var cd_timer = $(caller).siblings(".countdown-timer");
  $(cd_timer).css('display', 'inline-block');
  //Get the seconds till we finish
  timer = duration * 60;
  cd_interval = setInterval(function(){
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    seconds = seconds < 10 ? "0" + seconds : seconds;

    $(cd_timer).text(minutes + ":" + seconds);

    if (--timer < 0) {
        resetTimer();
        alert("Your time is up!");
    }
  }, 1000)

}

$(document).ready(function(){

  info = getInfo();

  $("div.printQuestionContainer").each(function(){

    $(this).append($("<button class='btn btn-cta sx-tap-action time-me'>Time Me!</button>"));
    $(this).append($("<input type='hidden' id='questionTimer' class='questionTimer form-control' placeholder='marks' minimum=1 value=10>"));
    $(this).append($("<span class='countdown-timer'>00:00</span>"))

  });

  $(".time-me").click(function(){
      if($(this).hasClass("start-timer")){
        if(marks > 0){
          timeAllowed = time * ( $(this).siblings(".questionTimer").val() / marks )
          $(this).siblings(".questionTimer").hide();
          $(this).hide();
          $(this).removeClass("start-timer");
          startTimer(this, timeAllowed);
        }
      }else{
        //Show all other buttons
        resetTimer();
        //Switch the button and show the input
        $(this).html("GO!");
        $(this).css('background-color', '#99ff99');
        $(this).css('border-color', '#66ff66');
        $(this).addClass("start-timer");
        $(this).siblings(".questionTimer").attr("type", "number");
        $(this).siblings(".questionTimer").show();
      }

  })

})
