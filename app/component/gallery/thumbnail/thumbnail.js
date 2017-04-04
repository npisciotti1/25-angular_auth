'use strict';

module.exports = {
  template: require('./thumbnail.html'),
  controller: ['$log', 'picService', ThumbnailController],
  controllerAs: 'thumbnailCtrl',
  bindings: {
    pic: '<'
  }
};

function ThumbnailController($log, picService) {
  $log.debug('ThumbnailController');

  //TODO:Build out this delete function
  this.deletePic = function() {
    $log.debug('thumbnailCtrl.deletePic');
  }
}
