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

  service.deleteGalleries = function() {
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
        url: `${process.env.__API_URL__}/api/gallery`,
        //may need to check this so backend expects galleryId in proper channel
        data: 'galleryID'
      };

      return $http(config);
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

  service.updateGalleries = function(galleryID, galleryData) {
    $log.debug('galleryService.updateGalleries');

    return authService.getToken()
    .then( token => {
      let config = {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        url: `${process.env.__API_URL__}/api/gallery/${galleryID}`,
        data: galleryData
      };

      return $http(config);
    })
    .then( res => {
      for (let i = 0; i < service.galleries.length; i++) {
        let current = service.galleries[i];
        if (current._id === galleryID) {
          service.galleries[i] = res.data;
          break;
        }
      }
      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteGallery = function(galleryID) {
    $log.debug('galleryService.deleteGallery');

    return authService.getToken()
    .then( token => {
      let config = {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        url: `${process.env.__API_URL__}/api/gallery/${galleryID}`
      };

      return $http(config);
    })
    .then( () => {
      for (let i = 0; i < service.galleries.length; i++) {
        let current = service.galleries[i];
        if (current._id === galleryID) {
          service.galleries.splice(i, 1);
          break;
        }
      }
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
