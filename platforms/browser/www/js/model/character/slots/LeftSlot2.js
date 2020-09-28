import Slot from './Slot';

class LeftSlot2 extends Slot {
    constructor(pole) {
        super(pole);
        this.position = {
            x: 417,
            y: 102
        };
        this.angle = -0.06;
    }

    createArrow(context) {
        super.createArrow(context);
        this.arrow.setFrame(1);
    }
}

export default LeftSlot2;