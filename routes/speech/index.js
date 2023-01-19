const express = require('express');
const speech = require('../../lib/textToSpeech/textToSpeech');
const { saveAudio, saveChar, charExists } = require('../../lib/fileSystem/fileSystem');
const _ = require('lodash');

const router = express.Router();



router.get('/', (req, res) => res.send('speech main'));

// Check if char audio exists
router.post('/charExists', async (req, res) => {
  try {
    const { character } = req.body;
  
    if(charExists(character)) {
      return res.send(true);      
    }
    
    res.send(false);
  } catch(err) {
    console.error(err);
    res.send(false);
  }
})


router.post('/text', async (req, res) => {
  try {
    const { line } = req.body;
  
    // SAVE LINE
    const data = await speech.mandarinToMp3(line);
    const info = await saveAudio(line, data);

    if(_.isEmpty(info)) {
      return res.send(false);
    }
    
    //await saveChars(text);
    
    res.send(true);  
  } catch(err) {
    console.log(err);
    res.send(false);
  }
})




// Create new character audio file
router.post('/char', async (req, res) => {
  try {
    const { character } = req.body;

    if(charExists(character)) {
      return res.send(true);      
    }

    const data = await speech.mandarinToMp3(character);
    await saveChar(character, data);

    res.send(true);
  } catch(err) {
    console.error(err);
    res.send(false);
  }
})


async function saveChars(text)
{
  try {
    const chars = text.split('');
    chars.forEach(
      async(character, index) => {
        if(index < chars.length) {
          if(!charExists(character)) {      
            const data = await speech.mandarinToMp3(character);
            await saveChar(character, data);
            return true;
          } else {
            console.log(character + '.mp3 already exists');
            return false;
          }
        }
    });
  } catch(err) {
    console.error(err);
    throw new Error('Could not save Char');
  }
}

module.exports = router;
