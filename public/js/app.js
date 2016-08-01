$(function(){

  var $mainNav = $(".main-nav-wrapper");

  $('#fullpage').fullpage({
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

  $.waitForImages.hasImgProperties = ['backgroundImage'];

  $('body').waitForImages().done(function() {
    $("body").addClass("ready");
      $(".preloader-wrapper").css("top", "-100vh");
      setTimeout(function(){
        $(".preloader-wrapper")
          .removeAttr("style")
          .find("svg")
            .removeAttr("style")
          .parent()
            .find(".load-wrapper")
              .remove();
      }, 400);
   });

  var mySwiper = new Swiper('.swiper-container',{
    slidesPerView: 1,
    spaceBetween: 150,
    uniqueNavElements: true,
    nextButton: ".swiper-button-next",
    prevButton: ".swiper-button-prev",
    onSlideChangeEnd : function(){

      var $projectContainer = $(".swiper-slide-active").find(".project-container"),
          img = $projectContainer.attr("data-bg"),
          loaded = $projectContainer.hasClass("loaded");

      if(img && !loaded){
        $projectContainer.waitForImages(true).done(function() {
          $projectContainer
            .css('background-image', 'url(' + img + ')')
            .addClass("loaded");
        });
      }

    }
  });

  var cascadeOpacity = function($parentRef, ratio, opacity){
    $parentRef.find("*").each(function(i, e){
      setTimeout(function(){
        $(e).fadeTo(300, opacity);
      }, i * ratio);
    });
  };

  $(".portfolio-presentation-container").clone().addClass("fixed").prependTo(".portfolio-content");
  $(".portfolio-presentation-container").first().addClass("main-presentation");

  var checkPortfolioScroll = function(){

    var $portfolioBG             = $(".portfolio-bg"),
        $portfolioMainTitle      = $(".main-presentation").first(),
        $portfolioMainTitleClone = $(".portfolio-presentation-container").last(),
        $portfolioContent        = $(".portfolio-content"),
        $portfolioContentSpacer  = $(".portfolio-content-spacer"),
        $portfolioDetail         = $(".portfolio-detail"),

        originalHeight           = $portfolioMainTitleClone.height(),
        portfolioDetailScrollPos = $(window).height()/2 - ($portfolioMainTitle.height()/2);

    if($portfolioBG.is(":visible"))
      $portfolioBG.css('background-position', '50% -' + ($(this).scrollTop() * 0.7) + 'px');

    if($portfolioDetail.scrollTop() <= portfolioDetailScrollPos)
      $portfolioMainTitle.removeClass("fixed");
    else
      $portfolioMainTitle.addClass("fixed");


    if(originalHeight >= ($(window).height() + $portfolioBG.offset().top)){
      $portfolioMainTitle.height($(window).height() + $portfolioBG.offset().top);
      $portfolioMainTitleClone.show();
    }else{
      $portfolioMainTitle.removeAttr("style");
      $portfolioMainTitleClone.hide();
    }


    if($portfolioContent.offset().top <= 0)
      $portfolioMainTitleClone.addClass("filled");
    else
      $portfolioMainTitleClone.removeClass("filled");

  }


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

    e.stopPropagation();

    if(!$(this).hasClass("swiper-slide-active") || $(this).attr('data-detail') == undefined)
      return;


    $.fn.fullpage.setMouseWheelScrolling(false);
    $.fn.fullpage.setAllowScrolling(false);

    var $portfolioWrapper = $(".portfolio-wrapper"),
        $preloaderWrapper = $(".preloader-wrapper"),
        $pagePortfolio    = $(".page-portfolio"),
        $closeButton      = $(".close-button"),
        $mainNav          = $(".main-nav-wrapper"),

        urlPath           = "/partials/" + $(this).attr('data-detail') + ".html";


    $mainNav.addClass("loading-content");
    $pagePortfolio.addClass("showing");
    $preloaderWrapper.fadeTo(300, 1);
    $portfolioWrapper.css('display', 'block')

    $.ajax(urlPath, {
      success : function(response){

        $portfolioWrapper.append(response)
        $portfolioWrapper.waitForImages().done(function() {
          $closeButton.fadeTo(1,300);
          $portfolioWrapper.css('display', 'block');
          $portfolioWrapper.addClass('show');
        });

      }
    });

  });

  $(".close-button").on("click", function(e){
    e.preventDefault();


    $.fn.fullpage.setMouseWheelScrolling(true);
    $.fn.fullpage.setAllowScrolling(true);

    var $portfolioWrapper = $(".portfolio-wrapper"),
        $preloaderWrapper = $(".preloader-wrapper"),
        $pagePortfolio    = $(".page-portfolio"),
        $closeButton      = $(".close-button"),
        $mainNav          = $(".main-nav-wrapper");

    $mainNav.removeClass("loading-content");
    $closeButton.fadeTo(0,300, function(){ $(this).hide()});
    $preloaderWrapper.removeAttr('style');
    $portfolioWrapper.addClass('leave');


    setTimeout(function(){
        $portfolioWrapper.removeClass("leave show").removeAttr('style').html("");
    }, 400);

    $pagePortfolio.removeClass("showing");

  });
});
