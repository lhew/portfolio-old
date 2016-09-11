$(function(){
  var navigation = Navigation.getInstance();
  var utils      = new Utils();
  var fullpage   = new FullPage();
  var home       = new Home(navigation);
  var about      = new About(navigation);
  var skills     = new Skills(navigation);
  var portfolio  = new Portfolio();
  var site       = new SiteBootstrap(utils, fullpage, navigation, home, about, skills, portfolio);

  site.init();
});
