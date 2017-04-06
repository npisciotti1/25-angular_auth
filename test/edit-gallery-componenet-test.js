'use strict';

describe('Edit Gallery Component', function() {

  beforeEach( () => {
    angular.mock.module('cfgram');
    angular.mock.inject(($rootScope, $componentController, $httpBackend, authService) => {
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
      this.authService = authService;
    });
  });

  it('should contain the proper component bindings', () => {
    let mockBindings = {
      gallery: {
        name: 'test gallery name',
        description: 'test gallery description'
      }
    };

    let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);
    expect(editGalleryCtrl.gallery.name).toEqual(mockBindings.gallery.name);
    expect(editGalleryCtrl.gallery.description).toEqual(mockBindings.gallery.description);

    this.$rootScope.$apply();
  });

  describe('editGalleryCtrl.updateGallery', () => {
    it('should make a valid PUT request', () => {
      let url = 'http://localhost:3000/api/gallery/123';
      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test token'
      };
      let updateData = {
        name: 'updated gallery',
        description: 'whoah this so new',
        _id: '123'
      };

      this.$httpBackend.expectPUT(url, updateData, headers)
      .respond(200);

      let mockBindings = {
        gallery: {
          _id: '123',
          name: 'first gallery',
          description: 'this is old'
        }
      };

      let editGalleryCtrl = this.$componentController('editGallery', null, mockBindings);
      editGalleryCtrl.gallery.name = 'updated gallery';
      editGalleryCtrl.gallery.description = 'whoah this is so new';
      // editGalleryCtrl.updateGallery();
      // .then( gallery => {
      //   write my tests here
      // });

      // this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
});
