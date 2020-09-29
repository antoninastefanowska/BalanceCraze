import { changeContainerOrigin, scaleValue, BASE_SPRITE_PATH } from '../Utils'

const MOVE_DURATION = 300;

class Swing {
    constructor() {
        this.midget = null;
        this.origin = {
            x: 105,
            y: 52
        };
    }

    static load(context) {
        context.load.image('swing', BASE_SPRITE_PATH + 'swing.png');
    }

    updateAnimation(progress) {
        let angle = scaleValue(progress, -10, 10);
        this.swingCont.setAngle(angle);
        
        let legAngle = scaleValue(progress, -40, 40);

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

    async hideAway(context) {
        return new Promise((resolve, reject) => {
            context.tweens.add({
                targets: this.swingCont,
                y: this.swingCont.y - this.midget.getHeight() - 117,
                duration: MOVE_DURATION,
                ease: 'Sine.InOut',
                onComplete: resolve
            });
        });
    }

    async showAgain(context) {
        return new Promise((resolve, reject) => {
            context.tweens.add({
                targets: this.swingCont,
                y: this.swingCont.y + this.midget.getHeight() + 117,
                duration: MOVE_DURATION,
                ease: 'Sine.InOut',
                onComplete: resolve
            });
        });
    }
}

export default Swing;