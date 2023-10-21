var app = angular.module('CommentApp', []);
app.controller('PostController', function($scope, $timeout, $interval, fileReader) {
				
				// tie the view to ngModule which saves the JSON to localStorage
    			$scope.comments = localStorage.getItem("comments", "imageSrc");
				$scope.comments = (localStorage.getItem('comments', 'imageSrc')!==null) ? JSON.parse($scope.comments) : [];
				localStorage.setItem('comments', JSON.stringify($scope.comments));
				console.log("Before submit : "+$scope.comments);


        //---> all array here are stored in comment_chatArr.js//

        // [   """"""""""""""""""    """"""""""""""""""        ]

        //---> all array here are stored in comment_chatArr.js//
       
				$scope.submit = function() {
          $scope.comments.unshift({
						nameTxt: $scope.nameTxt +":",
            commentTxt: $scope.commentTxt,
            imageSrc: localStorage.getItem('myImage') || 'assets_CB/comment_profile/unknown-profile.svg'
					});
					localStorage.setItem("comments", JSON.stringify($scope.comments));
					console.log("After submit : "+$scope.comments);

				};

//---> Male version of randomize setTimeout or $timeout between 1 - 10 second Start Here//
//---> Male version of randomize setTimeout or $timeout between 1 - 10 second Start Here//

      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function setNewInterval() {
        var randomInterval = getRandomInt(1000, 10 * 1000);
        console.log(randomInterval / 1000 + ' seconds'); //---> check the result of the seconds in console log//
        $timeout(function () {
            randomAllComments();
        }, randomInterval);
    }

    function randomAllComments() {

      var isMale = Math.random() < 0.5; // Randomly select if it's male or female

    var randomNamesIndex;
    var randomImagesIndex;
  
    if (isMale) {
      randomNamesIndex = Math.floor(Math.random() * namesArr.length);
      randomImagesIndex = Math.floor(Math.random() * imagesArr.length);
    } else {
      randomNamesIndex = Math.floor(Math.random() * namesArr2.length);
      randomImagesIndex = Math.floor(Math.random() * imagesArr2.length);
    }
  
    var randomNames = isMale ? namesArr[randomNamesIndex] : namesArr2[randomNamesIndex];
    var randomImages = isMale ? imagesArr[randomImagesIndex] : imagesArr2[randomImagesIndex];
  
    var randomcomments = Math.floor(Math.random() * chatArr.length);
    var randomElement2 = chatArr[randomcomments];

        
          $scope.comments.unshift({
              nameTxt: randomNames,
              commentTxt: randomElement2,
              imageSrc: randomImages

          });
          localStorage.setItem("comments", JSON.stringify($scope.comments));     
        setNewInterval();
    }
    setNewInterval();

    //---> Male version of randomize setTimeout or $timeout End Here//
    //---> Male version of randomize setTimeout or $timeout End Here//



//     //---> Female version of randomize setTimeout or $timeout between 1 - 50 second Start Here//
//     //---> Female version of randomize setTimeout or $timeout between 1 - 50 second Start Here//

// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function setNewInterval2() {
//   var randomInterval = getRandomInt(1000, 50 * 1000);
//   console.log(randomInterval / 1000 + ' seconds'); //---> check the result of the seconds in console log//
//   $timeout(function () {
//       FMrandomAllComments();
//   }, randomInterval);
// }

// function FMrandomAllComments() {

//    var FMrandomNames = Math.floor(Math.random() * namesArr2.length); 
//     var FMrandomElement = namesArr2[FMrandomNames];
//    var randomcomments = Math.floor(Math.random() * chatArr.length); 
//     var FMrandomElement2 = chatArr[randomcomments];
//    var FMrandomImages = Math.floor(Math.random() * imagesArr2.length); 
//     var FMrandomElement3 = imagesArr2[FMrandomImages];
  
//     $scope.comments.unshift({
//         nameTxt: FMrandomElement,
//         commentTxt: FMrandomElement2,
//         imageSrc: FMrandomElement3

//     });
//     localStorage.setItem("comments", JSON.stringify($scope.comments));     
//   setNewInterval2();
// }
// setNewInterval2();

// //---> Female version of randomize setTimeout or $timeout End Here//
// //---> Female version of randomize setTimeout or $timeout End Here//

        

				
    $scope.imageSrc = localStorage.getItem('myImage'); //---> added this code to get and view image on localstorage//
    
    $scope.$on("fileProgress", function(e, progress) {
      $scope.progress = progress.loaded / progress.total;
    });
  });




  app.directive("ngFileSelect", function(fileReader, $timeout) {
    return {
      scope: {
        ngModel: '='
      },
      link: function($scope, el) {
        function getFile(file) {
          fileReader.readAsDataUrl(file, $scope)
            .then(function(result) {
              localStorage.setItem('myImage', result); //---> added this code to set key value and save image on localStorage//
              $timeout(function() {
                $scope.ngModel = result;
              });
            });
        }

        el.bind("change", function(e) {
          var file = (e.srcElement || e.target).files[0];
          getFile(file);
        });
      }
    };
  });

app.factory("fileReader", function($q, $log) {
  var onLoad = function(reader, deferred, scope) {
    return function() {
      scope.$apply(function() {
        deferred.resolve(reader.result);
      });
    };
  };

  var onError = function(reader, deferred, scope) {
    return function() {
      scope.$apply(function() {
        deferred.reject(reader.result);
      });
    };
  };

  var onProgress = function(reader, scope) {
    return function(event) {
      scope.$broadcast("fileProgress", {
        total: event.total,
        loaded: event.loaded
      });
    };
  };

  var getReader = function(deferred, scope) {
    var reader = new FileReader();
    reader.onload = onLoad(reader, deferred, scope);
    reader.onerror = onError(reader, deferred, scope);
    reader.onprogress = onProgress(reader, scope);
    return reader;
  };

  var readAsDataURL = function(file, scope) {
    var deferred = $q.defer();

    var reader = getReader(deferred, scope);
    reader.readAsDataURL(file);

    return deferred.promise;
  };

  return {
    readAsDataUrl: readAsDataURL
  };
});