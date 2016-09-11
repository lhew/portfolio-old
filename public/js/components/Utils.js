var Utils = function(){

  var _this = this;

  _this.addMobileClasses = function(){
    var classname = "";

    if($.browser.ipad)
      classname+= " ipad";

    if($.browser.iphone)
      classname+= " iphone";

    $("body").addClass(classname);
  };

  _this.hideOverlay = function(){
    $(".nav-is-visible").removeClass('nav-is-visible');
    $("#menu-overlay").removeClass("showing");
    setTimeout(function(){ $("#menu-overlay").removeAttr('style'); },300);
  };

  _this.changeMenu = function($selector){
    var $navItem = $("nav");
      $navItem.find(".active").removeClass("active");
      $selector.addClass("active");
  };

  _this.startMenuBehavior = function(){
      $("#menu-overlay, nav li a").on("click", _this.hideOverlay);

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
  };
}
