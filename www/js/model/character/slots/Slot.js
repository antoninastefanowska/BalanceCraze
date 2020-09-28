import { getGlobalPosition } from '../../../Utils';

const LEFT_SLOT_1 = 0;
const LEFT_SLOT_2 = 1;
const LEFT_SLOT_3 = 2;
const LEFT_SLOT_4 = 3;

const RIGHT_SLOT_1 = 4;
const RIGHT_SLOT_2 = 5;
const RIGHT_SLOT_3 = 6;
const RIGHT_SLOT_4 = 7;

class Slot {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        };
        this.angle = 0;
        this.weight = 0;
        this.size = 0;
        this.midgets = [];
    }

    static get LEFT_SLOT_1() {
        return LEFT_SLOT_1;
    }

    static get LEFT_SLOT_2() {
        return LEFT_SLOT_2;
    }

    static get LEFT_SLOT_3() {
        return LEFT_SLOT_3;
    }

    static get LEFT_SLOT_4() {
        return LEFT_SLOT_4;
    }

    static get RIGHT_SLOT_1() {
        return RIGHT_SLOT_1;
    }

    static get RIGHT_SLOT_2() {
        return RIGHT_SLOT_2;
    }

    static get RIGHT_SLOT_3() {
        return RIGHT_SLOT_3;
    }

    static get RIGHT_SLOT_4() {
        return RIGHT_SLOT_4;
    }

    createContainer(context, parentContainer) {
        this.backContainer = context.add.container(this.position.x, this.position.y);
        this.frontContainer = context.add.container(this.position.x, this.position.y);
        parentContainer.add([this.backContainer, this.frontContainer]);
        parentContainer.sendToBack(this.backContainer);
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

    addMidget(midget) {
        if (this.getLength() > 0)
            midget.changeArms2();
        else {
            midget.changeArms1();
            midget.changeArmsAngle(this.getAngle());
        }
        this.midgets.push(midget);
        this.size += midget.getHeight() - 55;
        this.weight += midget.getWeight();
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

    getGlobalPosition() {
        return getGlobalPosition(this.backContainer);
    }
}

export default Slot;