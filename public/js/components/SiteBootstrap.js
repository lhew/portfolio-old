var SiteBootstrap = function(utils, fullPage, navigation, home, about, skills, portfolio){

  var $mainNav = $(".main-nav-wrapper");
  var _this = this;

  _this.registerNavigationTriggers = function(){
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
      $mainNav.addClass("darken-logo");
      utils.changeMenu($(".nav-portfolio"));
    });

    navigation.registerAction('contact', function(){
      utils.changeMenu($(".nav-contact"));
      $mainNav.addClass("darken-logo");
    });
  };

  _this.bindMenuEvents = function(){
    $(document).on('click', ".nav-home", function(){
      $.fn.fullpage.moveTo(1);
      navigation.goto('home');
    });
    $(document).on("click", ".nav-about", function(){
      $.fn.fullpage.moveTo(1,1)
      navigation.goto('about');
    });
    $(document).on("click", ".nav-skills-experience", function(){
      $.fn.fullpage.moveTo(1,2)
      navigation.goto('skills');
    });
    $(document).on("click", ".nav-portfolio", function(){
      $.fn.fullpage.moveTo(2);
      navigation.goto('portfolio');
    });
    $(document).on("click", ".nav-contact", function(){
      $.fn.fullpage.moveTo(3);
      navigation.goto('contact');
    });
  };

  _this.initFullPage = function(){

    fullPage.addScreenTransition('sections', 1, function(){
      navigation.goto({data: 'home'});
    });

    fullPage.addScreenTransition('slides', 1, function(){
      navigation.goto({data: 'about'});
    });

    fullPage.addScreenTransition('slides', 2, function(){
      navigation.goto({data: 'skills'});
    });

    fullPage.addScreenTransition('sections', 2, function(){
      navigation.goto({data: 'portfolio'});
    });

    fullPage.addScreenTransition('sections', 3, function(){
      navigation.goto({data: 'contact'});
    });

    fullPage.initFullPage($("#fullpage"));
  };

  _this.initUtils = function(){
    utils.addMobileClasses();
    utils.hideOverlay();
    utils.startMenuBehavior();
  };

  _this.initPortfolioSwiper = function(){
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

  _this.init = function(){
    var $images = $("[data-src]");

    $images.each(function(i, e){
      $(e).attr('src', $(e).attr('data-src'))
    });

    $images.waitForImages().done(function() {

      _this.registerNavigationTriggers();
      _this.bindMenuEvents();
      _this.initFullPage();
      _this.initPortfolioSwiper();
      _this.initUtils();
      home.init();
      about.init();
      skills.init();

    });
  }
}
