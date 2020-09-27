import { changeContainerOrigin, scaleValue, BASE_PATH } from '../Utils'

// 105, 52

class Swing {
    constructor() {
        this.midget = null;
        this.origin = {
            x: 105,
            y: 52
        };
    }

    static load(context) {
        context.load.image('swing', BASE_PATH + 'swing.png');
    }

    updateAnimation(progress) {
        let angle = scaleValue(progress, -10, 10);
        let legAngle = scaleValue(progress, -40, 40);

        this.swingCont.setAngle(angle);

        this.midget.updateAnimation(progress);
        this.midget.legsCont.setAngle(legAngle);
    }

    create(context) {
        this.swingCont = context.add.container(150, -143);
        this.swing = context.add.image(0, 0, 'swing').setOrigin(0);
        this.swingCont.add(this.swing);

        changeContainerOrigin(this.swingCont, this.origin);
    }

    setMidget(midget) {
        midget.addToContainer(this.swingCont);
        midget.changePositionWithoutOffset(midget.x - this.origin.x, midget.y - this.origin.y);
        this.midget = midget;
    }

    removeMidget() {
        let midget = this.midget;
        this.midget = null;
        midget.removeFromContainer(this.swingCont);
        midget.legsCont.setAngle(0);
        return midget;
    }
}

export default Swing;