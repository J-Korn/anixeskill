/* eslint-disable no-mixed-operators */
/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const STREAMS = [
  {
    'token': 'reppa-radio',
    'url': 'https://streaming.myradio1046.fm/myradio1046',
    'metadata': {
      'title': 'Mega Channel',
      'subtitle': 'MyRadio 104,6',
      'art': {
        'sources': [
          {
            'contentDescription': 'Athen\'s New Music Radio',
            'url': 'https://www.myradio1046.fm/myradio_logo.png',
            'widthPixels': 666,
            'heightPixels': 288,
          },
        ],
      },
      'backgroundImage': {
        'sources': [
          {
            'contentDescription': 'Mega Radio',
            'url': 'https://www.myradio1046.fm/MAIN_BG.jpg',
            'widthPixels': 902,
            'heightPixels': 800,
          },
        ],
      },
    },
  }
];

const VIDEO_URL = 'https://ma.anixa.tv/clips/stream/anixesd/index.m3u8',
  VIDEO_TITLE = "AnixeHD",
  VIDEO_SUBTITLE = "Live TV",
  TITLE = 'AnixeHD',
  TEXT = `This is the live feed of Reppa Coin Gallery`;
const pauseVideo = {
    type:"ControlMedia",
    componentId: "videoPlayerId",
    command:"pause"
}  
const showBanner = {
    type:"SetValue",
    componentId:"banner",
    opacity:1
}
const hideBanner = {
    type:"SetValue",
    componentId:"banner",
    opacity:0
}
const setAdBannerSrc = {
    type: "SetValue",
    componentId: "banner",
    property:"source",
    value: "https://i.ibb.co/7KJXXsx/reppa-zoomin-banner.png"
}
const unsetAdBannerSrc = {
    type: "SetValue",
    componentId:"banner",
    property:"source",
    value:""
}
const setVideoWidthMini = {
    type:"SetValue",
    componentId: "videoPlayerId",
    property:"width",
    value:"54.2%"
}
const setVideoHeightMini = {
    type:"SetValue",
    componentId: "videoPlayerId",
    property:"height",
    value:"60.2%"
}
const setVideoOffsetMini = {
    type:"SetValue",
    componentId: "videoPlayerId",
    property:"right",
    value:"14.2%"
}
const setVideoWidthFull = {
    type:"SetValue",
    componentId: "videoPlayerId",
    property:"width",
    value:"100%"
}
const setVideoHeightFull = {
    type:"SetValue",
    componentId: "videoPlayerId",
    property:"height",
    value:"100%"
}
const setVideoOffsetFull = {
    type:"SetValue",
    componentId: "videoPlayerId",
    property:"right",
    value:""
}
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    //return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    return false;
  },
  handle(handlerInput) {
      console.log("handing LaunchRequest");
      var responsetext = ' ';
        if(handlerInput.requestEnvelope.request.locale === 'de-DE'){
            responsetext = `Willkommen bei Münzen Galerie Reppa. Versuchen Sie, „Radio spielen“ oder „Fernsehen spielen“ zu sagen`;
        }else{
            responsetext = `Welcome to Reppa Coin Gallery. You can try "Play Radio" or "Play TV"`;
        }
    if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
        console.log("APL Enabled");
        const documentName = "MegaIntro";
        const token = documentName + "Token";
        var primaryText, secondaryText;
        if(handlerInput.requestEnvelope.request.locale === 'de-DE'){
            primaryText = `Willkommen bei Münzen Galerie Reppa!`;
            secondaryText = 'Probiere „Radio spielen“ oder „Fernsehen spielen“';
        }else{
            primaryText = `Welcome to Reppa Coin Galler!`;
            secondaryText = 'Try "Play Radio" or "Play TV"';
        }
        console.log('doc://alexa/apl/documents/' + documentName);
        handlerInput
        return handlerInput.responseBuilder
            .withShouldEndSession(false)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: token,
                document: {
                    src: 'doc://alexa/apl/documents/' + documentName,
                    type: 'Link'
                },
                datasources: 
                {
    "megaIntroDataSource": {
        "type": "object",
        "objectId": "headlineSample",
        "properties": {
            "title":"",
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "scale":"best-fit",
                "source":"https://scontent.fath2-1.fna.fbcdn.net/v/t1.6435-9/201173409_4074608315965363_3402854177546733348_n.png?_nc_cat=109&ccb=1-5&_nc_sid=e3f864&_nc_ohc=V10vJVDCuTwAX-tJAiR&_nc_ht=scontent.fath2-1.fna&oh=00_AT_6OiwTCU1WwghKSlFM6f3MLiXYh21dtIPf8XRF3r8JUw&oe=620C6BC1",
                "backgroundColor":"#001254"
            },
            "textContent": {
                "primaryText": {
                    "type": "PlainText",
                    "text": "Mega Channel"
                }
            },
            "header":false,
            "logoUrl": "",
            "secondaryText": secondaryText,
            "welcomeSpeechSSML": "<speak><amazon:emotion name='excited' intensity='medium'>"+primaryText+"</amazon:emotion></speak>"
        },
        "transformers": [
            {
                "inputPath": "welcomeSpeechSSML",
                "transformer": "ssmlToSpeech",
                "outputName": "welcomeSpeech"
            }
        ]
    }
}

            })
            //.speak(responsetext)
            //.reprompt(responsetext)
            .withShouldEndSession(false)
            .getResponse();
    }else{
        
        return handlerInput.responseBuilder
            .speak(responsetext)
            .reprompt(responsetext)
            .getResponse();
    }
  },
};

const PlayRadioIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && handlerInput.requestEnvelope.request.intent.name === 'PlayRadioIntent';
  },
  handle(handlerInput) {
    const stream = STREAMS[0];
    var responsetext = ' ';
    if(handlerInput.requestEnvelope.request.locale === 'de-DE'){
        responsetext = 'My Radio spielen 104.6';
    }else{
        responsetext = 'Playing My Radio 104.6';
    }
    handlerInput.responseBuilder
      .speak(responsetext)
      
      .addAudioPlayerPlayDirective('REPLACE_ALL', stream.url, stream.token, 0, null, stream.metadata);
      

    return handlerInput.responseBuilder
      .getResponse();
  }
}

const PlayTvIntentHandler = {
  canHandle(handlerInput) {
    //return handlerInput.requestEnvelope.request.type === 'IntentRequest'
   //&& handlerInput.requestEnvelope.request.intent.name === 'PlayTvIntent';
   return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
        let liveDocumentName = "livePlayer";
        let liveToken = liveDocumentName + "Token";
        return handlerInput.responseBuilder
            .addAudioPlayerStopDirective()
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: liveToken,
                document: {
                    src: 'doc://alexa/apl/documents/' + liveDocumentName,
                    type: 'Link'
                },
                datasources: {}
            })
            //.withShouldEndSession(false)
            .getResponse();
    }else{
        let responseBuilder = handlerInput.responseBuilder;
        var responsetext = ' ';
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['VideoApp']) {
        
            if(handlerInput.requestEnvelope.request.locale === 'de-DE'){
                responsetext = 'Live spielen';
            }else{
                responsetext = 'Playing Live';
            }
        
            responseBuilder
                .addAudioPlayerClearQueueDirective('CLEAR_ALL')
                .addAudioPlayerStopDirective()
                .addDirective({
                    "type": "VideoApp.Launch",
                    "version": "1.0",
                    "videoItem": {
                        "source": VIDEO_URL,
                        "metadata": {
                            "title": TITLE,
                            "subtitle": VIDEO_SUBTITLE
                        }
                    }
                })
                .speak(responsetext)
                .reprompt(responsetext)
        } else {

            if(handlerInput.requestEnvelope.request.locale === 'de-DE'){
                responsetext = 'Das Video kann nicht auf Ihrem Gerät abgespielt werden. Um dieses Video anzusehen, versuchen Sie, diesen Skill von einem Echo-Show-Gerät aus zu starten.';
            }else{
                responsetext = 'The video cannot be played on your device. To watch this video, try launching this skill from an echo show device.';
            }
        
            responseBuilder
                .speak(responsetext)
                .reprompt(responsetext);
        }
        return responseBuilder
        .getResponse();
    }
  }
}

const ShowAdIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ShowAdIntent';
    },
    handle(handlerInput){
        let speakOutput = '';
        let responseBuilder = handlerInput.responseBuilder;
        if(Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            let contextApl = handlerInput.requestEnvelope.context['Alexa.Presentation.APL'];
            if(contextApl && contextApl.token === "livePlayerToken"){
                speakOutput = "Showing advertisement";
                
                
                
                responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.ExecuteCommands',
                    token: 'livePlayerToken',
                    commands:[setAdBannerSrc,setVideoWidthMini,setVideoHeightMini,setVideoOffsetMini]
                })
            }else{
                speakOutput = "Try this command after you have opened the live stream";
            }
        }else{
            speakOutput = "Your device does not support APL";
        }
        console.log(speakOutput);
        return responseBuilder
            .getResponse();
    }
}

const HideAdIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HideAdIntent';
    },
    handle(handlerInput){
        let speakOutput = '';
        let responseBuilder = handlerInput.responseBuilder;
        if(Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            let contextApl = handlerInput.requestEnvelope.context['Alexa.Presentation.APL'];
            if(contextApl && contextApl.token === "livePlayerToken"){
                speakOutput = "Hiding advertisement";

                responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.ExecuteCommands',
                    token: 'livePlayerToken',
                    commands:[unsetAdBannerSrc,setVideoWidthFull,setVideoHeightFull,setVideoOffsetFull]
                })
            }else{
                speakOutput = "Try this command after you have opened the live stream";
            }
        }else{
            speakOutput = "Your device does not support APL";
        }
        console.log(speakOutput);
        return responseBuilder
            .getResponse();
    }
}

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
      var responsetext = ' ';
        if(handlerInput.requestEnvelope.request.locale === 'de-DE'){
            responsetext = 'Probiere „Radio spielen“ oder „Fernsehen spielen“';
        }else{
            responsetext = 'Try "Play Radio" or "Play TV"';
        }

    return handlerInput.responseBuilder
      .speak(responsetext)
      .getResponse();
  },
};

const AboutIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AboutIntent';
  },
  handle(handlerInput) {
    var responsetext = ' ';
        if(handlerInput.requestEnvelope.request.locale === 'de-DE'){
            responsetext = 'Dies ist der Alexa-Skill für München Galerie Reppa';
        }else{
            responsetext = 'This is the Alexa skill for Reppa Gallery of Munich';
        }
    return handlerInput.responseBuilder
      .speak(responsetext)
      .reprompt(responsetext)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (
        handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.LoopOffIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ShuffleOffIntent'
      );
  },
  handle(handlerInput) {
      var goodbyeText = ' ';
        if(handlerInput.requestEnvelope.request.locale === 'de-DE'){
            goodbyeText = 'Auf Wiedersehen';
        }else{
            goodbyeText = 'Goodbye';
        }
    handlerInput.responseBuilder
        .addAudioPlayerClearQueueDirective('CLEAR_ALL')
        .addAudioPlayerStopDirective()
        .withShouldEndSession(true)
        .speak(goodbyeText);

    return handlerInput.responseBuilder
      .getResponse();
  },
};

const PauseIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PauseIntent';
  },
  handle(handlerInput) {
      var pauseText = ' ';
      if(Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            let contextApl = handlerInput.requestEnvelope.context['Alexa.Presentation.APL'];
            if(contextApl && contextApl.token === "livePlayerToken"){
                handlerInput.responseBuilder.addDirective({
                    type: 'Alexa.Presentation.APL.ExecuteCommands',
                    token: 'livePlayerToken',
                    commands:[pauseVideo]
                })
                .getResponse();
            }else{
                
                if(handlerInput.requestEnvelope.request.locale === 'de-DE'){
                    pauseText = 'Was willst du jetzt machen?';
                }else{
                    pauseText = 'What do you want to do now?';
                }
                handlerInput.responseBuilder
                    .addAudioPlayerClearQueueDirective('CLEAR_ALL')
                    .addAudioPlayerStopDirective()
                    .speak(pauseText)
                    .reprompt(pauseText);

                return handlerInput.responseBuilder
                .getResponse();
            }
      }else{
            if(handlerInput.requestEnvelope.request.locale === 'de-DE'){
                pauseText = 'Was willst du jetzt machen?';
            }else{
                pauseText = 'What do you want to do now?';
            }
        handlerInput.responseBuilder
            .addAudioPlayerClearQueueDirective('CLEAR_ALL')
            .addAudioPlayerStopDirective()
            .speak(pauseText)
            .reprompt(pauseText);

        return handlerInput.responseBuilder
          .getResponse();
    }
  },
};

const PlaybackStoppedIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'PlaybackController.PauseCommandIssued'
      || handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackStopped';
  },
  handle(handlerInput) {
    handlerInput.responseBuilder
      .addAudioPlayerClearQueueDirective('CLEAR_ALL')
      .addAudioPlayerStopDirective();

    return handlerInput.responseBuilder
      .getResponse();
  },
};

const PlaybackStartedIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackStarted';
  },
  handle(handlerInput) {
    handlerInput.responseBuilder
      .addAudioPlayerClearQueueDirective('CLEAR_ENQUEUED');

    return handlerInput.responseBuilder
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder
      .getResponse();
  },
};

const ExceptionEncounteredRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'System.ExceptionEncountered';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return true;
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    console.log(handlerInput.requestEnvelope.request.type);
    return handlerInput.responseBuilder
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    //LaunchRequestHandler,
    PlayTvIntentHandler,
    //PlayRadioIntentHandler,
    ShowAdIntentHandler,
    HideAdIntentHandler,
    PlaybackStartedIntentHandler,
    CancelAndStopIntentHandler,
    PauseIntentHandler,
    PlaybackStoppedIntentHandler,
    AboutIntentHandler,
    HelpIntentHandler,
    ExceptionEncounteredRequestHandler,
    SessionEndedRequestHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
