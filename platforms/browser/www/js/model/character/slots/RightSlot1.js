import Slot from './Slot';

class RightSlot1 extends Slot {
    constructor(pole) {
        super(pole);
        this.position = {
            x: 1435,
            y: 107
        };
        this.angle = 0.06;
    }

    createArrow(context) {
        super.createArrow(context);
        this.arrow.setFrame(0);
    }
}

export default RightSlot1;