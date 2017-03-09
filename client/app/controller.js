/**
 * Main application controller
 *
 * You can use this controller for your whole app if it is small
 * or you can have separate controllers for each logical section
 * 
 */
;(function() {

  angular
    .module('boilerplate')
    .controller('MainController', MainController);

  MainController.$inject = ['LocalStorage', 'QueryService'];


  function MainController(LocalStorage, QueryService) {

    // 'controller as' syntax
    var self = this;
    

    ////////////  function definitions


    /**
     * Load some data
     * @return {Object} Returned object
     */
    // QueryService.query('GET', 'posts', {}, {})
    //   .then(function(ovocie) {
    //     self.ovocie = ovocie.data;
    //   });
  }
 angular
    .module('boilerplate')
   .controller('SignupController', ['$scope', '$routeParams' ,'$http','$state','$sce','$rootScope','dataShare',
    function($scope, $routeParams,$http,$state,$sce,$rootScope,dataShare) {
         /*       $rootScope.id = '';
                $scope.$on('data_shared',function(){
                var id =  dataShare.getData();    
                $rootScope.id = id;
        });*/
      $scope.getInfo =function(){
          var dataobj= {firstname: $scope.firstname,
              lastname: $scope.lastname,
              sesso:$scope.sesso,
              dob:$scope.dob,
              location: $scope.location,
              countryCode: $scope.countryCode,
              phone: $scope.phone,
              emails: $scope.emails,
              codice: $scope.codice,

          }
          console.log(dataobj);
         $http({
        method : "POST",
        url : "http://localhost:3030/signup",
        data: dataobj
    }).then(function success(response) {
      
                $scope.message=response.data.msg;
                 $rootScope.id=response.data.id;
               if(response.data.msg){
                     alert(response.data.msg);
                 $state.go('verify');
                }
                else{
                    alert(response.data.ermsg);
                }           
            },function error(response,staus) {
                alert("Failed");
               
            });
      }
          $scope.sendInfo =function(){
          var dataobj= {
              phone: $scope.phone,
             }
          console.log(dataobj);
         $http({
        method : "POST",
        url : "http://localhost:3030/login",
        data: dataobj
    }).then(function success(response) {
      
                $scope.message=response.data.msg;
               $rootScope.id=response.data.id;
                  if(response.data.msg){
                    alert(response.data.msg);
                  $state.go('verify');
                }
                else{
                    alert(response.data.ermsg);
                }                 
            },function error(response,staus) {
                alert("Failed");
               
            });
    
      
    }
      
      $scope.sendCode =function(){
          console.log($rootScope.id);
          var dataobj= {code:$scope.code

          }
          console.log(dataobj);
         $http({
          method : "POST",
          url : "http://localhost:3030/verify/"+$rootScope.id+"/users",
         data: dataobj
    }).then(function success(response) {
                 
                 $scope.message=response.data.msg;

                 alert($scope.message);
                  $scope.id = $rootScope.id;
                 $scope.send = function(){
                    dataShare.sendData($scope.id);
                 }
                 $state.go('dashboard');              
            },function error(response,staus) {
                alert("Failed");
               
            });
    
      
    }
    
    }
  
])

 angular
    .module('boilerplate')
    .controller('RouteController', ['$scope', '$routeParams','$sce','$http','$filter','dataShare','$rootScope','ModalService',
    function($scope, $routeParams,$sce,$http,$filter,dataShare,$rootScope,ModalService,modal) {
              /*  $scope.id = '';
                $scope.$on('data_shared',function(){
                var id =  dataShare.getData();    
                $scope.id = id;
        });*/
        $scope.datas = [];
        $scope.userid=$scope.id;
        console.log($scope.id);
             $http({
        method : "GET",
        url : "http://localhost:3030/getinfo/"+$rootScope.id+"/users",
        params: {message : "hello"}
    }).then(function success(response) {
                $scope.id=response.data.id;
                $scope.fname=response.data.firstname;
                $scope.lname=response.data.lastname; 
                $scope.sesso=response.data.sesso;
                $scope.mob=response.data.mobile;
                $scope.email=response.data.email;
                $scope.dob=response.data.birthdate;
                $scope.loc=response.data.location;
                $scope.credit=response.data.credits;
                $scope.product=response.data.product;
                for(var i=0;i<$scope.product.length;i++){
                    $scope.datas.push($scope.product[i]);
                   
                }
                 if($scope.sesso=='F')
            {
              $scope.sesso="Female";
            }
            else
            {
              $scope.sesso="Male";
            }
            },function error(response,staus) {
               
            });

            $scope.show = function() {
        ModalService.showModal({
            templateUrl: 'modal.html',
            controller: "ModalController",
             scope:$scope
        }).then(function(modal) {
            modal.element.modal();
             
            modal.close.then(function(result) {
                $scope.message = "You said " + result;
            });
        });
    };
         
  

    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.data = [];
    $scope.q = '';
    
    $scope.getData = function () {
    
      return $filter('filter')($scope.data, $scope.q)

    }
    
  
     $scope.images=[
         {src:'/images/1.jpg',desc:'Cars', brand:'carlo', links:'#/watchshow'},
         {src:'/images/2.jpg',desc:'Mattresses', brand:'matsprovs',links:'#/watchshow'},
         {src:'/images/3.jpg',desc:'Jewellery', brand:'jewelson',links:'#/watchshow'},
         {src:'/images/4.jpg',desc:'Decor', brand:'deckor',links:'#/watchshow'},
         {src:'/images/5.jpg',desc:'Music', brand:'muzick',links:'#/watchshow'},
         {src:'/images/6.jpg',desc:'Furniture', brand:'furns',links:'#/watchshow'},
         {src:'/images/7.jpg',desc:'Bags', brand:'baguthei',links:'#/watchshow'},
         {src:'/images/8.jpg',desc:'Gadgets', brand:'gadgetgo',links:'#/watchshow'},
         {src:'/images/9.jpg',desc:'Watches', brand:'watchshow',links:'#/watchshow'},
         
     ];
     
 $scope.numberOfPages=function(){
    
        return ($scope.images.length/$scope.pageSize);   
                   
    }
    for (var i=0; i<9; i++) {
        $scope.data.push($scope.images[i]);
                      
    }
     $scope.totalPages=function(){
    
        $scope.pages =($scope.images.length/$scope.pageSize);
         return Math.ceil($scope.pages);
                   
    }
           
     $scope.updateInfo= function(){
            var dataobj= {
              fname: $scope.fname,
              lname:$scope.lname,
              emails:$scope.email,
              mob:$scope.mob,
              dob:$scope.dob,
              loc:$scope.loc,
              sesso:$scope.sesso
             }
          console.log(dataobj);
         $http({
        method : "POST",
        url : "http://localhost:3030/user/"+$rootScope.id+"/update",
        data: dataobj
    }).then(function success(response) {
      
                $scope.message=response.data.msg;
                 alert($scope.message); 
            },function error(response,staus) {
                alert("Failed");
               
            });
     }


    }    
]);
angular
.module('boilerplate')
.filter('startFrom', function() {
    return function(input, start) {
        start = +start; 
        return input.slice(start);
    }
});
angular
    .module('boilerplate')
   .controller('LoanController', ['$rootScope','$scope','$http','$state','dataShare',
    function($rootScope,$scope,$http,$state,dataShare) {
    $scope.ProductDetails = function(pname,pcost,ptime) {      
    $rootScope.product=pname;
    $rootScope.loan=pcost;
    $rootScope.time=ptime;
}
  
        $scope.sendLoan =function(){
          var dataobj= {
              phone: $scope.phone,
              product:$rootScope.product,
              loan:$rootScope.loan,
              time:$rootScope.time,
             }
          console.log(dataobj);
         $http({
        method : "POST",
        url : "http://localhost:3030/loan",
        data: dataobj
    }).then(function success(response) {
              $scope.id=response.data.id;
                if(response.data.msg){
                    alert(response.data.msg);
                     $scope.send = function(){
                    dataShare.sendData($scope.id);
                 }
                 $state.go('verify');
                }
                else{
                    alert(response.data.ermsg);
                    $state.go('dashboard');

                }
            },function error(response,staus) {
                alert("Failed");
               
            });
    
      
    }
      
    }
  
]);
   

     


angular.module('boilerplate')
.controller('ModalController', function($scope,$http,close) {
  
  $scope.close = function(){

      close();
  }
 $scope.query = function() {
          var dataobj= {
              email: $scope.emails,
              problem:$scope.problem,
              message:$scope.message,
             }
          console.log(dataobj);
         $http({
        method : "POST",
        url : "http://localhost:3030/query",
        data: dataobj
    }).then(function success(response) {
      
                $scope.message=response.data.msg;
                 alert($scope.message); 
            },function error(response,staus) {
                alert("Failed");
               
            });
 	close(); 
 };
});
angular.module('boilerplate')
.factory('dataShare',function($rootScope,$timeout){
  var service = {};
  service.data = false;
  service.sendData = $timeout(function(data){
      this.data = data;
      $rootScope.$broadcast('data_shared');
  },900);
  service.getData = function(){
    return this.data;
  };
  return service;
});
})();



//http://localhost:3000/#/58b935e98305922e9ce9e793/user/AmritaSharma
//58bf9d01ff460c12b97f1b1d
