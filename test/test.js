
describe("Site tests", function(){
  it("should return the same intance of Navigation (singleton)", function(){
    var navInstance1 = new Navigation.getInstance();
    var navInstance2 = new Navigation.getInstance();

    expect(navInstance1).toEqual(navInstance2);
  });

  it("should return an Navigation actionName with the given format", function(){
    var mockObj = {actionName: "goto:About", actionCallback: function(){}};
    var returningObj = Navigation.getInstance().registerAction("About", function(){})[0];

    expect(mockObj.actionName).toEqual(returningObj.actionName);

  });

  it("should return an Swiper Instance", function(){
    var p = new Portfolio();
      expect(p.startSwiper(".swiper-container")).not.toBe(undefined);
  });


});

