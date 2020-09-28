import Slot from './Slot';

class LeftSlot1 extends Slot {
    constructor(pole) {
        super(pole);
        this.position = {
            x: 637,
            y: 93
        };
        this.angle = 0;
    }

    createArrow(context) {
        super.createArrow(context);
        this.arrow.setFrame(0);
    }
}

export default LeftSlot1;