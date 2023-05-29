const {Vector2} = Phaser.Math;

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }

    preload() {

    }

    create() {
        this.add.text(game.config.width/2, game.config.height/2, 'click to go to title')
            .setFontSize(50)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.cameras.main.fade(1000, 0, 0, 0)
                this.time.delayedCall(1000, () => this.scene.start('title'))
            });
    }
}

class Title extends Phaser.Scene {
    constructor() {
        super('title')
    }

    preload() {

    }

    create() {
        this.add.text(game.config.width/2, game.config.height/2, 'title will go here\nalso click to continue to next scene')
            .setFontSize(50)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.cameras.main.fade(1000, 0, 0, 0);
                this.time.delayedCall(1000, () => this.scene.start('test'))
            });
    }
}

class Test extends GameScene {
    constructor() {
        super('test', 'Test')
    }

    preload() {
        this.load.path = '../assets/'
        this.load.image('snail', 'snail.png')
    }

    onEnter() {
        this.add.text(game.config.width/2, game.config.height/2, 'click here to go back to intro')
            .setFontSize(50)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => this.gotoScene('intro'))

        this.snail = this.physics.add.sprite(600, 600, 'snail')
        this.snail.body.setAllowGravity(false)
        this.snail.setScale(0.5)

        this.target = new Vector2()
        
        // this.input.on('pointerdown', (pointer) => {
        //     const {worldx, worldy} = pointer
        //     this.target.x = worldx
        //     this.target.y = worldy
        //     this.physics.moveToObject(this.snail, this.target, 180)
        // });
    }

    update() {
        // if (this.snail.body.speed > 0) {
        //     const distance = Phaser.Math.Distance.Between(this.snail.x, this.snail.y, this.target.x, this.target.y)
        
        //     if (d < 4) {
        //         this.snail.body.reset(this.target.x, this.target.y)
        //     }   
        // }
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
    scene: [Intro, Title, Test],
    title: "Final Project",
});
