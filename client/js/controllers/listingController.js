angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
      
      $scope.listings = undefined;
      
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
        console.log("getting listing data")
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.newUpload = undefined;
      
    $scope.uploadNewPhoto = function() {
        console.log($scope.newUpload.firstName);
        $scope.newUpload.orderStatus = "Processing"
        Listings.create($scope.newUpload).then(function(response){
            console.log("Updating with new photo");
        }, function(error){
            console.log('Unable to upload new photo request:', error);
        });
	  /**TODO 
	  *Save the article using the Listings factory. If the object is successfully 
	  saved redirect back to the list page. Otherwise, display the error
	 */
    };
  }
]);