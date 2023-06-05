// class Player extends Phaser.GameObjects.Sprite {
//     constructor (scene, x, y)
//     {
//         super(scene, x, y, 'player');

//         scene.add.existing(this);
//         scene.physics.add.existing(this);

//         this.setCircle(14, 3, 6);
//         this.setCollideWorldBounds(true);

//         this.isAlive = false;

//         this.speed = 280;
//         //this.target = new Phaser.Math.Vector2();
//     }

//     start ()
//     {
//         this.isAlive = true;

//         this.scene.input.on('pointermove', (pointer) =>
//         {
//             if (this.isAlive)
//             {
//                 this.target.x = pointer.x;
//                 this.target.y = pointer.y;
                
//                 //  Add 90 degrees because the sprite is drawn facing up
//                 this.rotation = this.scene.physics.moveToObject(this, this.target, this.speed) + 1.5707963267948966;
//             }
//         });
//     }

//     kill ()
//     {
//         this.isAlive = false;

//         this.body.stop();
//     }

//     preUpdate ()
//     {
//         if (this.body.speed > 0 && this.isAlive)
//         {
//             if (Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) < 6)
//             {
//                 this.body.reset(this.target.x, this.target.y);
//             }
//         }
//     }
// }

// class MainGame extends Phaser.Scene
// {
//     constructor ()
//     {
//         super('MainGame');
//         this.player;
//     }

//     preload()
//     {
//         this.load.image("player", "./test.png");
//     }

//     create ()
//     {
//         this.graphics = this.add.graphics();

//         this.graphics.fillStyle(0xFF00FF, 1); // color, opacity
//         let bg = this.graphics.fillRect(0, 0, 900, 900);
//         bg.depth = 1;
//         this.player = new Player(this, 400, 400);
//         //this.player.fixedToCamera = true;
//         this.player.start();
//     }
// }

// const config = {
//     type: Phaser.AUTO,
//     width: 800,
//     height: 600,
//     backgroundColor: '#000000',
//     scene: [MainGame],
//     physics: {
//         default: 'arcade',
//         arcade: { debug: false }
//     }
// };

// let game = new Phaser.Game(config);

// // Make sure to run live server in html file dummy