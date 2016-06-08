'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
.controller('BusinessFormCtrl', ['$scope', 'lodash', '$http', 'placesservice', function ($scope, lodash, $http, placesservice) {

	var fc = this;
	var _ = lodash;
	fc.title = 'Form';
	fc.showForm = false;
	fc.data;
	fc.formatted = {};
	activate();

	function activate() {

	    //watch function to control data when an address is selected
	    $scope.$watch('fc.data', function () {
	        placesservice.clearLocation(fc.formatted);
	        fc.showForm = false;
	        fc.showWarning = false;
	        fc.availableNumbers = null;

	        //if the address is selected from the google places
	        if (placesservice.isValid(fc.data)) {

	            fc.formatted = placesservice.formatLocation(fc.data);
	            
	            //make sure the location has a valid street address
	            if (fc.formatted.address !== '') {
	                fc.showForm = true;
	                fc.availableNumbers = [{
	                    friendlyName: '954-540-5747'
	                }, {
	                    friendlyName: '888-867-5309'
	                }];

	            //if not, show warning message
	            } else {
	                fc.showWarning = true;
	            }

	            
	        }
	    });
	}
}]);
