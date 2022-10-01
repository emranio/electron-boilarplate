import { Parcel } from '@parcel/core';

/**
  "scripts": {
    "react-start": "parcel -p 3000 index.html --out-dir build",
    "react-build": "parcel build index.html --out-dir build --public-url ./",
    "electron-build": "electron-builder -mwl",
    "clean-build": "rm -rf build/ .cache dist/",
    "build": "yarn clean-build && yarn react-build && yarn electron-build",
    "start": "concurrently \"cross-env BROWSER=none yarn react-start\" \"wait-on http://localhost:3000 && electron . \"",
    "test-bundle": "bundlesize"
  },

 */

let bundler = new Parcel({
    entries: [
        './src/electron.js',
        './src/*.html'
    ],
    defaultTargetOptions: {
        // shouldOptimize: true,
        // shouldScopeHoist: true,
        // sourceMaps: false,
        distDir: './dist',
        engines: 'electron',
        env: {
            NODE_ENV: 'development'
        },
    },
    serveOptions: {
        port: 3000
    },
    hmrOptions: {
        port: 3000
    },
    mode: 'development',
});

let subscription = await bundler.watch((err, event) => {
    if (err) {
        // fatal error
        throw err;
    }

    // console.log(event);

    if (event.type === 'buildSuccess') {
        let bundles = event.bundleGraph.getBundles();
        // console.debug(event.changedAssets);
        // exec('yarn electron');

        console.log(`✨ Built ${bundles.length} bundles in ${event.buildTime}ms!`);
    } else if (event.type === 'buildFailure') {
        console.log(event.diagnostics);
    }
});

// some time later...
// await subscription.unsubscribe();