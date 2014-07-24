angular.module("bookStore", [])
    .controller('bookStoreCtrl', function($scope){
        $scope.data = {
            books: [
                {title: "Learn Angularjs", author: "Aj Batja", category: "angularjs", price: 100},
                {title: "Learn Angularjs1", author: "Aj Batja", category: "angularjs1", price: 110},
                {title: "Learn Angularjs2", author: "Aj Batja", category: "angularjs2", price: 200},
                {title: "Learn Angularjs3", author: "Aj Batja", category: "angularjs3", price: 400}
            ]
        };
    });