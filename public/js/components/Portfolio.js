var Portfolio = function(portfolioDetails){

  var _this = this;
  var swiperInstance

  _this.startSwiper = function(elm, params){
    if(!elm)
      return;

    var mySwiper = new Swiper(elm, params);

    return mySwiper;
  }
}

/** params:
{
      slidesPerView: 1,
      spaceBetween: 150,
      uniqueNavElements: true,
      nextButton: ".swiper-button-next",
      prevButton: ".swiper-button-prev",
      onInit: function(){
        $(".swiper-slide").on("click", function(e){
          e.stopPropagation();

          if(!$(this).hasClass("swiper-slide-active") || $(this).attr('data-detail') == undefined)
            return;

            portfolioDetails.openDetail($(this).attr('data-detail'));
        });
      },
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
    }
*/
