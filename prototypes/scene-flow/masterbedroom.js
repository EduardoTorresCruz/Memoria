class MasterBedroom extends GameScene {
    constructor() {
        super('masterbedroom', 'MasterBedroom')
    }

    preload() {
        this.load.path = '../../assets/' // <- for local
        // this.load.path = '/CMPM-Final-Project/assets/' // <- for github
        this.load.image('lighton', 'Buttons/Light switch on.png')
        this.load.image('lightoff', 'Buttons/Light switch off.png')
        this.load.image('bg', 'Background/Background.png')
        this.load.image('delilah', 'Delilah.png')
        this.load.image('mother', 'Mother.png')
        this.load.image('bed', 'Master Bedroom/Bed.png')
        this.load.image('bedroomdoor', 'Master Bedroom/Bedroom Door.png')
        this.load.image('closet', 'Master Bedroom/Closet.png')
        this.load.image('jewerlybox', 'Master Bedroom/JewerlyBox.png')
        this.load.image('masterbedroombg', 'Master Bedroom/MasterBedroom.png')
        this.load.image('nightstand', 'Master Bedroom/Nightstand.png')
        this.load.image('vanity', 'Master Bedroom/Vanity.png')
        this.load.audio('switchon', 'sounds/LIGHT SWITCH ON SOUND.mp3')
        this.load.audio('switchoff', 'sounds/LIGHT SWITCH OFF SOUND.mp3')
        this.load.audio('drawer', 'sounds/open drawer sound.mp3')
        this.load.audio('bgm', 'sounds/ambience.wav')
        this.load.audio('cry', 'sounds/mom crying.mp3')
        this.load.audio('creak', 'sounds/creak.mp3')
    }

    onEnter() {
        this.room = this.add.image(game.config.width/3.2, game.config.height/2, 'masterbedroombg').setScale(0.26)
        this.bedroomDoor = this.add.image(game.config.width/2.44, game.config.height/2.3, 'bedroomdoor').setScale(0.32)
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = new Player(this, 100, 100);
        this.input.on('pointerdown', this.player.movePlayer, this.player);

        this.closet = this.add.image(game.config.width/3.8, game.config.height/2, 'closet').setScale(0.3)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('A closet'))
            .on('pointerdown', () => this.showMessage("An old closet. Maybe it has something inside?"))

        this.nightstand = this.add.image(game.config.width/3, game.config.height/2, 'nightstand').setScale(0.3)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('A nightstand'))
            .on('pointerdown', () => this.showMessage("It's a simple nightstand"))

        this.vanity = this.add.image(game.config.width/2.2, game.config.height/2, 'vanity').setScale(0.3)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('A small vanity'))
            .on('pointerdown', () => this.showMessage("You find a small drawer within the vanity."))

        this.jewerlybox = this.add.image(game.config.width/2, game.config.height/2, 'jewerlybox').setScale(0.3)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.showMessage('A small box'))
            .on('pointerdown', () => this.showMessage("What seems to be a small jewerly box."))
        
        this.screenTint = this.add.rectangle(0, 0, this.w*.75, this.h, 0x000000, 0.5)
            .setOrigin(0, 0)
            .setVisible(false)

        // Light switch image
        this.lightOn = this.add.image(this.w-5*this.s, this.h-6*this.s, 'lighton')
            .setScale(0.07)
        this.lightOff = this.add.image(this.w-2*this.s, this.h-6*this.s, 'lightoff')
            .setScale(0.07)

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
    }

    update() {
        this.player.update(this.cursors);
    }

    shutdown() {
        this.player.destroy();
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    scene: [MasterBedroom],
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    }
};

let game = new Phaser.Game(config);