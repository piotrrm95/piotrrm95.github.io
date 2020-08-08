//Scroll
$.fn.moveIt = function () {
  var $window = $(window);
  var instances = [];

  $(this).each(function () {
    instances.push(new moveItItem($(this)));
  });
  window.addEventListener(
    "scroll",
    function () {
      var scrollTop = $window.scrollTop();
      let scrollHeight = $window.height();
      instances.forEach(function (inst) {
        inst.update(scrollTop);
      });
      //color layers
      if (scrollTop > scrollHeight / 1.8) {
        $("#l4-color").fadeIn(1);
      } else {
        $("#l4-color").fadeOut(1);
      }
      if (scrollTop > scrollHeight / 1.6) {
        $("#l3-color").fadeIn(1);
      } else {
        $("#l3-color").fadeOut(1);
      }
    },
    { passive: true }
  );
};
var moveItItem = function (el) {
  this.el = $(el);
  this.speed = parseInt(this.el.attr("data-scroll-speed"));
};

moveItItem.prototype.update = function (scrollTop) {
  this.el.css("transform", "translateY(" + -(scrollTop / this.speed) + "px)");
};

// Initialization
$(function () {
  $("[data-scroll-speed]").moveIt();
});

// MOVE 2

var scrollArea = document.body;
var scrollH = 0;
var scrollOffset = 0;
var scrollPercent = 0;
var elementPosition = scrollPercent;

function createElement(el, dir) {
  let element = document.getElementById(el);
  let speed = parseInt(element.getAttribute("data-slide-speed")) * 100;
  resize();
  function loop() {
    scrollOffset = window.pageYOffset || window.scrollTop;
    scrollPercent = scrollOffset / scrollH || 0;
    elementPosition += (scrollPercent - elementPosition) * 0.05;
    let transformString;
    if (dir == "vertical") {
      transformString = "translateY(" + elementPosition * speed + "px)";
    }
    if (dir == "horizontal") {
      transformString = "translateX(" + elementPosition * speed + "px)";
    }
    element.style.mozTransform = transformString;
    element.style.webkitTransform = transformString;
    element.style.transform = transformString;
    requestAnimationFrame(loop);
  }
  loop();
  function resize() {
    scrollH = window.innerHeight * 4;
  }
  window.addEventListener("resize", resize);
}
// let layers = document.getElementsByClassName('layer')
// for (let item of layers) {
//   createElement(item.id, 'vertical')
// }
createElement("about-text", "vertical");
createElement("about-title", "horizontal");
createElement("movePagination", "vertical");

$(".project").hover(
  function () {
    $(".proj-el").not($(this)).css("z-index", "0");
    $("#project-image").css("opacity", "100");
    $("#project-img-in").attr(
      "src",
      `images/${$(this).attr("data-image")}.png`
    );
  },
  function () {
    $(".proj-el").css("z-index", "2");
    $("#project-image").css("opacity", "0");
  }
);

//contact
let form_id = "jquery_form";
let contact = $("#contact");
let email;
let subject;
let message;
let subjectVal = false;
let messageVal = false;
let emailVal = false;
let data = {
  access_token: "nzngaxjxfqwemc8n17yzdc6l",
};

function onSuccess() {
  $("#jquery_form").css("visibility", "hidden");
  $("#jquery_form").css("opacity", "0");
  $("#thank-message").css("visibility", "visible");
  $("#thank-message").css("opacity", "1");
  console.log("thank you");
}

function onError() {
  console.log("error");
}

var sendButton = $("#submit-btn");
function send() {
  sendButton.html("Sending…");
  sendButton.prop("disabled", true);
  // sendButton.prop("disabled", true);
  let sub = `E-mail: ${email}, Subject: ${subject}`;
  let mess = `${message}`;
  data["subject"] = sub;
  data["text"] = mess;

  $.post("https://postmail.invotes.com/send", data, onSuccess).fail(onError);

  return false;
}
$("#submit-btn").on("click", function () {
  email = $("#email").val();
  subject = $("#subject").val();
  message = $("#message").val();
  if (email.length > 5 && email.includes("@") && email.includes(".")) {
    emailVal = true;
    $("#type-email").css("color", "black");
  } else {
    emailVal = false;
    $("#type-email").css("color", "#ef6351");
  }
  if (subject.length > 0) {
    subjectVal = true;
    $("#type-subject").css("color", "black");
  } else {
    subjectVal = false;
    $("#type-subject").css("color", "#ef6351");
  }
  if (message.length > 0) {
    messageVal = true;
    $("#type-message").css("color", "black");
  } else {
    messageVal = false;
    $("#type-message").css("color", "#ef6351");
  }
  if (emailVal == true && subjectVal == true && messageVal == true) {
    send();
  }
});
let $form = $("#" + form_id);
$form.submit(function (event) {
  event.preventDefault();
});

//preloader
$(document).ready(function () {
  var counter = 0;
  var count = 0;
  var i = setInterval(function () {
    $(".loader .loader-counter span").html(count + " — 10");
    $(".loader").css("width", count + " — 10");

    counter++;
    count++;
    if (counter == 11) {
    
      clearInterval(i);
      $(".loader").css("opacity", '0');
      $(".loader").css("visibility", 'hidden');
    }
  }, 50);
});
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}
