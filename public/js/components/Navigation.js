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

        if(!found){
          actions.push({actionName : actionPrefix + actionName, actionCallback: callback});
          $(document).on(actionPrefix + actionName, callback);
        }

        return actions;
      },

      goto: function(event){
        var actionName = actionPrefix + event.data;
        searchAction(actionName, function(){
          $(document).trigger(actionName);
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
