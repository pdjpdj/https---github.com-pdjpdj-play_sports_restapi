# play_sports_restapi

Code test for Play Sports REST-API.

## Setup
1) After cloning repo, run `npm install`
2) Need to use MySQL, using the Legacy Password Encryption.
3) Create the database structure using the `youtube.sql` file.
4) Edit the `db_secret.json` file to use the correct connection settings.
5) The `client_secret.json` file contains the data for the OAUTH2 authentication with youtube API. This means that on first running the `quickstart` you shall be asked to authenticate in order to populate the DB.
6) Because of the exposure of the youtube API secrets in `client_secret.json` the access to the API has been limited to only test users with certain email accounts. If you require access please email me at `pdjpdj@gmail.com` with the account you'd like to have access to the API.
7) The quota limit to the API is set to 10,000 a day, this gets run down very quickly when using `quickstart`!

## Running
To start the server use the command `node index.js`

- In Postman, or browser run http://localhost:4040/quickstart/videos to load the initial data from youtube.
- To check the data has loaded use http://localhost:4040/fetch/videos and http://localhost:4040/fetch/channels
- To get a video by id use http://localhost:4040/fetch/videos?id=<VIDEO_ID>
- To remove a video by id use http://localhost:4040/remove/videos?id=<VIDEO_ID>
- To search for videos with a title containing the search term use http://localhost:4040/search/videos?q=<SEARCH_TERM>
