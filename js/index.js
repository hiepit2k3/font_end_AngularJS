var app = angular.module('myapp', []);

app.controller('myctrl', function ($scope, $http) {
    $http.get("./database/examinations.json").then(function (response) {
        $scope.examinations = response.data.examinations;
        return console.log($scope.examinations);
    });
    $scope.checkquestion = function (id) {
        if ($scope.checklogin()) {
            return window.location.href = '/html/login.html';
        }
        else {
            sessionStorage.setItem('mamon', id);
            window.location.href = '../html/quiz.html';
        }
    };
    $scope.checklogin = function () {
        var check = false;
        var id = sessionStorage.getItem("idng");
        if (id == '' || id == null) {
            alert('Vui lòng đăng nhập trước khi thi');
            return check = true;
        }
        else {
            return false;
        }
    }
});
app.controller('myuser', function ($scope, $http) {
    $scope.checknd = false;
    $scope.thongtin_user = JSON.parse(sessionStorage.getItem("idng"));
    // console.log(thongtin_user);
    if ($scope.thongtin_user != null) {
        $scope.checknd = true;
    }
    $scope.logout = function () {
        alert('Đăng xuất thành công!')
        sessionStorage.removeItem("idng");
        window.location.href = '../html/login.html';
    }
    window.onload = function () {
        $scope.sessi = sessionStorage.getItem('idng');
        if ($scope.sessi !== null) {
            $scope.list = $scope.sessi;
        }
    }
    $scope.change = false;
    $scope.user = {
        username: $scope.thongtin_user.username,
        passwork: $scope.thongtin_user.passwork,
        img: $scope.thongtin_user.img,
        fullname: $scope.thongtin_user.fullname,
        diachi: $scope.thongtin_user.diachi,
        ngaysinh: $scope.thongtin_user.ngaysinh,
        sdt: $scope.thongtin_user.sdt,
        emai: $scope.thongtin_user.emai,
        id: $scope.thongtin_user.id
    }
    console.log($scope.user);
    $scope.edituser = () => {
        if ($scope.thongtin_user !== null) {
            $scope.thongtin_user = $scope.user
            sessionStorage.setItem("idng", JSON.stringify($scope.thongtin_user));
            $http.put('https://63f0d92f5b7cf4107e27e2e1.mockapi.io/user/' + $scope.thongtin_user.id, $scope.thongtin_user).then(function (response) {
                alert('Cập Nhật Thành Công');
            });
        }
        else {
            $scope.change = true;
            alert('Cập Nhật Thất Bại');
            console.log("cap nhat that bai");
        }
    }
});
app.controller('changePassword', function ($scope, $location, $http) {

    $scope.userthongtin = JSON.parse(sessionStorage.getItem("idng"));

    $scope.password = '';
    $scope.newpassword = '';
    $scope.confirmPassword = '';
    $scope.errPassword = false;
    $scope.changePassword = function () {
        // alert("ok dfjgndkfjsghj");       


        // alert($scope.userthongtin.passwork);
        // alert($scope.password);
        if ($scope.userthongtin.passwork === $scope.password && $scope.newpassword === $scope.confirmPassword) {
            $scope.userthongtin.passwork = $scope.newpassword;
            sessionStorage.setItem("idng", JSON.stringify($scope.userthongtin));
            $http.put('https://63f0d92f5b7cf4107e27e2e1.mockapi.io/user/' + $scope.userthongtin.id, $scope.userthongtin).then(function (response) {
                alert("Đổi mật Khẩu thành Công!");
                console.log($scope.userthongtin);
            });
        }
    }
});