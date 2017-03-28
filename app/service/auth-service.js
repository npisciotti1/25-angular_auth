'use strict';

module.exports = ['$log', '$q', '$http', '$window', authService];

//hard-coded becuase my .env was being a bitch
process.env.API_URL = 'https://cfgram-staging-nikko.herokuapp.com';

function authService($log, $q, $http, $window) {
  $log.debug('auth service');

  let service = {};
  let token = null;

  function setToken(_token) {
    $log.debug('authService.setToken');

    if(!token) return $q.reject(new Error('no token'));

    $window.localStorage.token = _token;
    token = _token;
    return $q.resolve(token);
  }

  service.getToken = function() {
    $log.debug('authService.getToken');

    if (token) return $q.resolve(token);

    token = $window.localStorage.token;

    if (token) return $q.resolve(token);

    return $q.reject(new Error('token not found'));
  };

  service.signup = function(user) {
    $log.debug('authService.signup');

    let url = `${process.env.API_URL}/api/signup`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    return $http.post(url, user, config)
    .then( res => {
      $log.log('success', res.data);
      return setToken(res.data);
    })
    .catch( err => {
      $log.error('error:', err.message);
      return $q.reject(err);
    });
  };

  service.logout = function() {
    $log.debug('authService.logout');

    delete $window.localStorage.token;
    token = null;
    return $q.resolve();
  };

  service.login = function(user) {
    $log.debug('authService.login');

    let url = `${process.env.API_URL}/api/login`;
    let base64 = $window.btoa(`${user.username}:${user.password}`);
    let config = {
      headers: {
        'Authorization': `Basic ${base64}`,
        'Accept': 'application/json'
      }
    };

    return $http.get(url, user, config)
    .then( res => {
      $log.log('success', res.data);
      return setToken(res.data);
    })
    .catch( err => {
      $log.log('error', err.message);
      return $q.reject(err);
    });
  };

  return service;
}
