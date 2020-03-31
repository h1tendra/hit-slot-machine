"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PlayGame = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(PlayGame, _Phaser$Scene);

  var _super = _createSuper(PlayGame);

  function PlayGame() {
    var _this;

    _classCallCheck(this, PlayGame);

    _this = _super.call(this, 'playGame');

    _defineProperty(_assertThisInitialized(_this), "wheels", 5);

    _defineProperty(_assertThisInitialized(_this), "lines", 3);

    _defineProperty(_assertThisInitialized(_this), "lineStyle", [{
      color: 0xB30A15,
      thickness: 3,
      alpha: 0.5
    }, {
      color: 0xD88200,
      thickness: 3,
      alpha: 0.5
    }, {
      color: 0x58DF16,
      thickness: 3,
      alpha: 0.5
    }, {
      color: 0xA809C5,
      thickness: 3,
      alpha: 0.5
    }, {
      color: 0x53C8ED,
      thickness: 3,
      alpha: 0.5
    }]);

    _defineProperty(_assertThisInitialized(_this), "frames", [0, 1, 2, 3, 4]);

    _defineProperty(_assertThisInitialized(_this), "frameQty", 1);

    _defineProperty(_assertThisInitialized(_this), "linePatterns", [{
      pattern: [0, 0, 0, 0, 0],
      minItems: 2
    }, {
      pattern: [1, 1, 1, 1, 1],
      minItems: 2
    }, {
      pattern: [2, 2, 2, 2, 2],
      minItems: 2
    }, {
      pattern: [0, 1, 2, 1, 0],
      minItems: 3
    }, {
      pattern: [2, 1, 0, 1, 2],
      minItems: 3
    }, {
      pattern: [0, 1, 1, 1, 0],
      minItems: 3
    }, {
      pattern: [2, 1, 1, 1, 2],
      minItems: 3
    }, {
      pattern: [0, 1, 0, 1, 0],
      minItems: 3
    }, {
      pattern: [2, 1, 2, 1, 2],
      minItems: 3
    }, {
      pattern: [0, 0, 1, 0, 0],
      minItems: 3
    }, {
      pattern: [2, 2, 1, 2, 2],
      minItems: 3
    }]);

    _defineProperty(_assertThisInitialized(_this), "spinTime", 1 * 1000);

    _defineProperty(_assertThisInitialized(_this), "isWheelSpining", false);

    _defineProperty(_assertThisInitialized(_this), "spinBtnDisabled", false);

    _defineProperty(_assertThisInitialized(_this), "wheelPosX", 400);

    _defineProperty(_assertThisInitialized(_this), "wheelPosY", 230);

    _defineProperty(_assertThisInitialized(_this), "dKey", 'diamond');

    _defineProperty(_assertThisInitialized(_this), "lKey", 'line');

    _defineProperty(_assertThisInitialized(_this), "matchedItems", []);

    _defineProperty(_assertThisInitialized(_this), "scorePrefix", '$');

    _defineProperty(_assertThisInitialized(_this), "score", 1000);

    _defineProperty(_assertThisInitialized(_this), "pointsOnWin", 25);

    _defineProperty(_assertThisInitialized(_this), "pointsCostForSpin", 100);

    return _this;
  }

  _createClass(PlayGame, [{
    key: "create",
    value: function create() {
      // Background image
      this.add.image(0, 0, 'slotbg').setOrigin(0, 0); // Spin button

      this.spinBtn = this.add.image(620, 580, 'spinbtn').setInteractive({
        useHandCursor: true
      }); // score text

      this.pointsGroup = this.add.group();
      this.scoreLabel = this.add.bitmapText(570, 95, "pixelFont", '', 28);
      this.refreshScore(); // Event listener for spin button

      this.spinBtn.on('pointerdown', function () {
        this.startSpin();
      }, this);
      this.lazerAnim(); // 1st render for wheel

      this.spinWheels();
      this.checkScore();
    }
  }, {
    key: "update",
    value: function update() {
      if (this.isWheelSpining) {
        this.spinWheels();
      }
    }
  }, {
    key: "lazerAnim",
    value: function lazerAnim() {
      this.lazerGroup = this.add.group();
      this.lazerGroup.createMultiple({
        key: 'lazer',
        frame: 'lazer_22',
        repeat: 19,
        setScale: {
          x: 0.25,
          y: 0.25
        }
      });
      Phaser.Actions.GridAlign(this.lazerGroup.getChildren(), {
        width: 20,
        height: 0,
        cellWidth: 32,
        cellHeight: 200,
        x: 150,
        y: -100
      });
    }
  }, {
    key: "startSpin",
    value: function startSpin() {
      if (!this.isWheelSpining && !this.spinBtnDisabled) {
        this.clearMatchedLines();
        this.deductSpinCost();
        this.anims.staggerPlay('blast', this.lazerGroup.getChildren(), 1);

        if (this.matchedItemsTween) {
          this.matchedItemsTween.stop();
        }

        this.isWheelSpining = true;
        this.disableSpinBtn();
        this.time.addEvent({
          delay: this.spinTime,
          callback: function callback() {
            this.isWheelSpining = false;
            this.processResult();
          },
          callbackScope: this,
          loop: false
        });
      }
    }
  }, {
    key: "spinWheels",
    value: function spinWheels() {
      for (var i = 0; i < this.wheels; i++) {
        var dkey = this.dKey + i;
        var lkey = this.lKey + i; // generate new line if not exist

        if (!this[lkey]) {
          var x = this.wheelPosX + 100 * i;
          this[lkey] = new Phaser.Geom.Line(x, this.wheelPosY + 40, x, this.wheelPosY + 200);
        } // create new group if not exist


        if (!this[dkey]) {
          this[dkey] = this.add.group();
        } // destroy and remove previous game objects from the scene


        this[dkey].clear(true, true); // generate random line items

        this[dkey].createFromConfig({
          key: 'diamonds',
          frame: getRandom(this.frames, this.lines),
          frameQuantity: this.frameQty
        }); // place items on line

        Phaser.Actions.PlaceOnLine(this[dkey].getChildren(), this[lkey]);
      }
    }
  }, {
    key: "clearMatchedLines",
    value: function clearMatchedLines() {
      Phaser.Actions.Call(this.matchedItems, function (item) {
        item.lineObj.destroy(true);
      }, this);
    }
  }, {
    key: "processResult",
    value: function processResult() {
      var itemsMatrix = []; // generate items matrix

      for (var i = 0; i < this.lines; i++) {
        var line = [];

        for (var j = 0; j < this.wheels; j++) {
          line.push(this[this.dKey + j].getChildren()[i]);
        }

        itemsMatrix.push(line);
      }

      this.matchedItems = []; // iterate through matrix to find match of line criteria

      for (var _i = 0; _i < this.lines; _i++) {
        for (var k = 0; k < this.linePatterns.length; k++) {
          if (this.linePatterns[k].pattern[0] === _i) {
            var baseItem = itemsMatrix[_i][0];
            var matchedItems = [baseItem];

            for (var l = 1; l < this.wheels; l++) {
              var itemToCompare = itemsMatrix[this.linePatterns[k].pattern[l]][l];

              if (baseItem.frame.name !== itemToCompare.frame.name) {
                break;
              } else {
                matchedItems.push(itemToCompare);
              }
            }

            if (matchedItems.length >= this.linePatterns[k].minItems) {
              this.matchedItems.push({
                line: this.matchedItems.length + 1,
                items: matchedItems
              });
            }
          }
        }
      } // set flag if items found and draw line


      if (this.matchedItems.length > 0) {
        this.drawLineForMatchedItems();
        this.animateMatchedItems();
        this.calculateScore();
      } else {
        this.enableSpinBtn();
      }

      this.checkScore();
    }
  }, {
    key: "drawLineForMatchedItems",
    value: function drawLineForMatchedItems() {
      for (var i = 0; i < this.matchedItems.length; i++) {
        var graphics = this.add.graphics();
        var lineStyle = this.lineStyle[this.matchedItems[i].items[0].frame.name];
        graphics.lineStyle(lineStyle.thickness, lineStyle.color, lineStyle.alpha);
        graphics.beginPath();

        for (var j = 0; j < this.matchedItems[i].items.length; j++) {
          var currentItem = this.matchedItems[i].items[j];
          var nextItem = this.matchedItems[i].items[j + 1];

          if (!nextItem) {
            break;
          } else {
            if (j === 0) {
              graphics.moveTo(currentItem.x, currentItem.y);
            }

            graphics.lineTo(nextItem.x, nextItem.y);
          }
        }

        graphics.strokePath();
        this.matchedItems[i].lineObj = graphics;
      }
    }
  }, {
    key: "animateMatchedItems",
    value: function animateMatchedItems() {
      var items = [];
      this.matchedItems.forEach(function (item) {
        items = items.concat(item.items);
      });
      this.matchedItemsTween = this.tweens.add({
        targets: items,
        scaleX: 1.2,
        scaleY: 1.2,
        ease: 'Sine.easeInOut',
        duration: 300,
        delay: 50,
        repeat: -1,
        yoyo: true
      });
    }
  }, {
    key: "calculateScore",
    value: function calculateScore() {
      Phaser.Actions.Call(this.matchedItems, function (item) {
        var points = item.items.length * this.pointsOnWin;
        this.score += points;
        var text = this.add.bitmapText(item.items[0].x, item.items[0].y, 'pixelFont', '+' + this.scorePrefix + points, 18);
        this.pointsGroup.add(text);
      }, this); // animation for score

      this.tweens.add({
        targets: this.pointsGroup.getChildren(),
        x: this.scoreLabel.x + 20,
        y: this.scoreLabel.y + 16,
        ease: 'Power1',
        duration: 2000,
        yoyo: false,
        repeat: 0,
        onComplete: function onComplete(tween, target) {
          this.pointsGroup.clear(true, true);
          this.refreshScore();
          this.enableSpinBtn();
          this.checkScore();
        },
        callbackScope: this
      });
    }
  }, {
    key: "deductSpinCost",
    value: function deductSpinCost() {
      this.score -= this.pointsCostForSpin;
      this.refreshScore();
      var text = this.add.bitmapText(this.scoreLabel.x + 20, this.scoreLabel.y + 16, 'pixelFont', '-' + this.scorePrefix + this.pointsCostForSpin, 18); // animation for score

      this.tweens.add({
        targets: text,
        x: this.scoreLabel.x + 70,
        y: this.scoreLabel.y + 100,
        ease: 'Power1',
        duration: 1000,
        yoyo: false,
        repeat: 0,
        onComplete: function onComplete(tween, target) {
          target[0].destroy(true);
        },
        callbackScope: this
      });
    }
  }, {
    key: "refreshScore",
    value: function refreshScore() {
      var scoreFormated = numberWithCommas(this.score);
      this.scoreLabel.text = this.scorePrefix + scoreFormated;
    }
  }, {
    key: "disableSpinBtn",
    value: function disableSpinBtn() {
      this.spinBtnDisabled = true;
      Phaser.Actions.SetAlpha([this.spinBtn], 0.5);
    }
  }, {
    key: "enableSpinBtn",
    value: function enableSpinBtn() {
      this.spinBtnDisabled = false;
      Phaser.Actions.SetAlpha([this.spinBtn], 1);
    }
  }, {
    key: "checkScore",
    value: function checkScore() {
      if (this.score < this.pointsCostForSpin) {
        this.disableSpinBtn();
      }
    }
  }]);

  return PlayGame;
}(Phaser.Scene);