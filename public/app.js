(function() {
    angular.module('app', [])
        .controller('c1', ['$scope', '$http',
            function($scope, $http) {
                $scope.updateId = false;
                var getC1 = function() {
                    return $http.get('/api/c1').then(function(data) {
                        $scope.c1s = data.data;
                    });
                };

                $scope.addC1 = function(c1) {
                    $http.post('/api/c1', c1).then(function(data) {
                        $scope.c1s.push(data.data);
                    });
                };

                $scope.delC1 = function(c1) {
                    $http.delete('/api/c1/' + c1._id).then(function(data) {
                        $scope.c1s = _.without($scope.c1s, c1);
                    });
                };
                $scope.select = function(c1) {
                    $scope.nc1 = _.clone(c1);
                    $scope.updateId = true;
                };

                $scope.updateC1 = function(c1) {
                    $http.put('/api/c1/' + c1._id, c1).then(function(data) {
                        $scope.updateId = false;
                       
                        var findOne = _.find($scope.c1s, function(elem) {
                            return elem._id === c1._id
                        });

                        findOne.lastName = c1.lastName;
                        findOne.firstName = c1.firstName;
                        findOne.email = c1.email;
                        //console.log(data.data);
                    });
                };
                getC1();
            }
        ]);
})();
