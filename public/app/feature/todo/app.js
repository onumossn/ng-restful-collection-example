(function() {

  var app = angular.module('todo', [ 'ui.router', 'ngMessages', 'ngMaterial', 'ngRestfulCollection' ]);

  app.config(function($stateProvider, $urlRouterProvider, $httpProvider, $resourceLibraryProvider, $collectionProvider) {
    angular.extend($resourceLibraryProvider.defaults.baseLinks, {
      Todo: 'http://127.0.0.1:3000/todo'
    });

    angular.extend($collectionProvider.defaults, {
      idKey: '_id'
    });
    
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('todo', {
        abstract: true,
        templateUrl: 'feature/todo/todo.html'
      })
      .state('todo.list', {
        url: '/',
        templateUrl: 'feature/todo/list.html'
      })
      .state('todo.add', {
        url: '/add',
        templateUrl: 'feature/todo/entry.html',
        controller: 'TodoEntryController'
      })
      .state('todo.edit', {
        url: '/edit/:id',
        templateUrl: 'feature/todo/entry.html',
        controller: 'TodoEntryController'
      });
  })
  .controller('TodoEntryController', function($scope, $state, $stateParams, $filter, $collection) {
    var TodoCollection = $collection('Todo');

    if ($stateParams.id) {
      TodoCollection.get({ _id: $stateParams.id }).then(function(todo) {
        $scope.todoItem = todo;
      });
    }

    $scope.saveSuccess = function() {
      $state.go('todo.list');
    };

    $scope.saveError = function() {
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Error')
          .content('Failed to save the todo item. Please try again and again and again!!!')
          .ariaLabel('Error')
          .ok('Got it!')
      );
    };

  });

  angular.bootstrap(document, [ 'todo' ]);
})();