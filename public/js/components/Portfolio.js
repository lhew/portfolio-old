var Portfolio = function(){

  var _this = this;
  _this.bindDetailEvents = function(){
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
  }


  _this.bindCloseDetailEvents = function(){
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
  },

  _this.init = function(){
    _this.bindDetailEvents();
    _this.bindCloseDetailEvents();
  }
}
