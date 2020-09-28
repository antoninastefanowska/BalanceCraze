import Slot from './Slot';

class LeftSlot3 extends Slot {
    constructor(pole) {
        super(pole);
        this.position = {
            x: 209,
            y: 116
        };
        this.angle = -0.09;
    }

    createArrow(context) {
        super.createArrow(context);
        this.arrow.setFrame(2);
    }
}

export default LeftSlot3;