var Navigation = (function(){
  var instance;
  var actions = [];
  var _this = this;
  var actionPrefix = 'goto:';

  var searchAction = function(actionName, callback){
    actions.map(function(action){
      if(action.actionName == actionName)
        callback(arguments);
    });
  }

  var createInstance = function (argument) {
    return {

      registerAction : function(actionName, callback){
        var found = false;
        searchAction(actionName, function(){
          found = true;
        });

        if(!found)
          actions.push({actionName : actionPrefix + actionName, actionCallback: callback});

        return actions;
      },

      goto: function(actionName){
        searchAction(actionName, function(){
          $(document).trigger(actionPrefix + actionName);
        });
      },

      dispatchEvents : function(){
        actions.map(function(action){
          $(document).on(actionPrefix + action.actionName, action.callback);
        });
      }
    }
  }

  return {
    getInstance: function(){
      if(!instance)
        instance = createInstance();

      return instance;
    }
  }
})();
