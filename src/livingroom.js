class LivingRoom extends GameScene {
    constructor() {
        super('livingroom', 'LivingRoom')
    }

    preload() {
        // this.load.path = '/assets/' // <- for local
        this.load.path = '/Memoria/assets/' // <- for github
        this.load.image('lighton', 'Buttons/Light switch on.png')
        this.load.image('lightoff', 'Buttons/Light switch off.png')
        this.load.image('bg', 'Background/Background.png')
        this.load.image('player', 'Delilah.png')
        this.load.image('mother', 'Mother.png')
        this.load.image('RoomOn', 'LivingRoom/LivingRoomLightON.png')
        this.load.image('RoomOff', 'LivingRoom/LivingRoomLightOFF.png')
        this.load.image('doorVert', 'Bathroom/Bathroom door.png')
        this.load.image('doorHori', 'Door.png')
        this.load.audio('switchon', 'sounds/LIGHT SWITCH ON SOUND.mp3')
        this.load.audio('switchoff', 'sounds/LIGHT SWITCH OFF SOUND.mp3')
        this.load.audio('bgm', 'sounds/ambience.wav')
        this.load.audio('cry', 'sounds/mom crying.mp3')
        this.load.audio('creak', 'sounds/creak.mp3')
    }

    interact(player, object) {
        if (object == this.frame) {
            this.showMessage(this.frameMsg)
        }
        if (object == this.tv) {
            this.showMessage(this.tvMsg)
        }
        if (object == this.belt && this.light == 0) {
            this.showMessage("A rolled up belt. For some reason it makes you shudder.")
        }
        if (object == this.bottle && this.light == 0) {
            this.showMessage("A broken beer bottle. It looks like it may have been used as a weapon.")
        }
        if (object == this.blood && this.light == 0) {
            this.showMessage("A pool of blood. The blood seems fresh.")
        }
        if (object == this.master) {
            this.creak.play()
            this.bgm.stop()
            // this.gotoScene('masterbedroom')
        }
        if (object == this.bathroom) {
            this.creak.play()
            this.bgm.stop()
            this.gotoScene('bathroom')
        }
        if (object == this.babyroom) {
            this.creak.play()
            this.bgm.stop()
            this.gotoScene('babyroom')
        }
        if (object == this.bedroom) {
            this.showMessage("It's your old room. You don't exactly feel the need to go inside.")
        }
        if (object == this.exit) {
            if (this.hasItem('Baby Crying Clue') && this.hasItem('Broken Record') && this.hasItem('Refurbished Record') && this.hasItem("Mother's Diary")) {
                this.creak.play()
                this.bgm.stop()
                this.gotoScene('credits')
            }
            else {
                this.showMessage("You feel like you're missing something.")
            }
        }
    }

    onEnter() {
        // adding images for rooms
        this.roomOn = this.add.image(game.config.width/2-208, game.config.height/2, 'RoomOn').setScale(0.5)
        this.roomOff = this.add.image(game.config.width/2-208, game.config.height/2, 'RoomOff')
            .setScale(0.5)
            .setVisible(false)

        // adding images for doors
        this.masterDoor = this.add.image(game.config.width/1.34, game.config.height/1.84, 'doorVert').setScale(0.5)
        this.bedroomDoor = this.add.image(game.config.width/6.1, game.config.height/1.84, 'doorVert').setScale(0.5)
        this.bathroomDoor = this.add.image(game.config.width/7.05, game.config.height/1.85, 'doorHori').setScale(0.5)
        this.babyDoor = this.add.image(game.config.width/6.1, game.config.height/1.42, 'doorHori').setScale(0.5)

        // adding player
        this.cursors = this.input.keyboard.createCursorKeys();
        if(this.startPosition){
            this.player = new Player(this, this.startPosition.x, this.startPosition.y)
        }else{
            this.player = new Player(this, 750, 1500);
        }
        this.input.on('pointerdown', this.player.movePlayer, this.player);

        // adding sounds
        this.switchOn = this.sound.add('switchon').setVolume(0.25)
        this.switchOff = this.sound.add('switchoff').setVolume(0.25)
        this.creak = this.sound.add('creak').setVolume(0.25)
        this.bgm = this.sound.add('bgm').setVolume(0.25)
        this.bgm.loop = true
        this.bgm.play()

        // picture frame object
        this.frameMsg = 'A worn family picture. You and your family seem so happy.'
        this.frame = this.add.rectangle(game.config.width/2.05, 170, 300, 20, 0xFFFFFF, 0.5)
        this.physics.add.existing(this.frame)
        this.frame.setVisible(false)

        this.frameinter = this.add.text(game.config.width/2.05, 70, '          \n          \n          ')
            .setFontSize(50)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('A family portrait'))

        // tv object
        this.tvMsg = "The TV seems old and broken. It won't turn on."
        this.tv = this.add.rectangle(game.config.width/1.95, game.config.height/1.6, 140, 100, 0xFFFFFF, 0.5)
        this.physics.add.existing(this.tv)
        this.tv.setVisible(false)

        this.tvinter = this.add.text(game.config.width/1.95, game.config.height/1.675, '   \n   ')
            .setFontSize(25)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('A TV'))

        // belt object
        this.belt = this.add.rectangle(game.config.width/1.96, game.config.height/2.37, 160, 110, 0xFFFFFF, 0.5)
        this.physics.add.existing(this.belt)
        this.belt.setVisible(false)

        this.beltinter = this.add.text(game.config.width/1.96, game.config.height/2.37, '  ')
                .setFontSize(20)
                .setOrigin(0.5)
                .setInteractive({useHandCursor: true})
                .on('pointerover', () => this.showMessage('A belt'))
                .setVisible(false)

        // bottle object
        this.bottle = this.add.rectangle(game.config.width/1.92, game.config.height/1.9, 150, 70, 0xFFFFFF, 0.5)
        this.physics.add.existing(this.bottle)
        this.bottle.setVisible(false)

        this.bottleinter = this.add.text(game.config.width/1.94, game.config.height/1.95, '   ')
            .setFontSize(20)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('A bottle'))
            .setVisible(false)

        // blood object
        this.blood = this.add.rectangle(game.config.width/2.2, game.config.height/1.9, 90, 90, 0xFFFFFF, 0.5)
        this.physics.add.existing(this.blood)
        this.blood.setVisible(false)

        this.bloodinter = this.add.text(game.config.width/2.2, game.config.height/1.9, '   \n   ')
            .setFontSize(30)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('A bloodstain'))
            .setVisible(false)

        // masterbedroom 
        this.master = this.add.rectangle(game.config.width/1.48, game.config.height/2, 10, 100, 0xFFFFFF, 0.5)
        this.physics.add.existing(this.master)
        this.master.setVisible(false)

        this.masterinter = this.add.text(game.config.width/1.465, game.config.height/2, ' \n \n ')
            .setFontSize(30)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('Master bedroom door'))

        // bathroom
        this.bathroom = this.add.rectangle(game.config.width/5.4, game.config.height/1.74, 100, 10, 0xFFFFFF, 0.5)
        this.physics.add.existing(this.bathroom)
        this.bathroom.setVisible(false)

        this.bathroominter = this.add.text(game.config.width/5.4, game.config.height/1.7, '      ')
            .setFontSize(30)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('Bathroom door'))

        // baby room
        this.babyroom = this.add.rectangle(game.config.width/6.1, game.config.height/2.32, 100, 10, 0xFFFFFF, 0.5)
        this.physics.add.existing(this.babyroom)
        this.babyroom.setVisible(false)

        this.babyroominter = this.add.text(game.config.width/6.1, game.config.height/2.4, '     ')
            .setFontSize(30)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage("Baby Brother's door"))

        // bedroom
        this.bedroom = this.add.rectangle(game.config.width/9.5, game.config.height/2, 10, 100, 0xFFFFFF, 0.5)
        this.physics.add.existing(this.bedroom)
        this.bedroom.setVisible(false)

        this.bedroominter = this.add.text(game.config.width/10, game.config.height/2, ' \n \n ')
            .setFontSize(30)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage("Your bedroom door"))

        this.exit = this.add.rectangle(750, 980, 200, 10, 0xFFFFFF, 0.5)
        this.physics.add.existing(this.exit)
        this.exit.setVisible(false)

        this.exitinter = this.add.text(740, 980, '           ')
            .setFontSize(30)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage("Exit"))

        // tint for when light is off
        this.screenTint = this.add.rectangle(0, 0, this.w-500, this.h, 0x000000, 0.5)
            .setOrigin(0, 0)
            .setVisible(false)

        // light switch
        this.lightOn = this.add.image(this.w-4*this.s, this.h-6*this.s, 'lighton').setScale(0.1)
        this.lightOff = this.add.image(this.w-2*this.s, this.h-6*this.s, 'lightoff').setScale(0.1)

        if(this.screenTint.setVisible(false)) {
            this.lightOff.setVisible(false)
        }
        else {
            this.lightOn.setVisible(false)
        }

        this.light = 1

        // light switch interactivity
        this.lightSwitchinter = this.add.text(this.w-3*this.s, this.h-8*this.s, '  \n  ')
            .setFontSize(`${(2 * this.s) - 10}px`)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('Toggle light switch?'))
            .on('pointerdown', () => {
                if (this.light == 1) {
                    this.light = 0
                    this.switchOff.play()
                    this.lightOn.setVisible(false)
                    this.lightOff.setVisible(true)
                    this.screenTint.setVisible(true)
                    this.roomOn.setVisible(false)
                    this.roomOff.setVisible(true)
                    this.beltinter.setVisible(true)
                    this.bottleinter.setVisible(true)
                    this.bloodinter.setVisible(true)
                    this.frameMsg = "A much newer looking family picture. Your Father looks angry, your baby brother is crossed out, and your mom seems to be holding something."
                    this.tvMsg = "The TV is playing a show your baby brother used to love. It hasn't aired in 20 years."
                } else {
                    this.light = 1
                    this.switchOn.play()
                    this.lightOff.setVisible(false)
                    this.lightOn.setVisible(true)
                    this.screenTint.setVisible(false)
                    this.roomOff.setVisible(false)
                    this.roomOn.setVisible(true)
                    this.beltinter.setVisible(false)
                    this.bottleinter.setVisible(false)
                    this.bloodinter.setVisible(false)
                    this.frameMsg = 'A picture of a family of 4. They seem so happy.'
                    this.tvMsg = "The TV seems old and broken. It won't turn on."
                }
            });
        // object interactivity
        this.physics.add.overlap(this.player, this.frame, this.interact, null, this)
        this.physics.add.overlap(this.player, this.tv, this.interact, null, this)
        this.physics.add.overlap(this.player, this.belt, this.interact, null, this)
        this.physics.add.overlap(this.player, this.bottle, this.interact, null, this)
        this.physics.add.overlap(this.player, this.blood, this.interact, null, this)
        this.physics.add.overlap(this.player, this.master, this.interact, null, this)
        this.physics.add.overlap(this.player, this.bathroom, this.interact, null, this)
        this.physics.add.overlap(this.player, this.babyroom, this.interact, null, this)
        this.physics.add.overlap(this.player, this.bedroom, this.interact, null, this)
        this.physics.add.overlap(this.player, this.exit, this.interact, null, this)

        // setting world bounds
        let leftBarrier = this.physics.add.sprite(this.roomOn.x-550, this.roomOn.y, null).setImmovable(true);
        leftBarrier.body.setSize(1, this.roomOn.height);
        leftBarrier.setVisible(false);
        let rightBarrier = this.physics.add.sprite(this.roomOn.x+550, this.roomOn.y, null).setImmovable(true);
        rightBarrier.body.setSize(1, this.roomOn.height);
        rightBarrier.setVisible(false);
        let topBarrier = this.physics.add.sprite(200, 0, null).setImmovable(true);
        topBarrier.body.setSize(this.roomOn.height, 300);
        topBarrier.setVisible(false);
        let topBarrier1 = this.physics.add.sprite(285, 265, null).setImmovable(true);
        topBarrier1.body.setSize(300, 300);
        topBarrier1.setVisible(false);
        let topBarrier2 = this.physics.add.sprite(400, 425, null).setImmovable(true);
        topBarrier2.body.setSize(75, 50);
        topBarrier2.setVisible(false);
        let topBarrier3 = this.physics.add.sprite(225, 425, null).setImmovable(true);
        topBarrier3.body.setSize(75, 50);
        topBarrier3.setVisible(false);

        let downBarrier1 = this.physics.add.sprite(1035, 985, null).setImmovable(true);
        downBarrier1.body.setSize(400, 200);
        downBarrier1.setVisible(false);
        let downBarrier2 = this.physics.add.sprite(450, 985, null).setImmovable(true);
        downBarrier2.body.setSize(400, 200);
        downBarrier2.setVisible(false);
        let downBarrier3 = this.physics.add.sprite(415, 785, null).setImmovable(true);
        downBarrier3.body.setSize(400, 400);
        downBarrier3.setVisible(false);
        let downBarrier4 = this.physics.add.sprite(225, 585, null).setImmovable(true);
        downBarrier4.body.setSize(150, 75);
        downBarrier4.setVisible(false);
        let downBarrier5 = this.physics.add.sprite(510, 585, null).setImmovable(true);
        downBarrier5.body.setSize(200, 75);
        downBarrier5.setVisible(false);
        
        let smallBarrier1 = this.physics.add.sprite(this.roomOn.x+525, 0, null).setImmovable(true);
        smallBarrier1.body.setSize(100, 875);
        smallBarrier1.setVisible(false);
        let smallBarrier2 = this.physics.add.sprite(this.roomOn.x+525, 1000, null).setImmovable(true);
        smallBarrier2.body.setSize(100, 875);
        smallBarrier2.setVisible(false);

        this.physics.add.collider(this.player, leftBarrier);
        this.physics.add.collider(this.player, rightBarrier);
        this.physics.add.collider(this.player, topBarrier);
        this.physics.add.collider(this.player, topBarrier1);
        this.physics.add.collider(this.player, topBarrier2);
        this.physics.add.collider(this.player, topBarrier3);
        this.physics.add.collider(this.player, downBarrier1);
        this.physics.add.collider(this.player, downBarrier1);
        this.physics.add.collider(this.player, downBarrier2);
        this.physics.add.collider(this.player, downBarrier3);
        this.physics.add.collider(this.player, downBarrier4);
        this.physics.add.collider(this.player, downBarrier5);
        this.physics.add.collider(this.player, smallBarrier1);
        this.physics.add.collider(this.player, smallBarrier2);
    }

    update() {
        this.player.update(this.cursors);
    }
}
