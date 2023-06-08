class Title extends Phaser.Scene {
    constructor() {
        super('title')
    }
    
    preload() {
        // this.load.path = '/assets/' // local
        this.load.path = '/Memoria/assets/' // github
        this.load.image('title', 'Names/Title.png')
        this.load.image('start', 'Buttons/Start button.png')
        this.load.image('options', 'Buttons/Options button.png')
        this.load.audio('page', 'sounds/page.mp3')
    }
    
    create() {
        this.cameras.main.setBackgroundColor('#444')
        
        this.page = this.sound.add('page').setVolume(0.25)

        this.title = this.add.image(game.config.width/2, game.config.height/3, 'title')
        .setScale(0.5)
        .setOrigin(0.5)
        
        this.start = this.add.image(game.config.width/2, game.config.height/2.75, 'start')
        .setScale(0.5)
        .setOrigin(0.5)
        
        this.startinter = this.add.text(game.config.width/2, game.config.height/2.3, '       ')
        .setOrigin(0.5)
        .setFontSize(50)
        .setInteractive({useHandCursor: true})
        .on('pointerover', () => this.start.setScale(0.6))
        .on('pointerout', () => this.start.setScale(0.5))
        .on('pointerdown', () => {
            this.page.play()
            this.time.delayedCall(1000, () => this.scene.start('intro'))
        })
        
        this.options = this.add.image(game.config.width/2, game.config.height/2.5, 'options')
        .setScale(0.5)
        .setOrigin(0.5)
        
        this.optionsinter = this.add.text(game.config.width/2, game.config.height/1.8, '       ')
        .setOrigin(0.5)
        .setFontSize(50)
        .setInteractive({useHandCursor: true})
        .on('pointerover', () => this.options.setScale(0.55))
        .on('pointerout', () => this.options.setScale(0.5))
        .on('pointerdown', () => {
            this.page.play()
            this.time.delayedCall(100, () => this.scene.start('settings'))
        })
    }
}

class Settings extends Phaser.Scene {
    constructor() {
        super('settings')
    }
    
    preload() {
        //this.load.path = '/assets/' // local
        this.load.path = '/Memoria/assets/' // github
        this.load.image('exit', 'Buttons/Exit button.png')
        this.load.audio('page', 'sounds/page.mp3')
    }
    
    create() {
        this.cameras.main.setBackgroundColor('#444')
        
        this.page = this.sound.add('page').setVolume(0.25)
        
        this.musicToggle = this.add.text(game.config.width/2, game.config.height/2.1, "Toggle sound 🔈")
        .setColor(0xFFFFFF)
        .setOrigin(0.5)
        .setStyle({ fontSize: 50 })
        .setInteractive({useHandCursor: true})
        .on('pointerover', () => this.musicToggle.setFontSize(55))
            .on('pointerout', () => this.musicToggle.setFontSize(50))
            .on('pointerdown', () => {
                if (game.sound.mute) {
                    game.sound.mute = false
                    this.musicToggle.setText("Toggle sound 🔈")
                } else {
                    game.sound.mute = true
                    this.musicToggle.setText("Toggle sound 🔇")
                }
            });
            
            if (game.sound.mute) {
                this.musicToggle.setText("Toggle sound 🔇")
            }
            
            this.exit = this.add.image(game.config.width/2, game.config.height/3.5, 'exit')
            .setOrigin(0.5)
            .setScale(0.5)
            
            this.exitinter = this.add.text(game.config.width/2, game.config.height/1.75, '     ')
            .setOrigin(0.5)
            .setFontSize(50)
            .setInteractive({useHandCursor: true})
            .on('pointerover', () => this.exit.setScale(0.55))
            .on('pointerout', () => this.exit.setScale(0.5))
            .on('pointerdown', () => {
                this.page.play()
                this.time.delayedCall(75, () => this.scene.start('title'))
            })
        }
    }
    
class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }

    create() {
        this.cameras.main.fadeIn(1000);
        this.add.text(game.config.width/2, game.config.height/2, "The Story Begins:\n\nIt's been about twenty years since\nyou've stepped foot in your old house.\nAs per the advice of your therapist, you\ndecide to go back and face some demons\nfrom your past. You feel like you could\ndiscover something here.")
            .setFontSize(50)
            .setOrigin(0.5)

        this.time.addEvent({
            delay: 10000,
            loop: false,
            callback: () => {
                this.scene.start('livingroom');
            }
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro')
    }

    preload() {
        // this.load.path = '/assets/' // local
        this.load.path = '/Memoria/assets/' // github
        this.load.audio('page', 'sounds/page.mp3')
    }

    create() {
        this.cameras.main.fadeIn(1000);
        this.add.text(game.config.width/2, game.config.height/2, "After collecting a handful of memorabilia, the past that you\nhad been shutting out begins to come back to you. You remember\nhow awful your father was over the fact that he didn't have a\nson. How your mother went crazy after the loss of your\nbrother. You're not quite sure what happened in there, or how\neverything looked the way it did twenty years ago, but you\nwere sure of one thing. It wasn't your fault.")
            .setFontSize(50)
            .setOrigin(0.5)

        this.page = this.sound.add('page').setVolume(0.25)

        this.time.addEvent({
            delay: 25000,
            loop: false,
            callback: () => {
                this.page.play()
                this.scene.start('credits');
            }
        });
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
    },
    type: Phaser.AUTO,
    scene: [Title, Settings, Intro, LivingRoom, BathRoom, BabyRoom, Master, Outro, Credits],
    title: "Memoria",
});
