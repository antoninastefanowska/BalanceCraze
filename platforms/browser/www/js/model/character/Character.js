import Phaser from 'phaser';

import { changeContainerOrigin, changeSpriteOrigin, BASE_PATH, STEP_DURATION } from '../../Utils';
import Pole from './Pole';

const MIN_EYES = 0;
const MAX_EYES = 3;
const CLOSE_EYES = 4;

const MIN_BLINK_INTERVAL = 1000;
const MAX_BLINK_INTERVAL = 10000;

const BLINK_DURATION = 300;

class Character {
    constructor() {
        this.onRandomEvent = this.onRandomEvent.bind(this);
    }

    static load(context) {
        context.load.spritesheet('rope', BASE_PATH + 'rope.png', { frameWidth: 53, frameHeight: 758 });

        context.load.image('head', BASE_PATH + 'head.png');
        context.load.image('hat-big-left', BASE_PATH + 'hat-big-left.png');
        context.load.image('hat-small-left', BASE_PATH + 'hat-small-left.png');
        context.load.image('hat-big-right', BASE_PATH + 'hat-big-right.png');
        context.load.image('hat-small-right', BASE_PATH + 'hat-small-right.png');

        context.load.image('bangs-left', BASE_PATH + 'bangs-left.png');
        context.load.image('bangs-right', BASE_PATH + 'bangs-right.png');
        context.load.spritesheet('eyes', BASE_PATH + 'eyes.png', { frameWidth: 243, frameHeight: 47 });
        context.load.spritesheet('mouth', BASE_PATH + 'mouth.png', { frameWidth: 85, frameHeight: 24 });

        context.load.image('arms', BASE_PATH + 'arms.png');
        context.load.image('pole', BASE_PATH + 'pole.png');

        context.load.image('skirt-left-1', BASE_PATH + 'skirt-left-1.png');
        context.load.image('skirt-left-2', BASE_PATH + 'skirt-left-2.png');
        context.load.image('skirt-left-3', BASE_PATH + 'skirt-left-3.png');
        context.load.image('skirt-left-4', BASE_PATH + 'skirt-left-4.png');

        context.load.image('skirt-right-1', BASE_PATH + 'skirt-right-1.png');
        context.load.image('skirt-right-2', BASE_PATH + 'skirt-right-2.png');
        context.load.image('skirt-right-3', BASE_PATH + 'skirt-right-3.png');
        context.load.image('skirt-right-4', BASE_PATH + 'skirt-right-4.png');

        context.load.image('leg-left', BASE_PATH + 'leg-left.png');
        context.load.image('leg-right', BASE_PATH + 'leg-right.png');
        context.load.image('body', BASE_PATH + 'body.png');
    }

