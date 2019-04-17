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

      updateOrderStatus: function (id, newStatus) {
      	console.log("updating order ID "+id+ " "+newStatus);
        return $http.get('/api/update/status/'+id+'/'+newStatus);
      },
      
      updateTrackingNumber: function (id, trackingNumber) {
      	console.log("updating tracking number "+id+ " "+trackingNumber);
        return $http.get('/api/update/tracking/'+id+'/'+trackingNumber);
      },

      delete: function (id) {
        //return $http.delete('http://localhost:8080/api/listings/'+id)
        return $http.delete('/api/listings/' + id)
      }
    };

    return methods;
  });