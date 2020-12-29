# play_sports_restapi

Code test for Play Sports REST-API.

## Setup
1) After cloning repo, run `npm install`
2) Need to use MySQL, using the Legacy Password Encryption.
3) Create the database structure using the `youtube.sql` file.
4) Edit the `db_secret.json` file to use the correct connection settings.
5) Check the `client_secret.json` file for the youtube API key (API allows certain users to access it)

## Running
To start the server use the command `node index.js`

- In Postman, or browser run http://localhost:4040/quickstart/videos to load the initial data from youtube.
- To check the data has loaded use http://localhost:4040/fetch/videos and http://localhost:4040/fetch/channels
- To get a video by id use http://localhost:4040/fetch/videos?id=<VIDEO_ID>
- To remove a video by id use http://localhost:4040/remove/videos?id=<VIDEO_ID>
- To search for videos with a title containing the search term use http://localhost:4040/search/videos?q=<SEARCH_TERM>
