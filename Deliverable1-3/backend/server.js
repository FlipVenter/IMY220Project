const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 1337;

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
  console.log(`Serving static files from: ${frontendPath}`);
});

module.exports = app;