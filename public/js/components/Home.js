var Home = function(navigation){
  this.init = function(){
    var $img = $(".page-home .image-container");

    $(".preloader-wrapper").css("top", "-100vh");

    setTimeout(function(){
      $(".preloader-wrapper")
        .removeAttr("style").find("svg").removeAttr("style").parent().find(".load-wrapper").remove();

      $("#temp-style").remove();

    }, 400);

    setTimeout(function(){
      $("body").addClass("ready");
      $("#main-splash-container").addClass("loaded");
      $img.addClass("loaded");
    }, 3000);

    $(document).on("click", ".logo-glass-wrapper", function(){
      $.fn.fullpage.moveTo(1,0);
      navigation.goto('home');
    });

    $(document).on("click", ".button-more", function(){
      $.fn.fullpage.moveTo(1,1);
      navigation.goto('about');
    });
    $(document).on("click", ".button-more-content", 'about', function(){
      $.fn.fullpage.moveTo(2);
      navigation.goto('portfolio');
    });
  }
}
