import Phaser from 'phaser';

import { getGlobalPosition, BASE_GUI_PATH, STEP_DURATION, ART_HEIGHT } from '../../../Utils';
import Midget from '../../midget/Midget';

var counter = 0;

class Slot {
    constructor(pole) {
        this.position = {
            x: 0,
            y: 0
        };
        this.angle = 0;
        this.weight = 0;
        this.size = 0;
        this.midgets = [];
        this.pole = pole;
    }

    static load(context) {
        context.load.spritesheet('arrow', BASE_GUI_PATH + 'arrows.png', { frameWidth: 154, frameHeight: 201 });
    }

    createContainer(context, parentContainer) {
        this.backContainer = context.add.container(this.position.x, this.position.y);
        this.frontContainer = context.add.container(this.position.x, this.position.y);
        parentContainer.add([this.backContainer, this.frontContainer]);
        parentContainer.sendToBack(this.backContainer);

        this.frontContainer.setInteractive(new Phaser.Geom.Circle(110, 30, 110), Phaser.Geom.Circle.Contains);
        this.frontContainer.on('pointerdown', () => this.onAddMidget(context));
    }

    createArrow(context) {
        this.arrow = context.add.image(110, -110, 'arrow');
        this.backContainer.add(this.arrow);

        context.tweens.add({
            targets: this.arrow,
            y: -80,
            duration: STEP_DURATION / 2,
            yoyo: true,
            loop: -1,
            ease: 'Quad.InOut'
        });
    }

    async onAddMidget(context) {
        await context.swing.hideAway(context);
        let midget = context.swing.removeMidget();
        //console.log(midget.name);
        midget.addToContainer(context.globalContainer);

        context.createNewMidget();

        let position = this.getGlobalPosition();
        midget.changePosition(position.x, -midget.getHeight());
        midget.changeArms3();

        await midget.fall(context, position.y + this.getSize());
        
        midget.removeFromContainer(context.globalContainer);
        if (this.getLength() > 0) {
            this.getLast().chainAnother(midget);
            midget.changeArms2();
        }
        else {
            midget.addToDoubleContainer(this.getBackContainer(), this.getFrontContainer());
            midget.changePosition(0, 0);
            midget.changeArms1();
            midget.changeArmsAngle(this.getAngle());
        }
        midget.addClickCallback(() => this.onAddMidget(context));

        this.midgets.push(midget);
        this.size += midget.getHeight() - 55;
        this.weight += midget.getWeight();

        let cleared = this.checkLastThree();
        
        this.pole.calculateAngle();
        this.pole.updateRotation(context);

        if (cleared != null)
            this.clearMidgets(cleared, context);
        
        context.swing.showAgain(context);

        this.pole.removeArrows(context);
    }

    checkLastThree() {
        let length = this.getLength();
        if (length >= 3) {
            let lastMidget1 = this.midgets[length - 1];
            let lastMidget2 = this.midgets[length - 2];
            let lastMidget3 = this.midgets[length - 3];

            if (lastMidget1.getColor() == lastMidget2.getColor() && lastMidget2.getColor() == lastMidget3.getColor()) {
                let removed = this.midgets.splice(-3, 3);
                let removedWeight = lastMidget1.getWeight() + lastMidget2.getWeight() + lastMidget3.getWeight();
                let removedSize = lastMidget1.getHeight() + lastMidget2.getHeight() + lastMidget3.getHeight() - 3 * 55;
                
                this.weight -= removedWeight;
                this.size -= removedSize;

                return removed;
            } else
                return null;
        } else
            return null;
    }

    clearMidgets(cleared, context) {
        cleared[1].unchainAnother(cleared[0]);
        cleared[2].unchainAnother(cleared[1]);
        if (this.getLast() != null)
            this.getLast().unchainAnother(cleared[2]);
        else
            cleared[2].removeFromDoubleContainer(this.backContainer, this.frontContainer);

        for (let i = 0; i < 3; i++) {
            let position = cleared[i].getGlobalPosition();
            cleared[i].addToContainerAt(context.globalContainer, position.x, position.y);
            cleared[i].changeBodyAngle(0, context);
            cleared[i].changeArmsAngle(0);
            cleared[i].changeFace2();
            cleared[i].changeArms3();
            cleared[i].fallAndHide(context, ART_HEIGHT + i * cleared[i].getHeight());

            if (cleared[i].getType() == Midget.NORMAL)
                context.midgetPool.push(cleared[i]);
            else
                context.bigMidgetPool.push(cleared[i]);
            cleared[i].name = counter++;
            context.score += cleared[i].getWeight();
        }
    }

    getBackContainer() {
        return this.backContainer;
    }

    getFrontContainer() {
        return this.frontContainer;
    }

    getPosition() {
        return this.position;
    }

    getAngle() {
        return this.angle;
    }

    getWeight() {
        return this.weight;
    }

    getLength() {
        return this.midgets.length;
    }

    getSize() {
        return this.size;
    }

    getFirst() {
        return this.midgets[0];
    }

    getLast() {
        return this.midgets[this.getLength() - 1];
    }

    getGlobalPosition() {
        return getGlobalPosition(this.backContainer);
    }
}

export default Slot;