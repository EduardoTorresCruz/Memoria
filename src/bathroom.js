class BathRoom extends GameScene {
    constructor() {
        super('bathroom', 'BathRoom')
    }

    preload() {
        this.load.path = '/assets/' // <- for local
        // this.load.path = '/CMPM-Final-Project/assets/' // <- for github
        this.load.image('BathRoomOn', 'Bathroom/Bathroom.png')
        this.load.image('BathRoomOff', 'Bathroom/BathroomLightOFF.png')
        this.load.audio('creak', 'sounds/creak.mp3')
        this.load.audio('bgm', 'sounds/ambience.wav')
        this.load.audio('babycry', 'Bathroom/baby crying.wav')
    }

    interact(player, object) {
        if (object == this.livingroom) {
            this.creak.play()
            this.bgm.stop()
            this.babycry.stop()
            this.gotoLivingScene('livingroom', {x:350, y:515})
        }
        if (object == this.bath) {
            this.showMessage(this.bathMsg)
            if (this.light == 0) {
                this.babycry.play()
                this.gainItem('Baby Crying Clue')
            }
        }
    }

    onEnter() {
        this.creak = this.sound.add('creak').setVolume(0.25)
        this.babycry = this.sound.add('babycry').setVolume(0.25)
        this.bgm = this.sound.add('bgm').setVolume(0.25)
        this.bgm.loop = true
        this.bgm.play()


        this.roomOn = this.physics.add.sprite(game.config.width/2-208, game.config.height/2, 'BathRoomOn').setScale(0.9).setImmovable(true);
        this.roomOff = this.physics.add.sprite(game.config.width/2-208, game.config.height/2, 'BathRoomOff')
            .setScale(0.9)
            .setVisible(false)
            .setImmovable(true);

        this.bath = this.add.rectangle(this.roomOn.x, this.roomOn.y+250, 700, 30, 0xFFFFFF, 0.5)
        this.physics.add.existing(this.bath)
        this.bath.setVisible(false)

        this.bathMsg = "An old looking bathtub. It looks like it hasn't been used in ages."
        this.bathinter = this.add.text(this.roomOn.x+80, this.roomOn.y+370, '                \n                \n                \n                ')
            .setFontSize(50)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage("A bathtub"))

        this.screenTint = this.add.rectangle(0, 0, this.w-500, this.h, 0x000000, 0.5)
            .setOrigin(0, 0)
            .setVisible(false)

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
                    this.bathMsg = "A bathtub filled with water and blood."
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
                    this.bathMsg = "An old very aged bathtub. It looks like it hasn't been used in ages."
                }
            });
            
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = new Player(this, 500, 550);
        this.input.on('pointerdown', this.player.movePlayer, this.player);

        this.livingroom = this.add.rectangle(game.config.width/4.5, game.config.height/1.8, 10, 100, 0xFFFFFF, 0.5)
        this.physics.add.existing(this.livingroom)
        this.livingroom.setVisible(false)
        this.livingroominter = this.add.text(game.config.width/4.5, game.config.height/1.8, ' \n \n ')
            .setFontSize(30)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('Livingroom door'))

        this.physics.add.overlap(this.player, this.livingroom, this.interact, null, this)
        this.physics.add.overlap(this.player, this.bath, this.interact, null, this)
        
        let leftBarrier = this.physics.add.sprite(this.roomOn.x-350, this.roomOn.y, null).setImmovable(true);
        leftBarrier.body.setSize(1, this.roomOn.height);
        leftBarrier.setVisible(false);
        let rightBarrier = this.physics.add.sprite(this.roomOn.x+350, this.roomOn.y, null).setImmovable(true);
        rightBarrier.body.setSize(1, this.roomOn.height);
        rightBarrier.setVisible(false);
        let smallBarrier1 = this.physics.add.sprite(475, 825, null).setImmovable(true);
        smallBarrier1.body.setSize(150, 400);
        smallBarrier1.setVisible(false);
        let smallBarrier2 = this.physics.add.sprite(475, 25, null).setImmovable(true);
        smallBarrier2.body.setSize(150, 100);
        smallBarrier2.setVisible(false);
        let wall = this.physics.add.sprite(this.roomOn.x, this.roomOn.y-700, null).setImmovable(true);
        wall.body.setSize(1000, this.roomOn.height);
        wall.setVisible(false);
        let wall2 = this.physics.add.sprite(this.roomOn.x-340, this.roomOn.y-625, null).setImmovable(true);
        wall2.body.setSize(300, this.roomOn.height);
        wall2.setVisible(false);
        let tub = this.physics.add.sprite(this.roomOn.x, this.roomOn.y+330, null).setImmovable(true);
        tub.body.setSize(700, this.roomOn.height-1000);
        tub.setVisible(false);

        this.physics.add.collider(this.player, leftBarrier);
        this.physics.add.collider(this.player, rightBarrier);
        this.physics.add.collider(this.player, smallBarrier1);
        this.physics.add.collider(this.player, smallBarrier2);
        this.physics.add.collider(this.player, wall);
        this.physics.add.collider(this.player, wall2)
        this.physics.add.collider(this.player, tub)
    }

    update() {
        this.player.update(this.cursors);
    }
}
