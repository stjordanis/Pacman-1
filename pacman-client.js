// Generated by CoffeeScript 1.6.2
(function() {
  var Game, Level, Sprite, SpriteDict, canvas, game,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Sprite = (function() {
    function Sprite(image, info) {
      this.image = image;
      this.info = info;
    }

    Sprite.prototype.width = function() {
      return this.info.sourceSize.w;
    };

    Sprite.prototype.height = function() {
      return this.info.sourceSize.h;
    };

    Sprite.prototype.drawScaled = function(ctx, x, y, scale) {
      x += this.info.spriteSourceSize.x;
      y += this.info.spriteSourceSize.y;
      return ctx.drawImage(this.image, this.info.frame.x, this.info.frame.y, this.info.frame.w, this.info.frame.h, x * scale, y * scale, this.info.frame.w * scale, this.info.frame.h * scale);
    };

    return Sprite;

  })();

  SpriteDict = (function() {
    SpriteDict.prototype.sprite = null;

    SpriteDict.prototype.info = null;

    function SpriteDict(spriteFile, infoFile, callback) {
      var _this = this;

      this.sprite = new Image();
      this.sprite.src = spriteFile;
      $.getJSON(infoFile, function(json) {
        _this.info = json;
        return callback();
      });
    }

    SpriteDict.prototype.get = function(name) {
      return new Sprite(this.sprite, this.info[name]);
    };

    return SpriteDict;

  })();

  Level = (function() {
    Level.prototype.entities = null;

    Level.prototype.cookies = null;

    function Level(filename, callback) {
      var _this = this;

      $.get(filename, function(data) {
        return callback();
      });
    }

    return Level;

  })();

  Game = (function() {
    Game.prototype.SCALE = 1;

    Game.prototype.WIDTH = 170;

    Game.prototype.HEIGHT = 40 + 215 + 20;

    Game.prototype.FPS = 30;

    Game.prototype.interval = null;

    Game.prototype.sprites = null;

    Game.prototype.level = null;

    function Game(canvas) {
      this.canvas = canvas;
      this.createEntities = __bind(this.createEntities, this);
      this.loadSprites = __bind(this.loadSprites, this);
      this.setup();
    }

    Game.prototype.setup = function() {
      this.canvas.height = this.HEIGHT * this.SCALE;
      this.canvas.width = this.WIDTH * this.SCALE;
      return this.loadLevel();
    };

    Game.prototype.loadLevel = function() {
      return this.level = new Level('res/level', this.loadSprites);
    };

    Game.prototype.loadSprites = function() {
      return this.sprites = new SpriteDict('res/sprites.png', 'res/sprites.json', this.createEntities);
    };

    Game.prototype.createEntities = function() {
      return this.run();
    };

    Game.prototype.run = function() {
      var _this = this;

      return this.interval = setInterval(function() {
        _this.update();
        return _this.draw();
      }, 1000 / this.FPS);
    };

    Game.prototype.update = function() {};

    Game.prototype.draw = function() {
      var ctx;

      ctx = this.canvas.getContext('2d');
      this.drawMaze(ctx);
      return this.drawCookies(ctx);
    };

    Game.prototype.drawMaze = function(ctx) {
      var s;

      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, this.WIDTH * this.SCALE, this.HEIGHT * this.SCALE);
      s = this.sprites.get("maze_blue");
      return s.drawScaled(ctx, 0, 40, this.SCALE);
    };

    Game.prototype.drawCookies = function(ctx) {};

    return Game;

  })();

  canvas = document.getElementById('canvas');

  game = new Game(canvas);

}).call(this);
