import MidgetHead from '../midget/MidgetHead';

class BigMidgetHead extends MidgetHead {
    constructor() {
        super();
        this.faceLevel = 30;
    }

    createHat(context, parentContainer) {
        this.hatCont = context.add.container(16, 0);
        this.hat = context.add.image(31, 0, 'midget-big-hat').setOrigin(0);
        this.hatCont.add(this.hat);
        parentContainer.add(this.hatCont);
    }

    createHead(context, parentContainer) {
        this.headCont = context.add.container(16, 0);
        this.faceCont = context.add.container(80, this.faceLevel);
        this.head = context.add.image(0, 18, 'midget-big-head').setOrigin(0);
        this.face = context.add.image(16, 32, 'midget-big-face').setOrigin(0);
        this.bow = context.add.image(50, 0, 'midget-big-bow').setOrigin(0);
        this.faceCont.add([this.head, this.face, this.bow]);
        this.headCont.add(this.faceCont);
        parentContainer.add(this.headCont);
    }

    applyColorFilter(filterName) {
        super.applyColorFilter(filterName);
        this.bow.setPipeline(filterName);
    }

    addClickCallback(callback) {
        super.addClickCallback(callback);
        this.bow.setInteractive();
        this.bow.on('pointerdown', callback);
    }

    removeClickCallback(callback) {
        super.removeClickCallback(callback);
        this.bow.removeAllListeners();
        this.bow.disableInteractive();
    }
}

export default BigMidgetHead;