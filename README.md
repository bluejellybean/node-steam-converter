# node-steam-converter

```node-steam-converter``` is a library for node/io.js written in javascript. It converts any valid steamID to any other valid steamID.

# Installation

```
npm install node-steam-converter
```

# Examples

```
import convertTo from node-steam-converter;

try {

    const converted = convertTo.eachConversion('76561197982486517');
    // -> {
              '3ID': '[U:1:22220789]',
              '32ID': 'STEAM_0:1:11110394',
              '64ID':'76561197982486517'
          }

    const steam64ID = convertTo.steam64ID('76561197982486517');
    // -> 76561197982486517
    const steam3ID = convertTo.steam3ID('STEAM_0:1:11110394');
    // -> [U:1:22220789]
    const steam32ID = convertTo.steam32ID('76561197982486517');
    // -> STEAM_0:1:11110394
} catch (err) {
    console.log(err);
}
```



---

# Contribute

Pull requests are welcomed and encouraged!

--

If you have any questions, suggestions, or bugs reports please feel free to open an issue.

