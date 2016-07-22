$(function(){

  var $mainNav = $(".main-nav-wrapper");

  $('#fullpage').fullpage({
    easing: 'easeInOutCubic',
    anchors:['home', 'portfolio', 'contact'],
    scrollingSpeed: 700,
    normalScrollElements: ".page-skills",
    loopHorizontal: false,
    keyboardScrolling: false,
    onSlideLeave : function(anchorLink, index, slideIndex, direction, nextSlideIndex){
      if(nextSlideIndex == 0){
        $mainNav.removeClass("darken-logo darken-menu");
      }else if(nextSlideIndex == 1){
        $mainNav
          .addClass("darken-menu")
          .removeClass("darken-logo");
      }else if(nextSlideIndex == 2){
        $mainNav
          .removeClass("darken-menu")
          .addClass("darken-logo");
      }
    },
    onLeave: function(index, nextIndex, direction){
        $mainNav.removeClass("darken-logo darken-menu");

        if(nextIndex !== 1){
          $mainNav
            .addClass("darken-menu")
            .addClass("darken-logo");
        }
    }

  });

  var mySwiper = new Swiper('.swiper-container',{
    slidesPerView: 1,
    spaceBetween: 150,
    uniqueNavElements: true,
    nextButton: ".swiper-button-next",
    prevButton: ".swiper-button-prev"
   });

  var cascadeOpacity = function($parentRef, ratio, opacity){
    $parentRef.find("*").each(function(i, e){
      setTimeout(function(){
        $(e).fadeTo(300, opacity);
      }, i * ratio);
    });
  };


  $("body").addClass("ready");

  $(".menu-icon").on("click", function(){
    $(".main-nav").toggleClass("active");
  });

  $(".button-more").on("click", function(e){
  e.preventDefault();
    $.fn.fullpage.moveTo(1, 1);
    $(".main-nav-wrapper").addClass("")
  });

  $(".main-nav nav a:first-child").on("click", function(){
    $.fn.fullpage.moveTo(1,0);
  });

  $(".button-skills").on("click", function(e){
    e.preventDefault();
    $.fn.fullpage.moveTo(1,2);
  });

  $(".button-back-to-about").on("click", function(e){
    e.preventDefault();
    $.fn.fullpage.moveTo(1,1);
  });

  $(".button-back-to-home").on("click", function(e){
    $.fn.fullpage.moveTo(1,0);
  })

  $(".experience-container")
    .find(".skills-experience-header").on("click", function(e){
      $(".page-skills")
        .find(".content-wrapper")
        .addClass("animating-to-skills")

      $(".skills-container .scroll-content *").fadeTo(0,0);

      setTimeout(function showOpacity(){
          cascadeOpacity($(".skills-container .scroll-content"), 20, 1);
      }, 700);
  });


  $(".skills-container")
    .find(".skills-experience-header").on("click", function(e){
      $(".page-skills")
        .find(".content-wrapper")
        .addClass("animating-to-experience");

      setTimeout(function showOpacity(){
          $(".content-wrapper").removeClass("animating-to-skills animating-to-experience");
      }, 1100);
  });


  $(".swiper-slide").on("click", function(e){
    if(!$(this).hasClass("swiper-slide-active"))
      return;

    e.stopPropagation();
    var elmPos = $(this).offset().top - $(window).scrollTop();
    $(".portfolio-detail")
      .find(".portfolio-wrapper")
      .html($(this).html())
      .parent()
      .addClass("portfolio-detail-expanded");
  });

  $(".close-button").on("click", function(e){
    e.preventDefault();
    $(".portfolio-detail").removeClass("portfolio-detail-expanded").height(0);
  });
});
