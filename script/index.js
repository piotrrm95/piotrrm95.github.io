//change wrapper background opacity on mouse move
$(function () {
  let $win = $(window),
    h = 0,
    opacityBackground = 0,
    opacityLayer = 0,
    getWidth = function () {
      h = $win.height();
    };
  $win.mousemove(function (e) {
    getWidth();
    //background
    opacityBackground = e.pageY / h;
    $("#w1-background").css("opacity", opacityBackground);

    //layers
    for (let i = 1; i < 5; i++) {
      opacityLayer = e.pageY / h / 2;
      if (opacityLayer < 0.8) {
        $(`#l${i}-shadow`).css("opacity", opacityLayer);
      } else {
        $(`#l${i}-shadow`).css("opacity", 0.8);
      }
    }
    //roof
    for (let i = 1; i < 4; i++) {
      opacityLayer = e.pageY / h / 2;
      if (opacityLayer < 0.6) {
        $(`#r${i}-shadow`).css("opacity", opacityLayer);
      } else {
        $(`#r${i}-shadow`).css("opacity", 0.6);
      }
    }
  });
});

//cursor
$(function () {
  let prefix = (function () {
    let a = window.getComputedStyle(document.documentElement, ""),
      b = (Array.prototype.slice
        .call(a)
        .join("")
        .match(/-(moz|webkit|ms)-/) ||
        ("" === a.OLink && ["", "o"]))[1];
    return (
      "WebKit|Moz|MS|O".match(new RegExp("(" + b + ")", "i"))[1], "-" + b + "-"
    );
  })();
  $(document).mousemove(function (e) {
    mouseX = e.pageX + 15;
    mouseY = e.pageY - $(window).scrollTop() + 15;
    $(".theBall-outer").attr(
      "style",
      prefix + "transform:translate(" + mouseX + "px," + mouseY + "px)"
    );
  });

  $(document)
    .on("mouseenter", "a", function () {
      $(".theBall").addClass("zooming");
    })
    .on("mouseleave", "a", function () {
      $(".theBall").removeClass("zooming");
    });
});

//dragg scroll
(function ($) {
  $.dragScroll = function (options) {
    let settings = $.extend(
      {
        scrollVertical: true,
        scrollHorizontal: true,
        cursor: null,
      },
      options
    );

    let clicked = false,
      clickY,
      clickX;

    let getCursor = function () {
      if (settings.cursor) return settings.cursor;
      if (settings.scrollVertical && settings.scrollHorizontal) return "move";
      if (settings.scrollVertical) return "row-resize";
      if (settings.scrollHorizontal) return "col-resize";
    };

    let updateScrollPos = function (e, el) {
      $("html").css("cursor", getCursor());
      let $el = $(el);
      settings.scrollVertical &&
        $el.scrollTop($el.scrollTop() + (clickY - e.pageY));
      settings.scrollHorizontal &&
        $el.scrollLeft($el.scrollLeft() + (clickX - e.pageX));
    };

    $(document).on({
      mousemove: function (e) {
        clicked && updateScrollPos(e, this);
      },
      mousedown: function (e) {
        clicked = true;
        clickY = e.pageY;
        clickX = e.pageX;
      },
      mouseup: function () {
        clicked = false;
        $("html").css("cursor", "auto");
      },
    });
  };
})(jQuery);

$.dragScroll();
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
      if(scrollTop==0){
        $("#scrollIcon").css("visibility", "visible");
        $("#scrollIcon").css("opacity", "1");
      }else{
        $("#scrollIcon").css("opacity", "0");
        $("#scrollIcon").css("visibility", "hidden");
      }
      //color layers
      if (scrollTop > scrollHeight) {
        $(".city").css("opacity", "0.2");
      } else {
        $(".city").css("opacity", "1");
      }
      if (scrollTop > scrollHeight) {
        $("#l4-color").fadeIn(1);
      } else {
        $("#l4-color").fadeOut(1);
      }
      if (scrollTop > scrollHeight) {
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
      `images/${$(this).attr("data-image")}.jpg`
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
$("#submit-btn").on("click", function (event) {
  event.preventDefault();
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
      $(".loader").css("opacity", "0");
      $(".loader").css("visibility", "hidden");
    }
  }, 50);
});
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

//navigation
let spanElement = $('#pagination-num')
let scrollHeight = $(window).height();
window.addEventListener("scroll", function(){
  let scrollTop = $(window).scrollTop();
  for(i=0; i<4; i++){
    if(Math.round(scrollTop)>=((scrollHeight*i)-200)){
      spanElement.text(`${i+1} — 4`);
    }
 }
});

//pointer
/* 
    pointer.js was created by OwL for use on websites, 
     and can be found at https://seattleowl.com/pointer.
*/

const pointer = document.createElement("div")
pointer.id = "pointer-dot"
const ring = document.createElement("div")
ring.id = "pointer-ring"
document.body.insertBefore(pointer, document.body.children[0])
document.body.insertBefore(ring, document.body.children[0])

let mouseX = -100
let mouseY = -100
let ringX = -100
let ringY = -100
let isHover = false
let mouseDown = false
const init_pointer = (options) => {

    window.onmousemove = (mouse) => {
        mouseX = mouse.clientX
        mouseY = mouse.clientY
    }

    window.onmousedown = (mouse) => {
        mouseDown = true
    }

    window.onmouseup = (mouse) => {
        mouseDown = false
    }

    const trace = (a, b, n) => {
        return (1 - n) * a + n * b;
    }
    window["trace"] = trace

    const getOption = (option) => {
        let defaultObj = {
            pointerColor: "#750c7e",
            ringSize: 15,
            ringClickSize: (options["ringSize"] || 15) - 5,
        }
        if (options[option] == undefined) {
            return defaultObj[option]
        } else {
            return options[option]
        }
    }

    const render = () => {
        ringX = trace(ringX, mouseX, 0.2)
        ringY = trace(ringY, mouseY, 0.2)

        if (document.querySelector(".p-action-click:hover")) {
            pointer.style.borderColor = getOption("pointerColor")
            isHover = true
        } else {
            pointer.style.borderColor = "white"
            isHover = false
        }
        ring.style.borderColor = getOption("pointerColor")
        if (mouseDown) {
            ring.style.padding = getOption("ringClickSize") + "px"
        } else {
            ring.style.padding = getOption("ringSize") + "px"
        }

        pointer.style.transform = `translate(${mouseX}px, ${mouseY}px)`
        ring.style.transform = `translate(${ringX - (mouseDown ? getOption("ringClickSize") : getOption("ringSize"))}px, ${ringY - (mouseDown ? getOption("ringClickSize") : getOption("ringSize"))}px)`

        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}