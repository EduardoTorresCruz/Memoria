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