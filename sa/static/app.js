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
          url: 'http://127.0.0.1:8000/api/v1/product',
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
$scope.products=[];

    $http({
        method: 'GET',
        url: '/api/v1/product'

      }).then(function successCallback(res) {

          $scope.products = res.data.result.product;

          console.log("$scope.product",$scope.products);

        }, function errorCallback(response) {


      })
        

}])