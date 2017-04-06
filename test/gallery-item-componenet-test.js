'use strict';

describe('Gallery Item Componenet', function() {

  beforeEach( () => {
    angular.mock.module('cfgram');
    angular.mock.inject(( $rootScope, $componentController, $httpBackend, authService) => {
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
      this.authService = authService;
    });
  });

  describe('galleryItemCtrl.deleteDone', () => {
    it('should call deleteDone', () => {
      let mockBindings = {
        gallery: {
          _id: '1',
          name: 'test name',
          description: 'test description',
          pics: []
        },
        deleteDone: function(data) {
          expect(data.galleryData._id).toEqual('1');
        }
      };

      let galleryItemCtrl = this.$componentController('galleryItem', null, mockBindings);
      galleryItemCtrl.deleteDone({ galleryData: galleryItemCtrl.gallery });
      //add some tests here
      this.$rootScope.$apply();
    });
  });
});
