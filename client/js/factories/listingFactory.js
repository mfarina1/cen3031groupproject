angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    getAll: function() {
        console.log("GETTING ALL LISTINGS")
      //return $http.get('http://localhost:8080/api/listings');
        return $http.get('https://gentle-cove-13713.herokuapp.com/api/listings');
        
    },
	
	create: function(listing) {
	  //return $http.post('http://localhost:8080/api/listings', listing);
      return $http.post('https://gentle-cove-13713.herokuapp.com/api/listings', listing);
    }, 

    delete: function(id) {
        //return $http.delete('http://localhost:8080/api/listings/'+id)
        return $http.delete('https://gentle-cove-13713.herokuapp.com/api/listings/'+id)
    }
  };

  return methods;
});
