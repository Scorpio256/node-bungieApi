/**
 * API Wrapper for Bungie.net, built with Node.js
 * @author Milan Urbanec
 */
var rp = require('request-promise');

class BungieNetAPI {
    constructor(config = {}) {
        this.host = 'https://www.bungie.net';
        this.key = config.key;
        this.userAgent = config.userAgent || rp.userAgent;
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
     * Return Authorization token
     * @param {string} code
     */
    app_oAuthToken(code) {
        this.options = {
            method: 'POST',
            uri: this.host + '/Platform/App/OAuth/Token/',
            form: {
                client_id: this.oauthConfig.id,
                grant_type: 'authorization_code',
                code: code
            }
        };
        return rp(this.options)
            .then(body => JSON.parse(body))
            .catch(function (err) {
                console.log(err);
            });
    }


    /* GROUP v2 */

    /**
     * GroupV2.GroupSearch
     * Search for Groups.
     * TODO: return error 18 InvalidParameters
     * @param name
     */
    groupV2_Seach(name) {
        this.options.method = 'POST';
        this.options.uri = this.host + '/Platform/GroupV2/Search/';
        this.options.body = {
            // Type: string
            "name": name,
            // Type: GroupType:Enum
            "groupType": 1,
            // Type: GroupDateRange:Enum
            "creationDate": 0,
            // Type: GroupSortBy:Enum
            "sortBy": 0,
            // Type: integer:int32:nullable
            "groupMemberCountFilter": 0,
            // Type: string
            "localeFilter": "en",
            // Type: string
            //"tagText": "",
            // Type: integer:int32
            "itemsPerPage": 10,
            // Type: integer:int32
            "currentPage": 0,
            // Type: string
            //"requestContinuationToken": {},
            // Type: GroupQuery
        }
        return rp(this.options)
            .then(body => body)
            .catch(function (err) {
                console.log(err);
            });
    }

    /**
     * GroupV2.GetGroup
     * Get information about a specific group of the given ID.
     * @param {int} groupId Requested group's id. Type: int64
     */
    groupV2_GetGroup(groupId) {
        this.options.method = 'GET';
        this.options.uri = this.host + '/Platform/GroupV2/' + groupId + '/';
        return rp(this.options)
            .then(body => body)
            .catch(function (err) {
                console.log(err);
            });
    }

    /**
     * GroupV2.GetMembersOfGroup
     * Get the list of members in a given group.
     * @param {int} groupId Requested group's id. Type: int64
     */
    groupV2_GetMembersOfGroup(groupId) {
        this.options.method = 'GET';
        this.options.uri = this.host + '/Platform/GroupV2/' + groupId + '/Members/';
        return rp(this.options)
            .then(body => body)
            .catch(function (err) {
                console.log(err);
            });
    }

}


module.exports = BungieNetAPI;
