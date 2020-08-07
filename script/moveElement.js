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

//Slide
// $.fn.slideIt = function () {
//   var $window = $(window);
//   var instances = [];

//   $(this).each(function () {
//     instances.push(new slideItItem($(this)));
//   });
//   window.addEventListener(
//     "scroll",
//     function () {
//       var scrollTop = $window.scrollTop();
//       instances.forEach(function (inst) {
//         inst.update(scrollTop);
//       });
//     },
//     { passive: true }
//   );
// };
// var slideItItem = function (el) {
//   this.el = $(el);
//   this.speed = parseInt(this.el.attr("data-slide-speed"));
// };

// slideItItem.prototype.update = function (scrollTop) {
//   if (-scrollTop / this.speed <= 200) {
//     $('#about-title').css("transform", `translateX(${-scrollTop / this.speed}px)`);
//     $('#about-text').css("transform", `translateX(${-scrollTop / this.speed}px)`);
//   }
//   else if(-scrollTop / this.speed >200 && -scrollTop / this.speed <= 400) {
//     $('#about-title').css("transform", `translateX(${200}px)`);
//     $('#about-text').css("transform", `translateX(${-scrollTop / this.speed}px)`);
//   }
//   else {

//     $('#about-text').css("transform", `translateX(${400}px)`);
//   }
// };

// // Initialization
// $(function () {
//   $("[data-slide-speed]").slideIt();
// });

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
    $( ".proj-el" ).not($(this)).css( "z-index", "0" );
    $('#project-image').css("opacity", "100");
    $('#project-image').css("background-image", `url(images/${$(this).attr('data-image')}.png`);
  },
  function () {
    $( ".proj-el" ).css( "z-index", "2" );
    $('#project-image').css("opacity", "0");
   
  }
);
