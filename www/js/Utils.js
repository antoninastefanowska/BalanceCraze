import Phaser from 'phaser';

export const ART_HEIGHT = 1400;
export const ART_WIDTH = 2478;

export const BASE_PATH = "img/sprites/";

export const STEP_DURATION = 500;
export const TILT_DURATION = 1000;
        
var matrix = new Phaser.GameObjects.Components.TransformMatrix();
var parentMatrix = new Phaser.GameObjects.Components.TransformMatrix();

export function changeContainerOrigin(container, origin) {
    for (let child of container.list)
        child.setPosition(child.x - origin.x, child.y - origin.y);
    container.setPosition(container.x + origin.x, container.y + origin.y);
}

export function changeSpriteOrigin(sprite, origin) {
    sprite.setDisplayOrigin(origin.x, origin.y);
    sprite.setPosition(sprite.x + origin.x, sprite.y + origin.y);
}

export function scaleValue(value, a, b) {
    return (b - a) * value + a;
}

export function getGlobalPosition(gameObject) {
    gameObject.getWorldTransformMatrix(matrix, parentMatrix);
    let decomposed = matrix.decomposeMatrix();

    return {
        x: decomposed.translateX,
        y: decomposed.translateY
    };
}