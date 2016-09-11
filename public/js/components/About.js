var About = function(navigation){
  this.init = function(){
    $(".button-back-to-home").on("click", function(e){
      navigation.goto('home');
      $.fn.fullpage.moveTo(1,0);
    });

    $(".button-skills").on('click', function(e){
      e.preventDefault();
      navigation.goto('skills');
      $.fn.fullpage.moveTo(1,2);
    })
  }
}
