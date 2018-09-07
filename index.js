/**
 * API Wrapper for Bungie.net, built with Node.js
 * @author Milan Urbanec
 */
var rp = require('request-promise');

class BungieNetAPI {
    constructor(config = {}) {
        this.host = 'https:/www.bungie.net';
        this.key = config.key;
        this.userAgent = config.userAgent || promiseRequest.globalAgent;
        this.oauthConfig = {
            id: typeof config.oauthConfig === 'undefined'
                ? null
                : config.oauthConfig.id,
            secret: typeof config.oauthConfig === 'undefined'
                ? null
                : config.oauthConfig.secret,
            url: 'https://www.bungie.net/en/OAuth/Authorize/'
        };
        this.options = {
            uri: this.host,
            method: '',
            headers: {
                'User-Agent': this.userAgent,
                'X-API-Key': this.key
            },
            json: true
        };
    }

    /**
     * oAuth functions
     */
    getOauthToken(code) {
        this.options.path = '/Platform/App/OAuth/Token/';
        this.options.method = 'POST';
        this.options.body = {
            grant_type: 'authorization_code',
            client_id: this.oauthConfig.id,
            code: code
        }
        return promiseRequest(this.options).then(res => formatJson(res));
    }

}