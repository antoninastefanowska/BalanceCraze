import Phaser from 'phaser';
import HSLAdjustPipeline from 'phaser3-rex-plugins/plugins/hsladjustpipeline';
import { ScrollablePanel } from 'phaser3-rex-plugins/templates/ui/ui-components';

import { scaleValue, BASE_SPRITE_PATH, ART_WIDTH, ART_HEIGHT, STEP_DURATION } from '../Utils';

import Character from '../model/character/Character';
import Swing from '../model/Swing';
import Slot from '../model/character/slots/Slot';
import Midget from '../model/midget/Midget';
import BigMidget from '../model/big-midget/BigMidget';

const MIN_COLOR = 0;
const MAX_COLOR = 4;
const BIG_MIDGET_CHANCE = 50;

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.midgetPool = [];
        this.bigMidgetPool = [];
        this.score = 0;

        this.onScroll = this.onScroll.bind(this);
    }

    createFilters() {
        let blueFilter = new HSLAdjustPipeline(this, 'blue-filter', {
            hueRotate: 0,
            satAdjust: 1,
            lumAdjust: 0.5
        });
        let purpleFilter = new HSLAdjustPipeline(this, 'purple-filter', {
            hueRotate: 0.86,
            satAdjust: 1.5,
            lumAdjust: 0.5
        });
        let orangeFilter = new HSLAdjustPipeline(this, 'orange-filter', {
            hueRotate: 0.5,
            satAdjust: 1.5,
            lumAdjust: 0.5
        });
        let yellowFilter = new HSLAdjustPipeline(this, 'yellow-filter', {
            hueRotate: 0.39,
            satAdjust: 1.1,
            lumAdjust: 0.5
        });
        let greenFilter = new HSLAdjustPipeline(this, 'green-filter', {
            hueRotate: 0.14,
            satAdjust: 1.4,
            lumAdjust: 0.5
        });
        let renderer = this.game.renderer;
        renderer.addPipeline('blue-filter', blueFilter);
        renderer.addPipeline('purple-filter', purpleFilter);
        renderer.addPipeline('orange-filter', orangeFilter);
        renderer.addPipeline('yellow-filter', yellowFilter);
        renderer.addPipeline('greenFilter', greenFilter);
    }

    preload() {
        Swing.load(this);
        Character.load(this);
        Midget.load(this);
        BigMidget.load(this);
        Slot.load(this);

        this.createFilters();
    }

    create() {
        //this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor('#993f3e');
        this.createBackground();

        this.globalContainer = this.add.container(0, 0);

        this.character = new Character();
        this.character.create(this);

        this.swing = new Swing();
        this.swing.create(this);

        this.scrollPanel = new ScrollablePanel(this, {
            scrollMode: 0,
            panel: {
                child: this.globalContainer,
                mask: false
            }
        });
        this.add.existing(this.scrollPanel);
        this.input.on('wheel', this.onScroll);

        this.createNewMidget();
    }

    createBackground() {
        let shape1 = this.make.graphics();
        let shape2 = this.make.graphics();

        shape1.fillStyle(0xffffff);
        shape1.fillRect(0, 0, ART_WIDTH / 2, ART_HEIGHT);

        shape2.fillStyle(0xffffff);
        shape2.fillRect(ART_WIDTH / 2, 0, ART_WIDTH / 2, ART_HEIGHT);

        let mask1 = shape1.createGeometryMask();
        let mask2 = shape2.createGeometryMask();

        let rectColor = 0xc46a55;
        let rectWidth = Math.sin(Phaser.Math.DegToRad(45)) * ART_WIDTH / 2;
        let rectHeight = 3000;
        let rectY = ART_HEIGHT;

        this.rectangle1 = this.add.rectangle(0, rectY, rectWidth, rectHeight, rectColor).setOrigin(0, 1).setAngle(45);
        this.rectangle2 = this.add.rectangle(-ART_WIDTH - 300, rectY, rectWidth, rectHeight, rectColor).setOrigin(0, 1).setAngle(45);
        this.rectangle1.setMask(mask1);
        this.rectangle2.setMask(mask1);

        this.rectangle3 = this.add.rectangle(ART_WIDTH, rectY, rectWidth, rectHeight, rectColor).setOrigin(1, 1).setAngle(-45);
        this.rectangle4 = this.add.rectangle(2 * ART_WIDTH + 300, rectY, rectWidth, rectHeight, rectColor).setOrigin(1, 1).setAngle(-45);
        this.rectangle3.setMask(mask2);
        this.rectangle4.setMask(mask2);

        this.tweens.add({
            targets: this.rectangle1,
            x: { from: -ART_WIDTH - 300, to: ART_WIDTH },
            duration: STEP_DURATION * 24,
            repeat: -1
        });
        this.tweens.add({
            targets: this.rectangle2,
            x: { from: -ART_WIDTH - 300, to: ART_WIDTH },
            duration: STEP_DURATION * 24,
            delay: STEP_DURATION * 12,
            repeat: -1
        });
        this.tweens.add({
            targets: this.rectangle3,
            x: { from: 2 * ART_WIDTH + 300, to: 0 },
            duration: STEP_DURATION * 24,
            repeat: -1
        });
        this.tweens.add({
            targets: this.rectangle4,
            x: { from: 2 * ART_WIDTH + 300, to: 0 },
            duration: STEP_DURATION * 24,
            delay: STEP_DURATION * 12,
            repeat: -1
        });
    }

    update() {
        this.character.updateAnimation();
        this.swing.updateAnimation(this.character.getAnimationProgress());
    }

    createNewMidget() {
        let randomColor = Phaser.Math.Between(MIN_COLOR, MAX_COLOR);
        let chance = Phaser.Math.Between(0, 100);
        let midget;
        if (chance <= BIG_MIDGET_CHANCE) {
            if (this.bigMidgetPool.length > 0) {
                midget = this.bigMidgetPool.pop();
                midget.removeFromContainer(this.globalContainer);
                midget.recycle(randomColor, -14, 226);
            } else {
                midget = new BigMidget(randomColor, -14, 226);
                midget.create(this);
            }
        } else {
            if (this.midgetPool.length > 0) {
                midget = this.midgetPool.pop();
                midget.removeFromContainer(this.globalContainer);
                midget.recycle(randomColor, -14, 226);
            } else { 
                midget = new Midget(randomColor, -14, 226);
                midget.create(this);
            }
        }

        this.swing.setMidget(midget);
    }

    onScroll(pointer, gameObjects, deltaX, deltaY, deltaZ) {
        this.scrollPanel.childOY -= deltaY / 4;
    }
}

export default GameScene;