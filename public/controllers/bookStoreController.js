angular.module("bookStore")
    .controller('bookStoreCtrl', function($scope, $http){
        $scope.data = {};

        $http.get('/api/books')
            .success(function(data){
                $scope.data.books = data;
            })
            .error(function(error){
                $scope.data.error = error;
            });

    });