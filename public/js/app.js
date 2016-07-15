$(function(){

  var MIN_PAGE_HEIGHT = 700;
  var isLockedForPopup = false;
  var currentPagePos = 0;

  var resizePages = function(){
    $(".page").each(function(i,e){
      var height = ($(window).height() < MIN_PAGE_HEIGHT) ? 700 : $(window).height();
      $(e).height(height);
      $(e).width($(window).width());
    });

    $(".site-wrapper").css('margin-left', $(window).width() * currentPagePos * -1);

    $(".page-group").each(function(i,e){
      $(this).width( $(e).find(".page").length * $(window).width());
    });
  };

  resizePages();

  $(window).resize(function(){
    resizePages();
  });

  $(".page-home").addClass("ready");
  $(".menu-icon").on("click", function(){
    $(".main-nav").toggleClass("active");
  });

  $(".button-more").on("click", function(e){
    e.preventDefault();
    currentPagePos = 1;

    $(".page-about")
      .addClass("ready")
      .addClass("active");

    $(".site-wrapper")
      .addClass("animatable")
      .css('margin-left', $(window).width() * currentPagePos * -1);
    setTimeout(function(){
      $(".page-about")
        .removeClass("animatable");

      $(".site-wrapper")
        .removeClass("animatable")
        .height($(window).height());
    }, 800);
  });

  $(".button-back-to-home").on("click", function(e){
    e.preventDefault();
    currentPagePos = 0;
    $(".page-about")
      .removeClass("active");

    $(".site-wrapper")
      .addClass("animatable")
      .css('margin-left', $(window).width() * currentPagePos);
        setTimeout(function(){

          $(".site-wrapper")
            .removeClass("animatable")
            .removeAttr("style");
        }, 800);
  });

  $(".button-skills").on("click", function(e){
    currentPagePos = 2;
    $(".site-wrapper").css('margin-left', $(window).width() * currentPagePos * -1);
  });

   var mySwiper = new Swiper('.swiper-container',{
    slidesPerView: 1,
    spaceBetween: 150,
    uniqueNavElements: true,
    nextButton: ".swiper-button-next",
    prevButton: ".swiper-button-prev"
   });

   var togglePopupLock = function(){
    console.log('togglefor popup called ', isLockedForPopup);
    if(!isLockedForPopup){
      $(".site-wrapper, body, html").addClass("lock-for-popup");
    }else{
       $(".site-wrapper, body, html").removeClass("lock-for-popup");
    }

    isLockedForPopup = !isLockedForPopup;

   }

   $(".button-more-content").on("click", function(e){
      e.preventDefault();
      $("body, html").animate({scrollTop: $(".page-portfolio").offset().top}, 400, "easeInOutQuint");
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
        .height(300)
        .css("top", elmPos)
        .addClass("portfolio-detail-expanded");

      togglePopupLock();

   });

   $(".close-button").on("click", function(e){
      e.preventDefault();
      togglePopupLock();
      $(".portfolio-detail").removeClass("portfolio-detail-expanded").height(0);
      $("body, html").scrollTop($(".page-portfolio").offset().top);

      setTimeout(function(){
        $(".portfolio-detail")
      }, 300);

   });
});
