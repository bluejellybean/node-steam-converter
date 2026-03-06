var assert = require("assert");
var convertTo = require('../index.js');


describe('node-steam-conversions', function(){
  describe('eachConversion', function() {
    it('should should return each conversion when given the 64ID', function(){
      let conversions = convertTo.eachConversion('76561197982486517');
      assert.deepEqual(conversions,
        {
          '3ID': '[U:1:22220789]',
          '32ID': 'STEAM_0:1:11110394',
          '64ID':'76561197982486517'
        }
      );
    }),
    it('should should return each conversion when given the 32ID', function(){
      let conversions = convertTo.eachConversion('STEAM_0:1:11110394');
      assert.deepEqual(conversions,
        {
          '3ID': '[U:1:22220789]',
          '32ID': 'STEAM_0:1:11110394',
          '64ID':'76561197982486517'
        }
      );
    }),
    it('should should return each conversion when given the 3ID', function(){
      let conversions = convertTo.eachConversion('[U:1:22220789]');
      assert.deepEqual(conversions,
        {
          '3ID': '[U:1:22220789]',
          '32ID': 'STEAM_0:1:11110394',
          '64ID':'76561197982486517'
        }
      );
    }),
    it('should return error when provided with invalid input', function(){
      try {
        let conversions = convertTo.eachConversion('');
      } catch (err) {
        assert.equal(err, new Error('invalid input format'));
      }
    })
  })

  describe('steam32ID', function(){
    it('should should return the 32ID when given the 64ID', function(){
      const steam32ID = convertTo.steam32ID( '76561197982486517');
      assert.equal( 'STEAM_0:1:11110394', steam32ID );
      })
    
    it('should should return the 32ID when given the 3ID', function(){
      const steam32ID = convertTo.steam32ID( '[U:1:22220789]');
      assert.equal( 'STEAM_0:1:11110394', steam32ID );
    })

    it('should should return the 32ID when given the 32ID', function(){
      const steam32ID = convertTo.steam32ID( 'STEAM_0:1:11110394');
      assert.equal( 'STEAM_0:1:11110394', steam32ID );
    })
  })

  describe('steam64ID', function(){
    it('should should return the 64ID when given the 3ID', function(){
      const steam64ID = convertTo.steam64ID( '[U:1:22220789]');
      assert.equal('76561197982486517', steam64ID);

    }),
    it('should should return the 64ID when given the 32ID', function(){
      const steam64ID = convertTo.steam64ID( 'STEAM_0:1:11110394');
      assert.equal('76561197982486517', steam64ID);
      })
    }),

    it('should should return the 64ID when given the 64ID', function(){
      const steam64ID = convertTo.steam64ID( '76561197982486517');
      assert.equal('76561197982486517', steam64ID);
    })
  
  describe('steam3ID', function(){
    it('should return the 3ID when given the 64ID', function () {
      const steam3ID = convertTo.steam3ID( '76561197982486517');
      assert.equal('[U:1:22220789]', steam3ID);
    })
  
    it('should return the 3ID when given the 32ID', function () {
      const steam3ID = convertTo.steam3ID('STEAM_0:1:11110394');
      assert.equal('[U:1:22220789]', steam3ID);
    })  

    it('should return the 3ID when given the 3ID', function () {
      const steam3ID = convertTo.steam3ID( '[U:1:22220789]');
      assert.equal('[U:1:22220789]', steam3ID);
    })
  })

  describe('error handling', function() {
    it('should return error when provided with invalid input', function() {
      try {
        convertTo.steam64ID('abc');
        } catch(err) {
          assert.equal(err, new Error('invalid input format'));
      }
    })
  })
});