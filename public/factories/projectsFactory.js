angular.module('factories.projects', [])

.factory('ProjectsFactory', function($http, $q) {

  return {
    create: function(project) {
      var dfd = $q.defer();
      $http.post('/api/projects', project)
      .success(function(data, status, headers, config) {
        dfd.resolve();
      })
      .error(function(data, status, headers, config) {
        dfd.reject(data);
      });
      return dfd.promise;
    },

    delete: function(project) {
      var dfd = $q.defer();
      $http.delete('/api/projects?username=' + project.username + '&repo=' + project.repo)
      .success(function(data, status, headers, config) {
        dfd.resolve();
      })
      .error(function(data, status, headers, config) {
        console.log('fail', arguments);
        dfd.reject(data);
      });
      return dfd.promise;
    }
  }
});

