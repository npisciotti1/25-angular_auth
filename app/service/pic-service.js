'use strict';

module.exports = ['$log', '$q', '$http', 'Upload', 'authService', picService];

function picService($log, $q, $http, Upload, authService) {
  $log.debug('picService');
  let service = {};

  service.uploadGalleryPic = function(galleryData, picData) {
    $log.debug(picService.uploadGalleryPic);

    return authService.getToken()
    .then( token => {
      
      let url = `${process.env.__API_URL__}/api/gallery/${galleryData._id}/pic`;
      let headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      };

      return Upload.upload({
        url,
        headers,
        method: 'POST',
        data: {
          name: picData.name,
          description: picData.description,
          file: picData.file
        }
      });
    })
    .then( res => {
      galleryData.pics.unshift(res.data);
      return res.data;
    })
    .catch( err => {
      $log.debug(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
