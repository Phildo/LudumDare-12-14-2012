var DrawingMan = function()
{
  var self = this;

  var canvas = document.getElementById('stage');
  var context = canvas.getContext('2d');

  var drawables = [];
  var writables = [];

  this.init = function()
  {
    context.fillStyle = '#000000';
    context.fillRect(0,0,640,320);
    context.font = "20pt vg_font";

    self.draw();
  }

  this.draw = function()
  {
    for(var i = 0; i < drawables.length; i++)
      context.drawImage(drawables[i].image, drawables[i].x, drawables[i].y, drawables[i].width, drawables[i].height);
    for(var i = 0; i < writables.length; i++)
      context.fillText(writables[i].text, writables[i].x, writables[i].y);
  }

  this.registerDrawable = function(image, x, y, width, height)
  {
    var drawable = {};
    drawable.image = image;
    drawable.x = x;
    drawable.y = y;
    drawable.width = width;
    drawable.height = height;
    drawables[drawables.length] = drawable;
    drawable.index = drawables.length-1;
    return drawable;
  }

  this.unregisterDrawable = function(index)
  {
    drawables.splice(index,1);
    for(var i = index; i < drawables.length; i++)
      drawables[i].index--
  }

  this.registerWritable = function(text, x, y)
  {
    var writable = {};
    writable.text = text;
    writable.x = x;
    writable.y = y;
    writables[writables.length] = writable;
    writable.index = writables.length-1;
    return writable;
  }

  this.unregisterWritable = function(index)
  {
    writables.splice(index,1);
    for(var i = index; i < writables.length; i++)
      writables[i].index--
  }
}
