var Minion = function()
{
  var self = this;

  this.name;

  this.health;
  this.speed;
  this.strength;
  this.attributes = [this.health, this.speed, this.strength];

  this.randomize = function()
  {
    for(var i = 0; i < self.attributes.length; i++)
    {
      self.attributes[i] = 0;
    }
    for(var i = 0; i < 20; i++)
    {
      var j = Math.floor(Math.random()*self.attributes.length);
      while(self.attributes[j] >= 15)
        j = Math.floor(Math.random()*self.attributes.length);
      self.attributes[j]++;
    }

    self.name = 'unnamed';
  }
}
