import {Parcel} from '@parcel/core';

let bundler = new Parcel({
  entries: [
    './src/electron.js',
    './src/*.html'
  ],
  defaultConfig: '@parcel/config-default',
  mode: 'production',
  defaultTargetOptions: {
    distDir: "./output"
  }
//   targets: {
//     "default": {
//       "distDir": "./output"
//     },
//     "backend": {
//       source: './src/electron.js'
//       // entries: './src/electron.js',
//       // distDir: "./output-backend",
//       // "context": "service-worker",
//     },
//     "frontend": {
//       // distDir: "./output-frontend",
//       entries: './src/*.html'
//     }
//   }
});

let subscription = await bundler.watch((err, event) => {
  if (err) {
    // fatal error
    throw err;
  }

  if (event.type === 'buildSuccess') {
    let bundles = event.bundleGraph.getBundles();
    console.log(`✨ Built ${bundles.length} bundles in ${event.buildTime}ms!`);
  } else if (event.type === 'buildFailure') {
    console.log(event.diagnostics);
  }
});

// some time later...
// await subscription.unsubscribe();