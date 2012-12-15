var VC = function()
{
  var self = this;

  var loadingIndicator = document.getElementById('loading');
  var loadingCount = 1;

  var intro = document.getElementById('intro');
    var chooseSignInButton = document.getElementById('choose_sign_in_button');
    var chooseCreateAccountButton = document.getElementById('choose_create_account_button');
  var signInPage = document.getElementById('sign_in');
    var signInUsernameInput = document.getElementById('sign_in_username_input');
    var signInPasswordInput = document.getElementById('sign_in_password_input');
    var confirmSignInButton = document.getElementById('confirm_sign_in_button');
  var createAccountPage = document.getElementById('create_account');
    var createAccountUsernameInput = document.getElementById('create_account_username_input');
    var createAccountUsernameFeedback = document.getElementById('create_account_username_feedback');
    var createAccountPasswordOneInput = document.getElementById('create_account_password_input_1');
    var createAccountPasswordOneFeedback = document.getElementById('create_account_password_feedback_1');
    var createAccountPasswordTwoInput = document.getElementById('create_account_password_input_2');
    var createAccountPasswordTwoFeedback = document.getElementById('create_account_password_feedback_2');
    var confirmCreateAccountButton = document.getElementById('confirm_create_account_button');
  var gameplayScreen = document.getElementById('gameplay');
  var c = document.getElementById('stage');

  var images = [];
  
  this.init = function()
  {
    cacheImages();

    //Intro
    chooseSignInButton.addEventListener('click', function(e) { chooseSignInButtonClicked(e); }, false);
    chooseCreateAccountButton.addEventListener('click', function(e) { chooseCreateAccountButtonClicked(e); }, false);

    //SignIn
    confirmSignInButton.addEventListener('click', function(e) { confirmSignInButtonClicked(e); }, false);

    //CreateAccount
    createAccountUsernameInput.addEventListener('blur', function(e) { createAccountUsernameInputBlurred(e); }, false);
    createAccountPasswordOneInput.addEventListener('input', function(e) { createAccountPasswordOneInputChanged(e); }, false);
    createAccountPasswordTwoInput.addEventListener('input', function(e) { createAccountPasswordTwoInputChanged(e); }, false);
    confirmCreateAccountButton.addEventListener('click', function(e) { confirmCreateAccountButtonClicked(e); }, false);
    
    setScene(intro);
    self.decrementLoadingCount();
  }

  function cacheImages()
  {
    images[images.length] = new Image('assets/page/shadow.png');
    images[images.length] = new Image('assets/page/good.png');
    images[images.length] = new Image('assets/page/bad.png');
  }

  this.incrementLoadingCount = function()
  {
    loadingCount++;
    loadingIndicator.style.display = 'block';
  }

  this.decrementLoadingCount = function()
  {
    loadingCount--;
    if(loadingCount == 0)
      loadingIndicator.style.display = 'none';
  }

  function setScene(scene)
  {
    intro.style.display = 'none';
    createAccountPage.style.display = 'none';
    signInPage.style.display = 'none';
    gameplayScreen.style.display = 'none';

    scene.style.display = 'block';
  }

  function chooseSignInButtonClicked(e)
  {
    setScene(signInPage);
  }

  function chooseCreateAccountButtonClicked(e)
  {
    checkIfCreateAccountValid();//Ought to return false... just a quick way to disable button
    setScene(createAccountPage);
  }

  function confirmSignInButtonClicked(e)
  {
    
  }

  function createAccountUsernameInputBlurred(e)
  {
    if(createAccountUsernameInput.value != '' || createAccountUsernameFeedback.src != '')
      services.checkUsername(createAccountUsernameInput.value, function(result) { showUniqueUsernameStatus(JSON.parse(result).data == "username does not exist"); });
  }

  function showUniqueUsernameStatus(isUnique)
  {
    if(isUnique)
      createAccountUsernameFeedback.src = 'assets/page/good.png';
    else
    {
      createAccountUsernameFeedback.src = 'assets/page/bad.png';
    }
    checkIfCreateAccountValid();
  }

  function createAccountPasswordOneInputChanged(e)
  {
    if(createAccountPasswordTwoInput.value == '' && createAccountPasswordTwoFeedback.src == '') return;

    if(createAccountPasswordOneInput.value != createAccountPasswordTwoInput.value)
    {
      createAccountPasswordOneFeedback.src = 'assets/page/bad.png';
      createAccountPasswordTwoFeedback.src = 'assets/page/bad.png';
    }
    else
    {
      createAccountPasswordOneFeedback.src = 'assets/page/good.png';
      createAccountPasswordTwoFeedback.src = 'assets/page/good.png';
    }
    checkIfCreateAccountValid();
  }

  function createAccountPasswordTwoInputChanged(e)
  {
    if(createAccountPasswordOneInput.value != createAccountPasswordTwoInput.value)
    {
      createAccountPasswordOneFeedback.src = 'assets/page/bad.png';
      createAccountPasswordTwoFeedback.src = 'assets/page/bad.png';
    }
    else
    {
      createAccountPasswordOneFeedback.src = 'assets/page/good.png';
      createAccountPasswordTwoFeedback.src = 'assets/page/good.png';
    }
    checkIfCreateAccountValid();
  }

  function checkIfCreateAccountValid()
  {
    if(createAccountUsernameFeedback.src.indexOf('good') != -1 &&
      createAccountPasswordOneFeedback.src.indexOf('good') != -1 &&
      createAccountPasswordTwoFeedback.src.indexOf('good') != -1)
    {
      confirmCreateAccountButton.style.color = '#000000';
      confirmCreateAccountButton.style.border = '5px solid black';
      return true;
    }
    else
    {
      confirmCreateAccountButton.style.color = '#999999';
      confirmCreateAccountButton.style.border = '5px solid #999999';
      return false;
    }
  }

  function confirmCreateAccountButtonClicked(e)
  {
    if(checkIfCreateAccountValid())
      services.createAccount(createAccountUsernameInput.value, createAccountPasswordOneInput.value, function(result) { loginAttemptReturned(JSON.parse(result).data); });
  }

  function loginAttemptReturned(loginobj)
  {
    if(model.parseLoginObject(loginobj))
    {
      createAccountUsernameInput.value = '';
      createAccountPasswordOneInput.value = '';
      createAccountPasswordTwoInput.value = '';
      createAccountUsernameFeedback.src = '';
      createAccountPasswordOneFeedback.src = '';
      createAccountPasswordTwoFeedback.src = '';
      signInUsernameInput.value = '';
      signInPasswordInput.value = '';
      game.init();
      setScene(gameplayScreen);
    }
  }

  function confirmSignInButtonClicked(e)
  {
    if(signInUsernameInput.value != '' && signInPasswordInput.value != '')
      services.loginUser(signInUsernameInput.value, signInPasswordInput.value, function(result) { loginAttemptReturned(JSON.parse(result).data); });
  }
}
