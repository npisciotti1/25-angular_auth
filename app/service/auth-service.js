'use strict';

module.exports = ['$log', '$q', '$http', '$window', authService];

function authService($log, $q, $http, $window) {
  $log.debug('auth service');

  let service = {};
  let token = null;

  function setToken(_token) {
    $log.debug('authService.setToken');

    if(!_token) return $q.reject(new Error('no token'));

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
    $log.log('process.env.__API_URL__', process.env.__API_URL__);

    let config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      url: `${process.env.__API_URL__}/api/signup`,
      data: user
    };

    return $http(config)
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

    let base64 = $window.btoa(`${user.username}:${user.password}`);
    let config = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Basic ${base64}`
      },
      url: `${process.env.__API_URL__}/api/login`,
    };

    return $http(config)
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
