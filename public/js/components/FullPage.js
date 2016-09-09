var FullPage = function(){

  var checkScreenInput = function(arg){
    return (arg == 'screens' || arg == 'slides');
  }
  var screens = {
    slides : [],
    sections : []
  };
  var _this = this;

  _this.setupOnSlideLeave = function(screenType, index, onSlideLeaveCallback){
    if(checkScreenInput(screenType) && typeof(index) == "number" && typeof(onSlideLeaveCallback) == "function"){
      slides.push({index: index, action: onSlideLeaveCallback});
      return slides;
    }
  };

  _this.triggerSlideLeaveAt = function(screenType, index){
    if(checkScreenInput(screenType) && typeof(index) == "number"){
      slides.map(function(slideLeaveAction){
        if(slideLeaveAction.index == index)
            slideLeaveAction.action();
      });
    }
  };

  _this.initFullPage = function($elm){

    $elm.fullpage({
      scrollingSpeed: 700,
      normalScrollElements: "#page-skills",
      loopHorizontal: false,
      keyboardScrolling: false,

      onSlideLeave : function(anchorLink, index, slideIndex, direction, nextSlideIndex){
        _this.triggerSlideLeaveAt('slides', nextSlideIndex);
      },

      onLeave: function(index, nextIndex, direction){
        _this.triggerSlideLeaveAt('slides', nextSlideIndex);
      }
    });
  }
}
