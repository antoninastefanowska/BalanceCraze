import Phaser from 'phaser';
import HSLAdjustPipelinePlugin from 'phaser3-rex-plugins/plugins/hsladjustpipeline-plugin';

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
        plugins: {
            global: [{
                key: 'rexHSLAdjustPipeline',
                plugin: HSLAdjustPipelinePlugin,
                start: true
            }]
        },
        scene: [ GameScene ]
    };

    var game = new Phaser.Game(config);

    window.plugins.insomnia.keepAwake();
}
