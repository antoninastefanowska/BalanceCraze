import Slot from './Slot';

class LeftSlot4 extends Slot {
    constructor(pole) {
        super(pole);
        this.position = {
            x: 6,
            y: 140
        };
        this.angle = -0.12;
    }

    createArrow(context) {
        super.createArrow(context);
        this.arrow.setFrame(3);
    }
}

export default LeftSlot4;