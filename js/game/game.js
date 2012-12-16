var Game = function()
{
  var self = this;

  var gamemodel;
  var drawingman;

  var canvas;
  var clickables = [];

  var bgImage = new Image();
  var saveButtonUnusedImage = new Image();
  var saveButtonUsedImage = new Image();
  var saveButtonDownImage = new Image();
  var minionImage = new Image();

  var bg;
  var saveButtons = [];
  var saveButtonClickables = [];

  this.init = function()
  {
    bgImage.src = 'assets/game/title_bg.png';
    saveButtonUnusedImage.src = 'assets/game/save_button_unused.png';
    saveButtonUsedImage.src = 'assets/game/save_button_used.png';
    saveButtonDownImage.src = 'assets/game/save_button_down.png';
    minionImage.src = 'assets/game/minion.png';

    gamemodel = new GameModel();
    gamemodel.init();
    drawingman = new DrawingMan();
    drawingman.init();

    bg = drawingman.registerDrawable(bgImage, 0, 0, 640, 320);
    saveButtons[saveButtons.length] = drawingman.registerDrawable(saveButtonUnusedImage, 380, 20, 240, 60);
    saveButtons[saveButtons.length] = drawingman.registerDrawable(saveButtonUnusedImage, 380, 130, 240, 60);
    saveButtons[saveButtons.length] = drawingman.registerDrawable(saveButtonUnusedImage, 380, 240, 240, 60);

    drawingman.draw();

    canvas = document.getElementById('stage');
    canvas.addEventListener("mousedown", function(e){ handleClick(getMousePositionFromEvent(e)); }, false);

    services.getSaves(model.playerId, model.secret, function(result){ handleSaveGet(JSON.parse(result).data); });
  }

  function getMousePositionFromEvent(e)
  {
    var point = {};
    point.x = e.x-canvas.offsetLeft;
    point.y = e.y-canvas.offsetTop;
    return point;
  }

  function handleClick(point)
  {
    for(var i = 0; i < clickables.length; i++)
    {
      if(point.x > clickables[i].x &&
        point.y > clickables[i].y &&
        point.x < clickables[i].x+clickables[i].width &&
        point.y < clickables[i].y+clickables[i].height)
        {
          clickables[i].callback();
        }
    }
  }

  function handleSaveGet(data)
  {
    if(model.parseSavesObject(data))
    {
      for(var i = 0; i < saveButtons.length; i++)
      {
        drawingman.unregisterDrawable(saveButtons[i].index);
        if(saveButtonClickables[i]) unregisterClickable(saveButtonClickables[i].index);
      }
      saveButtons = [];
      saveButtonClickables = [];
      for(var i = 0; i < model.saves.length; i++)
      {
        saveButtons[i] = drawingman.registerDrawable(saveButtonUsedImage, 380, 20+(110*i), 240, 60);
        saveButtonClickables[i] = registerClickable(380, 20+(110*i), 240, 60, function() { loadSave(i); });
      }
      for(var i = model.saves.length; i < 3; i++)
      {
        saveButtons[saveButtons.length] = drawingman.registerDrawable(saveButtonUnusedImage, 380, 20+(110*i), 240, 60);
        var j = i;
        saveButtonClickables[i] = registerClickable(380, 20+(110*i), 240, 60, function() { createSave(j); });
      }
      drawingman.draw();
    }
  }

  function registerClickable(x, y, width, height, callback)
  {
    var clickable = {};
    clickable.x = x;
    clickable.y = y;
    clickable.width = width;
    clickable.height = height;
    clickable.callback = callback;
    clickables[clickables.length] = clickable;
    clickable.index = clickables.length-1;
    return clickable;
  }

  function unregisterClickable(index)
  {
    clickables.splice(index,1);
    for(var i = index; i < clickables.length; i++)
      clickables[i].index--
  }

  function loadSave(i)
  {
    alert('load');
  }

  function createSave(i)
  {
    model.saves[i] = new Save();
    model.saves[i].randomizeMinions();
    alert(i);
    drawingman.registerDrawable(minionImage, 400, 30+(110*i), 20, 20);
    drawingman.draw();
  }
}
