import { Parcel } from '@parcel/core';
import path from 'path';
const __dirname = path.resolve();

export default class ParcelBundler {
    #bundler;

    constructor() {
        this._nodeEnv = process.env.NODE_ENV ?? 'production';
        this._config = {};
    }
    #_callback = (event, bundles) =>{
        // just an alias
    }

    #initParcel = () => {
        let config = {
            entries: [
                path.resolve(__dirname, './src/electron.js'),
                path.resolve(__dirname, './src/*.html')
            ],
            defaultTargetOptions: {
                shouldOptimize: (this._nodeEnv === 'production' ? true : false),
                shouldScopeHoist: true,
                sourceMaps: (this._nodeEnv === 'production' ? false : true),
                distDir: path.resolve(__dirname, './dist'),
                engines: 'electron',
            },
            mode: this._nodeEnv,

            ...this._config
        };

        this.#bundler = new Parcel(config);
    }

    set config(newConfig) {
        if (typeof newConfig !== 'object' && newConfig.length <= 0) {
            throw' Kindly add valid config';
        }
        this._config = Object.assign(this._config, newConfig);
    }

    set nodeEnv(mode) {
        if (typeof mode !== 'string' && mode.length <= 0) {
            throw' nodeEnv must be string';
        }
        this._nodeEnv = mode;
        this._config = Object.assign(this._config, {mode: mode});
    }

    set callBack(callback){
        if(!callable instanceof Function){
            throw' Callback must be function';
        }
        this.#_callback = callback;
    }

    watch = async() =>{
        this.#initParcel();
        await this.#bundler.watch((err, event) => {
            if (err) {
                // fatal error
                throw err;
            }
            
            if (event.type === 'buildSuccess') {
                let bundles = event.bundleGraph.getBundles();
                this.#_callback(event, bundles);
        
                console.log(`✨ Built ${bundles.length} bundles in ${event.buildTime}ms!`);
            } else if (event.type === 'buildFailure') {
                console.log(event.diagnostics);
            }
        });
    }

    build = async() =>{
        this.#initParcel();
        try {
            let event = await this.#bundler.run();
            let bundles = event.bundleGraph.getBundles();
            this.#_callback(event, bundles);

            console.log(`✨ Built ${bundles.length} bundles in ${event.buildTime}ms!`);
          } catch (err) {
            console.log(err.diagnostics);
          }
    }
  }