'use strict';

var exports = module.exports = {};

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

    } else if (IDFormat === 'steam32ID') {
      const parts = steamID.split(':');
      if (parts.length !== 3 || parts[0] !== 'STEAM_0') {
        throw new Error('Invalid SteamID32 format');
      }

      const y = Number(parts[1]);
      const z = Number(parts[2]);

      if (!Number.isInteger(y) || y < 0 || y > 1 || !Number.isInteger(z) || z < 0) {
        throw new Error('Invalid SteamID32 values');
      }

      const accountId = BigInt(z) * 2n + BigInt(y);
      const steam64 = 76561197960265728n + accountId;

      return steam64.toString();
    } else if ( IDFormat == 'steam64ID' ) {
      
    return steamID; 
    }
};

exports.steam32ID = function( steamID ) {
  const IDFormat = determineIncomingFormat(steamID);

    var steam32ID = '';
    var middleNumber = '';

    if (IDFormat === 'steam64ID') {
      const steam64 = BigInt(steamID);
      const universeBase = 76561197960265728n;

      const accountId = steam64 - universeBase;
      const middleDigit = Number(accountId % 2n);           // 0 or 1
      const authServer = Number(accountId / 2n);            // integer division

      return `STEAM_0:${middleDigit}:${authServer}`;

   
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