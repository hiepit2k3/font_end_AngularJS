var app = angular.module("myApp", []);
app.controller("myCtrl", function ($scope, $http) {
    $http.get("./database/question.json").then(function (response) {
        $scope.questions = response.data;
    });
});