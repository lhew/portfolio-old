$(function(){

  (function addClassName(){
    var classname = "";

    if($.browser.ipad)
      classname+= " ipad";

    if($.browser.iphone)
      classname+= " iphone";

    $("body").addClass(classname);

  })();

  var $mainNav = $(".main-nav-wrapper");

  var hideOverlay = function(){
    $(".nav-is-visible").removeClass('nav-is-visible');
    $("#menu-overlay").removeClass("showing");
    setTimeout(function(){ $("#menu-overlay").removeAttr('style'); },300);
  }

  var changeMenu = function($selector){
    var $navItem = $("nav");

        $navItem.find(".active").removeClass("active");
        $selector.addClass("active");
  };



  $('#fullpage').fullpage({
    scrollingSpeed: 700,
    normalScrollElements: "#page-skills",
    loopHorizontal: false,
    keyboardScrolling: false,
    onSlideLeave : function(anchorLink, index, slideIndex, direction, nextSlideIndex){
      hideOverlay();

      $.fn.fullpage.setAllowScrolling(true);

      if(nextSlideIndex == 0){
        changeMenu($(".nav-home"));
        $mainNav.removeClass("darken-logo darken-menu");

      }else if(nextSlideIndex == 1){
        changeMenu($(".nav-about"));
        $mainNav
          .removeClass("darken-logo");
      }else if(nextSlideIndex == 2){
        changeMenu($(".nav-skills-experience"));
        setTimeout(function(){
          $.fn.fullpage.setAllowScrolling(false);
        }, 100);
        $mainNav
          .addClass("darken-logo");
      }
    },
    onLeave: function(index, nextIndex, direction){
        hideOverlay();
        $mainNav.removeClass("darken-logo darken-menu");
        $.fn.fullpage.setAllowScrolling(true);

        if(nextIndex !== 1)
          $mainNav.addClass("darken-logo");


        if(nextIndex == 2)
          changeMenu($(".nav-portfolio"));
        else if(nextIndex == 3)
          changeMenu($(".nav-contact"));
    }

  });

  $.waitForImages.hasImgProperties = ['backgroundImage'];

  var $images = $("[data-src]");


  $images.each(function(i, e){
    $(e).attr('src', $(e).attr('data-src'))
  });




  $images.waitForImages().done(function() {

    var $img = $(".page-home .image-container");

    $(".preloader-wrapper").css("top", "-100vh");

    setTimeout(function(){
      $(".preloader-wrapper")
        .removeAttr("style")
        .find("svg")
          .removeAttr("style")
        .parent()
          .find(".load-wrapper")
            .remove();

      $("#temp-style").remove();
      //var src = $img.find("img").attr("src");
      //$img.find("img").removeAttr("src").delay(100).attr("src", src);

    }, 400);

    setTimeout(function(){
      $("body").addClass("ready");
      $("#main-splash-container").addClass("loaded");
      $img.addClass("loaded");
    }, 3000);

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

        var _opacity = ($(e).hasClass("devicons")) ? 0.65 : opacity;

        $(e).fadeTo(300, _opacity);
      }, i * ratio);
    });
  };

  $(".portfolio-presentation-container").clone().addClass("fixed").prependTo(".portfolio-content");
  $(".portfolio-presentation-container").first().addClass("main-presentation");

  $(".logo-glass-wrapper, .nav-home").on("click", function(){
    $.fn.fullpage.moveTo(1,0);
    changeMenu($(".nav-home"));
  })

  $(".menu-icon").on("click", function(){
    $(".main-nav").toggleClass("active");
  });

  $(".button-more, .nav-about").on("click", function(e){
    e.preventDefault();
    $.fn.fullpage.moveTo(1, 1); //about
    changeMenu($(".nav-about"));
  });

  $(".button-skills, .nav-skills-experience").on("click", function(e){
    e.preventDefault();
    $.fn.fullpage.moveTo(1,2);
    changeMenu($(".nav-skills-experience"));
  });

  $(".nav-portfolio, .button-more-content").on("click", function(e){
    e.preventDefault();
    $.fn.fullpage.moveTo(2);
  });

    $(".nav-contact").on("click", function(e){
    e.preventDefault();
    changeMenu($(this));
    $.fn.fullpage.moveTo(3);
    changeMenu($(".nav-contact"));
  })

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

  $("#menu-overlay, nav li a").on("click", hideOverlay);

  if( $('.cd-stretchy-nav').length > 0 ) {
    var stretchyNavs = $('.cd-stretchy-nav');

    stretchyNavs.each(function(){
      var stretchyNav = $(this),
          stretchyNavTrigger = stretchyNav.find('.cd-nav-trigger');

      stretchyNavTrigger.on('click', function(event){
        event.preventDefault();
        stretchyNav.toggleClass('nav-is-visible');

        if(stretchyNav.hasClass('nav-is-visible'))
          $("#menu-overlay").css('display', 'block').addClass("showing");
        else
          hideOverlay();



      });
    });

    $(document).on('click', function(event){
      ( !$(event.target).is('.cd-nav-trigger') && !$(event.target).is('.cd-nav-trigger span') ) && stretchyNavs.removeClass('nav-is-visible');
    });
  }


    $("#sendmail").validate({
      rules: {
        name : "required",
        email: {required: true, email: true},
        message: "required"
      },
      submitHandler : function(form){
        var dados = $(form).serialize();
          $.ajax({
            type: 'POST',
            url: '',
            dataType: 'json',
            data: dados,
            success: function(retorno){
              if( retorno.tipo == 'sucesso' ){
                $('#sendmail')[0].reset();
               // alert(retorno.mensagem);
              }
            },
            error: function(){
              alert('An error occurred while sending your form. Try again later.')
            }
          });
        return false;
      }
    });

});
