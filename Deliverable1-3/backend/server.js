const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 1337;

const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://u23692619:Jaco%26u%24%401@flip.rt4rm.mongodb.net/?retryWrites=true&w=majority&appName=Flip";
const client = new MongoClient(uri);

// Middleware to parse JSON request bodies
app.use(express.json());

//api/register endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { username, password, email, img, pronouns, bio, links } = req.body;
    const db = client.db('IMYProject');
    const users = db.collection('users');

    // Ensure the friends field is initialized as an empty array
    const newUser = {
      username,
      password,
      email,
      img,
      pronouns,
      bio,
      links,
      friends: [] // Initialize friends as an empty array
    };

    const result = await users.insertOne(newUser);

    res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//api/login endpoint
app.post('/api/login', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('IMYProject');
    const users = db.collection('users');
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await users.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    //user not found
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to get playlists with specific author
app.get('/api/playlists/:author', async (req, res) => {
  try {
    const { author } = req.params;
    const db = client.db('IMYProject');
    const playlists = db.collection('playlists');

    const result = await playlists.find({ author }).toArray();
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching playlists:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//api/playlists endpoint
app.get('/api/playlists', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('IMYProject');
    const playlists = db.collection('playlists');
    const result = await playlists.find({}).toArray();
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching playlists:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//apoi/users/:username endpoint
app.get('/api/users/:username', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('IMYProject');
    const users = db.collection('users');
    const { username } = req.params;

    const user = await users.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to add a friend to the user's friends list
app.post('/api/users/:username/friends', async (req, res) => {
  try {
    const { username } = req.params;
    const { friend } = req.body;
    const db = client.db('IMYProject');
    const users = db.collection('users');

    const result = await users.updateOne(
      { username },
      { $addToSet: { friends: friend } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Friend added successfully' });
  } catch (error) {
    console.error('Error adding friend:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//endpoint to get the friends of a specific user 
app.get('/api/users/:username/friends', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('IMYProject');
    const users = db.collection('users');
    const { username } = req.params;

    const user = await users.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.friends);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//update user profile
app.put('/api/users/:username', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('IMYProject');
    const users = db.collection('users');
    const { username } = req.params;
    const { pronouns, bio, links, img } = req.body;

    const result = await users.updateOne(
      { username },
      { $set: { pronouns, bio, links, img } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
});


// Endpoint to get a playlist by name
app.get('/api/playlists/name/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const db = client.db('IMYProject');
    const playlists = db.collection('playlists');

    const playlist = await playlists.findOne({ name });
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    res.status(200).json(playlist);
  } catch (error) {
    console.error('Error fetching playlist:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// New POST endpoint to create a new playlist
app.post('/api/playlists', async (req, res) => {
  try {
    const { name, description, img, genre, author } = req.body;
    const songs = []; // Initialize an empty array for songs
    const comments = []; // Initialize an empty array for comments

    if (!name || !description || !author || !genre) {
      return res.status(400).json({ message: 'Name, description, genre, and author are required' });
    }

    const db = client.db('IMYProject');
    const playlists = db.collection('playlists');

    //check for duplicates
    const existingPlaylist = await playlists.findOne({ name, author });
    if (existingPlaylist) {
      return res.status(400).json({ message: 'A playlist with this name already exists' });
    }

    const newPlaylist = { name, description, img, genre, author, songs, comments, createdAt: new Date() };
    const result = await db.collection('playlists').insertOne(newPlaylist);

    res.status(201).json({ message: 'Playlist created successfully', playlistId: result.insertedId });
  } catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Endpoint to get a song by _id
app.get('/api/songs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = client.db('IMYProject');
    const songs = db.collection('songs');

    const song = await songs.findOne({ _id: new ObjectId(id) });
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    res.status(200).json(song);
  } catch (error) {
    console.error('Error fetching song:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to add a comment to a playlist
app.post('/api/playlists/:name/comments', async (req, res) => {
  try {
    const { name } = req.params;
    const { comment } = req.body;
    const db = client.db('IMYProject');
    const playlists = db.collection('playlists');

    // Update the playlist's document by adding the comment to the comments array
    const result = await playlists.updateOne(
      { name },
      { $push: { comments: comment } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    res.status(200).json({ message: 'Comment added successfully' });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//get playlist comments
// app.get('/api/playlists/:name/comments', async (req, res) => {
//   try {
//     const { name } = req.params;
//     const db = client.db('IMYProject');
//     const playlists = db.collection('playlists');

//     const playlist = await playlists.findOne({ name });
//     if (!playlist) {
//       return res.status(404).json({ message: 'Playlist not found' });
//     }

//     res.status(200).json(playlist.comments || []);
//   } catch (error) {
//     console.error('Error fetching comments:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });
 
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
  console.log(`Server is running on port ${PORT}`);
});



