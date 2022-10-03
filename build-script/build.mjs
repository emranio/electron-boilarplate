import ParcelBundler from './ParcelBundler.mjs';


let Bundler = new ParcelBundler();

Bundler.config = {
 // extra config for build if needed.
}

Bundler.nodeEnv = 'production';
Bundler.build();