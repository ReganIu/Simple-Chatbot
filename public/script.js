const $botName = document.querySelector('#bot-name');
const $botMessage = document.querySelector('#bot-message');
const $userInput = document.querySelector('#user-input');
const $inputField = document.querySelector('#input-field');
const $tabTitle = document.querySelector('title');

/**
 * Retrieves text from the server
 * 
 * @param uri The route to fetch from on the server
 * @return The text contained in the server response
 */
async function fetchFromBot(uri) {
    const response = await fetch(`/${uri}`);
    const text = await response.text();
    return text;
}

/**
 * Responds to a user-inputted message with a
 * message from the server.
 * 
 * @param message The message submitted by the user
 * @return The response from the server to the message
 */
async function respondTo(message) {
    return await fetchFromBot(`respond?message=${message}`);
}

/**
 * Updates the message from the bot
 * 
 * Flashes the message as a different colour for a second
 * to make it obvious that the bot has said something new.
 * 
 * @param message The new message that the bot should say
 */
function updateMessage(message) {
    $botMessage.innerText = message;

    $botMessage.classList.add('bot__message--new');
    setTimeout(() => $botMessage.classList.remove('bot__message--new'), 1000);
}

/**
 * Handles a user submission through the input form
 * 
 * Updates the #bot-message element with the response from
 * the server
 */
async function handleSubmit(evt) {
    evt.preventDefault();
    const startTime = Date.now();

    const message = $inputField.value;
    $inputField.value = '';

    const response = await respondTo(message);
    const elapsedTime = Date.now() - startTime;

    // Artificially add a delay to make it seem like
    // the bot is thinking
    setTimeout(
        () => updateMessage(response),
        500 - elapsedTime
    );
}

fetchFromBot('name').then(name => {
    $botName.innerText = name;
    $tabTitle.innerText = name;
});

fetchFromBot('introduce').then(updateMessage);

$userInput.addEventListener('submit', handleSubmit);