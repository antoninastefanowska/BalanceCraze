import { changeContainerOrigin, STEP_DURATION } from '../../Utils';
import Slot from './slots/Slot';
import LeftSlot1 from './slots/LeftSlot1';
import LeftSlot2 from './slots/LeftSlot2';
import LeftSlot3 from './slots/LeftSlot3';
import LeftSlot4 from './slots/LeftSlot4';
import RightSlot1 from './slots/RightSlot1';
import RightSlot2 from './slots/RightSlot2';
import RightSlot3 from './slots/RightSlot3';
import RightSlot4 from './slots/RightSlot4';

const D = 130;
const L1 = 383;
const L2 = 602;
const L3 = 814;
const L4 = 1015;
const CHARACTER_FORCE = 5000;

const TILT_DURATION = 1000;
const FIRST_ANGLE = 0.05;
const SECOND_ANGLE = 0.3;
const LAST_ANGLE = 0.5;

class Pole {
    constructor(character) {
        this.leftSlot1 = new LeftSlot1();
        this.leftSlot2 = new LeftSlot2();
        this.leftSlot3 = new LeftSlot3();
        this.leftSlot4 = new LeftSlot4();
        
        this.rightSlot1 = new RightSlot1();
        this.rightSlot2 = new RightSlot2();
        this.rightSlot3 = new RightSlot3();
        this.rightSlot4 = new RightSlot4();

        this.angle = 0;

        this.origin = {
            x: 0,
            y: 0
        };

        this.character = character;
    }

    createArms(context, parentContainer) {
        this.twinArmsCont = context.add.container(0, 380);
        this.armsCont = context.add.container(0, 0);
        this.arms = context.add.image(993, 0, 'arms').setOrigin(0);
        this.armsCont.add(this.arms);
        this.twinArmsCont.add(this.armsCont);
        parentContainer.add(this.twinArmsCont);
        changeContainerOrigin(this.armsCont, { x: 1141, y: 0 });
        changeContainerOrigin(this.twinArmsCont, { x: 1141, y: 0 });
    }

    createPole(context, parentContainer) {
        this.twinPoleCont = context.add.container(0, 380);
        this.poleCont = context.add.container(0, 0);
        this.pole = context.add.image(0, 93, 'pole').setOrigin(0);
        this.poleCont.add(this.pole);
        this.twinPoleCont.add(this.poleCont);
        parentContainer.add(this.twinPoleCont);
        changeContainerOrigin(this.poleCont, { x: 1141, y: 0 });
        changeContainerOrigin(this.twinPoleCont, { x: 1141, y: 0 });
        this.origin = {
            x: 1141,
            y: 0
        };
    }

    addMidgetToSlot(midget, spotType, context) {
        let slot;
        switch (spotType) {
            case Slot.LEFT_SLOT_1:
                slot = this.leftSlot1;
                break;
            case Slot.LEFT_SLOT_2:
                slot = this.leftSlot2;
                break;
            case Slot.LEFT_SLOT_3:
                slot = this.leftSlot3;
                break;
            case Slot.LEFT_SLOT_4:
                slot = this.leftSlot4;
                break;
            case Slot.RIGHT_SLOT_1:
                slot = this.rightSlot1;
                break;
            case Slot.RIGHT_SLOT_2:
                slot = this.rightSlot2;
                break;
            case Slot.RIGHT_SLOT_3:
                slot = this.rightSlot3;
                break;
            case Slot.RIGHT_SLOT_4:
                slot = this.rightSlot4;
                break;
        }
        midget.addToContainer(this.poleCont, this.origin);
        if (slot.getLength() > 0)
            slot.getLast().bringBodyToTop(this.poleCont);
        
        slot.addMidget(midget);
        let removed = slot.checkLastThree();
        
        if (removed != null) {          
            removed[0].hide();
            removed[1].hide();
            removed[2].hide();

            removed[0].removeFromContainer(this.poleCont);
            removed[1].removeFromContainer(this.poleCont);
            removed[2].removeFromContainer(this.poleCont);
        }

        this.calculateAngle();
        this.updateRotation(context);
        return removed;
    }

    calculateAngle() {
        let weight1 = this.leftSlot1.getWeight();
        let weight2 = this.leftSlot2.getWeight();
        let weight3 = this.leftSlot3.getWeight();
        let weight4 = this.leftSlot4.getWeight();
        let weight5 = this.rightSlot1.getWeight();
        let weight6 = this.rightSlot2.getWeight();
        let weight7 = this.rightSlot3.getWeight();
        let weight8 = this.rightSlot4.getWeight();

        let leftTorque1 = weight1 * L1;
        let leftTorque2 = weight2 * L2;
        let leftTorque3 = weight3 * L3;
        let leftTorque4 = weight4 * L4;
        
        let rightTorque1 = weight5 * L1;
        let rightTorque2 = weight6 * L2;
        let rightTorque3 = weight7 * L3;
        let rightTorque4 = weight8 * L4;

        let denominator = D * (CHARACTER_FORCE + weight1 + weight2 + weight3 + weight4 + weight5 + weight6 + weight7 + weight8);
        let value = (rightTorque1 + rightTorque2 + rightTorque3 + rightTorque4 - leftTorque1 - leftTorque2 - leftTorque3 - leftTorque4) / denominator;
        this.angle = Math.atan(value);
    }

    updateRotation(context) {
        let poleAngle = this.angle;
        let torsoAngle = 0;
        let bodyAngle = 0;

        let sign = poleAngle < 0 ? -1 : 1;
        let absolutePoleAngle = Math.abs(poleAngle);

        if (absolutePoleAngle > FIRST_ANGLE) {
            if (absolutePoleAngle > SECOND_ANGLE) {
                poleAngle = sign * FIRST_ANGLE;
                torsoAngle = sign * SECOND_ANGLE;
                bodyAngle = (Math.abs(this.angle) - SECOND_ANGLE) * sign;
            } else {
                poleAngle = sign * FIRST_ANGLE;
                torsoAngle = (Math.abs(this.angle) - FIRST_ANGLE) * sign;
            }
        }

        context.tweens.add({
            targets: [this.twinPoleCont, this.twinArmsCont],
            rotation: poleAngle,
            duration: TILT_DURATION,
            ease: 'Elastic',
            easeParams: [1.5, 0.3]
        });

        context.tweens.add({
            targets: this.character.twinTorsoCont,
            rotation: torsoAngle,
            duration: TILT_DURATION,
            ease: 'Elastic',
            easeParams: [1.0, 0.3]
        });

        context.tweens.add({
            targets: this.character.twinContainer,
            rotation: bodyAngle,
            duration: TILT_DURATION,
            ease: 'Elastic',
            easeParams: [1.0, 0.3]
        });
    }
}

export default Pole;