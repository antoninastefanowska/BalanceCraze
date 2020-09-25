import MidgetArms from '../midget/MidgetArms';

class BigMidgetArms extends MidgetArms {
    createArms(context, parentContainer) {
        this.armsCont = context.add.container(28, 0);
        this.leftArmCont = context.add.container(0, 0);
        this.leftArm = context.add.image(0, 0, 'midget-big-arm-left', 0).setOrigin(0);
        this.leftArmCont.add(this.leftArm);

        this.rightArmCont = context.add.container(112, 2);
        this.rightArm = context.add.image(0, 0, 'midget-big-arm-right', 0).setOrigin(0);
        this.rightArmCont.add(this.rightArm);
        this.armsCont.add([this.leftArmCont, this.rightArmCont]);
        parentContainer.add(this.armsCont);
    }

    createGrips(context) {
        this.globalGripsCont = context.add.container(this.x, this.y);

        this.gripsCont = context.add.container(28, 0);
        this.leftGripCont = context.add.container(0, 0);
        this.leftGrip = context.add.image(61, 2, 'midget-big-grip-left', 0).setOrigin(0);
        this.leftGripCont.add(this.leftGrip);

        this.rightGripCont = context.add.container(112, 2);
        this.rightGrip = context.add.image(0, 1, 'midget-big-grip-right', 0).setOrigin(0);
        this.rightGripCont.add(this.rightGrip);
        this.gripsCont.add([this.leftGripCont, this.rightGripCont]);

        this.globalGripsCont.add(this.gripsCont); 
    }
}

export default BigMidgetArms;