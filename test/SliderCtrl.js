/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.ui.slider')
      .controller('SliderCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.uploadFiles = function (files) {
        $scope.files = files;
        console.log(files);
        if (files && files.length) {
            Upload.upload({
                url: 'http://localhost:3030/slider',
                arrayKey: '',
                data: {
                    file: files
                }
             
            }).then(function (response) {
                alert(response.data.msg);
                $timeout(function () {
                    $scope.result = response.data;
                });
            }, function (response) {
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ': ' + response.data;
                }
            }, function (evt) {
                $scope.progress = 
                    Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }
    };
}]);

})();
