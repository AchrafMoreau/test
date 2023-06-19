


const canvas = document.getElementById('canvas');
canvas.width = 510
canvas.height = 590
const img = new Image();
img.src = 'background.jpg'
const ctx = canvas.getContext('2d');




ctx.fillRect(0,0, canvas.width, canvas.height)
Begine = true;


class SpeedLevel{
    
    constructor(speed){
        this.speed = speed
        // if(mystps[0].position.y)
        
        const levels = setInterval(()=>{
            if(mystps[0].position.y <= 64 || Begine) return;
            this.speed += .01
            if(mystps[mystps.length -1].position.y > canvas.height){
                clearInterval(levels)
                console.log('done')
            }
        } ,300)
    }
    
}


const gravity = 0.5

// class for player
class Test extends SpeedLevel{
    constructor({position, velocity, height, width, collbloks, platformCollboks, speed}){
        super(speed)
        this.position = position
        this.veloctiy = velocity
        this.height = height
        this.width = width
        this.collbloks = collbloks
        this.platformCollboks = platformCollboks
        this.speed = speed
        
    }

    draw(color){
        ctx.fillStyle = color
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        
    }

    update(color){
        this.draw(color)
        this.position.y += this.veloctiy.y
        this.veloctiy.y += gravity
        this.position.x += this.veloctiy.x
        if(this.position.x  <= 0 ){
            this.position.x = 0
        }else if(this.position.x + this.width >= canvas.width){
            this.position.x = canvas.width - this.width
        }
        this.checkForVerticalIntraction()
    }
    checkForVerticalIntraction(){
        
        for(let i = 0; i<this.collbloks.length; i++){
            const collisionBlock = this.collbloks[i]
            if(
                this.position.y + this.height >= collisionBlock.position.y &&
                this.position.y <= collisionBlock.height + collisionBlock.position.y &&
                this.position.x <= collisionBlock.width + collisionBlock.position.x &&
                this.position.x + this.height >= collisionBlock.position.x && Begine
            ){
                if(this.veloctiy.y > 0){
                    this.veloctiy.y = 0
                    this.position.y = collisionBlock.position.y - this.height - 0.01
                    break
                }
                if(this.veloctiy.y < 0){
                    this.veloctiy.y = 0
                    this.position.y = this.collisionBlock.y + this.height + 0.01
                    break
                }
                
            }
        }
        for(let i = 0; i<this.platformCollboks.length; i++){
            const collisionBlock = this.platformCollboks[i]
            if(
                this.position.y + this.height >= collisionBlock.position.y &&
                this.position.y + this.height <= collisionBlock.position.y + collisionBlock.height &&
                this.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.position.x + this.width >= collisionBlock.position.x
            ){
                if(this.veloctiy.y > 0){
                    // console.log('yes')
                    this.veloctiy.y = 1
                    this.position.y = collisionBlock.position.y - this.height + this.speed
                    Begine = false;
                    break
                }
                
                
                
            }
        }
    }

    checkForHorizontalIntraction(){
        for(let i = 0; i<this.collbloks.length; i++){
            const collisionBlock = this.collbloks[i]
            if(
                this.position.y + this.height >= collisionBlock.position.y &&
                this.position.y <= collisionBlock.position.y + collisionBlock.height &&
                this.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.position.x + this.width >= collisionBlock.position.x
            ){
                
                if(this.veloctiy.x > 0){
                    this.veloctiy.x = 0
                    this.position.x = collisionBlock.position.x - this.width - 0.01
                    break
                }
                if(this.veloctiy.x < 0){
                    this.veloctiy.x = 0
                    this.position.x = collisionBlock.position.x + this.width + 0.01
                    break
                }
            }
        }
    }
}
// class for foolrcollision 
class floorCollisions extends SpeedLevel {
    constructor({position, speed=0, isFloor=false}){
        super(speed)
        this.position = position
        this.height = 12
        this.width = 32
        this.speed = speed
        this.isFloor = isFloor

        
    }
    draw(){
        if(this.isFloor){
            (Begine) ? ctx.fillStyle = 'rgb(219, 175, 1)': ctx.fillStyle = "red";
        }else{
            ctx.fillStyle = 'rgb(1, 97, 110)'
        }
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update(){
        this.draw()
        this.position.y += this.speed

    }
    
}


const floor2D = []
for(let i =0 ; i<floor.length; i+= 16){
    floor2D.push(floor.slice(i, i+16))
}
const s2d = []
for(let i =0 ; i<ourStepes.length; i+= 16){
    s2d.push(ourStepes.slice(i, i+16))
}

let collisions = []
floor2D.forEach((elm, Y)=>{
    elm.forEach((symbol, X) =>{
        if(symbol == 202){
            collisions.push(new floorCollisions({
                position:{
                    x: X *32,
                    y:Y * 32,
                },
                isFloor: true,
            }))
        }
    })
})
let mystps = []

s2d.forEach((elm, Y)=>{
    elm.forEach((symbol, X) =>{
        if(symbol == 7 || symbol == 8 || symbol == 9){
            mystps.push(new floorCollisions({
                position:{
                    x: X *32,
                    y: -Y * 32,
                },
                speed: 1
            }))
        }
    })
})


// object of the class player
const player = new Test({
    position:{
        x:10,
        y:0
    },
    velocity:{
        x:0,
        y:8
    },
    height:50,
    width: 20,
    collbloks: collisions,
    platformCollboks: mystps,
    speed:1
})
    

// console.log(mystps[mystps.length -1].position.y , canvas.height)

// event listener for keydown
window.addEventListener('keydown', (e)=>{
    switch (e.key){
        case 'ArrowRight':
            player.veloctiy.x = 2
            break
        case "ArrowLeft":
            player.veloctiy.x = -2
            break
        case " ":
            // player.veloctiy.y = -10
            if(Math.floor(player.position.y + player.height) == canvas.height - 15){
                player.veloctiy.y = -10
            }else{

                mystps.forEach(elm=>{
                    if(player.position.y + player.height == elm.position.y)
                    {
                        player.veloctiy.y = -10
                    }
                })
            }

    }
})


// event listener for keyup
window.addEventListener('keyup', (e)=>{
    switch (e.key){
        case 'ArrowRight':
            player.veloctiy.x = 0
            break
        case "ArrowLeft":
            player.veloctiy.x = 0
            break
    }
})

// the loop that keep the game goning 

const game = document.querySelector('.play');
const container = document.querySelector('.container');
const gameOver = document.querySelector('.gameOver');
const play = document.querySelector('.interface');
game.addEventListener('click', ()=>{
    container.style.display = 'none'
 
    function loop(){
        if(player.position.y > canvas.height){
            container.style.display = 'block';
            console.log(play.childNodes)
            play.childNodes[1].innerHTML = 'Game Over';
            player.position.y = 0
            Begine = true
            
        }else{
            window.requestAnimationFrame(loop)
            ctx.fillStyle = 'black'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            player.update('red');
            // console.log(player.position.y, canvas.height)
    
            collisions.forEach(elm=>{
                elm.draw()
            })
            mystps.forEach(elm=>{
                elm.update() 
            })
        }
    }
    loop()
})

