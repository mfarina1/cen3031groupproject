
angular.module('mainApp')
  .controller('TrackOrderController', ['$scope', 'Listings',
    function ($scope, Listings) {
		var config = {
  		apiKey: "AIzaSyC8iqW-J1UCgSg7GHez4SuO51APq_n6AJI",
  		authDomain: "cen3031-photography-group3.firebaseapp.com",
  		databaseURL: "https://cen3031-photography-group3.firebaseio.com",
  		storageBucket: "cen3031-photography-group3.appspot.com",
	};
	firebase.initializeApp(config);
      $scope.listings = undefined;

      /* Get all the listings, then bind it to the scope */

		var firebaseUser = firebase.auth().currentUser;
		//var UID = firebaseUser.uid;
		console.log(firebaseUser);
		
		
      Listings.getUserOrders("4xgf4i6xb1gXChvcOambr7AO7Tl").then(function (response) {
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