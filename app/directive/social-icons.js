'use strict';

module.exports = function(){
  return {
    restrict: 'EAC',
    template: require('./social-icons.html'),
    controller: ['$log', SocialIconsController],
    bindtoController: true,
    controllerAs: 'socialIconsCtrl',
    scope: {
      test: '@'
    }
  };
};

function SocialIconsController($log) {
  $log.debug('SocialIconsController');
  this.icons = ['fb', 'twitter', 'instagram'];
}
