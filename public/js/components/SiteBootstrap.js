var SiteBootstrap = function(utils, fullPage, navigation, home, about, skills, portfolio){

  var $mainNav = $(".main-nav-wrapper");

  this.registerNavigationTriggers = function(){
    navigation.registerAction('home', function(){
      utils.changeMenu($(".nav-home"));
      $mainNav.removeClass("darken-logo darken-menu");
    });

    navigation.registerAction('about', function(){
      utils.changeMenu($(".nav-about"));
      $mainNav.removeClass("darken-logo");
    });

    navigation.registerAction('skills', function(){
      utils.changeMenu($(".nav-skills-experience"));
        setTimeout(function(){
            $.fn.fullpage.setAllowScrolling(false);
        }, 100);
        $mainNav.addClass("darken-logo");
    });

    navigation.registerAction('portfolio', function(){
      $mainNav.removeClass("darken-logo darken-menu");
      utils.changeMenu($(".nav-portfolio"));
    });

    navigation.registerAction('contact', function(){
      utils.changeMenu($(".nav-contact"));
    });
  };

  this.bindMenuEvents = function(){
    $(document).on('click', ".nav-home", 'home', navigation.goto);
    $(document).on("click", ".nav-about", 'about', navigation.goto);
    $(document).on("click", ".nav-skills-experience", 'skills', navigation.goto);
    $(document).on("click", ".nav-portfolio", 'portfolio', navigation.goto);
    $(document).on("click", ".nav-contact", 'contact', navigation.goto);
  }


  this.initFullPage = function(){

    fullPage.addScreenTransition('slides', 0, function(){
      navigation.goto('home');
    });

    fullPage.addScreenTransition('slides', 1, function(){
      navigation.goto('about');
    });

    fullPage.addScreenTransition('slides', 2, function(){
      navigation.goto('skills');
    });

    fullPage.addScreenTransition('sections', 1, function(){
      navigation.goto('portfolio');
    });

    fullPage.addScreenTransition('sections', 2, function(){
      navigation.goto('contact');
    });


    fullPage.initFullPage($("#fullpage"));
  }

  this.initPortfolioSwiper = function(){
    var mySwiper = new Swiper('.swiper-container',{
      slidesPerView: 1,
      spaceBetween: 150,
      uniqueNavElements: true,
      nextButton: ".swiper-button-next",
      prevButton: ".swiper-button-prev",
      onInit: portfolio.init,
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
  }


  this.init = function(){

  }
}
