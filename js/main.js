

var app = angular.module("myApp", []);
app.controller("loginCtrl", function ($scope, $http) {

    $scope.login = function () {
        $http.get('https://63f0d92f5b7cf4107e27e2e1.mockapi.io/user')
            .then(function (response) {
                $scope.user = response.data;
                var count = 0;
                $scope.userlogin = null;

                for (let index = 0; index < $scope.user.length; index++) {
                    if ($scope.user[index].username === $scope.myEmail && $scope.user[index].passwork === $scope.pass) {
                        count++;
                        $scope.userlogin = $scope.user[index];
                    }
                }
                if (count == 0) {
                    alert('Tài Khoản Hoặc Mật Khẩu Không Chính Xác');
                    return 0;
                }
                else {
                    alert('Đăng Nhập Thành Công');
                    sessionStorage.setItem('idng',JSON.stringify($scope.userlogin));
                    window.location.href = '/html/index.html';
                    // console.log(sessionStorage.getItem("idng").username);
                    ;
                    return $scope.userlogin;
                }
            })
    };

});

app.controller('registerCtrl', function ($scope, $http) {
    $scope.dangki = function () {
        $http.get('https://63f0d92f5b7cf4107e27e2e1.mockapi.io/user/').then(function (response) {
            var users = response.data;
            for (let index = 0; index < users.length; index++) {
                if (users[index].username === $scope.user.username) {
                    alert('Username đã tồn tại!');
                    return 0;
                }
                else if ($scope.user.username == null || $scope.user.username == '') {
                    alert('Không được để trống username !');
                    return 0;
                }
                else if ($scope.user.passwork != $scope.passwork1) {
                    alert("Mật Khẩu Không Trùng Nhau !");
                    return 0;
                }
            }
            // users.push($scope.user);
            $scope.user.img= 'user.jpg';
            $http.post('https://63f0d92f5b7cf4107e27e2e1.mockapi.io/user/', $scope.user).then(function () {
                alert('Tạo tài khoản thành công!');
            })
        });
    }
});
