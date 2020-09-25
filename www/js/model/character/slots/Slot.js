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
        this.midgets = [];
        this.size = 0;
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

    getLast() {
        return this.midgets[this.getLength() - 1];
    }

    addMidget(midget) {
        this.midgets.push(midget);
        let x = this.position.x;
        let y = this.position.y + this.size;
        midget.changePosition(x, y);
        if (this.size > 0)
            midget.changeArms2();
        else
            midget.changeArms1();
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
}

export default Slot;