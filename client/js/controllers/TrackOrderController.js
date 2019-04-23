angular.module('mainApp')

  .controller('TrackOrderController', ['$scope', 'Listings',
    function ($scope, Listings) {
	  // var config = {
//   		apiKey: "AIzaSyC8iqW-J1UCgSg7GHez4SuO51APq_n6AJI",
//   		authDomain: "cen3031-photography-group3.firebaseapp.com",
//   		databaseURL: "https://cen3031-photography-group3.firebaseio.com",
//   		storageBucket: "cen3031-photography-group3.appspot.com",
// 	};
// 	firebase.initializeApp(config);
      $scope.listings = undefined;

      /* Get all the listings, then bind it to the scope */
		
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				populateData(user.uid);
			}
		});
		
	 	populateData = function(uid){
	 		console.log(uid);
	 		Listings.getUserOrders(uid).then(function (response) {
       			$scope.listings = response.data;
        		console.log("getting user listing data")
      		}, function (error) {
        		console.log('Unable to retrieve listings:', error);
     		});
	 	}
     


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
    
    }
  ]);