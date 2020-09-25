class MidgetHead {
    createHat(context, parentContainer) {
        this.hatCont = context.add.container(0, 13);
        this.hat = context.add.image(0, 0, 'midget-hat').setOrigin(0);
        this.hatCont.add(this.hat);
        parentContainer.add(this.hatCont);
    }

    createHead(context, parentContainer) {
        this.headCont = context.add.container(0, 13);
        this.faceCont = context.add.container(84, 43);
        this.head = context.add.image(0, 0, 'midget-head').setOrigin(0);
        this.face = context.add.image(12, 12, 'midget-face', 0).setOrigin(0);
        this.faceCont.add([this.head, this.face]);
        this.headCont.add(this.faceCont);
        parentContainer.add(this.headCont);
    }

    applyColorFilter(filterName) {
        this.hat.setPipeline(filterName);
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