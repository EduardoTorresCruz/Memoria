class Mom extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'mother');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);

        this.speed = 250; // Speed in pixels per second
        this.isChasing = true;
    }
    
    setScene(scene) {
        this.scene = scene;
        scene.physics.world.enable(this);
    }
    
    setTarget(x, y) {
        this.target = { x, y };
        const direction = new Phaser.Math.Vector2(
            this.target.x - this.x, 
            this.target.y - this.y
        ).normalize();
        this.setVelocity(direction.x * this.speed, direction.y * this.speed);
    }

    moveMom() {
        this.setTarget(player.X, player.Y);
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