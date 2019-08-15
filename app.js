var app = angular.module("TestApp", []);
app.controller("TestController",['$scope', '$timeout',function($scope, $timeout){
	var words = ['rat', 'cat', 'bat', 'mat'];
	$scope.incorrectLettersChosen=[];
	$scope.correctLettersChosen=[];
	$scope.guesses = 6;
	$scope.displayWord = "";
	$scope.input = {
		letter: ''
	}
console.log($scope);
	var selectRandomWord = function() {
		var index = Math.round(Math.random()*words.length);
		return words[index];
	}

	var newTest = function() {
		$scope.incorrectLettersChosen=[];
		$scope.correctLettersChosen=[];
		$scope.guesses = 6;
		$scope.displayWord = "";

		selectedWord = selectRandomWord();
		var tempDisplayWord = '';
		console.log(selectedWord);
		if ( selectedWord ) {
			for (var i = 0; i < selectedWord.length; i++) {
				tempDisplayWord+='*';
			}
		}
		console.log(tempDisplayWord);
		$scope.displayWord = tempDisplayWord;
	}

	$scope.letterChoosen = function() {
		for (var i = 0; i < $scope.correctLettersChosen.length; i++) {
			if ( $scope.correctLettersChosen[i].toLowerCase() == $scope.input.letter.toLowerCase()) {
				$scope.input.letter = "";
				return;
			}
		}

		for (var i = 0; i < $scope.incorrectLettersChosen.length; i++) {
			if ( $scope.incorrectLettersChosen[i].toLowerCase() == $scope.input.letter.toLowerCase()) {
				$scope.input.letter = "";
				return;
			}
		}

		var correct = false;
		for (var i = 0; i < selectedWord.length; i++) {
			if ( selectedWord[i].toLowerCase() == $scope.input.letter.toLowerCase() ) {
				$scope.displayWord = $scope.displayWord.slice(0,i)+$scope.input.letter.toLowerCase()+$scope.displayWord.slice(i+1);
				correct = true;
			}
		}
		console.log($scope.displayWord);
		if (correct) {
			$scope.correctLettersChosen.push($scope.input.letter.toLowerCase());
		} else {
			$scope.guesses--;
			$scope.incorrectLettersChosen.push($scope.input.letter.toLowerCase());
		}

		$scope.input.letter= "";
		if ($scope.guesses == 0) {
			$timeout( function() {
				newTest();
			},500);
		} 
		if ($scope.displayWord.indexOf("*")==-1) {
			$timeout( function() {
				newTest();
			},500);
		}
	}

	newTest();
}]);