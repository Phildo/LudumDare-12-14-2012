var Model = function()
{
  var self = this;

  this.playerId;
  this.playerSecret;

  this.parseLoginObject = function(obj)
  {
    if(obj.playerId || obj.playerId === 0)
    {
      this.playerId = obj.playerId;
      this.playerSecret = obj.playerSecret;
      return true;
    }
    return false;
  }
}
