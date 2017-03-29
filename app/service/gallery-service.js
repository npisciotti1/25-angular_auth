'use strict';

module.exports = ['$q', '$log', '$http', 'authService', galleryService];

function galleryService($q, $log, $http, authService) {
  $log.debug('galleryService');

  let service = {};
  service.galleries = [];

  service.createGallery = function(gallery) {
    $log.debug('galleryService.createGallery');

    return authService.getToken()
    .then( token => {
      let config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        url: `${process.env.__API_URL__}/api/gallery`,
        data: gallery
      };


      return $http(config);
    })
    .then( res => {
      $log.log('gallery created');
      let gallery = res.data;
      service.galleries.unshift(gallery);
      return gallery;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteGalleries = function(galleryID) {
    $log.debug('galleryService.deleteGalleries');

    return authService.getToken()
    .then( token => {
      let config = {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        url: `${process.env.__API_URL__}/api/gallery/${galleryID}`
      };

      return $http(galleryID, config);
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });

  };

  service.fetchGalleries = function() {
    $log.debug('galleryService.fetchGalleries');

    return authService.getToken()
    .then( token => {
      let config = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        url: `${process.env.__API_URL__}/api/gallery`
      };

      return $http(config);
    })
    .then( res => {
      $log.log('got galleries');
      service.galleries = res.data;
      return service.galleries;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
