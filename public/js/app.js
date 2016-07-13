$(function(){

  var MIN_PAGE_HEIGHT = 700;

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
    spaceBetween: 150
   });
});
