$(() => {
  let currentQuestion = 0;
  let numCorrect = 0;
  let emoji;
  let wrong = [];
  let readyForSubmit = true;

  const emojis = [{
    name: 'grinning',
    src: 'https://emojipedia-us.s3.amazonaws.com/thumbs/144/apple/118/grinning-face-with-smiling-eyes_1f601.png',
    alt: "Apple' Grinning Emoji with smiling eyes"
  }, {
    name: 'smiling',
    src: 'https://emojipedia-us.s3.amazonaws.com/thumbs/144/apple/118/smiling-face-with-open-mouth-and-cold-sweat_1f605.png',
    alt: "Apple's Smiling Emoji with open mouth and cold sweat"
  }, {
    name: 'neutral',
    src: 'https://emojipedia-us.s3.amazonaws.com/thumbs/144/apple/118/neutral-face_1f610.png',
    alt: "Apple's neutral Emoji"
  }, {
    name: 'frowning',
    src: 'https://emojipedia-us.s3.amazonaws.com/thumbs/144/apple/118/white-frowning-face_2639.png',
    alt: "Apple's frowning Emoji"
  }, {
    name: 'crying',
    src: 'https://emojipedia-us.s3.amazonaws.com/thumbs/144/apple/118/crying-face_1f622.png',
    alt: "Apple's crying Emoji"
  }, {
    name: 'thinking',
    src: 'https://emojipedia-us.s3.amazonaws.com/thumbs/120/twitter/120/thinking-face_1f914.png',
    alt: "Twitter's thinking Emoji"
  }]

  const QA = [{
    question: 'Which of the following is NOT a reserved word in JavaScript',
    answers: ['var', 'goto', 'do', 'continue'],
    type: 'js',
    correctAnswer: 1,
    link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar',
    description: 'JavaScript Reserved Words'
  }, {
    question: 'What is the function used as a parameter in JQuery functions called?',
    answers: ['later', 'callback', 'after', 'None of the above'],
    type: 'js',
    correctAnswer: 1,
    link: 'https://developer.mozilla.org/en-US/docs/Glossary/Callback_function',
    description: 'Callback functions'
  }, {
    question: 'Which of the following is NOT an HTML element?',
    answers: ['region', 'wbr', 'u', 'track'],
    type: 'html',
    correctAnswer: 0,
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element',
    description: 'HTML elements'
  }, {
    question: 'Which of these should be avoided if possible?',
    answers: ['using while loops', 'if statements with more than one else if', 'global variables', 'all of the above'],
    type: 'js',
    correctAnswer: 2,
    link: 'https://courses.thinkful.com/web-dev-001v1/assignment/2.5.2',
    description: "Thinkful's the problem with globals"
  }, {
    question: 'How does an element position: absolute base its position?',
    answers: ['in relation to the first static parent', 'in relation to the first relative, fixed, or absolute parent', 'always in relation to the body', 'none of the above'],
    type: 'css',
    correctAnswer: 1,
    link: 'https://developer.mozilla.org/en-US/docs/Web/CSS/position',
    description: 'CSS position'
  }, {
    question: 'How many elements does JQuery\'s closest() return?',
    answers: ['All of the elements that match the query',
      'The first element that matches the query, including the selected element',
      'The first element that matches the query, not including the selected element',
      'The last element that matches the query'
    ],
    type: 'js',
    correctAnswer: 1,
    link: 'https://api.jquery.com/closest',
    description: "JQuery closest"
  }, {
    question: 'Which of these is not a correct value for color?',
    answers: ['rbg(255, 255, 255)', 'white', '#fff', '#fffeee'],
    type: 'css',
    correctAnswer: 0,
    link: 'https://developer.mozilla.org/en-US/docs/Web/CSS/color_value',
    description: 'CSS color'
  }, {
    question: 'Which of the following is NOT a primitive data type in JavaScript (ES6)?',
    answers: ['String', 'Number', 'Date', 'Symbol'],
    type: 'js',
    correctAnswer: 2,
    link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures',
    description: 'JavaScript data types'
  }, {
    question: 'What is the order for the following? margin: 0px 5px 10px 0px;',
    answers: ['top bottom left right', 'top left bottom right', 'top right bottom left', 'bottom top right left'],
    type: 'css',
    correctAnswer: 2,
    link: 'https://developer.mozilla.org/en-US/docs/Web/CSS/margin',
    description: 'CSS margin'
  }, {
    question: 'Which of these is not an Apple emoji? Use your developer tools to look at alt if you\'re not an emoji expert :D',
    answers: [
      `<img src="${emojis[2].src}" alt="${emojis[2].alt}">`,
      `<img src="${emojis[5].src}" alt="${emojis[5].alt}">`,
      `<img src="${emojis[4].src}" alt="${emojis[4].alt}">`,
      `<img src="${emojis[1].src}" alt="${emojis[1].alt}">`,
    ],
    type: 'emoji',
    correctAnswer: 1,
    link: 'https://emojipedia.org',
    description: 'EMOJIS :D'
  }]

  const types = [{
    type: 'html',
    color: 'red',
    src: 'https://www.w3.org/html/logo/downloads/HTML5_Logo_512.png',
    alt: 'Red HTML5 logo'
  }, {
    type: 'css',
    color: 'blue',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/726px-CSS3_logo_and_wordmark.svg.png',
    alt: 'Blue CSS3 logo'
  }, {
    type: 'js',
    color: 'green',
    src: 'http://en.webdreamlab.com/assets/images/technologies/JavaScript-logo.png',
    alt: 'Green JS logo'
  }, {
    type: 'emoji',
    color: 'orange',
    src: 'https://emojipedia-us.s3.amazonaws.com/thumbs/120/apple/118/smiling-face-with-heart-shaped-eyes_1f60d.png',
    alt: "Apple's heart eyes emoji"
  }]

  function setEmoji() {
    let score = numCorrect / currentQuestion;
    /*The switch on true seems like a "hack" but it works. Got advice from:
    https://stackoverflow.com/questions/5619832/switch-on-ranges-of-integers-in-javascript*/
    switch (true) {
      case score <= .2:
        emoji = emojis[4];
        break;
      case score <= .4:
        emoji = emojis[3];
        break;
      case score <= .6:
        emoji = emojis[2];
        break;
      case score <= .8:
        emoji = emojis[1];
        break;
      case (score <= 1):
        emoji = emojis[0];
        break;
    }
  }

  function populateQuestion() {
    $('.question').text(QA[currentQuestion].question);
    $('.answers').children().each((index, value) => {
      $(value).find('span').html(QA[currentQuestion].answers[index]);
      $(value).find('input').attr('aria-label',QA[currentQuestion].answers[index]);
    });

    //update borders, colors and logo based on type of question
    let type = types.find(t => {
      return t.type === QA[currentQuestion].type;
    });

    $('.scoreContainer, fieldset, button').css('border-color', type.color);

    //bonus question requires a check on this 
    if(type.src) {
      $('.typeIcon').prop({
        src: type.src,
        alt: type.alt
      });
    }
    
  }

  function checkAnswer(answer) {
    let correctAnswer = QA[currentQuestion].correctAnswer.toString();
    //Should I convert correctAnswer to string or use == instead?
    let correct;
    if (answer === correctAnswer) {
      numCorrect++;
      correct = true;
    } else {
      wrong.push(currentQuestion);
      correct = false;
    }
    return correct;
  }

  function showFeedback(correct) {
    //hide form submit button
    $("form button[type='submit']").css('display', 'none');

    //show feedback for answer right or wrong
    $('.feedback').css('display', 'initial');
    if (correct) {
      $('.isCorrect-js').text('correct!');
    } else {
      $('.isCorrect-js').text('incorrect!')
      let correctAnswer = QA[currentQuestion].correctAnswer;
      correctAnswer = QA[currentQuestion].answers[correctAnswer];
      //quick fix for emoji question
      if(currentQuestion === 9) {
        correctAnswer = 'Twitter\'s thinking emoji';
      }
      $('.correctAnswer-js').text(`The correct answer is:  ${correctAnswer}`).css('display', 'initial');
    }
  }

  function updateScore(firstQuestion) {
    if (!firstQuestion) {
      currentQuestion++;
    }

    //set score
    $('.score-js').text(`${numCorrect}/${currentQuestion}`);

    //update number of remaining questions
    $('.remaining-js').text(`${QA.length - currentQuestion}`);

    //set emoji based on score. Won't run on first question of first game or replay
    if (!firstQuestion) {
      setEmoji();
      $('.emoji').prop({
        src: emoji.src,
        alt: emoji.alt
      });
    } else {
      $('.emoji').prop({
        src: emojis[5].src,
        alt: emojis[5].alt
      });
    }


    //check for quiz over
    if (currentQuestion === QA.length) {
      $('.next-js').text('Show Results');
    }

  }

  function prepareNextQuestion() {
    //hide feedback elements
    $('.correctAnswer-js, .feedback').css('display', 'none');

    //show submit button
    $("form button[type='submit']").css('display', 'initial');

    //change legend to reflect current question number
    $('legend').text(`#${currentQuestion + 1}`);

    //clear radio choice
    $("input[name='answer']").prop('checked', false);

  }

  function showResults() {
    //I feel like I need a better system for hiding and showing elements...
    $('.links').empty();
    $('form').css('display', 'none');
    $('.results').css('display', 'initial');
    $('.again-js').css('display', 'initial');
    $('.results-js').text(`${numCorrect} out of ${QA.length}`);
    $('.results-emoji').prop({
      src: emoji.src,
      alt: emoji.alt
    });

    //display help if any questions wrong
    if(wrong.length > 0) {
      setLinks();
    }
  }

  function setLinks() {
    $('.wrong-js').text('Here are some links to help you with the questions you got wrong!');
    wrong.forEach(w => {
      let link = QA[w].link;
      let description = QA[w].description;
      link = `<li><a target="_blank" href=${link}>${description}</a></li>`;
      $('.links').append(link);
    })
  }

  function isAnswerSelected() {
    if ($("form input[type='radio']:checked").length > 0) {
      return true;
    } return false;
  }

  function handleBeginQuiz() {
    $('.begin-js').click(e => {
      $(e.currentTarget).css('display', 'none');
      $('form').css('display', 'initial');
      $('.quizDescription').css('display', 'none');
      initQuiz();
    })
  }

  function handleSubmit() {
    $("form button[type='submit']").click(e => {
      e.preventDefault();
      //this is a simple way to prevent enter from submitting even when button is hidden
      if (readyForSubmit && isAnswerSelected()) {
        let answer = $("form input[type='radio']:checked").val();
        let correct = checkAnswer(answer);
        showFeedback(correct);
        updateScore();
        readyForSubmit = false;
      }
    })
  }

  function handleNextQuestion() {
    $('.next-js').click(e => {
      e.preventDefault();
      if (currentQuestion !== QA.length) {
        prepareNextQuestion();
        populateQuestion();
        readyForSubmit = true;
      } else {
        showResults();
      }
    })
  }

  function handlePlayAgain() {
      $('.again-js').click(e => {
      $('.results').css('display', 'none');
      $('.next-js').text('Next Question');
      $('form').css('display', 'initial');
      $('legend').text('#1');
      $(e.currentTarget).css('display', 'none');
      wrong = [];
      initQuiz();
    })
    
  }

  function initHandlers() {
    handleBeginQuiz();
    handleSubmit();
    handleNextQuestion();
    handlePlayAgain();
  }

  function initQuiz() {
    readyForSubmit = true;
    currentQuestion = 0;
    numCorrect = 0;
    prepareNextQuestion();
    updateScore(true);
    populateQuestion();
  }

  initHandlers();
})


