var Services = function()
{
  this.checkUsername = function(username, callback)
  {
    callService('checkusername',callback,false,'username='+username);
  }

  this.createAccount = function(username, password, callback)
  {
    callService('createaccount',callback,false,'username='+username+'&password='+password);
  }

  this.loginUser = function(username, password, callback)
  {
    callService('loginaccount',callback,false,'username='+username+'&password='+password);
  }

  this.getSaves = function(playerId, secret, callback)
  {
    callService('getsaves',callback,false,'playerId='+playerId+'&secret='+secret);
  }
}
