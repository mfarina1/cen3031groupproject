angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    getAll: function() {
        console.log("GETTING ALL LISTINGS")
      //return $http.get('http://localhost:8080/api/listings');
        return $http.get('/api/listings');

    },
	
	create: function(listing) {
	  //return $http.post('http://localhost:8080/api/listings', listing);
      return $http.post('/api/listings', listing);
    }, 
      
    updateOrderStatus: function(id) {
        return $http.put('/api/listings/'+id)
    },

    delete: function(id) {
        //return $http.delete('http://localhost:8080/api/listings/'+id)
        return $http.delete('/api/listings/'+id)
    }
  };

  return methods;
});
