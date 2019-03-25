angular.module('mainApp', ['uiCropper'])
	.controller('CropController', ['$scope',
		function ($scope) {
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