    create(context) {
        this.rope = context.add.sprite(1213, 642, 'rope').setOrigin(0);

        this.twinContainer = context.add.container(102, 16);
        this.container = context.add.container(0, 0);

        this.bodyCont = context.add.container(0, 0);

        this.legCont = context.add.container(1029, 607);
        this.legLeft = context.add.image(0, 0, 'leg-left').setOrigin(0);
        this.legRight = context.add.image(75, -5, 'leg-right').setOrigin(0);
        this.legCont.add([this.legRight, this.legLeft]);

        this.twinTorsoCont = context.add.container(0, 0);
        this.torsoCont = context.add.container(0, 0);
        this.pole = new Pole(this);
        this.pole.createArms(context, this.torsoCont);

        this.skirtLeftCont = context.add.container(804, 634);
        this.skirtLeft1 = context.add.image(0, 1, 'skirt-left-1').setOrigin(0);
        this.skirtLeft2 = context.add.image(78, 1, 'skirt-left-2').setOrigin(0);
        this.skirtLeft3 = context.add.image(170, 0, 'skirt-left-3').setOrigin(0);
        this.skirtLeft4 = context.add.image(199, 1, 'skirt-left-4').setOrigin(0);
        this.skirtLeftCont.add([this.skirtLeft1, this.skirtLeft2, this.skirtLeft3, this.skirtLeft4]);

        this.skirtRightCont = context.add.container(1220, 634);
        this.skirtRight1 = context.add.image(23, 1, 'skirt-right-1').setOrigin(0);
        this.skirtRight2 = context.add.image(23, 1, 'skirt-right-2').setOrigin(0);
        this.skirtRight3 = context.add.image(8, 0, 'skirt-right-3').setOrigin(0);
        this.skirtRight4 = context.add.image(0, 1, 'skirt-right-4').setOrigin(0);
        this.skirtRightCont.add([this.skirtRight1, this.skirtRight2, this.skirtRight3, this.skirtRight4]);

        this.torso = context.add.image(992, 262, 'body').setOrigin(0);

        this.headCont = context.add.container(849, 0);
        this.hatCont= context.add.container(0, 0);
        this.hatLeftBig = context.add.image(0, 7, 'hat-big-left').setOrigin(0);
        this.hatLeftSmall = context.add.image(4, 88, 'hat-small-left').setOrigin(0);
        this.hatRightBig = context.add.image(275, 0, 'hat-big-right').setOrigin(0);
        this.hatRightSmall = context.add.image(389, 80, 'hat-small-right').setOrigin(0);
        this.hatCont.add([this.hatLeftSmall, this.hatLeftBig, this.hatRightSmall, this.hatRightBig]);

        this.torsoCont.add([this.skirtLeftCont, this.skirtRightCont, this.torso, this.headCont]);
        this.pole.createPole(context, this.torsoCont);
        this.twinTorsoCont.add(this.torsoCont);

        this.bodyCont.add([this.legCont, this.twinTorsoCont]);

        this.faceHairCont = context.add.container(167, 75);
        this.hairCont= context.add.container(31, 0);
        this.bangsLeft = context.add.image(0, 0, 'bangs-left').setOrigin(0);
        this.bangsRight = context.add.image(105, 9, 'bangs-right').setOrigin(0);
        this.hairCont.add([this.bangsLeft, this.bangsRight]);

        this.faceCont= context.add.container(0, 28);
        this.face = context.add.image(0, 0, 'head').setOrigin(0);
        this.mouth = context.add.image(87, 191, 'mouth', 0).setOrigin(0);
        this.eyes = context.add.image(10, 121, 'eyes', 0).setOrigin(0);
        this.faceCont.add([this.face, this.eyes, this.mouth]);
        this.faceHairCont.add([this.faceCont, this.hairCont]);
        this.headCont.add([this.hatCont, this.faceHairCont]);

        this.container.add([this.bodyCont]);
        this.twinContainer.add(this.container);

        changeContainerOrigin(this.container, { x: 1141, y: 1127 });
        changeContainerOrigin(this.twinContainer, { x: 1141, y: 1127 });
        changeContainerOrigin(this.twinTorsoCont, { x: 1138, y: 667 });
        changeContainerOrigin(this.torsoCont, { x: 1138, y: 667 });
        changeContainerOrigin(this.bodyCont, { x: 1153, y: 1132 });
        changeContainerOrigin(this.headCont, { x: 295, y: 325 });
        changeContainerOrigin(this.skirtLeftCont, { x: 230, y: 2 });
        changeContainerOrigin(this.skirtRightCont, { x: 24, y: 2 });
        changeContainerOrigin(this.hatCont, { x: 304, y: 97 });
        
        changeSpriteOrigin(this.legRight, { x: 94, y: 34 });
        changeSpriteOrigin(this.legLeft, { x: 47, y: 34 });

        changeSpriteOrigin(this.skirtLeft1, { x: 230, y: 1 });
        changeSpriteOrigin(this.skirtLeft2, { x: 152, y: 1 });
        changeSpriteOrigin(this.skirtLeft3, { x: 60, y: 1 });
        changeSpriteOrigin(this.skirtLeft4, { x: 31, y: 1 });

        changeSpriteOrigin(this.skirtRight1, { x: 1, y: 1 });
        changeSpriteOrigin(this.skirtRight2, { x: 1, y: 1 });
        changeSpriteOrigin(this.skirtRight3, { x: 16, y: 1 });
        changeSpriteOrigin(this.skirtRight4, { x: 24, y: 1 });

        changeSpriteOrigin(this.hatLeftBig, { x: 296, y: 47 });
        changeSpriteOrigin(this.hatLeftSmall, { x: 171, y: 17 });
        changeSpriteOrigin(this.hatRightBig, { x: 13, y: 97 });
        changeSpriteOrigin(this.hatRightSmall, { x: 14, y: 14 });

        changeSpriteOrigin(this.bangsLeft, { x: 102, y: 37 });
        changeSpriteOrigin(this.bangsRight, { x: 3, y: 30 });

        changeSpriteOrigin(this.eyes, { x: 124, y: 23 });

        this.legRight.setScale(1, 0.8);
        this.legRight.setAngle(-1);
        this.legLeft.setAngle(1);

        this.createAnimations(context);
    }

