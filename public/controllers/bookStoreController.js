angular.module("bookStore")
    .controller('bookStoreCtrl', function($scope, $http, $location, cart){
        $scope.data = {};

        $http.get('/api/books')
            .success(function(data){
                $scope.data.books = data;
            })
            .error(function(error){
                $scope.data.error = error;
            });

        $scope.sendOrder = function(shippingDetails){
            var order = angular.copy(shippingDetails);
            order.products = cart.getProduct();
            $http.post('/api/order', order)
                .success(function(data){
                    $scope.data.orderId = data._id;
                    console.log($scope.data.orderId);
                    cart.getProduct().length = 0;
                })
                .error(function(error){
                    $scope.data.orderError = error;
                })
                .finally(function(){
                    $location.path('/complete');
                });
        };

    });