import Slot from './Slot';

class RightSlot2 extends Slot {
    constructor(pole) {
        super(pole);
        this.position = {
            x: 1643,
            y: 117
        };
        this.angle = 0.12;
    }

    createArrow(context) {
        super.createArrow(context);
        this.arrow.setFrame(1);
    }
}

export default RightSlot2;