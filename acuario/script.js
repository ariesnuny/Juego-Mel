var salta = document.createElement("img");
salta.src = "../IMG/plataforma acuario.png";
var fondo = document.createElement("img");
fondo.src = "../IMG/Fondo mel acuario.png";
var elementos = document.createElement("img");
elementos.src = "../IMG/Elementos fondo mel acuario.png";
var final = document.createElement("img");
final.src = "../IMG/Disfraz.png";
var spriteRightOne = document.createElement("img");
spriteRightOne.src = "../IMG/43 sin título_20240102094913.png";
var spriteRightTwo = document.createElement("img");
spriteRightTwo.src = "../IMG/43 sin título_20240102095617.png";
var spriteLeftOne = document.createElement("img");
spriteLeftOne.src = "../IMG/izquierdaUno.png";
var spriteLeftTwo = document.createElement("img");
spriteLeftTwo.src = "../IMG/izquierdaDos.png";
var spriteStandRight = document.createElement("img");
spriteStandRight.src = "../IMG/sprite.png";


const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.width = 1054
canvas.height = 576

const gravity = 0.5
class Player {
    constructor() {
        this.speed = 5
        this.position= {
            x: 100,
            y: 100,
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width= 83
        this.height = 83
        this.image = spriteStandRight

        this.sprites = {
            stand: {
                right: spriteStandRight
            },
            run: {
                rightOne: spriteRightOne,
                rightTwo: spriteRightTwo,
                leftOne: spriteLeftOne,
                leftTwo: spriteLeftTwo
            }
        }

        this.currentSprite = this.sprites.stand.right
    }

    draw() {
        c.drawImage(this.currentSprite, this.position.x, this.position.y, 100, 100)
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
      this.position.x += this.velocity.x
  
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {        
            this.velocity.y += gravity
        }
    }
}

class Platform {
    constructor({x, y, image}) {
        this.position = {
            x: x,
            y: y
        }

        this.image = image
        this.width = 500
        this.height = 125

    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, 500, 125)
    }
}

class GenericObject {
    constructor({x, y, image}) {
        this.position = {
            x: x,
            y: y
        }

        this.image = image
        this.width = 9999
        this.height = 700

    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, 9999, 700)
    }
}

class MedioFondo {
    constructor({x, y, image}) {
        this.position = {
            x: x,
            y: y
        }

        this.image = image
        this.width = 9999
        this.height = 200

    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, 9999, 200)
    }
}

class Tiburon {
    constructor({x, y, image}) {
        this.position = {
            x: x,
            y: y
        }

        this.image = image
        this.width = 200
        this.height = 200

    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, 200, 200)
    }
}
    
let player = new Player()
let platforms = [
]

let genericObjects = [
    new GenericObject({x:0, y:0, image: fondo}),
]
let medioFondos = [ new MedioFondo({x:0, y:300, image: elementos})]
let tiburon = new Tiburon({x: 8600, y: 300, image: final})

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
}

let scrollOffset = 0
function init() {
    
    player = new Player()
    platforms = [
        new Platform( {x:0, y:470, image: salta} ),
        new Platform( {x: 499, y:470, image: salta}),
    
        new Platform({x:1100, y:470, image: salta}),
        
        new Platform({x:1800, y:470, image: salta}),
        new Platform({x:2298, y:470, image: salta}),
    
        new Platform({x:3000, y:470, image: salta}),
        
        new Platform({x:3700, y:470, image: salta}),
        
        new Platform({x:4400, y:470, image: salta}),
        
        new Platform({x:5100, y:470, image: salta}),
        new Platform({x:5598, y:470, image: salta}),
        
        new Platform({x:6300, y:470, image: salta}),
        
        new Platform({x:6900, y:470, image: salta}),
        
        new Platform({x:7500, y:470, image: salta}),
        new Platform({x:7998, y:470, image: salta}),
        new Platform({x:8498, y:470, image: salta}),

        new Platform({x:9300, y:470, image: salta}),
    ]

    genericObjects = [
        new GenericObject({x:0, y:0, image: fondo}),
    ]
    medioFondos = [ new MedioFondo({x:0, y:300, image: elementos})]
    tiburon = new Tiburon({x: 8400, y: 300, image: final})

    scrollOffset = 0
}


function animate() {
    requestAnimationFrame(animate),
    c.fillStyle= "white"
    c.fillRect(0, 0, canvas.width, canvas.height),

    genericObjects.forEach(genericObject => {
        genericObject.draw()
    })
    medioFondos.forEach(medioFondo => {
        medioFondo.draw()
    })
    tiburon.draw()
    platforms.forEach(platform => {
        platform.draw()
    }),
    
    player.update()
    
    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed
    } else if ((keys.left.pressed && player.position.x > 100)
    || (keys.left.pressed && scrollOffset==0 && player.position.x>0)) {
         player.velocity.x = -player.speed
    } else {
        player.velocity.x = 0

        if (keys.right.pressed) {
            scrollOffset += player.speed
            platforms.forEach(platform => {
                platform.position.x -= player.speed
            })
            genericObjects.forEach(genericObject => {
                genericObject.position.x -= player.speed * 0.7
            })
            medioFondos.forEach(medioFondo => {
                medioFondo.position.x -= player.speed * 0.7
            })
            tiburon.position.x -=player.speed
        } else if ( keys.left.pressed && scrollOffset>0) {
            scrollOffset -= player.speed
            platforms.forEach(platform => {
                platform.position.x += player.speed
            })
            
            genericObjects.forEach(genericObject => {
                genericObject.position.x += player.speed * 0.7
            })
            medioFondos.forEach(medioFondo => {
                medioFondo.position.x += player.speed * 0.7
            })
            tiburon.position.x += player.speed
        }
    }


    //Detectar 
    platforms.forEach(platform => {
        if(player.position.y + player.height <= platform.position.y
          && player.position.y + player.height + player.velocity.y 
          >= platform.position.y && player.position.x + player.width
          >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0 
        }
    })

    //Ganando
    if (scrollOffset >8000) {
        location.href = "./tiburone.html"
    }
    //Perdiendo
    if (player.position.y > canvas.height) {
        init()
    }
}

init()
animate()

window.addEventListener("keydown", ({keyCode}) => {
    
    switch (keyCode) {
        case 37:
            console.log("left")
            keys.left.pressed = true
            player.currentSprite=player.sprites.run.leftOne
            setTimeout(function(){
                player.currentSprite = player.sprites.run.leftTwo
            }, 1000)
            break

        case 38:
            console.log("up")
            player.velocity.y -= 10
            break

        case 39:
            console.log("right")
            keys.right.pressed = true
            player.currentSprite=player.sprites.run.rightOne
            setTimeout(function(){
                player.currentSprite = player.sprites.run.rightTwo
            }, 1000)
            break
        
        case 40:
            console.log("down")
            break
    }
})


window.addEventListener("keyup", ({keyCode}) => {
    
    switch (keyCode) {
        case 37:
            console.log("left")
            keys.left.pressed = false
            break

        case 38:
            console.log("up")
            break

        case 39:
            console.log("right")
            keys.right.pressed = false
            break
        
        case 40:
            console.log("down")
            break
    }
})