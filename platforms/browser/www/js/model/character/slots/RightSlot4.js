import Slot from './Slot';

class RightSlot4 extends Slot {
    constructor(pole) {
        super(pole);
        this.position = {
            x: 2043,
            y: 153
        };
        this.angle = 0.24;
    }

    createArrow(context) {
        super.createArrow(context);
        this.arrow.setFrame(3);
    }
}

export default RightSlot4;