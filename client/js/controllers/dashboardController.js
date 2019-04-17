
angular.module('mainApp')
  .controller('DashboardController', ['$scope', 'Listings',
    function ($scope, Listings) {

      $scope.listings = undefined;

      /* Get all the listings, then bind it to the scope */

      Listings.getAll().then(function (response) {
        $scope.listings = response.data;
        console.log("getting listing data")
      }, function (error) {
        console.log('Unable to retrieve listings:', error);
      });


      $scope.showDetails = function (index) {
        $scope.detailedInfo = $scope.listings[index];
        console.log($scope.listings[index].firstName);
      };

      $scope.modifyOrderStatus= function (id, newStatus) {
		$scope.detailedInfo.orderStatus = newStatus;
        Listings.updateOrderStatus(id, newStatus).then(function (response) {
          console.log("Modifing status");
        }, function (error) {
          console.log('Unable to modify status:', error);
        });
      }
      
//      $scope.downloadImage = function(){
//          console.log("starting to download image");
//          var downloadRequest = new XMLHttpRequest();
//          downloadRequest.responseType = 'blob';
//          downloadRequest.onload = function(event){
//              var blob = downloadRequest.response;
//          };
//          downloadRequest.open('GET', $scope.detailedInfo.FBImageURL);
//          downloadRequest.send();
//      }
    }
  ]);