var salta = document.createElement("img");
salta.src = "../IMG/Jardin de flores piso mel.png";
var fondo = document.createElement("img");
fondo.src = "../IMG/Jardin de flores fondo mel.png";
var elementos = document.createElement("img");
elementos.src = "../IMG/Jardin de flores cartel mel.png";

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
        this.width = 3600
        this.height = 100

    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, 3600, 100)
    }
}

class GenericObject {
    constructor({x, y, image}) {
        this.position = {
            x: x,
            y: y
        }

        this.image = image
        this.width = 3400
        this.height = 700

    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, 3400, 700)
    }
}

class MedioFondo {
    constructor({x, y, image}) {
        this.position = {
            x: x,
            y: y
        }

        this.image = image
        this.width = 3400
        this.height = 200

    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, 3400, 320)
    }
}

let player = new Player()
let platforms = [
]

let genericObjects = [
    new GenericObject({x:0, y:0, image: fondo}),
]
let medioFondos = [ new MedioFondo({x:0, y:0, image: elementos})]

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
        new Platform( {x:0, y:570, image: salta} ),
    ]

    genericObjects = [
        new GenericObject({x:-30, y:0, image: fondo}),
    ]
    medioFondos = [ new MedioFondo({x:0, y:400, image: elementos})]

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

    //Perdiendo
    if (player.position.y > canvas.height) {
        location.href = "../index.html"
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