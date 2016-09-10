var Utils = function(){

  (function addClassName(){
    var classname = "";

    if($.browser.ipad)
      classname+= " ipad";

    if($.browser.iphone)
      classname+= " iphone";

    $("body").addClass(classname);

  })();

  this.hideOverlay = function(){
    $(".nav-is-visible").removeClass('nav-is-visible');
    $("#menu-overlay").removeClass("showing");
    setTimeout(function(){ $("#menu-overlay").removeAttr('style'); },300);
  }

  this.changeMenu = function($selector){
    var $navItem = $("nav");

        $navItem.find(".active").removeClass("active");
        $selector.addClass("active");
  };
}
