# node-bungieApi
API Wrapper for Bungie.net in Node.js

For more information check official api guide.

https://bungie-net.github.io/multi/index.html

**CAUTION THIS IS STILL IN DEVELOPMENT AND NOT ALL ENDPOINTS ARE READY**

## Install
```
npm install node-bungieapi 
```
## Config
```
const BungieNetAPI = require('node-bungieApi')
export const bungieNet = new BungieNetAPI({
    key: 'X-API-KEY',
    oauthConfig: {
        id: 'CLIENT-ID',
    }
})
```
## Usage
### oAuth
```
BungieNetAPI.app_oAuthToken(code) // code retuned from bungie auth site
    .then(body => {
        var oAuthData = body;
    });
```
### Endpoints
```
BungieNetAPI.destiny2_GetPublicMilestones()
    .then(body => {
        var response = body.Response;
    });
```
## Currently supported endpoints
####User
- GetMembershipDataForCurrentUser 
```
user_GetMembershipsForCurrentUser(accessToken)
```
####Group V2
- GetGroup 
```
groupV2_GetGroup(groupId)
```
- GetMembersOfGroup
```
groupV2_GetMembersOfGroup(groupId)
```
####Destiny2
- GetProfile
```
destiny2_GetProfile(membershipType, destinyMembershipId, destinyComponentType)
```
- GetPublicMilestones
```
destiny2_GetPublicMilestones()
```