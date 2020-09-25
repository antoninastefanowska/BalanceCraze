import { BASE_PATH } from '../../Utils';
import MidgetHead from './MidgetHead';
import MidgetArms from './MidgetArms';

const NORMAL = 0;
const BIG = 1;

const BLUE = 0;
const PURPLE = 1;
const ORANGE = 2;
const YELLOW = 3;
const GREEN = 4;

class Midget {
    constructor(color, x, y) {
        this.height = 283;
        this.weight = 50;
        this.color = color;
        this.x = x;
        this.y = y;
        this.offset = {
            x: 0,
            y: 0
        };
    }

    static get NORMAL() {
        return NORMAL;
    }

    static get BIG() {
        return BIG;
    }

    static load(context) {
        context.load.image('midget-hat', BASE_PATH + 'midget-hat.png');
        context.load.image('midget-head', BASE_PATH + 'midget-head.png');
        context.load.spritesheet('midget-face', BASE_PATH + 'midget-face.png', { frameWidth: 58, frameHeight: 56 });

        context.load.spritesheet('midget-arm-left', BASE_PATH + 'midget-arm-left.png', { frameWidth: 99, frameHeight: 130 });
        context.load.spritesheet('midget-arm-right', BASE_PATH + 'midget-arm-right.png', { frameWidth: 99, frameHeight: 131 });
        context.load.spritesheet('midget-grip-left', BASE_PATH + 'midget-grip-left.png', { frameWidth: 50, frameHeight: 33 });
        context.load.spritesheet('midget-grip-right', BASE_PATH + 'midget-grip-right.png', { frameWidth: 49, frameHeight: 33 });

        context.load.image('midget-leg-left', BASE_PATH + 'midget-leg-left.png');
        context.load.image('midget-leg-right', BASE_PATH + 'midget-leg-right.png');
        context.load.image('midget-body', BASE_PATH + 'midget-body.png');
        context.load.image('midget-skirt', BASE_PATH + 'midget-skirt.png');
        context.load.image('midget-scarf', BASE_PATH + 'midget-scarf.png');
    }

    create(context) {
        this.container = context.add.container(this.x, this.y);
        this.twinContainer = context.add.container(this.x, this.y);

        this.head = new MidgetHead();
        this.arms = new MidgetArms(this.x, this.y);
        this.head.createHat(context, this.container);
        this.arms.createArms(context, this.container);
        
        this.bodyCont = context.add.container(16, 87);
        this.twinBodyCont = context.add.container(16, 87);

        this.legsCont = context.add.container(55, 83);
        this.leftLeg = context.add.image(0, 0, 'midget-leg-left').setOrigin(0);
        this.rightLeg = context.add.image(40, 0, 'midget-leg-right').setOrigin(0);
        this.legsCont.add([this.leftLeg, this.rightLeg]);

        this.torsoCont = context.add.container(0, 17);
        this.torso = context.add.image(52, 0, 'midget-body').setOrigin(0);
        this.skirt = context.add.image(0, 62, 'midget-skirt').setOrigin(0);
        this.torsoCont.add([this.torso, this.skirt]);

        this.scarf = context.add.image(11, 0, 'midget-scarf').setOrigin(0);
        this.bodyCont.add(this.legsCont);
        this.twinBodyCont.add([this.torsoCont, this.scarf]);

        this.container.add(this.bodyCont);
        this.twinContainer.add(this.twinBodyCont);

        this.head.createHead(context, this.twinContainer);
        this.arms.createGrips(context);
        
        this.updateColor();

        //context.physics.world.enable(this.container);
    }

    update() {
        //this.container.body.setAngularVelocity(200);
    }

    getType() {
        return NORMAL;
    }

    addToContainer(container, origin = { x: 0, y: 0 }) {
        this.arms.addGripsToContainer(container);
        container.add(this.container);
        container.add(this.twinContainer);
        container.sendToBack(this.container);
        container.bringToTop(this.twinContainer);
        this.offset = origin;
    }

    removeFromContainer(container) {
        this.arms.removeGripsFromContainer(container);
        container.remove(this.container);
        container.remove(this.twinContainer);
    }

    hide() {
        this.arms.hide();
        this.container.setActive(false).setVisible(false);
        this.twinContainer.setActive(false).setVisible(false);
    }

    show() {
        this.arms.show();
        this.container.setActive(true).setVisible(true);
        this.twinContainer.setActive(true).setVisible(true);
    }

    bringBodyToTop(container) {
        container.bringToTop(this.twinContainer);
    }

    updateColor() {
        switch (this.color) {
            case BLUE:
                this.applyColorFilter('blue-filter');
                break;
            case PURPLE:
                this.applyColorFilter('purple-filter');
                break;
            case ORANGE:
                this.applyColorFilter('orange-filter');
                break;
            case YELLOW:
                this.applyColorFilter('yellow-filter');
                break;
            case GREEN:
                this.applyColorFilter('green-filter');
                break;
        }
    }

    changePosition(x, y) {
        this.x = x;
        this.y = y;
        this.container.setPosition(x - this.offset.x, y - this.offset.y);
        this.twinContainer.setPosition(x - this.offset.x, y - this.offset.y);
        this.arms.changePosition(x - this.offset.x, y - this.offset.y);
    }

    changeColor(color) {
        this.color = color;
    }

    applyColorFilter(filterName) {
        this.head.applyColorFilter(filterName);
        this.arms.applyColorFilter(filterName);

        this.leftLeg.setPipeline(filterName);
        this.rightLeg.setPipeline(filterName);
        this.torso.setPipeline(filterName);
        this.skirt.setPipeline(filterName);
        this.scarf.setPipeline(filterName);
    }

    getHeight() {
        return this.height;
    }

    getWeight() {
        return this.weight;
    }

    getColor() {
        return this.color;
    }

    changeArms1() {
        this.arms.changeArms1();
    }

    changeArms2() {
        this.arms.changeArms2();
    }

    changeArms3() {
        this.arms.changeArms3();
    }

    changeFace1() {
        this.head.changeFace1();
    }

    changeFace2() {
        this.head.changeFace2();
    }

    changeFace3() {
        this.head.changeFace3();
    }
}

export default Midget;