class Master extends GameScene {
    constructor() {
        super('master', 'Master')
    }

    preload() {
        this.load.path = '  /assets/' // <- for local
        // this.load.path = '/Memoria/assets/' // <- for github
        this.load.image('lighton', 'Buttons/Light switch on.png')
        this.load.image('lightoff', 'Buttons/Light switch off.png')
        this.load.image('delilah', 'Delilah.png')
        this.load.image('mother', 'Mother.png')
        this.load.image('bed', 'Master Bedroom/Bed.png')
        this.load.image('bedroomdoor', 'Master Bedroom/Bedroom Door.png')
        this.load.image('closet', 'Master Bedroom/Closet.png')
        this.load.image('jewerlybox', 'Master Bedroom/JewerlyBox.png')
        this.load.image('masterbedroombg', 'Master Bedroom/MasterBedroom.png')
        this.load.image('nightstand', 'Master Bedroom/Nightstand.png')
        this.load.image('vanity', 'Master Bedroom/Vanity.png')
        this.load.image('walls', 'Master Bedroom/master-walls.png')
        this.load.audio('switchon', 'sounds/LIGHT SWITCH ON SOUND.mp3')
        this.load.audio('switchoff', 'sounds/LIGHT SWITCH OFF SOUND.mp3')
        this.load.audio('drawer', 'sounds/open drawer sound.mp3')
        this.load.audio('bgm', 'sounds/ambience.wav')
        this.load.audio('cry', 'sounds/mom crying.mp3')
        this.load.audio('creak', 'sounds/creak.mp3')
    }

    onEnter() {
        this.room = this.add.image(game.config.width/2-200, game.config.height/2, 'masterbedroombg').setScale(0.5)
        this.doorimg = this.add.image(game.config.width/2-200, game.config.height/2, 'bedroomdoor').setScale(0.5)
        this.closetimg = this.add.image(game.config.width/2-200, game.config.height/2, 'closet').setScale(0.5)
        this.nightstandimg = this.add.image(game.config.width/2-200, game.config.height/2, 'nightstand').setScale(0.5)
        this.vanityimg = this.add.image(game.config.width/2-200, game.config.height/2, 'vanity').setScale(0.5)
        this.jewerlyboximg = this.add.image(game.config.width/2-200, game.config.height/2, 'jewerlybox').setScale(0.5)


        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = new Player(this, 300, 750);
        this.input.on('pointerdown', this.player.movePlayer, this.player);

        this.door = this.add.rectangle(300, 750, 10, 100, 0xFFFFFF, 0.5)
        this.physics.add.existing(this.door)
        this.door.setVisible(false)

        this.doorinter = this.add.text(280, 750, 'F\nF\nF')
            .setFontSize(30)
            .setOrigin(0.5)
            .setInteractive({useHandCursor:true})
            .on('pointerover', () => this.showMessage('Livingroom door'))

        this.closet = this.add.rectangle()

            // .setInteractive({useHandCursor: true})
            // .on('pointerover', () => this.showMessage('A closet'))
            // .on('pointerdown', () => this.showMessage("An old closet. Maybe it has something inside?"))

            // .setInteractive({useHandCursor: true})
            // .on('pointerover', () => this.showMessage('A nightstand'))
            // .on('pointerdown', () => this.showMessage("It's a simple nightstand"))

            // .setInteractive({useHandCursor: true})
            // .on('pointerover', () => this.showMessage('A small vanity'))
            // .on('pointerdown', () => this.showMessage("You find a small drawer within the vanity."))

            // .setInteractive({useHandCursor: true})
            // .on('pointerover', () => this.showMessage('A small box'))
            // .on('pointerdown', () => this.showMessage("What seems to be a small jewerly box."))
        
        this.screenTint = this.add.rectangle(0, 0, this.w*.75, this.h, 0x000000, 0.5)
            .setOrigin(0, 0)
            .setVisible(false)

        // Light switch image
        this.lightOn = this.add.image(this.w-4*this.s, this.h-6*this.s, 'lighton')
            .setScale(0.1)
        this.lightOff = this.add.image(this.w-2*this.s, this.h-6*this.s, 'lightoff')
            .setScale(0.1)

        // Light switch sound effect
        this.switchOn = this.sound.add('switchon').setVolume(0.25)
        this.switchOff = this.sound.add('switchoff').setVolume(0.25)

        // Tint for light switch
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
                } else {
                    this.switchOn.play()
                    this.lightOn.setVisible(true)
                    this.lightOff.setVisible(false)
                    this.light = 1
                    this.screenTint.setVisible(false)
                }
            });

        let leftBarrier = this.physics.add.sprite(250, 500, null).setImmovable(true);
        leftBarrier.body.setSize(1, this.room.height);
        leftBarrier.setVisible(false);
        let rightBarrier = this.physics.add.sprite(800, 500, null).setImmovable(true);
        rightBarrier.body.setSize(1, this.room.height);
        rightBarrier.setVisible(false);
        // let smallBarrier1 = this.physics.add.sprite(475, 825, null).setImmovable(true);
        // smallBarrier1.body.setSize(150, 400);
        // smallBarrier1.setVisible(false);
        // let smallBarrier2 = this.physics.add.sprite(475, 25, null).setImmovable(true);
        // smallBarrier2.body.setSize(150, 100);
        // smallBarrier2.setVisible(false);
        // let wall = this.physics.add.sprite(this.room.x, this.room.y-700, null).setImmovable(true);
        // wall.body.setSize(1000, this.room.height);
        // wall.setVisible(false);
        // let wall2 = this.physics.add.sprite(this.room.x-340, this.room.y-625, null).setImmovable(true);
        // wall2.body.setSize(300, this.room.height);
        // wall2.setVisible(false);

        this.physics.add.collider(this.player, leftBarrier);
        // this.physics.add.collider(this.player, rightBarrier);
        // this.physics.add.collider(this.player, smallBarrier1);
        // this.physics.add.collider(this.player, smallBarrier2);
        // this.physics.add.collider(this.player, wall);
        // this.physics.add.collider(this.player, wall2)
    }

    update() {
        this.player.update(this.cursors);
    }
}