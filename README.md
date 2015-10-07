# node-steam-converter

```node-steam-converter``` is a library for node/io.js written in javascript. It converts any valid steamID to any other valid steamID.

# Installation

```
npm install node-steam-converter
```

# Examples

```
var convertTo = require('node-steam-converter');

convertTo.steam64ID('76561197982486517', function(err, steam64ID) {
  //76561197982486517
  console.log(err, steam64ID);
});

convertTo.steam3ID('STEAM_0:1:11110394', function(err, steam3ID) {
  //[U:1:22220789]
  console.log(err, steam3ID);
});

convertTo.steam32ID('76561197982486517', function(err, steam32ID) {
  //STEAM_0:1:11110394
  console.log(err, steam32ID);
});

```



---

# Contribute

Pull requests are welcomed and encouraged!

--

If you have any questions, suggestions, or bugs reports please feel free to contact me at alexbarkell@gmail.com or open an issue.

