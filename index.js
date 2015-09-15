'use strict';

var exports = module.exports = {};

var bignumber = require('bignumber.js');


var determineIDFormat = function (steamID, callback) {

  if ( steamID.length == 17 ) {
    callback( null, 'steam64ID' );
  } else if ( steamID.substring(0, 3) == '[U:' ) {
    callback( null, 'steam3ID' );
  } else if ( steamID.substring(0, 8) == 'STEAM_0:') {
    callback( null, 'steam32ID' );
  }

};

exports.steam64ID = function( steamID, callback ) {
  determineIDFormat(steamID, function(err, incomingStyle) {
    var steam64ID = '';

    if ( incomingStyle == 'steam3ID' ) {

      steamID = steamID.replace('[U:1:', '');
      steamID.substring(0, steamID.length - 1);


      steam64ID = '765' + (parseInt(steamID) + 61197960265728);

      callback( null, steam64ID );

    } else if ( incomingStyle == 'steam32ID' ) {

      var middleNumber = steamID.substring(8, 9);
     
      steamID = steamID.replace('STEAM_0:1:', '');
      steamID = steamID.replace('STEAM_0:0:', '');

      steamID = new bignumber(steamID).times(2);

      var additionValue = new bignumber('76561197960265728').plus(middleNumber);
      steamID = new bignumber(steamID).plus(additionValue);

      steam64ID = steamID.c[0].toString() + steamID.c[1].toString();
      callback( null, steam64ID);

    } else if ( incomingStyle == 'steam64ID' ) {
      
      callback( null, steamID);
    
    }
  });
};

exports.steam32ID = function( steamID, callback ) {
  determineIDFormat(steamID, function(err, incomingStyle) {

    var steam32ID = '';
    var middleNumber = '';

    if ( incomingStyle == 'steam64ID' ) {
      
      steam32ID = new bignumber(steamID).minus('76561197960265728')

      steam32ID = steam32ID / 2

      middleNumber = new bignumber(steamID).modulo(2)

      steam32ID = 'STEAM_0:' + middleNumber + ':' + parseInt(steam32ID);

      callback(null, steam32ID);
    
    } else if ( incomingStyle == 'steam3ID' ) {
    
      exports.steam64ID( steamID, function(err, steam64ID) {
        exports.steam32ID( steam64ID, function(err, steam32ID) {

          callback( err, steam32ID )

        });
      });
    
    } else if ( incomingStyle == 'steam32ID' ) {

      callback( null, steamID );

    }
  });
};

exports.steam3ID = function( steamID, callback ) {
  determineIDFormat(steamID, function(err, incomingStyle) {
    if ( incomingStyle == 'steam64ID' ) {
      var steam3ID = '';

      if ( steamID.toString().length == 17 ) {

        steam3ID = steamID.substring( steamID, 3 ) - 61197960265728;
        steam3ID = '[U:1:' + steam3ID.toString() + ']';

        callback ( null, steam3ID );

      }
    
    } else if ( incomingStyle == 'steam32ID' ) {

      exports.steam64ID(steamID, function(err, steam64ID) {
        exports.steam3ID(steam64ID, function(err, steam3ID) {

          callback( err, steam3ID );

        });
      });

    } else if ( incomingStyle == 'steam3ID') {

      callback( null, steamID );

    }
  });
};