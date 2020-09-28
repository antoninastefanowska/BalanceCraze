import { changeContainerOrigin, changeSpriteOrigin, scaleValue, BASE_PATH } from '../../Utils';
import Midget from '../midget/Midget';
import BigMidgetHead from './BigMidgetHead';
import BigMidgetArms from './BigMidgetArms';

class BigMidget extends Midget {
    constructor(color, x, y) {
        super(color, x, y);
        this.height = 287;
        this.weight = 150;
        this.x = this.x - 21;
        this.y = this.y - 4;
        this.chainPoint = {
            x: -122,
            y: 119
        };
    }

    static load(context) {
        context.load.image('midget-big-hat', BASE_PATH + 'midget-big-hat.png');
        context.load.image('midget-big-head', BASE_PATH + 'midget-big-head.png');
        context.load.image('midget-big-bow', BASE_PATH + 'midget-big-bow.png');
        context.load.spritesheet('midget-big-face', BASE_PATH + 'midget-big-face.png', { frameWidth: 64, frameHeight: 56 });

        context.load.spritesheet('midget-big-arm-left', BASE_PATH + 'midget-big-arm-left.png', { frameWidth: 115, frameHeight: 139 });
        context.load.spritesheet('midget-big-arm-right', BASE_PATH + 'midget-big-arm-right.png', { frameWidth: 121, frameHeight: 140 });
        context.load.spritesheet('midget-big-grip-left', BASE_PATH + 'midget-big-grip-left.png', { frameWidth: 55, frameHeight: 33 });
        context.load.spritesheet('midget-big-grip-right', BASE_PATH + 'midget-big-grip-right.png', { frameWidth: 58, frameHeight: 33 });

        context.load.image('midget-big-leg-left', BASE_PATH + 'midget-big-leg-left.png');
        context.load.image('midget-big-leg-right', BASE_PATH + 'midget-big-leg-right.png');
        context.load.image('midget-big-body', BASE_PATH + 'midget-big-body.png');
        context.load.image('midget-big-skirt', BASE_PATH + 'midget-big-skirt.png');
        context.load.image('midget-big-scarf', BASE_PATH + 'midget-big-scarf.png');
    }

    create(context) {
        this.container = context.add.container(this.x, this.y);
        this.frontContainer = context.add.container(this.x, this.y);
        
        this.backBodyCont = context.add.container(0, 6);
        this.midBodyCont = context.add.container(0, 6);
        this.frontBodyCont = context.add.container(0, 6);

        this.head = new BigMidgetHead();
        this.arms = new BigMidgetArms(this.x, this.y);

        this.head.createHat(context, this.backBodyCont);
        this.container.add(this.backBodyCont);
        this.arms.createArms(context, this.container);

        this.legsCont = context.add.container(83, 168);
        this.leftLeg = context.add.image(0, 0, 'midget-big-leg-left').setOrigin(0);
        this.rightLeg = context.add.image(47, 2, 'midget-big-leg-right').setOrigin(0);
        this.legsCont.add([this.leftLeg, this.rightLeg]);
        this.midBodyCont.add(this.legsCont);

        this.torsoCont = context.add.container(0, 110);
        this.torso = context.add.image(64, 0, 'midget-big-body').setOrigin(0);
        this.skirt = context.add.image(33, 61, 'midget-big-skirt').setOrigin(0);
        this.torsoCont.add([this.torso, this.skirt]);

        this.scarf = context.add.image(60, 88, 'midget-big-scarf').setOrigin(0);
        this.frontBodyCont.add([this.torsoCont, this.scarf]);
        this.head.createHead(context, this.frontBodyCont);

        this.container.add(this.midBodyCont);
        this.frontContainer.add(this.frontBodyCont);

        this.arms.createGrips(context);

        changeContainerOrigin(this.backBodyCont, { x: 143, y: 105 });
        changeContainerOrigin(this.midBodyCont, { x: 143, y: 105 });
        changeContainerOrigin(this.frontBodyCont, { x: 143, y: 105 });

        changeContainerOrigin(this.torsoCont, { x: 144, y: 32 });
        changeSpriteOrigin(this.scarf, { x: 83, y: 8 });
        changeSpriteOrigin(this.head.hat, { x: 140, y: 10 });

        changeContainerOrigin(this.legsCont, { x: 60, y: 23 });

        this.updateColor();
    }

    updateAnimation(progress) {
        let torsoAngle = scaleValue(progress, -15, 10);
        let scarfAngle = scaleValue(progress, 0, 5) * (-1);
        let hatScale = scaleValue(progress, 1.0, 1.2);

        this.torsoCont.setAngle(torsoAngle);
        this.scarf.setAngle(scarfAngle);
        this.head.hat.setScale(1.0, hatScale);
    }

    getType() {
        return Midget.BIG;
    }

    changePosition(x, y) {
        this.x = x - 21;
        this.y = y - 4;
        this.container.setPosition(this.x, this.y);
        this.frontContainer.setPosition(this.x, this.y);
        this.arms.changePosition(this.x, this.y);
    }

    changeFace3() { }
}

export default BigMidget;