var assert = require("assert");
var convertTo = require('../index.js');


describe('node-steam-conversions', function(){

  describe('steam32ID', function(){
    it('should should return the 32ID when given the 64ID', function(){
      convertTo.steam32ID( '76561197982486517', function (err, steam32ID) {
        assert.equal( 'STEAM_0:1:11110394', steam32ID );
      });
    })
    
    it('should should return the 32ID when given the 3ID', function(){
      convertTo.steam32ID( '[U:1:22220789]', function (err, steam32ID) {
        assert.equal( 'STEAM_0:1:11110394', steam32ID );
      });
    })

    it('should should return the 32ID when given the 32ID', function(){
      convertTo.steam32ID( 'STEAM_0:1:11110394', function (err, steam32ID) {
        assert.equal( 'STEAM_0:1:11110394', steam32ID );
      });
    })

  })

  describe('steam64ID', function(){
    it('should should return the 64ID when given the 3ID', function(){
      convertTo.steam64ID( '[U:1:22220789]', function (err, steam64ID) {
        assert.equal('76561197982486517', steam64ID);
      });
    })
    
    it('should should return the 64ID when given the 32ID', function(){
      convertTo.steam64ID( 'STEAM_0:1:11110394', function (err, steam64ID) {
        assert.equal('76561197982486517', steam64ID);
      });
    })

    it('should should return the 64ID when given the 64ID', function(){
      convertTo.steam64ID( '76561197982486517', function (err, steam64ID) {
        assert.equal('76561197982486517', steam64ID);
      });
    })

  })
  describe('steam3ID', function(){
    it('should return the 3ID when given the 64ID', function () {
      convertTo.steam3ID( '76561197982486517', function (err, steam3ID) {
        assert.equal('[U:1:22220789]', steam3ID);
      });
    })

    it('should return the 3ID when given the 32ID', function () {
      convertTo.steam3ID( 'STEAM_0:1:11110394', function (err, steam3ID) {
        assert.equal('[U:1:22220789]', steam3ID);
      });
    })  

    it('should return the 3ID when given the 6ID', function () {
      convertTo.steam3ID( '[U:1:22220789]', function (err, steam3ID) {
        assert.equal('[U:1:22220789]', steam3ID);
      });
    })

  })

});