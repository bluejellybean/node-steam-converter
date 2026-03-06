'use strict';

var exports = module.exports = {};

var bignumber = require('bignumber.js');


function determineIncomingFormat ( steamID ) {
  try {
    if ( steamID.length == 17 ) {
      return 'steam64ID';
    } else if ( steamID.substring(0, 3) == '[U:' ) {
      return 'steam3ID';
    } else if ( steamID.substring(0, 8) == 'STEAM_0:') {
      return 'steam32ID';
    } else {
      new Error('invalid input format')
    }
  } catch (err) {
     new Error('invalid input format')
  }

};

exports.eachConversion = function(steamID) {
  determineIncomingFormat(steamID);
  return {
          '3ID': this.steam3ID(steamID),
          '32ID': this.steam32ID(steamID),
          '64ID': this.steam64ID(steamID)
  }
}

exports.steam64ID = function( steamID  ) {
  const IDFormat = determineIncomingFormat(steamID);
    var steam64ID = '';

    if ( IDFormat == 'steam3ID' ) {

      steamID = steamID.replace('[U:1:', '');
      steamID.substring(0, steamID.length - 1);


      steam64ID = '765' + (parseInt(steamID) + 61197960265728);

     return steam64ID;

    } else if ( IDFormat == 'steam32ID' ) {

      var middleNumber = steamID.substring(8, 9);
     
      steamID = steamID.replace('STEAM_0:1:', '');
      steamID = steamID.replace('STEAM_0:0:', '');

      steamID = new bignumber(steamID).times(2);

      var additionValue = new bignumber('76561197960265728').plus(middleNumber);
      steamID = new bignumber(steamID).plus(additionValue);

      steam64ID = steamID.c[0].toString() + steamID.c[1].toString();
      return steam64ID;

    } else if ( IDFormat == 'steam64ID' ) {
      
      return steamID;
    
    }
};

exports.steam32ID = function( steamID ) {
  const IDFormat = determineIncomingFormat(steamID);

    var steam32ID = '';
    var middleNumber = '';

    if ( IDFormat == 'steam64ID' ) {
      
      steam32ID = new bignumber(steamID).minus('76561197960265728')

      steam32ID = steam32ID / 2

      middleNumber = new bignumber(steamID).modulo(2)

      steam32ID = 'STEAM_0:' + middleNumber + ':' + parseInt(steam32ID);

      return steam32ID;
    
    } else if ( IDFormat == 'steam3ID' ) {
      const steam64ID = exports.steam64ID( steamID);
      const steam32ID = exports.steam32ID( steam64ID);
      return steam32ID;    
    } else if ( IDFormat == 'steam32ID' ) {
      return steamID;
    }
};

exports.steam3ID = function( steamID ) {
  const IDFormat = determineIncomingFormat(steamID);
  console.log('watf', steamID, IDFormat)
  if ( IDFormat == 'steam64ID' ) {
    var steam3ID = '';

    if ( steamID.toString().length == 17 ) {

      steam3ID = steamID.substring( steamID, 3 ) - 61197960265728;
      steam3ID = '[U:1:' + steam3ID.toString() + ']';
      return steam3ID;
    }
  } else if ( IDFormat == 'steam32ID' ) {
    const steam64ID = exports.steam64ID(steamID);
    const steam3ID = exports.steam3ID(steam64ID);
    return steam3ID;
  } else if ( IDFormat == 'steam3ID') {
    return steamID;
  }
};