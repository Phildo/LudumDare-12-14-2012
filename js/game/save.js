var Save = function()
{
  var self = this;
  
  this.minions = [];

  this.randomizeMinions = function()
  {
    self.minions = [];
    for(var i = 0; i < 3; i ++)
    {
      self.minions[i] = new Minion();
      self.minions[i].randomize();
    }
  }

}
