$(function(){

  var MIN_PAGE_HEIGHT = 700;
  var isLockedForPopup = false;

  var resizePages = function(){
    $(".page").each(function(i,e){
      var height = ($(window).height() < MIN_PAGE_HEIGHT) ? 700 : $(window).height();
      $(e).height(height);
      $(e).width($(window).width());
    });

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
    $(".site-wrapper").animate({marginLeft : $(window).width() * -1}, 300);
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
      $("body, html").animate({scrollTop: $(".page-portfolio").offset().top}, 400);
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
