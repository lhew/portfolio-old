var Skills = function(){

  var cascadeOpacity = function($parentRef, ratio, opacity){

    $parentRef.find("*").each(function(i, e){
      setTimeout(function(){

        var _opacity = ($(e).hasClass("devicons")) ? 0.65 : opacity;

        $(e).fadeTo(300, _opacity);
      }, i * ratio);
    });
  };

  this.init = function(){
    $(".button-back-to-about").on("click", function(e){
      e.preventDefault();
      $.fn.fullpage.moveTo(1,1);
    });

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

  }
}
