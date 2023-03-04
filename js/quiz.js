var app = angular.module('myApp', []);

app.directive('quizfpoly', function (quizfactory) {
    return {
        restrict: 'AE',
        scope: {},
        templateUrl: 'template-quiz.html',
        link: function (scope, elem, attrs) {
            scope.start = function () {
                countdown(10, 0);
                scope.subname = ten;
                scope.id = 0;
                scope.inProgess = true;
                scope.sl = 1;
                scope.quizover = false; //chuaw hoanf thanh
                scope.getquestion();
            };
            scope.reset = function () {
                scope.inProgess = false;
                scope.score = 0;
            };
            scope.getquestion = function () {
                var quiz = quizfactory.getquestion(scope.id);
                if (quiz) {
                    scope.question = quiz.text;
                    scope.opstion = quiz.answers;
                    scope.answer = quiz.anwerid;
                    scope.answerMode = true;

                }else{
                    scope.quizover = true;
                }
                // scope.answer = 100;
            }

            scope.checkanswer = function () {
                // alert('sai');
                if (!$('input[ name=answer]:checked').length) return;
                var ans = $('input[ name= answer]:checked').val();
                if (ans == scope.answer) {
                    // alert('Dung');
                    scope.score++;
                    scope.correctAns = true;
                }
                else {
                    // alert('sai');
                    scope.correctAns = false;

                }
                scope.answerMode = false;
            }
            scope.next = function () {
                scope.id++;
                scope.sl++;
                scope.getquestion();
            }
            scope.reset();
        }
    }
});
app.factory('quizfactory', function ($http) {
    $http.get('database/question.json').then(function (res) {
        question = res.data.question;
        var mamon = sessionStorage.getItem('mamon');

        for (let index = 0; index < question.length; index++) {
            // console.log(question[index].idmon);
            if (question[index].idmon === mamon) {
                questions = question[index].mon;
                ten = question[index].ten;
                console.log(ten);
                // console.log(questions);
                // alert('ok');
            }
        }
    });
    return {
        getquestion: function (id) {
            var ramdomItem = questions[Math.floor(Math.random() * questions.length)];
            var count = questions.length;
            if (count > 10) {
                count = 10;
            }
            if (id < count) {
                return ramdomItem;
            } else {
                return false;
            }
        }
    }
});