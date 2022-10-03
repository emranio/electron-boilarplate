import ParcelBundler from './ParcelBundler.mjs';


let Bundler = new ParcelBundler();

Bundler.config = {
    serveOptions: {
        port: 3000
    },
    hmrOptions: {
        port: 3000
    }
}

Bundler.nodeEnv = 'development';
Bundler.watch();