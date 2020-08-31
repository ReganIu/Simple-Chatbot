/**
 * index.js
 * 
 * This is the file that actually gets run when you press
 * the "Start" button. It will set up a web server, and
 * respond to incoming visitors using code you write!
 * 
 * You probably shouldn't change anything in this file
 * (unless you know what you're doing). Instead, have a
 * look at `bot.js` for how to program your very own
 * chatbot!
 */
const express = require('express');

const { botName, introduce, respond } = require('./bot.js');

/**
 * This is going to be our webserver. We need to do some
 * setup before we can start it, though...
 */
const app = express();

/**
 * Serves the `public` directory to the '/' route. This
 * is what lets us see our project as a webpage.
 */
app.use(express.static('public'));

/**
 * Pass specific routes on to the functions defined in
 * `bot.js`
 */
app.get('/name', (req, res) => res.send(botName()));
app.get('/introduce', (req, res) => res.send(introduce()));
app.get('/respond', async (req, res) => res.send(await respond(req.query.message)));

// Start the webserver, listening on port 3000
app.listen(3000, () => console.log('Server started.'));

'';  // Empty statement to keep repl.it's console clean