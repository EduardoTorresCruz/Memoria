class Player extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, 'player');

        this.scene = config.scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.setScale(2);
        this.body.setSize(14, 20);
        this.body.setOffset(2, 5);
        this.body.setBounce(0.2);

        this.jumping = false;

        this.hitDelay = false;

        this.cursor = this.scene.input.keyboard.createCursorKeys();

        this.life = 3;

    }

    update() {
        if(this.cursor.left.isDown) {
            this.body.setVelocityX(-200);
            this.flipX = true;
        } else if(this.cursor.right.isDown) {
            this.body.setVelocityX(200);
            this.flipX = false;
        } else if(this.cursor.down.isDown && !this.jumping) {
            this.body.setVelocityX(0);
            this.body.setSize(14, 15);
            this.body.setOffset(2, 10);
        }
        else {
            this.body.setVelocityX(0);
            this.body.setSize(14, 20);
            this.body.setOffset(2, 5);
        }

        if(Phaser.Input.Keyboard.JustDown(this.cursor.up) && !this.jumping) {
            this.jumping = true;
            this.body.setVelocityY(-800);
        } else if(this.body.blocked.down) {
            this.jumping = false;
        }
    }
}

export default Player;