import Slot from './Slot';

class RightSlot3 extends Slot {
    constructor(pole) {
        super(pole);
        this.position = {
            x: 1847,
            y: 128
        };
        this.angle = 0.12;
    }

    createArrow(context) {
        super.createArrow(context);
        this.arrow.setFrame(2);
    }
}

export default RightSlot3;