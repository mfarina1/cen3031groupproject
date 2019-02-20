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

    $scope.detailedInfo = undefined;
    $scope.newListing = undefined;
      
    $scope.addListing = function() {
        console.log("Adding listing");
        console.log($scope.newListing.name);
        Listings.create($scope.newListing).then(function(response){
            $scope.listings.push(response.data);
            $scope.listings.sort();
            console.log("Updating with new listing");
            
        }, function(error){
            console.log('Unable to retrieve listings:', error);
        });
	  /**TODO 
	  *Save the article using the Listings factory. If the object is successfully 
	  saved redirect back to the list page. Otherwise, display the error
	 */
    };

    $scope.deleteListing = function(id) {
	   /**TODO
        Delete the article using the Listings factory. If the removal is successful, 
		navigate back to 'listing.list'. Otherwise, display the error. 
       */
        console.log("Deleting listing");
        console.log(id);
        Listings.delete(id).then(function(response){
            //$scope.listings = response.data;
        console.log(response.data.name)
        console.log($scope.listings.length)
        
            for(i = 0; i<$scope.listings.length; i++){
            if ($scope.listings[i].code == response.data.code){
                $scope.listings.splice(i,1);
            }
        }
            
            console.log("Listing is deleted");
        }, function(error){
            console.log('Unable to retrieve listings:', error);
        });
        
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };
  }
]);