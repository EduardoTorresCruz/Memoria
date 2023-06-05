//Example use on /prototypes/core-gameplay
// class Player extends Phaser.Physics.Arcade.Sprite {
//     constructor(scene, x, y) {
//         super(scene, x, y, 'player');
//         scene.add.existing(this);
//         scene.physics.add.existing(this);
//         this.setCollideWorldBounds(true);

//         this.speed = 300; // Speed in pixels per second
//         this.target = null; // Target to move towards
//     }
    
//     setScene(scene) {
//         this.scene = scene;
//         scene.physics.world.enable(this);
//     }
    
//     setTarget(x, y) {
//         this.target = { x, y };
//         const direction = new Phaser.Math.Vector2(
//             this.target.x - this.x, 
//             this.target.y - this.y
//         ).normalize();
//         this.setVelocity(direction.x * this.speed, direction.y * this.speed);
//     }

//     movePlayer(pointer) {
//         if (pointer.x < this.scene.game.config.width * 0.75) {
//             let targetX = pointer.x;
//             let targetY = pointer.y;
//             this.setTarget(targetX, targetY);
//         }
//     }

//     update() {
//         if (this.target) {
//             let distance = Phaser.Math.Distance.Between(
//                 this.x, this.y, this.target.x, this.target.y
//             );
//             if (distance < 10) {
//                 this.body.reset(this.target.x, this.target.y);
//                 this.target = null;
//             }
//         }
//     }
// }

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
        this.target = { x, y };
    }

    setScene(scene) {
        this.scene = scene;
        scene.physics.world.enable(this);
    }

    movePlayer(pointer) {
        if (pointer.x < this.scene.game.config.width * 0.75) {
            let targetX = pointer.x;
            let targetY = pointer.y;
            this.setTarget(targetX, targetY);
        }
    }

    update() {
        if (this.target) {
            let distanceX = this.target.x - this.x;
            let distanceY = this.target.y - this.y;

            let velocityX = 0;
            let velocityY = 0;

            if (Math.abs(distanceX) < 10) {
                this.x = this.target.x;
            } else {
                velocityX = this.speed * Math.sign(distanceX);
            }

            if (Math.abs(distanceY) < 10) {
                this.y = this.target.y;
            } else {
                velocityY = this.speed * Math.sign(distanceY);
            }

            this.setVelocity(velocityX, velocityY);
        }
    }
}
