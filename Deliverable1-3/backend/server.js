const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 1337;

const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://u23692619:Jaco%26u%24%401@flip.rt4rm.mongodb.net/?retryWrites=true&w=majority&appName=Flip";
const client = new MongoClient(uri);

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB once and reuse the connection
let db;
client.connect()
  .then(() => {
    db = client.db('IMYProject');
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

app.get('/api/playlists', (req, res) => {
  res.json(playlists);
});

app.post('/api/register', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ message: 'Database not connected' });
    }

    const users = db.collection('users');
    const { username, password, email, img, pronouns, bio, links } = req.body;

    if (!username || !password || !email || !pronouns || !bio || !links) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await users.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    await users.insertOne({ username, password, email, img, pronouns, bio, links });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Adjust the path to point to the correct frontend directory
const frontendPath = path.join(__dirname, '..', '..', 'frontend', 'public');

// Serve static files from the React app
app.use(express.static(frontendPath));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

async function runFindQuery(collection, query, options) {
  const database = client.db('IMYProject');
  const col = database.collection(collection);
  const cursor = col.find(query, options);
  return await cursor.toArray();
}

//used to insert songs 
async function runInsertPlaylist(name, description, img) {
  try {
    const database = client.db('IMYProject');
    const col = database.collection('playlists');

    const existingPlaylist = await col.findOne({ name: name });
    if (!existingPlaylist) {
      await col.insertOne({
        name: name,
        description: description,
        img: img,
        songs: []
      });
      console.log("Playlist inserted successfully");
    } else {
      console.log("Playlist already exists:", existingPlaylist);
    }
  } catch (error) {
    console.error("Error during insert operation:", error);
  }
}

//used to insert songs
async function runInsertSong(name, artist, img) {
    const database = client.db('IMYProject');
    const col = database.collection('songs');
    
    const existingSong = await col.findOne({ name: name, artist: artist });
    if (!existingSong) {
        await col.insertOne({
            "name": name,
            "artist": artist,
            "img": img
        });
        console.log("Song inserted successfully");
    }
}

//used to insert users
async function runInsertUser(username, password, email, img, pronouns, bio, links) {
    const database = client.db('IMYProject');
    const col = database.collection('users');

    existingUser = await col.findOne({ username: username });
    if (!existingUser) {
        await col.insertOne({
            "username": username,
            "password": password,
            "email": email,
            "img": img,
            "pronouns": pronouns,
            "bio": bio,
            "links": links
        });
        console.log("User inserted successfully");
    }
}

// Insert a song into a playlist
async function runInsertSongToPlaylist(playlistName, songName) {
  const database = client.db('IMYProject');
  const col = database.collection('playlists');
  
  let song = await runFindQuery("songs", { "name": songName }, {});
  let playlist = await runFindQuery("playlists", { "name": playlistName }, {});

  if (!song || song.length === 0 || !playlist || playlist.length === 0) {
      console.log("Song or playlist not found");
      return;
  }
  
  const songId = song[0]._id.toString();
  const songExists = playlist[0].songs.some(id => id.toString() === songId);

  if (!songExists) {
      await col.updateOne({ "name": playlistName }, { $push: { "songs": song[0]._id } });
      console.log("Song inserted into playlist successfully");
  } else {
      console.log("Song already exists in playlist");
  }
}

//edit user 
async function runEditUser(username, email, img, pronouns, bio, links) {
    const database = client.db('IMYProject');
    const col = database.collection('users');

    const existingUser = await col.findOne({ username: username });
    if (existingUser) {
        await col.updateOne({ "username": username }, { $set: { "email": email, "img": img, "pronouns": pronouns, "bio": bio, "links": links } });
        console.log("User updated successfully");
    }
}

let playlists = []; 

(async () => {
    try {
        await client.connect();

        playlists = await runFindQuery('playlists', {}, {});

        // let results = await runFindQuery("songs", { "artist": "Milky Chance" }, {});
        // console.log("Query results:", results);

        // await runInsertSong("Stolen Dance", "Milky Chance", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0aAoYBBRafAb1viE0ah-w73JaJPj8rNDwWg&s");
        // await runInsertUser("test", "test", "test", "test", "test", "test", "test");
        // await runInsertSongToPlaylist("Chill Vibes", "Stolen Dance");
        // await runEditUser("test", "bitch", "damn", "test", "test", "test");

    } catch (error) {
        console.error("Error during operations:", error);
    } finally {
        await client.close(); // Only close once all operations are done
    }
})();


