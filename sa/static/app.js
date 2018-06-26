angular.module('product', ['angular.filter'])
.config(['$interpolateProvider', function($interpolateProvider ,$locationProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
  // $locationProvider.html5Mode(true);
}])

.controller('productController', function($scope, $http) {

  $scope.productData=[];

  $http({
    method: 'GET',
    url: '/api/v1/product'
  }).then(function successCallback(response) {
      console.log("res",response);
      $scope.productsData = response.data.result.product;
      console.log("data2",$scope.productsData);
      // $scope.eventData.description= $scope.eventData.description.replace("\n", "<br>");
       
      // this callback will be called asynchronously
      // when the response is available
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
  });
  
onload=function(){
  $scope.location={};
  $scope.location=document.location.search;
  console.log("location",$scope.location);
  $http({
    method: 'GET',
    url: '/api/v1/product'+$scope.location
  }).then(function successCallback(response) {
      console.log("res",response);
      if(response.data.result.product.length>0){
        for(i=0; i<response.data.result.product.length; i++){

        $scope.productData.push(response.data.result.product[i]);
        }
      }
      // $scope.eventData.description= $scope.eventData.description.replace("\n", "<br>");
       
      // this callback will be called asynchronously
      // when the response is available
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
  });
  // $http({
  //   method: 'GET',
  //   url: '/api/v1/product'+$scope.location,
  // }).then(function successCallback(response) {
  //     console.log("res",response);
  //     if(response.data.result.product.length>0){
  //       for(i=0; i<response.data.result.product.length; i++){

  //       $scope.productData.push(response.data.result.product[i]);
  //       }
  //     }
  //     // this callback will be called asynchronously
  //     // when the response is available
  //   }, function errorCallback(response) {
  //     // called asynchronously if an error occurs
  //     // or server returns response with an error status.
  // });

}
$scope.searchBrand=function(brandname){
  console.log('brandname',brandname);
  $scope.productData=[];

  $http({
    method: 'GET',
    url: '/api/v1/product?brand='+brandname,
  }).then(function successCallback(response) {
      console.log("res",response);
      if(response.data.result.product.length>0){
        for(i=0; i<response.data.result.product.length; i++){

        $scope.productData.push(response.data.result.product[i]);
        }
      }
      // this callback will be called asynchronously
      // when the response is available
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
  });

}  
$scope.searchCategory=function(categoryname){
  $scope.productData=[];

  $http({
    method: 'GET',
    url: '/api/v1/product?category='+categoryname,
  }).then(function successCallback(response) {
      console.log("res",response);
      if(response.data.result.product.length>0){
        for(i=0; i<response.data.result.product.length; i++){

        $scope.productData.push(response.data.result.product[i]);
        }
      }
      // this callback will be called asynchronously
      // when the response is available
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
  });

}
$scope.searchProduct=function(){
  $scope.productData=[];
  // $http({
  //   method: 'GET',
  //   url: '/api/v1/product?brand='+$scope.productname
  // }).then(function successCallback(response) {
  //     console.log("res",response);
  //     if(response.data.result.product.length>0){
  //       for(i=0; i<response.data.result.product.length; i++){

  //       $scope.productData.push(response.data.result.product[i]);
  //       }
  //     }
  //     // $scope.eventData.description= $scope.eventData.description.replace("\n", "<br>");
       
  //     // this callback will be called asynchronously
  //     // when the response is available
  //   }, function errorCallback(response) {
  //     // called asynchronously if an error occurs
  //     // or server returns response with an error status.
  // });
  $http({
    method: 'GET',
    url: '/api/v1/product?name='+$scope.productname,
  }).then(function successCallback(response) {
      console.log("res",response);
      if(response.data.result.product.length>0){
        for(i=0; i<response.data.result.product.length; i++){

        $scope.productData.push(response.data.result.product[i]);
        }
      }
      // this callback will be called asynchronously
      // when the response is available
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
  });

}

})


.controller('adminController',["$scope", "$http", function($scope, $http) {
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

.controller('homeController',["$scope", "$http", function($scope, $http) {
  

  $http({
    method: 'GET',
    url: '/api/v1/product'
  }).then(function successCallback(response) {
      console.log("res",response);
      $scope.productsData = response.data.result.product;

      console.log("data2",$scope.productsData);
      // $scope.eventData.description= $scope.eventData.description.replace("\n", "<br>");
        
      // this callback will be called asynchronously
      // when the response is available
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
  });
$scope.searchProduct=function(){
  $scope.location={};
  $scope.location=document.location.origin;
  window.open($scope.location+'/product/list?name='+$scope.productname);
}
      
      

}])

