angular.module('product', ['angular.filter'])
.config(['$interpolateProvider', function($interpolateProvider ,$locationProvider) {
  $interpolateProvider.startSymbol('{{');
  $interpolateProvider.endSymbol('}}');
  // $locationProvider.html5Mode(true);
}])



.controller('adminController',["$scope", "$http", function($scope, $http, $filter) {
    $scope.product={};
    console.log("$scope.product");
    
    $scope.createProduct = function() {
        console.log("$scope.product",$scope.product);


        $http({
          method: 'POST',
          url: '/api/v1/product',
          data: $scope.product,
        
        }).then(function (res) {
        //   createToast("'hotel successfully created!!!'","green");
            
          },
          // failed callback
          function (req) {
            alert("'Something went wrong!!!'");
          })
        
    }

}])


.controller('productController',["$scope", "$http", function($scope, $http, $filter) {
    
    console.log("$scope.product");

    $http({
        method: 'GET',
        url: '/api/v1/product'

      }).then(function successCallback(res) {
          console.log("res",res);
          // $scope.products = res.data.result.product;

          // console.log("$scope.product",$scope.products);

        }, function errorCallback(response) {


      })
        

}])