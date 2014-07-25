/**
 * Created by abatjarg on 7/24/14.
 */

angular.module('cart', [])
    .factory('cart', function(){
        var cartData = [];

        return{

            addProduct: function(id, title, price){
                var addedToExistingItem = false;
                for(var i=0; i< cartData.length; i++){
                    if(cartData[i].id == id){
                        cartData[i].count++;
                        addedToExistingItem = true;
                        break;
                    }
                }
                if(!addedToExistingItem){
                    cartData.push({count: 1, id: id, price: price, title: title});
                }
            },

            removeProduct: function(id){
                for(var i=0; i<cartData.length; i++){
                    if(cartData[i].id==id){
                        cartData.splice(i, 1);
                        break;
                    }
                }
            },

            getProduct: function(){
                return cartData;
            }

        }
    })
    .directive('cartSummary', function(cart){
        return{
            restrict: 'E',
            templateUrl: 'views/cartSummary.html',
            controller: function($scope){
                var cartData = cart.getProduct();
                $scope.total = function(){
                    var total = 0;
                    for(var i=0; i < cartData.length; i++){
                        total+=(cartData[i].price * cartData[i].count);
                    }
                    return total;
                };
                $scope.itemCount = function(){
                    var total = 0;
                    for(var i=0; i< cartData.length; i++){
                        total += cartData[i].count;
                    }
                    return total;
                };
            }
        };
    });