import Phaser from 'phaser';
import { ScrollablePanel, Slider } from 'phaser3-rex-plugins/templates/ui/ui-components';
import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle';

import { ART_WIDTH, ART_HEIGHT, STEP_DURATION, BASE_GUI_PATH } from '../Utils';

import Character from '../model/character/Character';
import Swing from '../model/Swing';
import Slot from '../model/character/slots/Slot';
import Midget from '../model/midget/Midget';
import BigMidget from '../model/big-midget/BigMidget';

const MIN_COLOR = 0;
const MAX_COLOR = 4;
const BIG_MIDGET_CHANCE = 50;

const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.midgetPool = [];
        this.bigMidgetPool = [];
        this.score = 0;

        this.onScroll = this.onScroll.bind(this);
        this.onSlider = this.onSlider.bind(this);
    }

    preload() {
        Swing.loadAssets(this);
        Character.loadAssets(this);
        Midget.loadAssets(this);
        BigMidget.loadAssets(this);
        Slot.loadAssets(this);

        this.load.spritesheet('star', BASE_GUI_PATH + 'stars.png', { frameWidth: 165, frameHeight: 159 });
    }

    create() {
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor('#993f3e');
        this.createBackground();

        this.scoreText = this.add.text(ART_WIDTH - 110, 0, this.score.toString(), {
            fontFamily: 'Montserrat',
            fontSize: '300px',
            color: '#000',
            align: 'right' 
        }).setOrigin(1, 0).setAlpha(0.3);

        this.particlesContainer = this.add.container(0, 0);
        this.globalContainer = this.add.container(0, 0);

        this.character = new Character();
        this.character.create(this);

        this.swing = new Swing();
        this.swing.create(this);

        let sliderTrack = new RoundRectangle(this, 0, 0, 0, 0, 25, 0x000000).setAlpha(0.2);
        let sliderThumb = new RoundRectangle(this, 0, 0, 25, 25, 25, 0x000000).setAlpha(0.4);
        this.add.existing(sliderTrack);
        this.add.existing(sliderThumb);
        this.scrollPanel = new ScrollablePanel(this, {
            scrollMode: 0,
            panel: {
                child: this.globalContainer,
                mask: false
            }
        });
        this.slider = new Slider(this, {
            x: ART_WIDTH - 60,
            y: 70,
            height: 1235,
            width: 25,
            orientation: 1,
            track: sliderTrack,
            thumb: sliderThumb,
            input: 'drag',
            valuechangeCallback: this.onSlider
        }).setOrigin(1, 0).layout();
        this.slider.setActive(false).setVisible(false);

        this.add.existing(this.scrollPanel);
        this.add.existing(this.slider);
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

        let rectangle1 = this.add.rectangle(0, rectY, rectWidth, rectHeight, rectColor).setOrigin(0, 1).setAngle(45);
        let rectangle2 = this.add.rectangle(-ART_WIDTH - 300, rectY, rectWidth, rectHeight, rectColor).setOrigin(0, 1).setAngle(45);
        rectangle1.setMask(mask1);
        rectangle2.setMask(mask1);

        let rectangle3 = this.add.rectangle(ART_WIDTH, rectY, rectWidth, rectHeight, rectColor).setOrigin(1, 1).setAngle(-45);
        let rectangle4 = this.add.rectangle(2 * ART_WIDTH + 300, rectY, rectWidth, rectHeight, rectColor).setOrigin(1, 1).setAngle(-45);
        rectangle3.setMask(mask2);
        rectangle4.setMask(mask2);

        this.tweens.add({
            targets: rectangle1,
            x: { from: -ART_WIDTH - 300, to: ART_WIDTH },
            duration: STEP_DURATION * 24,
            repeat: -1
        });
        this.tweens.add({
            targets: rectangle2,
            x: { from: -ART_WIDTH - 300, to: ART_WIDTH },
            duration: STEP_DURATION * 24,
            delay: STEP_DURATION * 12,
            repeat: -1
        });
        this.tweens.add({
            targets: rectangle3,
            x: { from: 2 * ART_WIDTH + 300, to: 0 },
            duration: STEP_DURATION * 24,
            repeat: -1
        });
        this.tweens.add({
            targets: rectangle4,
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

    addScore(value) {
        let step = 10;
        let repeats = Math.ceil(value / step) - 1;
        this.time.addEvent({
            delay: 5,
            repeat: repeats,
            callback: () => {
                this.score += step;
                this.scoreText.setText(this.score.toString());
            }
        });
    }

    onScroll(pointer, gameObjects, deltaX, deltaY, deltaZ) {
        let overflow = this.getOverflow();
        let value = this.getScrollY() - deltaY / 4;
        value = value < 0 ? value : 0;
        value = value > -overflow ? value : -overflow;
        this.changeScroll(value, overflow);
    }

    onSlider(newValue, oldValue, slider) {
        let overflow = this.getOverflow();
        this.scrollPanel.childOY = -overflow * newValue;
    }

    updateSlider() {
        let overflow = this.getOverflow();
        let sliderValue = overflow != 0 ? -this.getScrollY() / overflow : 0;
        this.slider.setValue(sliderValue);
        console.log(overflow);
        if (overflow > 0)
            this.showSlider();
        else
            this.hideSlider();
    }

    changeScroll(value, overflow) {
        let sliderValue = overflow != 0 ? -value / overflow : 0;
        this.scrollPanel.childOY = value;
        this.slider.setValue(sliderValue);
    }

    getOverflow() {
        let y = this.character.pole.getLowestPoint(this.getScrollY());
        let overflow = y - ART_HEIGHT;
        overflow = overflow < 0 ? 0 : overflow;
        return overflow;
    }

    getScrollY() {
        return this.scrollPanel.childOY;
    }

    hideSlider() {
        this.tweens.add({
            targets: this.slider,
            alpha: 0,
            duration: 2000,
            ease: 'Quad.In',
            onComplete: () => this.slider.setActive(false).setVisible(false)
        });
    }

    showSlider() {
        this.tweens.add({
            targets: this.slider,
            alpha: 1,
            duration: 2000,
            ease: 'Quad.In',
            onStart: () => this.slider.setActive(true).setVisible(true)
        });
    }
}

export default GameScene;