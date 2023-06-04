
class Test1 extends Phaser.Scene {
    constructor() {
        super('Test1')
    }

    preload() {
        this.load.path = '../../assets/'
        this.load.image('player', 'Delilah.png')
    }

    movePlayer(pointer) {
        let targetX = pointer.x;
        let targetY = pointer.y;
        this.player.setTarget(targetX, targetY);
    }
    

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = new Player(this, 100, 100);
        this.input.on('pointerdown', this.movePlayer, this);
        let text = this.add.text(800, 800, 'Tap Me', { fill: '#0f0' });
        text.setInteractive();
        text.on('pointerdown', () => { 
            this.scene.start('Test2', { player: this.player }); 
        });
    }

    update() {
        this.player.update(this.cursors);
    }

}

class Test2 extends Phaser.Scene {
    constructor() {
        super('Test2')
    }

    // preload() {
    //     this.load.path = '../../assets/'
    //     this.load.image('player', 'Delilah.png')
    // }

    create(data) {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = data.player;
        this.input.on('pointerdown', this.movePlayer, this);
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1900,
        height: 1000
    },
    physics: {
        default: 'arcade',
        arcade: {debug: true}
    },
    type: Phaser.AUTO,
    scene: [Test1,Test2],
    title: "Final Project",
});
