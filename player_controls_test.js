import Player from '.classes/player.js';

class Play extends Phaser.Scene
{
    constructor ()
    {
        super({key: 'Play'});
    }

    create ()
    {
         
        this.messageBox = this.add.text(500, 500, "HI");

        // Player
        this.player = new Player({
            scene: this,
            x: 100,
            y: 100,
        });
    }

    update ()
    {
        this.player.update();
    }

    
}

const config = {
    title: "TOM",
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: 640,
    height: 360,
    physics: {
        default: "arcade",
        "arcade": {
            gravity: {
                y: 2000
            }
        }
    },
    scene: [
        Play
    ]
};
