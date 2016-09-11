var FullPage = function(){

  var checkScreenInput = function(arg){
    return (arg == 'sections' || arg == 'slides');
  }
  var screens = {
    slides : [],
    sections : []
  };
  var _this = this;

  _this.addScreenTransition = function(screenType, index, onSlideLeaveCallback){
    if(checkScreenInput(screenType) && typeof(index) == "number" && typeof(onSlideLeaveCallback) == "function"){
      screens[screenType].push({index: index, action: onSlideLeaveCallback});
      return screens;
    }
  };

  _this.triggerScreenLeaveAt = function(screenType, index){
    $.fn.fullpage.setAllowScrolling(true);
    if(checkScreenInput(screenType) && typeof(index) == "number"){
      screens[screenType].map(function(slideLeaveAction){
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
        _this.triggerScreenLeaveAt('slides', nextSlideIndex);
      },

      onLeave: function(index, nextIndex, direction){
        _this.triggerScreenLeaveAt('sections', nextIndex);
      }
    });
  }
}
