'use strict';

require('./_landing-modal.scss');

module.exports = {
  template: require('./landing-modal.html'),
  controller: ['$log', '$uibModal', '$scope', LandingModalController],
  controllerAs: 'landingModalCtrl'
};

function LandingModalController($log, $uibModal, $scope) {
  $log.debug('LandingModalController');

  this.createModal = function() {
    let modal = $uibModal.open({
      backdrop: 'static',
      keyboard: true,
      backdropClick: false,
      template: require('./landing-modal-content.html'),
      scope: $scope
    });

    $scope.modalInstance = modal;
    return modal.result;
  };

  this.triggerModal = function() {
    this.createModal()
    .then( (data) => {
      this.handleSuccess(data);
    })
    .then(null, (reason) => {
      this.handleDismiss(reason);
    });
  };

  this.yes = function() {
    $scope.modalInstance.close('Yes Button Clicked');
  };

  this.no = function() {
    $scope.modalInstance.dismiss('No Button Clicked');
  };

  this.handleSuccess = function(data) {
    $log.info('Modal closed: ' + data);
  };

  this.handleDismiss = function(reason) {
    $log.info('Modal dismissed: ' + reason);
  };
}
