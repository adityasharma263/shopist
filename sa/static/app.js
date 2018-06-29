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

    $scope.productsData = response.data.result.product;
    $scope.brandData = response.data.result.product;
    $scope.categoryData = response.data.result.product;

    console.log("brandData",  $scope.brandData)
    console.log("categoryData",  $scope.categoryData)

    // this callback will be called asynchronously
      // when the response is available
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
  });
  
onload=function(){
  $scope.location={};
  $scope.location=document.location.search;
  
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
  

}
$scope.search=function(searchitem){
  console.log('brandname',searchitem);
  $scope.productData=[];

  $http({
    method: 'GET',
    url: '/api/v1/product?search='+searchitem,
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
$scope.searchBrand=function(brandname){
  console.log('brandname',brandname);
  $scope.productData=[];
  delete $scope.productname;

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
  console.log("categoryname",categoryname);
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


})


.controller('adminController',["$scope", "$http", function($scope, $http) {
    $scope.product={};
    $scope.myvar=false;
    $scope.showHide=function(){
      $scope.myvar=true;
    }
    $scope.hideShow=function(){
      $scope.myvar=false;
    }
    $scope.editProductData=function(data){
      console.log("data",data);
      $scope.product=data;
    }
    $http({
      method: 'GET',
      url: '/api/v1/product'
    }).then(function successCallback(response) {
        console.log("res",response);
        $scope.productsData = response.data.result.product;
  
          
        // this callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
    
    $scope.createProduct = function() {

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
    $scope.updateProduct = function() {

      console.log("id",$scope.product);
      $http({
        method: 'PUT',
        url: '/api/v1/product/'+$scope.product.id,
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
  
  $scope.categoryData=[];
  $http({
    method: 'GET',
    url: '/api/v1/product'
  }).then(function successCallback(response) {
      $scope.productsData = response.data.result.product;
      $scope.brandData = response.data.result.product;

      $scope.categoryData = response.data.result.product;

      // $scope.eventData.description= $scope.eventData.description.replace("\n", "<br>");
        
      // this callback will be called asynchronously
      // when the response is available
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
  });
  $scope.searchBrand=function(brandname){
    console.log("name",brandname);
    window.open('/product?brand='+brandname,'_self');
  }
  $scope.searchCategory=function(categoryname){

    window.open('/product?category='+categoryname,'_self');
  }
$scope.searchProduct=function(){

  window.open('/product?search='+$scope.productname,'_self');
}
      
      

}])

