import Phaser from 'phaser';

import { BASE_PATH } from '../Utils';
import Character from '../model/character/Character';
import Slot from '../model/character/slots/Slot';
import Midget from '../model/midget/Midget';
import BigMidget from '../model/big-midget/BigMidget';

const MIN_COLOR = 0;
const MAX_COLOR = 4;
const BIG_MIDGET_CHANCE = 10;

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.midgetPool = [];
        this.bigMidgetPool = [];
        this.score = 0;
        this.onObjectClicked = this.onObjectClicked.bind(this);
    }

    createFilters() {
        let plugin = this.plugins.get('rexHSLAdjustPipeline');
        let blueFilter = plugin.add(this, 'blue-filter', {
            hueRotate: 0,
            satAdjust: 1,
            lumAdjust: 0.5
        });
        let purpleFilter = plugin.add(this, 'purple-filter', {
            hueRotate: 0.86,
            satAdjust: 1.5,
            lumAdjust: 0.5
        });
        let orangeFilter = plugin.add(this, 'orange-filter', {
            hueRotate: 0.5,
            satAdjust: 1.5,
            lumAdjust: 0.5
        });
        let yellowFilter = plugin.add(this, 'yellow-filter', {
            hueRotate: 0.39,
            satAdjust: 1.1,
            lumAdjust: 0.5
        });
        let greenFilter = plugin.add(this, 'green-filter', {
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
        this.load.image('background', BASE_PATH + 'background2.png');
        this.load.image('swing', BASE_PATH + 'swing.png');
        this.load.image('arrow', BASE_PATH + 'arrow.png');

        Character.load(this);
        Midget.load(this);
        BigMidget.load(this);

        this.createFilters();
    }

    create() {
        this.background = this.add.image(0, 0, 'background').setOrigin(0);

        this.leftArrow1 = this.add.image(749, 189, 'arrow').setOrigin(0);
        this.leftArrow1.setInteractive();
        this.leftArrow1.spotType = Slot.LEFT_SLOT_1;

        this.leftArrow2 = this.add.image(529, 189, 'arrow').setOrigin(0);
        this.leftArrow2.setInteractive();
        this.leftArrow2.spotType = Slot.LEFT_SLOT_2;

        this.leftArrow3 = this.add.image(321, 189, 'arrow').setOrigin(0);
        this.leftArrow3.setInteractive();
        this.leftArrow3.spotType = Slot.LEFT_SLOT_3;

        this.leftArrow4 = this.add.image(118, 189, 'arrow').setOrigin(0);
        this.leftArrow4.setInteractive();
        this.leftArrow4.spotType = Slot.LEFT_SLOT_4;

        this.rightArrow1 = this.add.image(1547, 189, 'arrow').setOrigin(0);
        this.rightArrow1.setInteractive();
        this.rightArrow1.spotType = Slot.RIGHT_SLOT_1;

        this.rightArrow2 = this.add.image(1755, 189, 'arrow').setOrigin(0);
        this.rightArrow2.setInteractive();
        this.rightArrow2.spotType = Slot.RIGHT_SLOT_2;

        this.rightArrow3 = this.add.image(1959, 189, 'arrow').setOrigin(0);
        this.rightArrow3.setInteractive();
        this.rightArrow3.spotType = Slot.RIGHT_SLOT_3;

        this.rightArrow4 = this.add.image(2155, 189, 'arrow').setOrigin(0);
        this.rightArrow4.setInteractive();
        this.rightArrow4.spotType = Slot.RIGHT_SLOT_4;

        this.input.on('gameobjectdown', this.onObjectClicked);

        this.swingCont = this.add.container(55, -143);
        this.swing = this.add.image(0, 0, 'swing').setOrigin(0);
        this.swingCont.add(this.swing);
        
        this.character = new Character();
        this.character.create(this);

        this.createNewMidget();
    }

    update() {

    }

    createNewMidget() {
        let randomColor = Phaser.Math.Between(MIN_COLOR, MAX_COLOR);
        let chance = Phaser.Math.Between(0, 100);
        if (chance <= BIG_MIDGET_CHANCE)
            this.midget = new BigMidget(randomColor, -14, 226);
        else
            this.midget = new Midget(randomColor, -14, 226);
        this.midget.create(this);
        this.midget.addToContainer(this.swingCont);
    }

    onObjectClicked(pointer, gameObject) {     
        this.midget.removeFromContainer(this.swingCont);
        let removed = this.character.addMidgetToSlot(this.midget, gameObject.spotType);
        if (removed != null) {
            for (let removedMidget of removed) {
                if (removedMidget.getType() == Midget.NORMAL)
                    this.midgetPool.push(removedMidget);
                else
                    this.bigMidgetPool.push(removedMidget);
                this.score += removedMidget.getWeight();
            }
        }
        this.createNewMidget();
    }
}

export default GameScene;