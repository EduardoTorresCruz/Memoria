class Test extends GameScene {
    constructor() {
        super('test', 'Test')
    }

    preload() {
        this.load.path = '../assets/'
        this.load.image('snail', 'snail.png')
        this.load.image('lighton', 'Buttons/Light switch on.png')
        this.load.image('lightoff', 'Buttons/Light switch off.png')
    }

    onEnter() {
        this.add.text(game.config.width/2, game.config.height/2, 'click here to go to test 2')
            .setFontSize(50)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => this.gotoScene('test2'))

        this.lightOn = this.add.image(this.w-4*this.s, this.h-6*this.s, 'lighton')
            .setScale(0.1)

        this.lightOff = this.add.image(this.w-2*this.s, this.h-6*this.s, 'lightoff')
            .setScale(0.1)

        if(this.screenTint.setVisible(false)) {
            this.lightOff.setVisible(false)
        }
        else {
            this.lightOn.setVisible(false)
        }

        this.light = 1

        this.lightSwitchinter = this.add.text(this.w-3*this.s, this.h-8*this.s, '  \n  ')
            .setFontSize(`${(2 * this.s) - 10}px`)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('Toggle light switch?'))
            .on('pointerdown', () => {
                if (this.light == 1) {
                    this.lightOn.setVisible(false)
                    this.lightOff.setVisible(true)
                    this.light = 0
                    this.screenTint.setVisible(true)
                } else {
                    this.lightOff.setVisible(false)
                    this.lightOn.setVisible(true)
                    this.light = 1
                    this.screenTint.setVisible(false)
                }
            });

        this.snail = this.physics.add.sprite(600, 600, 'snail')
        this.snail.body.setAllowGravity(false)
        this.snail.setScale(0.5)

        // this.target = new Vector2()
        
        // this.input.on('pointerdown', (pointer) => {
        //     const {worldx, worldy} = pointer
        //     this.target.x = worldx
        //     this.target.y = worldy
        //     this.physics.moveToObject(this.snail, this.target, 180)
        // });
    }

    // update() {
        // if (this.snail.body.speed > 0) {
        //     const distance = Phaser.Math.Distance.Between(this.snail.x, this.snail.y, this.target.x, this.target.y)
        
        //     if (d < 4) {
        //         this.snail.body.reset(this.target.x, this.target.y)
        //     }   
        // }
    // }
}