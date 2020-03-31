class PlayGame extends Phaser.Scene {
    wheels = 5;
    lines = 3;
    lineStyle = [
        {
            color: 0xB30A15,
            thickness: 3,
            alpha: 0.5,
        },
        {
            color: 0xD88200,
            thickness: 3,
            alpha: 0.5,
        },
        {
            color: 0x58DF16,
            thickness: 3,
            alpha: 0.5,
        },
        {
            color: 0xA809C5,
            thickness: 3,
            alpha: 0.5,
        },
        {
            color: 0x53C8ED,
            thickness: 3,
            alpha: 0.5,
        }
    ];
    frames = [0, 1, 2, 3, 4];
    frameQty = 1;
    linePatterns = [
        {
            pattern: [0, 0, 0, 0, 0],
            minItems: 2,
        },
        {
            pattern: [1, 1, 1, 1, 1],
            minItems: 2,
        },
        {
            pattern: [2, 2, 2, 2, 2],
            minItems: 2,
        },
        {
            pattern: [0, 1, 2, 1, 0],
            minItems: 3,
        },
        {
            pattern: [2, 1, 0, 1, 2],
            minItems: 3,
        },
        {
            pattern: [0, 1, 1, 1, 0],
            minItems: 3,
        },
        {
            pattern: [2, 1, 1, 1, 2],
            minItems: 3,
        },
        {
            pattern: [0, 1, 0, 1, 0],
            minItems: 3,
        },
        {
            pattern: [2, 1, 2, 1, 2],
            minItems: 3,
        },
        {
            pattern: [0, 0, 1, 0, 0],
            minItems: 3,
        },
        {
            pattern: [2, 2, 1, 2, 2],
            minItems: 3,
        },
    ];
    spinTime = 1 * 1000;
    isWheelSpining = false;
    spinBtnDisabled = false;
    wheelPosX = 400;
    wheelPosY = 230;
    dKey = 'diamond';
    lKey = 'line';
    matchedItems = [];
    scorePrefix = '$';
    score = 1000;
    pointsOnWin = 25;
    pointsCostForSpin = 100;

    constructor() {
        super('playGame');
    }

    create() {
        // Background image
        this.add.image(0, 0, 'slotbg').setOrigin(0, 0);

        // Spin button
        this.spinBtn = this.add.image(620, 580, 'spinbtn').setInteractive({ useHandCursor: true });

        // score text
        this.pointsGroup = this.add.group();
        this.scoreLabel = this.add.bitmapText(570, 95, "pixelFont", '', 28);
        this.refreshScore();

        // Event listener for spin button
        this.spinBtn.on('pointerdown', function () {
            this.startSpin();
        }, this);

        this.lazerAnim();

        // 1st render for wheel
        this.spinWheels();

        this.checkScore();
    }

    update() {
        if (this.isWheelSpining) {
            this.spinWheels();
        }
    }

    lazerAnim() {
        this.lazerGroup = this.add.group();

        this.lazerGroup.createMultiple({
            key: 'lazer',
            frame: 'lazer_22',
            repeat: 19,
            setScale: { x: 0.25, y: 0.25 }
        });

        Phaser.Actions.GridAlign(this.lazerGroup.getChildren(), {
            width: 20,
            height: 0,
            cellWidth: 32,
            cellHeight: 200,
            x: 150,
            y: -100,
        });
    }

    startSpin() {
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
                callback: function () {
                    this.isWheelSpining = false;
                    this.processResult();
                },
                callbackScope: this,
                loop: false
            });
        }
    }

    spinWheels() {
        for (let i = 0; i < this.wheels; i++) {
            var dkey = this.dKey + i;
            var lkey = this.lKey + i;

            // generate new line if not exist
            if (!this[lkey]) {
                var x = this.wheelPosX + 100 * i;
                this[lkey] = new Phaser.Geom.Line(x, this.wheelPosY + 40, x, this.wheelPosY + 200);
            }

            // create new group if not exist
            if (!this[dkey]) {
                this[dkey] = this.add.group();
            }

            // destroy and remove previous game objects from the scene
            this[dkey].clear(true, true);

            // generate random line items
            this[dkey].createFromConfig({
                key: 'diamonds',
                frame: getRandom(this.frames, this.lines),
                frameQuantity: this.frameQty,
            });

            // place items on line
            Phaser.Actions.PlaceOnLine(this[dkey].getChildren(), this[lkey]);
        }
    }

    clearMatchedLines() {
        Phaser.Actions.Call(this.matchedItems, function (item) {
            item.lineObj.destroy(true);
        }, this);
    }

    processResult() {
        let itemsMatrix = [];

        // generate items matrix
        for (let i = 0; i < this.lines; i++) {
            let line = [];

            for (let j = 0; j < this.wheels; j++) {
                line.push(this[this.dKey + j].getChildren()[i]);
            }

            itemsMatrix.push(line);
        }

        this.matchedItems = [];

        // iterate through matrix to find match of line criteria
        for (let i = 0; i < this.lines; i++) {
            for (let k = 0; k < this.linePatterns.length; k++) {
                if (this.linePatterns[k].pattern[0] === i) {
                    let baseItem = itemsMatrix[i][0];
                    let matchedItems = [baseItem];

                    for (let l = 1; l < this.wheels; l++) {
                        let itemToCompare = itemsMatrix[this.linePatterns[k].pattern[l]][l];

                        if (baseItem.frame.name !== itemToCompare.frame.name) {
                            break;
                        } else {
                            matchedItems.push(itemToCompare);
                        }
                    }

                    if (matchedItems.length >= this.linePatterns[k].minItems) {
                        this.matchedItems.push({ line: this.matchedItems.length + 1, items: matchedItems });
                    }
                }
            }
        }

        // set flag if items found and draw line
        if (this.matchedItems.length > 0) {
            this.drawLineForMatchedItems();
            this.animateMatchedItems();
            this.calculateScore();
        } else {
            this.enableSpinBtn();
        }

        this.checkScore();
    }

    drawLineForMatchedItems() {
        for (let i = 0; i < this.matchedItems.length; i++) {
            let graphics = this.add.graphics();
            let lineStyle = this.lineStyle[this.matchedItems[i].items[0].frame.name];
            graphics.lineStyle(lineStyle.thickness, lineStyle.color, lineStyle.alpha);
            graphics.beginPath();

            for (let j = 0; j < this.matchedItems[i].items.length; j++) {
                let currentItem = this.matchedItems[i].items[j];
                let nextItem = this.matchedItems[i].items[j + 1];

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

    animateMatchedItems() {
        let items = [];

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

    calculateScore() {
        Phaser.Actions.Call(this.matchedItems, function (item) {
            let points = item.items.length * this.pointsOnWin;
            this.score += points;

            let text = this.add.bitmapText(item.items[0].x, item.items[0].y, 'pixelFont', '+' + this.scorePrefix + points, 18);
            this.pointsGroup.add(text);
        }, this);

        // animation for score
        this.tweens.add({
            targets: this.pointsGroup.getChildren(),
            x: this.scoreLabel.x + 20,
            y: this.scoreLabel.y + 16,
            ease: 'Power1',
            duration: 2000,
            yoyo: false,
            repeat: 0,
            onComplete: function (tween, target) {
                this.pointsGroup.clear(true, true);
                this.refreshScore();
                this.enableSpinBtn();
                this.checkScore();
            },
            callbackScope: this,
        });
    }

    deductSpinCost() {
        this.score -= this.pointsCostForSpin;
        this.refreshScore();
        let text = this.add.bitmapText(this.scoreLabel.x + 20, this.scoreLabel.y + 16, 'pixelFont', '-' + this.scorePrefix + this.pointsCostForSpin, 18);
        // animation for score
        this.tweens.add({
            targets: text,
            x: this.scoreLabel.x + 70,
            y: this.scoreLabel.y + 100,
            ease: 'Power1',
            duration: 1000,
            yoyo: false,
            repeat: 0,
            onComplete: function (tween, target) {
                target[0].destroy(true);
            },
            callbackScope: this,
        });
    }

    refreshScore() {
        var scoreFormated = numberWithCommas(this.score);
        this.scoreLabel.text = this.scorePrefix + scoreFormated;
    }

    disableSpinBtn() {
        this.spinBtnDisabled = true;
        Phaser.Actions.SetAlpha([this.spinBtn], 0.5);
    }

    enableSpinBtn() {
        this.spinBtnDisabled = false;
        Phaser.Actions.SetAlpha([this.spinBtn], 1);
    }

    checkScore() {
        if (this.score < this.pointsCostForSpin) {
            this.disableSpinBtn();
        }
    }
}
