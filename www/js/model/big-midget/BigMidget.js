import { BASE_PATH } from '../../Utils';
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
    }

    static load(context) {
        context.load.image('midget-big-hat', BASE_PATH + 'midget-big-hat.png');
        context.load.image('midget-big-head', BASE_PATH + 'midget-big-head.png');
        context.load.image('midget-big-bow', BASE_PATH + 'midget-big-bow.png');
        context.load.spritesheet('midget-big-face', BASE_PATH + 'midget-big-face.png', { frameWidth: 64, frameHeight: 56 });

        context.load.spritesheet('midget-big-arm-left', BASE_PATH + 'midget-big-arm-left.png', { frameWidth: 116, frameHeight: 139 });
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
        this.twinContainer = context.add.container(this.x, this.y);

        this.head = new BigMidgetHead();
        this.arms = new BigMidgetArms(this.x, this.y);
        this.head.createHat(context, this.container);
        this.arms.createArms(context, this.container);
        
        this.bodyCont = context.add.container(0, 94);
        this.twinBodyCont = context.add.container(0, 94);

        this.legsCont = context.add.container(83, 80);
        this.leftLeg = context.add.image(0, 0, 'midget-big-leg-left').setOrigin(0);
        this.rightLeg = context.add.image(47, 2, 'midget-big-leg-right').setOrigin(0);
        this.legsCont.add([this.leftLeg, this.rightLeg]);

        this.torsoCont = context.add.container(0, 16);
        this.torso = context.add.image(64, 0, 'midget-big-body').setOrigin(0);
        this.skirt = context.add.image(33, 61, 'midget-big-skirt').setOrigin(0);
        this.torsoCont.add([this.torso, this.skirt]);

        this.scarf = context.add.image(60, 0, 'midget-big-scarf').setOrigin(0);
        this.bodyCont.add(this.legsCont);
        this.twinBodyCont.add([this.torsoCont, this.scarf]);

        this.container.add(this.bodyCont);
        this.twinContainer.add(this.twinBodyCont);
        
        this.head.createHead(context, this.twinContainer);
        this.arms.createGrips(context);

        this.updateColor();
    }

    getType() {
        return Midget.BIG;
    }

    changePosition(x, y) {
        this.x = x - 21;
        this.y = y - 4;
        this.container.setPosition(this.x - this.offset.x, this.y - this.offset.y);
        this.twinContainer.setPosition(this.x - this.offset.x, this.y - this.offset.y);
        this.arms.changePosition(this.x - this.offset.x, this.y - this.offset.y);
    }

    changeFace3() { }
}

export default BigMidget;