import { changeContainerOrigin } from '../../Utils';

class MidgetArms {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.shoulderLevel = 115;
        this.shoulderDistance = 61;
    }

    createArms(context, parentContainer) {
        this.armsCont = context.add.container(26, 0);
        this.leftArmCont = context.add.container(0, 0);
        this.leftArm = context.add.image(0, 0, 'midget-arm-left', 0).setOrigin(0);
        this.leftArmCont.add(this.leftArm);

        this.rightArmCont = context.add.container(96, 2);
        this.rightArm = context.add.image(0, 0, 'midget-arm-right', 0).setOrigin(0);
        this.rightArmCont.add(this.rightArm);
        this.armsCont.add([this.leftArmCont, this.rightArmCont]);

        parentContainer.add(this.armsCont);
        changeContainerOrigin(this.leftArmCont, { x: 65, y: 116 });
        changeContainerOrigin(this.rightArmCont, { x: 29, y: 114 });
    }

    createGrips(context) {
        this.globalGripsCont = context.add.container(this.x, this.y);

        this.gripsCont = context.add.container(26, 0);
        this.leftGripCont = context.add.container(0, 0);
        this.leftGrip = context.add.image(49, 1, 'midget-grip-left', 0).setOrigin(0);
        this.leftGripCont.add(this.leftGrip);

        this.rightGripCont = context.add.container(96, 2);
        this.rightGrip = context.add.image(0, 0, 'midget-grip-right', 0).setOrigin(0);
        this.rightGripCont.add(this.rightGrip);
        this.gripsCont.add([this.leftGripCont, this.rightGripCont]);

        this.globalGripsCont.add(this.gripsCont);
        changeContainerOrigin(this.leftGripCont, { x: 65, y: 116 });
        changeContainerOrigin(this.rightGripCont, { x: 29, y: 114 });
    }

    changePosition(x, y) {
        this.x = x;
        this.y = y;
        this.globalGripsCont.setPosition(x, y);
    }

    applyColorFilter(filterName) {
        this.leftArm.setPipeline(filterName);
        this.rightArm.setPipeline(filterName);
        this.leftGrip.setPipeline(filterName);
        this.rightGrip.setPipeline(filterName);
    }

    addGripsToContainer(container) {
        container.add(this.globalGripsCont);
    }

    removeGripsFromContainer(container) {
        container.remove(this.globalGripsCont);
    }

    sendGripsToBack(container) {
        container.sendToBack(this.globalGripsCont);
    }

    hide() {
        this.globalGripsCont.setActive(false).setVisible(false);
    }

    show() {
        this.globalGripsCont.setActive(true).setVisible(true);
    }

    changeArmsAngle(angle) {
        let value = parseInt((this.shoulderDistance / 2) * Math.tan(angle));
        
        this.leftArmCont.setY(this.shoulderLevel - value);
        this.leftGripCont.setY(this.shoulderLevel - value);
        this.rightArmCont.setY(this.shoulderLevel + value);
        this.rightGripCont.setY(this.shoulderLevel + value);
    }

    changeArms1() {
        this.leftArm.setFrame(0);
        this.rightArm.setFrame(0);
        this.globalGripsCont.setVisible(true);
        this.leftGrip.setFrame(0);
        this.rightGrip.setFrame(0);
    }

    changeArms2() {
        this.leftArm.setFrame(1);
        this.rightArm.setFrame(1);
        this.globalGripsCont.setVisible(true);
        this.leftGrip.setFrame(1);
        this.rightGrip.setFrame(1);
    }

    changeArms3() {
        this.leftArm.setFrame(2);
        this.rightArm.setFrame(2);
        this.globalGripsCont.setVisible(false);
    }
}

export default MidgetArms;