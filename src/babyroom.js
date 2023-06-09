class BabyRoom extends GameScene {
    constructor() {
        super('babyroom', 'BabyRoom')
    }

    preload() {
        // this.load.path = '/assets/' // <- for local
        this.load.path = '/Memoria/assets/' // <- for github
        this.load.image('BabyRoomOn', 'Babyroom/babyRoomOn.png')
        this.load.image('BabyRoomOff', 'Babyroom/babyRoomOff.png')
        this.load.audio('creak', 'sounds/creak.mp3')
        this.load.audio('lullaby', 'sounds/lullaby.wav')

        // this.load.image('lighton', 'Buttons/Light switch on.png')
        // this.load.image('lightoff', 'Buttons/Light switch off.png')
        // this.load.image('player', 'Delilah.png')
        // this.load.image('mother', 'Mother.png')
        // this.load.image('ClosedDoor', 'Bathroom/Bathroom door.png')
        // this.load.image('Opendoor', 'Door.png')
        // this.load.audio('switchon', 'sounds/LIGHT SWITCH ON SOUND.mp3')
        // this.load.audio('switchoff', 'sounds/LIGHT SWITCH OFF SOUND.mp3')
        
    }

    interact(player, object) {
        if (object == this.livingroom) {
            this.creak.play()
            this.lullaby.stop()
            this.gotoLivingScene('livingroom', {x:315, y:485})
        }
        if (object == this.record) {
            this.showMessage(this.recordMsg)
            if (this.light == 0){
                this.gainItem('Broken Record')
                this.momGroup.children.iterate(function(mom) {
                    mom.speed=(this.inventory.length)*100;
                }, this);
            }else{
                this.gainItem('Refurbished Record')
            }
        }
        if(this.momGroup.contains(object)){
            this.lullaby.stop()
            this.player.x=-100;
            this,player.y=-100;
            this.player.setVisible(false);
            this.player.target=null;
            if(this.hasItem('Broken Record')){
                this.loseItem('Broken Record')
            }
            this.gotoScene('livingroom')
        }
        if (this.hasItem('Baby Crying Clue') && this.hasItem('Broken Record') && this.hasItem('Refurbished Record') && this.hasItem("Mother's Diary")) {
            this.lullaby.stop()
            this.creak.play()
            this.gotoScene('outro')
        }
    }

    onEnter() {
        this.creak = this.sound.add('creak').setVolume(0.25)
        this.lullaby = this.sound.add('lullaby').setVolume(0.15)
        this.lullaby.loop = true
        this.lullaby.play()

        this.roomOn = this.physics.add.sprite(game.config.width/2-208, game.config.height/2, 'BabyRoomOn').setScale(0.7).setImmovable(true);
        this.roomOff = this.physics.add.sprite(game.config.width/2-208, game.config.height/2, 'BabyRoomOff')
            .setScale(0.7)
            .setVisible(false)
            .setImmovable(true);
        
        this.lightOn = this.add.image(this.w-4*this.s, this.h-6*this.s, 'lighton')
            .setScale(0.1)
        this.lightOff = this.add.image(this.w-2*this.s, this.h-6*this.s, 'lightoff')
            .setScale(0.1)

        this.switchOn = this.sound.add('switchon').setVolume(0.25)
        this.switchOff = this.sound.add('switchoff').setVolume(0.25)

        this.record = this.add.rectangle(game.config.width/2.4, game.config.height/2.1, 200, 280, 0xFFFFFF, 0.5)
        this.physics.add.existing(this.record)
        this.record.setVisible(false)

        this.recordinterMsg = "A teddy bear"
        this.recordMsg = "It seems to be a record of your baby brother's favorite lullaby."

        this.recordinter = this.add.text(game.config.width/2.4, game.config.height/2.2, '     \n     \n     \n     ')
            .setFontSize(50)
            .setOrigin(0.5)
            .setInteractive({useHandCursor:true})
            .on('pointerover', () => this.showMessage(this.recordinterMsg))

        this.screenTint = this.add.rectangle(0, 0, this.w-500, this.h, 0x000000, 0.5)
            .setOrigin(0, 0)
            .setVisible(false)

            
        if(this.screenTint.setVisible(false)) {
            this.lightOff.setVisible(false)
        }
        else {
            this.lightOn.setVisible(false)
        }

        // adding move around mom
        this.momGroup = this.physics.add.group();
//         let path1 = [
//             { x: 450, y: 500 },
//             { x: 700, y: 500 },
//         ];
//         this.mother1 = new Mom(this, 450, 500, path1);
//         this.mother1.setScale(0.15);
//         this.mother1.setVisible(false);
//         this.mother1.body.checkCollision.none=true;
//         this.mother1.speed=0;

        let path2 = [
            { x: 600, y: 700 },
            { x: 1000, y: 700 },
            { x: 1000, y: 400 },
        ];
        this.mother2 = new Mom(this, 600, 700, path2);
        this.mother2.setScale(0.15);
        this.mother2.setVisible(false);
        this.mother2.body.checkCollision.none=true;
        this.mother2.speed=0;

        let path3 = [
            { x: 250, y: 300 },
            { x: 500, y: 300 },
        ];
        this.mother3 = new Mom(this, 250, 300, path3);
        this.mother3.setScale(0.15);
        this.mother3.setVisible(false);
        this.mother3.body.checkCollision.none=true;
        this.mother3.speed=0;

//         this.momGroup.add(this.mother1);
        this.momGroup.add(this.mother2);
        this.momGroup.add(this.mother3);

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
                    this.recordinterMsg = "A coffin"
                    this.recordMsg = "There was a hidden record. It seems to have been smashed into pieces."
                    this.lullaby.stop()
                    this.momGroup.children.iterate(function(mom) {
                        mom.setVisible(true);
                        mom.body.checkCollision.none=false;
                        mom.speed=(this.inventory.length)*100;
                    }, this);
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
                    this.recordinterMsg = "A teddy bear"
                    this.recordMsg = "There was a hidden record. It seems to be a record of your baby brother's favorite lullaby."
                    this.lullaby.play()
                    this.momGroup.children.iterate(function(mom) {
                        mom.setVisible(false);
                        mom.body.checkCollision.none=true;
                        mom.speed=0;
                    }, this);
                }
            });
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = new Player(this, 325, 235);
        this.input.on('pointerdown', this.player.movePlayer, this.player);

        this.livingroom = this.add.rectangle(game.config.width/5.85, game.config.height/10, 100, 125, 0xFFFFFF, 0.5)
        this.physics.add.existing(this.livingroom)
        this.livingroom.setVisible(false)
        this.livingroominter = this.add.text(game.config.width/5.85, game.config.height/10, '     ')
            .setFontSize(30)
            .setOrigin(0.5)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('Livingroom door'))

        this.physics.add.overlap(this.player, this.livingroom, this.interact, null, this)
        this.physics.add.overlap(this.player, this.record, this.interact, null, this)
        this.momGroup.children.iterate(function(mom) {
            this.physics.add.overlap(this.player, mom, this.interact, null, this)
        }, this);
    }

    update() {
        this.momGroup.children.iterate(function(mom) {
            mom.update();
        });
        this.player.update(this.cursors);
    }
}
