
var request = require('request-promise');

botName = () => {
  return 'UofT Bot';
}


// Received free key at https://weatherstack.com/dashboard
const WEATHER_STACK_API_KEY = '7b80c48f84ad7ff5e33aa4b26a287035';

// async means its running at same time as other code
getWeather = async (msg) => {
  const city = msg.split(' in ').slice(-1)[0]
  //const city = msg.split(' in ')[1]
  //console.log(city)
  const weatherURL = `http://api.weatherstack.com/current?access_key=${WEATHER_STACK_API_KEY}&query=${city}`
  
  //await tells the code to wait till we get a response before moving on
  const response = await request(weatherURL, {json: true})
  const weather = response.current.weather_descriptions[0]
  return 'Weather is: ' + weather
}

const movies = {
  horror: ['hereditary', 'blair witch project'],
  comedy: ['rush hour', "despicable me"]
}

const playlist = {
  happy: ['happy by pharell williams'],
  sad: ['my future by billie eilish']
}

getRandomItemInArray = (arr) => {
  var i = Math.floor(Math.random() * arr.length)
  return arr[i]
}

getRandomMovie = (genre) => {
  return getRandomItemInArray(movies[genre])
}

recommendMovie = (msg) => {
  const genres = Object.keys(movies)
  for (let genre of genres){
    if (msg.toLowerCase().includes(genre)){
      return getRandomMovie(genre)
    }
  }
  return "Sorry, I don't know that genre!"
}
//
getRandomSong = (song) => {
  return getRandomItemInArray(playlist[song])
}
recommendMusic = (msg) => {
  const songs = Object.keys(playlist)
  for (let song of songs){
    if (msg.toLowerCase().includes(song)){
      return getRandomSong(song)
    }
  }
  return "Sorry, I don't know that song!"
}

//
const recipes = {
  pie: ['fruit', 'flour'],
  burger: ['bread', 'patty', 'cheese']
}

//
recommendRecipes = (msg) => {
  var ingredient = msg.split(' ')
  var possibleRecipes = []

  Object.entries(recipes)
    .forEach(([key, value]) => {
      const isRecipePossible = value.every((i) => ingredient.includes(i))

      if (isRecipePossible) {
        possibleRecipes.push(key)
      }
    })

    if (possibleRecipes.length > 0){
      return 'We can make a: ' + possibleRecipes.join(', ')
    }else {
      return 'No recipes'
    }
}

/**
 * Introduces the bot to someone or something
 * 
 * @return The bot's self-introduction
 */
introduce = () => {
    return "Hello there! My name is Bot. What's your name?";
}

/**
 * Responds to a message
 * 
 * This is the heart of the bot. This function receives
 * the last message that was sent in the conversation, and
 * uses that to determine what your bot should say in
 * reponse.
 * 
 * @param lastMessage The last thing that was said in the
 *                    conversation
 * @return The bot's response to the last message
 */
respond = (lastMessage) => {
	const lowerCaseMessage = lastMessage.toLowerCase();
	
	if (lowerCaseMessage.includes('my name is')) {
    return "It's nice to meet you!"
	} 
  else if (lowerCaseMessage.includes('movie')) {
		return recommendMovie(lowerCaseMessage)
  }
  else if (lowerCaseMessage.includes('music')) {
		return recommendMusic(lowerCaseMessage)
  }
  else if (lowerCaseMessage.includes('recipe')) {
		return recommendRecipes(lowerCaseMessage)
  } else if (lowerCaseMessage.includes('weather')){
    return getWeather(lowerCaseMessage)
  }
  else {
		return "I am not sure what you mean!"
	}
}

/**
 * This is what lets other files (like `index.js`) access
 * the functions in this file
 */
module.exports = {
    botName,
    introduce,
    respond
};