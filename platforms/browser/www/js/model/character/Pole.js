import { changeContainerOrigin, TILT_DURATION } from '../../Utils';
import LeftSlot1 from './slots/LeftSlot1';
import LeftSlot2 from './slots/LeftSlot2';
import LeftSlot3 from './slots/LeftSlot3';
import LeftSlot4 from './slots/LeftSlot4';
import RightSlot1 from './slots/RightSlot1';
import RightSlot2 from './slots/RightSlot2';
import RightSlot3 from './slots/RightSlot3';
import RightSlot4 from './slots/RightSlot4';

const D = 130;
const L = [383, 602, 814, 1015];
const CHARACTER_FORCE = 5000;

const FIRST_ANGLE = 0.05;
const SECOND_ANGLE = 0.2;
const LAST_ANGLE = 0.5;

class Pole {
    constructor(character) {
        this.slots = [];

        this.slots.push(new LeftSlot1());
        this.slots.push(new LeftSlot2());
        this.slots.push(new LeftSlot3());
        this.slots.push(new LeftSlot4());
        
        this.slots.push(new RightSlot1());
        this.slots.push(new RightSlot2());
        this.slots.push(new RightSlot3());
        this.slots.push(new RightSlot4());

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

        this.createContainers(context, this.poleCont);

        changeContainerOrigin(this.poleCont, { x: 1141, y: 0 });
        changeContainerOrigin(this.twinPoleCont, { x: 1141, y: 0 });

        this.origin = {
            x: 1141,
            y: 0
        };
    }

    createContainers(context, parentContainer) {
        for (let slot of this.slots)
            slot.createContainer(context, parentContainer);
    }

    async addMidgetToSlot(midget, slotType, context) {
        let slot = this.slots[slotType];

        let position = slot.getGlobalPosition();
        midget.changePosition(position.x, -midget.getHeight());
        midget.changeArms3();

        await midget.fall(context, position.y + slot.getSize());
        
        midget.removeFromContainer(context.globalContainer);
        if (slot.getLength() > 0) {
            let last = slot.getLast();
            last.chainAnother(midget);
        } else {
            midget.addToDoubleContainer(slot.getBackContainer(), slot.getFrontContainer());
            midget.changePosition(0, 0);
        }            
    
        slot.addMidget(midget);
        let cleared = slot.checkLastThree();
    
        this.calculateAngle();
        this.updateRotation(context);

        return cleared;
    }

    calculateAngle() {
        let leftTorque = 0, rightTorque = 0, weightSum = 0;

        for (let i = 0; i < 4; i++) {
            let weight = this.slots[i].getWeight();
            leftTorque += weight * L[i];
            weightSum += weight;
        }
        for (let i = 4; i < 8; i++) {
            let weight = this.slots[i].getWeight();
            rightTorque += weight * L[i - 4];
            weightSum += weight;
        }

        let value = (rightTorque - leftTorque) / (D * (CHARACTER_FORCE + weightSum));
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

        for (let slot of this.slots) {
            if (slot.getLength() > 0)
                slot.getFirst().rotateBody((-1) * this.angle, context);
        }
    }
}

export default Pole;