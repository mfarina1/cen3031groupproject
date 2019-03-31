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
        $scope.newUpload.photoSize = $scope.selectedOption.value.w + "x" + $scope.selectedOption.value.w
        // console.log("TCL: $scope.uploadNewPhoto -> $scope.newUpload.photoSize", $scope.newUpload.photoSize)


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
        function dataURItoBlob(dataURI) {
            // convert base64 to raw binary data held in a string
            // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
            var byteString = atob(dataURI.split(',')[1]);

            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

            // write the bytes of the string to an ArrayBuffer
            var ab = new ArrayBuffer(byteString.length);

            // create a view into the buffer
            var ia = new Uint8Array(ab);

            // set the bytes of the buffer to the correct values
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            // write the ArrayBuffer to a blob, and you're done
            var blob = new Blob([ab], { type: mimeString });
            return blob;

        }

      $scope.myImage = '';
      $scope.myCroppedImage = '';
      $scope.filename = '';
      $scope.availableOptions = [{
          id: '1',
          name: '11x14',
          value: {
            w: 1000,
            h: 60
          }
        },
        {
          id: '2',
          name: '16x20',
          value: {
            w: 4000,
            h: 5000
          }
        },
        {
          id: '3',
          name: '20x24',
          value: {
            w: 5000,
            h: 6000
          }
        },
        {
          id: '4',
          name: '20x30',
          value: {
            w: 5000,
            h: 7500
          }
        }
      ];

      $scope.selectedOption = $scope.availableOptions[1];

      var handleFileSelect = function (evt) {
        $scope.file = evt.currentTarget.files[0];
          var file = $scope.file;
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

        $scope.currentData = '';
        $scope.cropUpload = function () {
            $scope.currentData = new Date();
            var croppedImageCorrect = dataURItoBlob($scope.myCroppedImage);
            var storageRef = firebase.storage().ref();
            var metadata = {
                'contentType': croppedImageCorrect.type
            };
            // Push to child path.
            // [START oncomplete]
            storageRef.child('images/' + $scope.file.name).put(croppedImageCorrect, metadata).then(function (snapshot) {
                console.log('Uploaded', snapshot.totalBytes, 'bytes.');
                console.log('File metadata:', snapshot.metadata);
                // Let's get a download URL for the file.
                snapshot.ref.getDownloadURL().then(function (url) {
                    console.log('File available at', url);
                    // [START_EXCLUDE]
                    $scope.newUpload.FBImageURL = url;
                    document.getElementById('linkbox').innerHTML = '<a href="' + url +
                        '">Click For File</a>';
                    // [END_EXCLUDE]
                });
            }).catch(function (error) {
                // [START onfailure]
                console.error('Upload failed:', error);
                // [END onfailure]
            });
            // [END oncomplete]
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