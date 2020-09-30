import Phaser from 'phaser';

import { ART_HEIGHT, ART_WIDTH } from './Utils';
import GameScene from './scenes/GameScene';

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    let config = {
        type: Phaser.WEBGL,
        parent: 'game',
        width: ART_WIDTH,
        height: ART_HEIGHT,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        physics: {
            default: 'arcade',
            arcade: { 
                debug: true
            }
        },
        backgroundColor: Phaser.Display.Color.HexStringToColor('#993f3e'),
        clearBeforeRender: false,
        antiAlias: false,
        scene: [ GameScene ]
    };

    var game = new Phaser.Game(config);

    window.plugins.insomnia.keepAwake();
}
