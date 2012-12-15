var Model = function()
{
  var self = this;

  this.playerId;
  this.username;
  this.secret;
  this.saves;

  this.parseLoginObject = function(obj)
  {
    if(obj.playerId)
    {
      self.playerId = obj.playerId;
      self.username = obj.username;
      self.secret = obj.secret;
      createCookie('playerId',self.playerId,1);
      createCookie('username',self.username,1);
      createCookie('secret',self.secret,1);
      return true;
    }
    return false;
  }

  this.parseSavesObject = function(obj)
  {
    self.saves = [];
    for(var i = 0; i < obj.length; i++)
    {
      self.saves[i] = obj[i];
    }
    return true;
  }
}
