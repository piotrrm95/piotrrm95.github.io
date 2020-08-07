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