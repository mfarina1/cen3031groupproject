
angular.module('mainApp')
  .controller('TrackOrderController', ['$scope', 'Listings',
    function ($scope, Listings) {

      $scope.listings = undefined;

      /* Get all the listings, then bind it to the scope */

      Listings.getUserOrders().then(function (response) {
        $scope.listings = response.data;
        console.log("getting listing data")
      }, function (error) {
        console.log('Unable to retrieve listings:', error);
      });


      $scope.showDetails = function (index) {
        $scope.detailedInfo = $scope.listings[index];
        console.log($scope.listings[index].firstName);
      };

      $scope.modifyStatus = function (id, newStatus) {
        console.log($scope.detailedInfo.orderStatus);
        console.log(newStatus);

        Listings.updateOrderStatus(id).then(function (response) {
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