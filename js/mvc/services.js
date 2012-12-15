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
}
