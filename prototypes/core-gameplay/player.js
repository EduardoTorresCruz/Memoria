class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);

        this.speed = 300; // Speed in pixels per second
        this.target = null; // Target to move towards
    }

    setTarget(x, y) {
        this.target = this.scene.physics.moveToObject(this, { x, y }, this.speed);
    }

    update() {
        if (this.target) {
            let distance = Phaser.Math.Distance.Between(
                this.x, this.y, this.target.x, this.target.y
            );
            if (distance < 10) {
                this.body.reset(this.target.x, this.target.y);
                this.target = null;
            }
        }
    }
}
