var app = angular.module('CommentApp', []);

app.controller('PostController', function($scope, fileReader) {
				
				// tie the view to ngModule which saves the JSON to localStorage
    		$scope.comments = localStorage.getItem("comments", "imageSrc");
				$scope.comments = (localStorage.getItem('comments', 'imageSrc')!==null) ? JSON.parse($scope.comments) : [];
				localStorage.setItem('comments', JSON.stringify($scope.comments));
				console.log("Before submit : "+$scope.comments);


        $scope.logo='CryptoMania.jpg';$scope.logo='comment_profile/CryptoMania.jpg';
        $scope.imageSrc='comment_profile/CryptoMania.jpg';$scope.imageSrc='comment_profile/CryptoMania.jpg';
			
				$scope.submit = function() {
          $scope.comments.unshift({
						nameTxt: $scope.nameTxt +":",
            commentTxt: $scope.commentTxt,
            imgURL: $scope.imgURL
					});
					localStorage.setItem("comments", JSON.stringify($scope.comments));
					console.log("After submit : "+$scope.comments);


				};

				
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