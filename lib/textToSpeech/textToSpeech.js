const axios = require('axios');
const fs = require('fs');
//const util = require('util');
//import { saveData } from '../fileSystem/fileSystem';

/*
RETURN VALUE

string (bytes format)

The audio data bytes encoded as specified in the request, including the header for 
encodings that are wrapped in containers (e.g. MP3, OGG_OPUS). For LINEAR16 audio, 
we include the WAV header. Note: as with all bytes fields, protobuffers use a 
pure binary representation, whereas JSON representations use base64.

A base64-encoded string.

*/
async function mandarinToMp3(text) {
  try {
    console.log(`Fetching translation ${text}`);
    const res = await axios({ method: 'post',
      url: 'https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=AIzaSyBEyPTw_prwSnfFea4TabD4mlBKbRa3Ozw',
      data: {
        "audioConfig": {
          "audioEncoding": "MP3",
          "pitch": 0,
          "speakingRate": 1
        },
        "input": {
          "text": `${text}`
        },
        "voice": {
          "languageCode": "cmn-CN",
          "name": "cmn-CN-Standard-C"
        }
      }
    });

    return res.data.audioContent;
  } catch(err) {
    console.log(err);
    return false;
  }
}

module.exports = { mandarinToMp3 };
