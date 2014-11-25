define(function mod() {
  
  function PersonalHistoryProvider() {}
  
  PersonalHistoryProvider.prototype.searchHistory = function() {
    throw new Error("Personal History Provider is not yet implemented");
  };
  
  return PersonalHistoryProvider;
});
