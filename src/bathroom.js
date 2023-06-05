class BathRoom extends GameScene {
    constructor() {
        super('bathroom', 'BathRoom')
    }

    preload() {
        this.load.path = '/assets/' // <- for local
        // this.load.path = '/CMPM-Final-Project/assets/' // <- for github
        this.load.image('lighton', 'Buttons/Light switch on.png')
        this.load.image('lightoff', 'Buttons/Light switch off.png')
        this.load.image('player', 'Delilah.png')
        this.load.image('Mother', 'Mother.png')
        this.load.image('RoomOn', 'Bathroom/Bathroom.png')
        this.load.image('RoomOff', 'Bathroom/BathroomLightOFF.png')
        this.load.image('ClosedDoor', 'Bathroom/Bathroom door.png')
        this.load.image('Opendoor', 'Door.png')
        this.load.audio('switchon', 'sounds/LIGHT SWITCH ON SOUND.mp3')
        this.load.audio('switchoff', 'sounds/LIGHT SWITCH OFF SOUND.mp3')
    }

    onEnter() {
        this.roomOn = this.physics.add.sprite(game.config.width/2-208, game.config.height/2, 'RoomOn').setScale(0.9).setImmovable(true);
        this.roomOff = this.physics.add.sprite(game.config.width/2-208, game.config.height/2, 'RoomOff')
            .setScale(0.9)
            .setVisible(false)
            .setImmovable(true);
        
        this.lightOn = this.add.image(this.w-4*this.s, this.h-6*this.s, 'lighton')
            .setScale(0.1)
        this.lightOff = this.add.image(this.w-2*this.s, this.h-6*this.s, 'lightoff')
            .setScale(0.1)

        this.switchOn = this.sound.add('switchon').setVolume(0.25)
        this.switchOff = this.sound.add('switchoff').setVolume(0.25)

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
                    this.switchOff.play()
                    this.lightOn.setVisible(false)
                    this.lightOff.setVisible(true)
                    this.light = 0
                    this.screenTint.setVisible(true)
                    this.roomOn.setVisible(false)
                    this.roomOff.setVisible(true)
                    this.roomOn.body.enable = false;
                    this.roomOff.body.enable = true;
                    this.frameMsg = "A picture of a family of 4. The father's and baby's eyes are crossed out."
                } else {
                    this.switchOn.play()
                    this.lightOff.setVisible(false)
                    this.lightOn.setVisible(true)
                    this.light = 1
                    this.screenTint.setVisible(false)
                    this.roomOff.setVisible(false)
                    this.roomOn.setVisible(true)
                    this.roomOn.body.enable = true;
                    this.roomOff.body.enable = false;
                    this.frameMsg = 'A picture of a family of 4. They seem so happy.'
                }
            });



        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = new Player(this, 450, 550);
        this.input.on('pointerdown', this.player.movePlayer, this.player);

        let leftBarrier = this.physics.add.sprite(this.roomOn.x-350, this.roomOn.y, null).setImmovable(true);
        leftBarrier.body.setSize(1, this.roomOn.height);
        leftBarrier.setVisible(false);
        let rightBarrier = this.physics.add.sprite(this.roomOn.x+350, this.roomOn.y, null).setImmovable(true);
        rightBarrier.body.setSize(1, this.roomOn.height);
        rightBarrier.setVisible(false);

        this.physics.add.collider(this.player, leftBarrier);
        this.physics.add.collider(this.player, rightBarrier);

    }

    update() {
        this.player.update(this.cursors);
    }
}
