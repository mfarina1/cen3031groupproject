
angular.module('listings').controller('ListingsController', ['$scope', 'Listings', function($scope, Listings) {



      
      $scope.listings = undefined;
      
    /* Get all the listings, then bind it to the scope */
    
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
        console.log("getting listing data")
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });
    

    $scope.newUpload = undefined;

    $scope.fileEvent(fileInput)
    {

    }
    $scope.uploadNewPhoto = function() {
        console.log($scope.newUpload.photoSize);
        $scope.newUpload.orderStatus = "Processing"
        $scope.newUpload.trackingNumber = "testing"
        $scope.newUpload.price = 6.32
        
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
    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
      console.log($scope.listings[index].firstName);
    };
    
    $scope.modifyStatus = function(id, newStatus){
        console.log($scope.detailedInfo.orderStatus);
        console.log(newStatus);
        
        Listings.updateOrderStatus(id).then(function(response){
            console.log("Modifing status");
        }, function(error){
            console.log('Unable to modify status:', error);
        });
    }
                                                             
  }
]);

      

      
 
