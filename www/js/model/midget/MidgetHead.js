class MidgetHead {
    constructor() {
        this.faceLevel = 43;
    }

    createHat(context, parentContainer) {
        this.hatCont = context.add.container(0, 0);
        this.hat = context.add.image(19, 0, 'midget-hat').setOrigin(0);
        this.hatCont.add(this.hat);
        parentContainer.add(this.hatCont);
    }

    createHead(context, parentContainer) {
        this.headCont = context.add.container(0, 0);
        this.faceCont = context.add.container(84, this.faceLevel);
        this.head = context.add.image(0, 0, 'midget-head').setOrigin(0);
        this.face = context.add.image(12, 12, 'midget-face', 0).setOrigin(0);
        this.faceCont.add([this.head, this.face]);
        this.headCont.add(this.faceCont);
        parentContainer.add(this.headCont);
    }

    getFaceLevel() {
        return this.faceLevel;
    }

    applyColorFilter(filterName) {
        this.hat.setPipeline(filterName);
    }

    addClickCallback(callback) {
        this.hat.setInteractive();
        this.head.setInteractive();
        this.face.setInteractive();

        this.hat.on('pointerdown', callback);
        this.head.on('pointerdown', callback);
        this.face.on('pointerdown', callback);
    }

    changeFace1() {
        this.face.setFrame(0);
    }

    changeFace2() {
        this.face.setFrame(1);
    }

    changeFace3() {
        this.face.setFrame(2);
    }
}

export default MidgetHead;