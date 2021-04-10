var app = angular.module('myApp', []);
var app = angular.module('myApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider

        .when('/home', {
            templateUrl: 'first.html',
            controller: 'FirstController'
        })

        .when('/customer', {
            templateUrl: 'customer.html',
            controller: 'CustomerController'
        })

        .when('/history', {
            templateUrl: 'history.html',
            controller: 'HistoryController'
        })

        .when('/about', {
            templateUrl: 'about.html',
            controller: 'AboutController'
            
        })

        .otherwise({ redirectTo: '/home' });
});


app.controller('FirstController', function ($scope) {
});

app.controller('CustomerController', function ($scope, $http, $templateCache) {
    $scope.amount = 0;
    $scope.list = function () {
        var url = 'http://localhost:9000/getUsers';
        $http.get(url).success(function (data) {
            $scope.users = data;
        });
    };
    $scope.list();
    $scope.selectFrom = function (dataFrom) {
        $scope.userFrom = dataFrom;
        // $('#select-btn').hide();
        // $('#transfer-btn').show();
    };
    $scope.selectTo = function (dataTo) {
        $scope.userTo = dataTo;
    };

    $scope.Transfer = function (TrFrom, TrTo, amount) {
        var insertMethod = 'POST';
        var updateMethod = 'PUT';
        var inserturl = 'http://localhost:9000/insertUser';
        var updateUrl = 'http://localhost:9000/updateUser';
        $scope.amount = 0;
        if (TrFrom.balance >= amount) {

            var x1 = TrFrom.balance - amount;
            var x2 = TrTo.balance + amount;

            var formData = {
                "nameFrom": TrFrom.name,
                "emailFrom": TrFrom.email,
                "nameTo": TrTo.name,
                "emailTo": TrTo.email,
                "amount": amount
            };
            var jdata = 'mydata=' + JSON.stringify(formData);

            $http({
                method: insertMethod,
                url: inserturl,
                data: jdata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                cache: $templateCache
            }).
                success(function (response) {
                }).
                error(function (response) {
                });

            var UpdateData = {
                "idFrom": TrFrom.email,
                "idTo": TrTo.email,
                "blFrom": x1,
                "blTo": x2
            };
            var udata = 'updatedata=' + JSON.stringify(UpdateData);
            $http({
                method: updateMethod,
                url: updateUrl,
                data: udata,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                cache: $templateCache
            }).
                success(function (response) {
                    window.alert("money transfer successfully");
                    $scope.list();
                }).
                error(function (response) {
                    window.alert("somthing went  wrong");
                });
        }
        else {
            window.alert("Insufficeint Balance ");
        }

    };

});

app.controller('HistoryController', function ($scope, $http) {
    $scope.listHistory = function () {
        var url = 'http://localhost:9000/getHistory';
        $http.get(url).success(function (HistoryData) {
            $scope.history = HistoryData;
        });
    };
    $scope.listHistory();
});

app.controller('AboutController', function ($scope) {
    
});