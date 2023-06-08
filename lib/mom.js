class Mom extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, path, speed=0) {
        super(scene, x, y, 'mother');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        
        this.speed = 100;
        this.path = path;
        this.currentPathIndex = 0;
        this.forward = true;
        this.setTarget(this.path[0].x, this.path[0].y);
    }

    setTarget(x, y) {
        this.target = { x, y };
    }

    update() {
        if (this.speed !== 0) {
            let distanceX = this.target.x - this.x;
            let distanceY = this.target.y - this.y;
    
            let velocityX = 0;
            let velocityY = 0;
    
            if (Math.abs(distanceX) < 10) {
                this.x = this.path[this.currentPathIndex].x;
            } else {
                velocityX = this.speed * Math.sign(distanceX);
            }
    
            if (Math.abs(distanceY) < 10) {
                this.y = this.path[this.currentPathIndex].y;
            } else {
                velocityY = this.speed * Math.sign(distanceY);
            }
    
            this.setVelocity(velocityX, velocityY);
            if (this.x === this.target.x && this.y === this.target.y) {
                if(this.currentPathIndex === this.path.length - 1) {
                    this.currentPathIndex--;
                    this.forward = false;
                } else if(this.currentPathIndex === 0) {
                    this.currentPathIndex++;
                    this.forward = true;
                } else {
                    if(this.forward) {
                        this.currentPathIndex++;
                    } else {
                        this.currentPathIndex--;
                    }
                }
    
                this.setTarget(this.path[this.currentPathIndex].x, this.path[this.currentPathIndex].y);
            }
        } else {
            this.setVelocity(0, 0);
        }
    }    
}
