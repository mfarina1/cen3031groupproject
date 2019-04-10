angular.module('mainApp')
  .factory('Listings', function ($http) {
    var methods = {
      getAll: function () {
        console.log("GETTING ALL LISTINGS")
        //return $http.get('http://localhost:8080/api/listings');
        return $http.get('/api/listings');
      },
      
      getUserOrders: function (UID) {
        console.log("USER LISTINGS")
        console.log(UID);
        //return $http.get('http://localhost:8080/api/listings');
        return $http.get('/listingId/'+UID);
      },

      create: function (listing) {
        //return $http.post('http://localhost:8080/api/listings', listing);
        return $http.post('/api/listings', listing);
      },

      updateOrderStatus: function (id) {
        return $http.put('/api/listings/' + id)
      },

      delete: function (id) {
        //return $http.delete('http://localhost:8080/api/listings/'+id)
        return $http.delete('/api/listings/' + id)
      }
    };

    return methods;
  });