const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const express = require('express'),
  router = express.Router();

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/youtube-nodejs-quickstart.json
const SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];
const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
const TOKEN_PATH = TOKEN_DIR + 'youtube-nodejs-quickstart.json';

let filters = []
let resp;

router.get('/videos', (req, res) => {
  resp = res;
  fs.readFile('search_filter', 'utf8', (err, data) => {
    if (err) {
      console.log('Error reading filters: ' + err);
      return;
    }
    filters = data.toString().split('\n');
  })
  
  // Load client secrets from a local file.
  fs.readFile('client_secret.json', (err, content) => {
    if (err) {
      console.log('Error loading client secret file: ' + err);
      return;
    }
    // Authorize a client with the loaded credentials, then call the YouTube API.
    authorize(JSON.parse(content), getData);

    // Test the DB connection:
    // runDummy();
  });
});

function runDummy() {
  let sql = `
    INSERT INTO videos(id, title, date) SELECT ?
    WHERE NOT EXISTS (SELECT title FROM videos WHERE id = ?) LIMIT 1
    `;
  for(let i=0; i < 10; i++) {
    const now = new Date();
    let values = [
      now.getMilliseconds(),
      `test ${now.getMilliseconds()}`,
      now
    ];
    db.query(sql, [values, now.getMilliseconds()], (err, data, fields) => {
      if (err) throw err;
    });
  }
  resp.json({
    status: 200,
    message: "New videos added successfully"
  });
}


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const clientSecret = credentials.installed.client_secret;
  const clientId = credentials.installed.client_id;
  const redirectUrl = credentials.installed.redirect_uris[0];
  const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oauth2Client.getToken(code, (err, token) => {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) throw err;
    console.log('Token stored to ' + TOKEN_PATH);
  });
}

/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function getData(auth) {
  const usernames = ['GlobalCyclingNetwork', 'globalmtb'];

  const service = google.youtube('v3');
  
  usernames.forEach(username => 
    service.channels.list({
      auth: auth,
      part: 'snippet,contentDetails,statistics',
      forUsername: username
    }, (err, response) => {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      const channels = response.data.items;
      if (channels.length == 0) {
        console.log('No channel found.');
      } else {
        console.log('This channel\'s ID is %s. Its title is \'%s\', and ' +
                    'it has %s views.',
                    channels[0].id,
                    channels[0].snippet.title,
                    channels[0].statistics.viewCount);

        let sql = `INSERT INTO channels(id, channel_name) SELECT ?
        WHERE NOT EXISTS (SELECT title FROM channels WHERE id = ?) LIMIT 1`;
        let values = [
          channels[0].id,
          channels[0].snippet.title
        ];
        db.query(sql, [values, channels[0].id], (err, data, fields) => {
          if (err) throw err;
        });
        filters.forEach( search => getVideos(auth, channels[0].id, search));
      }
  }));
}

function getVideos(auth, id, filter) {
  const service = google.youtube('v3');
  service.search.list({
    auth: auth,
    part: 'id,snippet',
    channelId: id,
    q: filter,
    maxResults: 100
  }, (err, response) => {
    if (err) {
      console.log('Search error: ' + err);
      return;
    }
    const search = response.data.items;
    if (search.length === 0) {
      console.log('nothing from the search');
    } else {
      let sql = `INSERT INTO videos(id, title, date) SELECT ?
      WHERE NOT EXISTS (SELECT title FROM videos WHERE id = ?) LIMIT 1`;
      search.forEach(video => {
        let values = [
          video.id.videoId,
          video.snippet.title,
          video.snippet.publishedAt
        ];
        db.query(sql, [values, video.id.videoId], (err, data, fields) => {
          if (err) throw err;
        });
        console.log(`Search: ${filter} Video name: ${video.snippet.title}, published: ${video.snippet.publishedAt}, id: ${video.id.videoId}`);
      });
    }
    resp.json({
      status: 200,
      message: "New videos added successfully"
    });
  });
}

module.exports = router;
