var Botkit = require('botkit');

var controller = Botkit.slackbot({
debug: false
});

//connect the bot to a stream of messages

controller.spawn({
token: ''
}).startRTM()


controller.hears(['hello', 'hi', 'hey', 'yo'], 'direct_message,direct_mention,mention', function(bot, message) {
	bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'cupcakebounce',
    });

    bot.startConversation(message, function(err, convo) {
            if (!err) {
                
                    convo.ask("Hi! I'm Bratty! What's your name?", function(response, convo) {
                        convo.ask("_giggle_ " + response.text + "?!? That's silly. Wanna play a game?", [
                            {
                                pattern: bot.utterances.yes,
                                callback: function(response, convo) {                                    
                                    convo.next();
                                }
                            },
                            {
                                pattern: bot.utterances.no,
                                callback: function(response, convo) {                                   
                                    convo.stop();
                                }
                            }
                        ]);

                        convo.next();

                    });

                    convo.on('end', function(convo) {
                        if (convo.status == 'completed') {
                            bot.reply(message, 'YAY! Ok reply with *_Play 1_* or *_Play 2_* to choose!');

                        } else {
                       
                            bot.reply(message, 'FINE! \n http://i.giphy.com/13AXYJh2jDt2IE.gif');
                        }
                    });
                }
            });
        })

// Copycat Game

controller.hears(["play 1", "play one"], 'direct_message,direct_mention', function(bot, message) {
	bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'smirk',
    });
  bot.startConversation(message, startGame);
});

startGame = function(response, convo) {
  convo.ask("OK! You start.", function(response, convo) {
    repeatOne(response, convo);
    convo.next();
  });
}
repeatOne = function(response, convo) {
  convo.ask(response.text, function(response, convo) {
    repeatTwo(response, convo);
    convo.next();
  });
}
repeatTwo = function(response, convo) { 
  convo.ask(response.text, function(response, convo) {
  	repeatThree(response, convo);
    convo.next();
  });
}
repeatThree = function(response, convo) {
  convo.ask(response.text, function(response, convo) {
    repeatFour(response, convo);
    convo.next();
  });
}
repeatFour = function(response, convo) { 
  convo.ask(response.text, function(response, convo) {
  	repeatFive(response, convo);
    convo.next();
  });
}
repeatFive = function(response, convo) {
  convo.ask(response.text, function(response, convo) {
    repeatSix(response, convo);
    convo.next();
  });
}
repeatSix = function(response, convo) { 
  convo.ask(response.text, function(response, convo) {
  	repeatSeven(response, convo);
    convo.next();
  });
}
repeatSeven = function(response, convo) {
  convo.ask(response.text, function(response, convo) {
    repeatEight(response, convo);
    convo.next();
  });
}
repeatEight = function(response, convo) { 
  convo.ask(response.text, function(response, convo) {
  	convo.say("Ugh, I'm bored. Bye!\n http://i.giphy.com/lViBX0uY8QZxK.gif ");
    convo.next();
  });
}

// Why Game

controller.hears(["play 2", "play two"], 'direct_message,direct_mention', function(bot, message) {
	bot.startConversation(message,function(err,convo) {
		convo.ask("What are you doing?", function(response,convo){
			convo.next();
		});
		convo.ask("Why?", function(response,convo){
			convo.next();
		});
		convo.ask("Why?", function(response,convo){
			convo.next();
		});
		convo.ask("Why?", function(response,convo){
			convo.next();
		});
		convo.ask("Why?", function(response,convo){
			convo.next();
		});
		convo.ask("Why?", function(response,convo){
			convo.next();
		});
		convo.ask("Why?", function(response,convo){
			convo.say("Nah, you're wrong. \n http://i.giphy.com/B4ORVnBvJCVvq.gif");
			convo.next();
		});
	});
})


// Tantrum for being sent to Time Out

controller.hears(["timeout", "time Out", "time-out"], 'direct_message,direct_mention', function(bot, message) {
		bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'explosion',
    });

		bot.reply(message, "NO! I DON'T WANNNA GOOOOO!!! \n http://i.giphy.com/14clWZvEUxxH7q.gif");

})

// Naptime command

controller.hears(["naptime", "nap time", "nap-time"], 'direct_message,direct_mention', function(bot, message) {
		bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'zzz',
    });

		bot.reply(message, "But, I'm not sleeeepy. \n http://i.giphy.com/NWg7M1VlT101W.gif");
})

// Tantrum Bomb?!?

controller.hears(["tantrum"], 'direct_message,direct_mention', function(bot, message) {
	bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'explosion',
    });
	bot.startConversation(message,function(err,convo) {
		convo.say("NO!");
		convo.say("I DON'T WANNA!!!!");
		convo.say("YOU'RE STUPID!!");
		convo.say("NO NO NOOOOOO!!!!!!!!!");
		convo.say("_crying_");
		convo.say("I don't like you. \n http://i.giphy.com/xMdJzbfycMgmI.gif")
	});
})

// Help with natural language and commands bolded

controller.hears(["help"], 'direct_message,direct_mention', function(bot, message) {
	bot.reply(message, "Why do _you_ need *help*?! I don't want you to tell me that it's *naptime* or send me to a *timeout*. If you want, we can play a game; I like *play 1* the best, but *play 2* is fun too! I promise I will try my best not to throw a *tantrum* though!")
})

