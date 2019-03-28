angular.module('mainApp')
  .controller('ListingsController', ['$scope', 'Listings',
    function ($scope, Listings) {

      $scope.listings = undefined;

      /* Get all the listings, then bind it to the scope */

      Listings.getAll().then(function (response) {
        $scope.listings = response.data;
        console.log("getting listing data")
      }, function (error) {
        console.log('Unable to retrieve listings:', error);
      });


      $scope.newUpload = undefined;

      $scope.printNewUpload = function () {
        console.log($scope.newUpload.photoSize)
        console.log($scope.newUpload.medium)
      }

      $scope.uploadNewPhoto = function () {
        console.log($scope.newUpload.photoSize);
        $scope.newUpload.orderStatus = "Processing"
        $scope.newUpload.trackingNumber = "testing"
        $scope.newUpload.price = 6.32
        $scope.newUpload.photoSize = 6

        Listings.create($scope.newUpload).then(function (response) {
          console.log("Updating with new photo");
        }, function (error) {
          console.log('Unable to upload new photo request:', error);
        });
        /**TODO
	  *Save the article using the Listings factory. If the object is successfully
	  saved redirect back to the list page. Otherwise, display the error
	 */

      };
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

      /////////////////////////////

      $scope.myImage = '';
      $scope.myCroppedImage = '';
      $scope.filename = '';
      $scope.availableOptions = [{
          id: '1',
          name: 'Option A (200*150)',
          value: {
            w: 200,
            h: 150
          }
        },
        {
          id: '2',
          name: 'Option B (150*100)',
          value: {
            w: 150,
            h: 100
          }
        },
        {
          id: '2',
          name: 'Option C (100*50)',
          value: {
            w: 100,
            h: 50
          }
        },
        {
          id: '2',
          name: 'Option D (40*20)',
          value: {
            w: 40,
            h: 20
          }
        },
        {
          id: '3',
          name: 'Option E (14*10)',
          value: {
            w: 15,
            h: 10
          }
        }
      ];

      $scope.selectedOption = $scope.availableOptions[1];

      var handleFileSelect = function (evt) {
        var file = evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
          $scope.$apply(function ($scope) {
            $scope.myImage = evt.target.result;
          });
        };
        reader.readAsDataURL(file);
      };
      angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);

      $scope.download = function () {
        SaveToDisk($scope.myCroppedImage, $scope.filename);
      };

      function SaveToDisk(fileURL, fileName) {
        // for non-IE
        if (!window.ActiveXObject) {
          var save = document.createElement('a');
          save.href = fileURL;
          save.target = '_blank';
          save.download = fileName;

          var event = document.createEvent('Event');
          event.initEvent('click', true, true);
          save.dispatchEvent(event);
          (window.URL || window.webkitURL).revokeObjectURL(save.href);
        }

        // for IE
        else if (!!window.ActiveXObject && document.execCommand) {
          var _window = window.open(fileURL, '_blank');
          _window.document.close();
          _window.document.execCommand('SaveAs', true, fileName || fileURL)
          _window.close();
        }
      }

    }
  ]);