    createAnimations(context) {
        context.anims.create({
            key: 'step',
            frames: context.anims.generateFrameNumbers('rope', { start: 0, end: 2 }),
            duration: STEP_DURATION / 2,
            repeatDelay: STEP_DURATION / 2,
            repeat: -1
        });
        this.rope.play('step');

        this.legStep = context.tweens.createTimeline({
            loop: -1
        });
        this.legPull = context.tweens.createTimeline({
            loop: -1
        });

        this.legStep.add({
            targets: this.legRight,
            angle: -10,
            scaleY: 0.9,
            duration: STEP_DURATION / 2,
            ease: 'Expo.easeIn',
            onComplete: () => {
                this.legCont.bringToTop(this.legRight);
            }
        });
        this.legStep.add({
            targets: this.legRight,
            angle: -1,
            scaleY: 1,
            duration: STEP_DURATION / 2,
            ease: 'Expo.easeOut'
        });
        this.legPull.add({
            targets: this.legLeft,
            scaleY: 0.8,
            duration: STEP_DURATION,
            ease: 'Expo.easeInOut'
        });
        this.legStep.add({
            targets: this.legLeft,
            angle: 10,
            scaleY: 0.9,
            duration: STEP_DURATION / 2,
            ease: 'Expo.easeIn',
            onComplete: () => {
                this.legCont.bringToTop(this.legLeft);
            }
        });
        this.legStep.add({
            targets: this.legLeft,
            angle: 1,
            scaleY: 1,
            duration: STEP_DURATION / 2,
            ease: 'Expo.easeOut'
        });
        this.legPull.add({
            targets: this.legRight,
            scaleY: 0.8,
            duration: STEP_DURATION,
            ease: 'Expo.easeInOut'
        });
        this.legStep.play();
        this.legPull.play();

        context.tweens.add({
            targets: this.container,
            angle: { from: -0.5, to: 0.5 },
            y: { from: this.container.y, to: this.container.y + 10 }, 
            duration: STEP_DURATION / 2,
            yoyo: true,
            loop: -1,
            ease: 'Sine.easeInOut'
        }); 

        context.tweens.add({
            targets: this.bodyCont,
            angle: { from: -7, to: 7 },
            duration: STEP_DURATION,
            yoyo: true,
            loop: -1,
            ease: 'Sine.easeInOut'
        });

        this.torsoAnim = context.tweens.add({
            targets: this.torsoCont,
            angle: { from: 15, to: -15 },
            duration: STEP_DURATION,
            yoyo: true,
            loop: -1,
            ease: 'Sine.easeInOut'
        });

        context.tweens.add({
            targets: [this.pole.armsCont, this.pole.poleCont],
            angle: { from: -7, to: 7 },
            duration: STEP_DURATION,
            yoyo: true,
            loop: -1,
            ease: 'Sine.easeInOut'
        });

        context.tweens.add({
            targets: this.torsoCont,
            y: { from: this.torsoCont.y - 5, to: this.torsoCont.y + 5 },
            duration: STEP_DURATION / 2,
            yoyo: true,
            loop: -1,
            ease: 'Sine.easeInOut'
        });

        context.tweens.add({
            targets: [this.pole.armsCont, this.pole.poleCont],
            y: { from: this.pole.armsCont.y + 5, to: this.pole.armsCont.y - 5 },
            duration: STEP_DURATION / 2,
            yoyo: true,
            loop: -1,
            ease: 'Sine.easeInOut'
        }); 

        context.tweens.add({
            targets: [this.skirtLeftCont, this.skirtRightCont],
            angle: { from: 5, to: -5 },
            duration: STEP_DURATION,
            yoyo: true,
            loop: -1,
            ease: 'Quad.easeInOut'
        });
        context.tweens.add({
            targets: [this.skirtLeft1, this.skirtRight1],
            angle: { from: 16, to: -16 },
            duration: STEP_DURATION,
            yoyo: true,
            loop: -1,
            ease: 'Quad.easeInOut'
        });
        context.tweens.add({
            targets: [this.skirtLeft2, this.skirtRight2],
            angle: { from: 12, to: -12 },
            duration: STEP_DURATION,
            yoyo: true,
            loop: -1,
            ease: 'Quad.easeInOut'
        });
        context.tweens.add({
            targets: [this.skirtLeft3, this.skirtRight3],
            angle: { from: 8, to: -8 },
            duration: STEP_DURATION,
            yoyo: true,
            loop: -1,
            ease: 'Quad.easeInOut'
        });
        context.tweens.add({
            targets: [this.skirtLeft4, this.skirtRight4],
            angle: { from: 4, to: -4 },
            duration: STEP_DURATION,
            yoyo: true,
            loop: -1,
            ease: 'Quad.easeInOut'
        });

        context.tweens.add({
            targets: this.headCont,
            angle: { from: 7, to: -7 },
            duration: STEP_DURATION,
            yoyo: true,
            loop: -1,
            ease: 'Sine.easeInOut'
        });

        context.tweens.add({
            targets: this.headCont,
            y: { from: this.headCont.y + 10, to: this.headCont.y },
            duration: STEP_DURATION / 2,
            yoyo: true,
            loop: -1,
            ease: 'Sine.easeInOut'
        });

        context.tweens.add({
            targets: this.hatLeftBig,
            angle: { from: 0, to: -2 },
            scaleY: { from: 1.0, to: 1.1 },
            duration: STEP_DURATION / 2,
            yoyo: true,
            loop: -1,
            ease: 'Sine.easeInOut'
        });
        context.tweens.add({
            targets: this.hatRightBig,
            angle: { from: 0, to: 2 },
            scaleY: { from: 1.0, to: 1.1 },
            duration: STEP_DURATION / 2,
            yoyo: true,
            loop: -1,
            ease: 'Sine.easeInOut'
        });
        context.tweens.add({
            targets: this.hatLeftSmall,
            angle: { from: 0, to: -15 },
            scaleY: { from: 1.0, to: 1.1 },
            duration: STEP_DURATION / 2,
            yoyo: true,
            loop: -1,
            ease: 'Sine.easeInOut'
        });
        context.tweens.add({
            targets: this.hatRightSmall,
            angle: { from: 0, to: 15 },
            scaleY: { from: 1.0, to: 1.1 },
            duration: STEP_DURATION / 2,
            yoyo: true,
            loop: -1,
            ease: 'Sine.easeInOut'
        });
        context.tweens.add({
            targets: this.hatCont,
            angle: { from: 2, to: -2 },
            duration: STEP_DURATION,
            yoyo: true,
            loop: -1,
            ease: 'Sine.easeInOut'
        });

        context.tweens.add({
            targets: this.bangsLeft,
            angle: { from: 5, to: -5 },
            scaleY: { from: 1.0, to: 1.2 },
            duration: STEP_DURATION / 2,
            yoyo: true,
            loop: -1,
            ease: 'Sine.easeInOut'
        });
        context.tweens.add({
            targets: this.bangsRight,
            angle: { from: -5, to: 5 },
            scaleY: { from: 1.0, to: 1.1 },
            duration: STEP_DURATION / 2,
            yoyo: true,
            loop: -1,
            ease: 'Sine.easeInOut'
        });

        this.blinkAnim = context.tweens.createTimeline({
            repeat: -1
        });

        this.changeEyesTimer = context.time.addEvent({
            delay: BLINK_DURATION / 3,
            paused: true,
            repeat: -1,
            callback: () => {
                this.eyes.setFrame(this.getRandomEyes())
                this.changeEyesTimer.paused = true;
            }
        });

        this.blinkAnim.add({
            targets: this.eyes,
            scaleY: { from: 1.0, to: 0.5 },
            duration: BLINK_DURATION / 3,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                this.eyes.setScale(1.0);
                this.eyes.setFrame(CLOSE_EYES);
                this.changeEyesTimer.paused = false;
            }
        });
        this.blinkAnim.add({
            targets: this.eyes,
            scaleY: { from: 0.5, to: 1.0 },
            delay: BLINK_DURATION / 3,
            duration: BLINK_DURATION / 3,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                this.blinkAnim.pause();
            }
        });

        this.randomEvent = context.time.addEvent({ 
            delay: this.getRandomTime(),
            callback: this.onRandomEvent
         }); 
    }

    updateAnimation() {
        for (let slot of this.pole.slots) {
            for (let midget of slot.midgets) {
                midget.updateAnimation(this.getAnimationProgress());
            }
        }
    }

    getRandomEyes() {
        return Phaser.Math.Between(MIN_EYES, MAX_EYES);
    }

    getRandomTime() {
        return Phaser.Math.Between(MIN_BLINK_INTERVAL, MAX_BLINK_INTERVAL);
    }

    onRandomEvent() {
        this.blinkAnim.play();
        this.randomEvent.reset({
            delay: this.getRandomTime(),
            callback: this.onRandomEvent,
            repeat: 1
        });
    }

    async addMidgetToSlot(midget, spotType, context) {
        return await this.pole.addMidgetToSlot(midget, spotType, context);
    }

    getAnimationProgress() {
        return (this.torsoCont.angle + 15) / 30;
    }
}

export default Character;