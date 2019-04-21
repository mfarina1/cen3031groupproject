angular.module('mainApp')

/* Firebase config and connection */


  .controller('ListingsController', ['$scope', 'Listings',
    function ($scope, Listings) {
	// var config = {
//   		apiKey: "AIzaSyC8iqW-J1UCgSg7GHez4SuO51APq_n6AJI",
//   		authDomain: "cen3031-photography-group3.firebaseapp.com",
//   		databaseURL: "https://cen3031-photography-group3.firebaseio.com",
//   		storageBucket: "cen3031-photography-group3.appspot.com",
// 	};
	// firebase.initializeApp(config);
	
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
          console.log($scope.newUpload.photoSize);
          console.log($scope.newUpload.medium);
      }

	  $scope.checkLogIn = function () {
			console.log("CHECKING IF LOGGED IN")
			firebase.auth().onAuthStateChanged(function(user) {
			if (!user) {
				 window.location = '/login';
			} else{
				//document.getElementById("log_in").innerHTML = "Log Out";
				
			}
		});	
	  }

	
      $scope.uploadNewPhoto = function () {
        console.log($scope.newUpload.photoSize);
          $scope.newUpload.orderStatus = "Processing";
          $scope.newUpload.trackingNumber = " ";
		var firebaseUser = firebase.auth().currentUser
		$scope.newUpload.FBUID = firebaseUser.uid;
		console.log($scope.newUpload.FBUID)

        // console.log("TCL: $scope.uploadNewPhoto -> $scope.newUpload.photoSize", $scope.newUpload.photoSize)

       

        Listings.create($scope.newUpload).then(function (response) {
          console.log("Updating with new photo");
           window.location = '/';
        }, function (error) {
          console.log('Unable to upload new photo request:', error);
        });
        /**TODO
	     *Save the article using the Listings factory. If the object is successfully
	     saved redirect back to the list page. Otherwise, display the error
	     */

      };
       
      $scope.calculatePrice = function() {
       	var firebaseUser = firebase.auth().currentUser
			console.log(firebaseUser)
           $scope.newUpload.photoSize = $scope.selectedOption.value.w + "x" + $scope.selectedOption.value.h
           $scope.newUpload.photoSizeInches = $scope.selectedOption.value.w/100 + "x" + $scope.selectedOption.value.h/100
         switch ($scope.newUpload.photoSize){
             case '400x600':
                 $scope.newUpload.price = 6.99;
               break;
             case '500x700':
                 $scope.newUpload.price = 9.99;
               break;
             case '800x1000':
                 $scope.newUpload.price = 14.99;
               break;
             case '500x500':
                 $scope.newUpload.price = 9.99;
                 break;
             case '1000x1000':
                 $scope.newUpload.price = 14.99;
                 break;
             case '1200x1200':
                 $scope.newUpload.price = 19.99;
                 break;
             case '1600x1600':
                 $scope.newUpload.price = 29.99;
                 break;
             case '2000x2000':
                 $scope.newUpload.price = 49.99;
                 break;
             case '3000x3000':
                 $scope.newUpload.price = 69.99;
                 break;
             case '1000x1300':
                 $scope.newUpload.price = 24.99;
                 break;
             case '1000x2000':
                 $scope.newUpload.price = 34.99;
                 break;
             case '1100x1400':
                 $scope.newUpload.price = 49.99;
                 break;
             case '1600x2000':
                 $scope.newUpload.price = 69.99;
                 break;
             case '1800x2400':
                 $scope.newUpload.price = 89.99;
                 break;
             case '2000x2400':
                 $scope.newUpload.price = 99.99;
                 break;
             case '2000x3000':
                 $scope.newUpload.price = 129.99;
                 break;
             case '500x1500':
                 $scope.newUpload.price = 39.99;
                 break;
             case '800x2400':
                 $scope.newUpload.price = 69.99;
                 break;
             case '1200x3600':
                 $scope.newUpload.price = 99.99;
                 break;
             
             default:
                 $scope.newUpload.price = 0.00;
         }
       //  if ($scope.newUpload.medium === 'Canvas'){
//             $scope.newUpload.price += 10;
//         }  

      };
        
        
        

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
        $scope.availableOptions = [
            {
                id: '1',
                name: '4x6, Starts at $6.99',
                value: {
                    w: 400,
                    h: 600
                }
            },
            {
                id: '2',
                name: '5x7, Starts at $9.99',
                value: {
                    w: 500,
                    h: 700
                }
            },
            {
                id: '3',
                name: '8x10, Starts at $14.99',
                value: {
                    w: 800,
                    h: 1000
                }
            },
            {
                id: '4',
                name: '5x5, Starts at $9.99',
                value: {
                    w: 500,
                    h: 500
                }
            },
            {
                id: '5',
                name: '10x10, Starts at $14.99',
                value: {
                    w: 1000,
                    h: 1000
                }
            },
            {
                id: '6',
                name: '12x12, Starts at $19.99',
                value: {
                    w: 1200,
                    h: 1200
                }
            },
            {
                id: '7',
                name: '16x16, Starts at $29.99',
                value: {
                    w: 1600,
                    h: 1600
                }
            },
            {
                id: '8',
                name: '20x20, Starts at $49.99',
                value: {
                    w: 2000,
                    h: 2000
                }
            },
            {
                id: '9',
                name: '30x30, Starts at $69.99',
                value: {
                    w: 3000,
                    h: 3000
                }
            },
            {
                id: '10',
                name: '10x13, Starts at $24.99',
                value: {
                    w: 1000,
                    h: 1300
                }
            },
            {
                id: '11',
                name: '10x20, Starts at $34.99',
                value: {
                    w: 1000,
                    h: 2000
                }
            },
        {
          id: '12',
          name: '11x14, Starts at $49.99',
          value: {
            w: 1100,
            h: 1400
          }
        },
        {
          id: '13',
          name: '16x20, Starts at $69.99',
          value: {
            w: 1600,
            h: 2000
          }
        },
            {
                id: '14',
                name: '18x24, Starts at $89.99',
                value: {
                    w: 1800,
                    h: 2400
                }
            },
        {
          id: '15',
          name: '20x24, Starts at $99.99',
          value: {
            w: 2000,
            h: 2400
          }
        },
        {
          id: '16',
          name: '20x30, Starts at $129.99',
          value: {
            w: 2000,
            h: 3000
          }
            },
            {
                id: '17',
                name: '5x15, Starts at $39.99',
                value: {
                    w: 500,
                    h: 1500
                }
            },
            {
                id: '18',
                name: '8x24, Starts at $69.99',
                value: {
                    w: 800,
                    h: 2400
                }
            },
            {
                id: '19',
                name: '12x36, Starts at $99.99',
                value: {
                    w: 1200,
                    h: 3600
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
            console.log("starting to upload")
            document.getElementById("submitButton").innerHTML = "Uploading...";
            document.getElementById("submitButton").disabled = true;
            $scope.currentData = new Date();
            var croppedImageCorrect = dataURItoBlob($scope.myCroppedImage);
            var storageRef = firebase.storage().ref();
            var metadata = {
                'contentType': croppedImageCorrect.type
            };
            
            storageRef.child('images/' + $scope.file.name).put(croppedImageCorrect, metadata).then(function (snapshot) {
                
                console.log('Uploaded', snapshot.totalBytes, 'bytes.');
                snapshot.ref.getDownloadURL().then(function (url) {
                    console.log('File available at', url);
                    // [START_EXCLUDE]
                    $scope.newUpload.FBImageURL = url;
                    $scope.uploadNewPhoto();
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
