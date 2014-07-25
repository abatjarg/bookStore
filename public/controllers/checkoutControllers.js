/**
 * Created by abatjarg on 7/24/14.
 */

angular.module('bookStore')
    .controller('checkoutSummaryCtrl', function($scope, cart){

        $scope.cartData = cart.getProduct();

        $scope.total = function(){
            var total = 0;
            for(var i=0; i<$scope.cartData.length; i++){
                total += ($scope.cartData[i].price * $scope.cartData[i].count);
            }
            return total;
        };

        $scope.remove = function(id){
            cart.removeProduct(id);
        };

    });