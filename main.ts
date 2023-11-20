namespace SpriteKind {
    export const Bar = SpriteKind.create()
    export const text = SpriteKind.create()
    export const Spike = SpriteKind.create()
    export const Boss1 = SpriteKind.create()
    export const Boss2 = SpriteKind.create()
    export const boss2bullet = SpriteKind.create()
    export const indi = SpriteKind.create()
}
namespace StatusBarKind {
    export const Boss1Health = StatusBarKind.create()
    export const Boss2Health = StatusBarKind.create()
}
function startBoss1 () {
    tiles.setCurrentTilemap(tilemap`level4`)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.boss2bullet, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite)
})
function createBar (barSprite: Sprite, color: number) {
    barSprite.z = 200
    barSprite.setFlag(SpriteFlag.RelativeToCamera, true)
    barSprite.setImage(image.create(scene.screenWidth() - 40, 4))
    barSprite.left = 30
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile6`, function (sprite, location) {
    if (gameStarted == 1) {
        if (controller.A.isPressed()) {
            drinkWater()
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile21`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`tile20`)
    for (let value of tiles.getTilesByType(assets.tile`tile16`)) {
        tiles.setWallAt(value, false)
        mySprite.sayText("Now I can walk on magma!", 5000, true)
        mySprite.sayText("I have to find the portal key now", 5000, true)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Boss2, function (sprite, otherSprite) {
    Boss2Health.value += -1
    sprites.destroy(sprite)
    otherSprite.image.replace(6, 2)
    timer.after(100, function () {
        otherSprite.image.replace(2, 6)
    })
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile33`, function (sprite, location) {
    if (controller.A.isPressed()) {
        drinkWater()
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (boss2Started == 1) {
        arrow = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . 1 . . . . . . 
            . . . . . . . . . 1 1 . . . . . 
            . . . . . . . . . 1 1 1 . . . . 
            . . 1 1 1 1 1 1 1 1 1 1 1 . . . 
            . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
            . . 1 1 1 1 1 1 1 1 1 1 1 . . . 
            . . . . . . . . . 1 1 1 . . . . 
            . . . . . . . . . 1 1 . . . . . 
            . . . . . . . . . 1 . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, 100, 0)
        pause(100)
    }
})
statusbars.onZero(StatusBarKind.Boss1Health, function (status) {
    startGame()
    gameStarted = 1
    win1 = 1
    Boss1.follow(null)
    sprites.destroy(Boss1)
    sprites.destroy(spike)
    scene.cameraShake(4, 500)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile7`, function (sprite, location) {
    if (gameStarted == 1) {
        if (controller.A.isPressed()) {
            drinkWater()
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile4`, function (sprite, location) {
    if (gameStarted == 1) {
        if (controller.A.isPressed()) {
            drinkWater()
        }
    }
})
function startGame () {
    tiles.setCurrentTilemap(tilemap`level3`)
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile1`)
    scene.setBackgroundColor(11)
}
function boss2 () {
    tiles.setCurrentTilemap(tilemap`level12`)
    scene.setBackgroundColor(15)
    effects.starField.startScreenEffect()
    info.setLife(2)
    gameStarted = 0
    Boss2 = sprites.create(img`
        ........................
        ........................
        ........ddddddddd.......
        .......dd1111111dd......
        ......dd111111111dd.....
        .....dd16666611111dd....
        ....dd1669666611111dd...
        ....d116996666111111d...
        ....d116666666111111d...
        ....d116666666111111d...
        ....d116666666111111d...
        ....d111666661111151d...
        ....d111111111111151d...
        ....d111111111111511d...
        ....dd1111111111511dd...
        .....dd11111111511dd....
        ......dd111115511dd.....
        .......dd1111111dd......
        ........ddddddddd.......
        ........................
        ........................
        ........................
        ........................
        ........................
        `, SpriteKind.Boss2)
    Boss2Health = statusbars.create(50, 5, StatusBarKind.Boss2Health)
    Boss2Health.attachToSprite(Boss2)
    boss2Started = 1
    tiles.placeOnTile(mySprite, tiles.getTileLocation(4, 4))
    mySprite.setImage(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . 4 . . . . . . 
        . . . . . . . . 4 4 . . . . . . 
        . . . . . . . . 4 9 . . . . . . 
        . . . . . . 4 4 4 4 4 . . . . . 
        . . . . . 4 4 5 5 4 4 4 . . . . 
        . . . . . 4 5 5 4 4 4 4 . . . . 
        . . . . . 4 5 4 4 4 9 4 4 . . . 
        . . . . . 4 4 4 4 4 4 4 4 . . . 
        . . . . . 4 4 4 9 4 4 4 4 . . . 
        . . . . . 4 4 4 4 4 4 4 . . . . 
        . . . . . . . 4 4 4 4 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    mySprite.setStayInScreen(true)
    Boss2.setStayInScreen(true)
    scene.cameraFollowSprite(mySprite)
    tiles.placeOnTile(Boss2, tiles.getTileLocation(7, 3))
    Boss2.ay = 30
}
statusbars.onZero(StatusBarKind.Boss2Health, function (status) {
    gameStarted = 1
    boss2Started = 0
    win2 = 1
    startGame()
    sprites.destroy(Boss2)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    sprites.destroyAllSpritesOfKind(SpriteKind.indi)
    sprites.destroyAllSpritesOfKind(SpriteKind.boss2bullet)
    scene.cameraFollowSprite(mySprite)
    mySprite.setImage(img`
        ................................
        ................55..............
        ..............555...............
        ............55544...............
        ...........554444...............
        .........99444444...............
        ........44444444..........555...
        .......944444444.......5555555..
        ....555444444444....5555554444..
        ....59444444444...55544444..44..
        ...544444444444.994444444444....
        ...544999944444444444444444.....
        ...5449999444444444444444.......
        ...544999944444444444444........
        ...5449999444444444444..........
        ...54444444444444444............
        ....544444444444444.............
        ....594444444444449.555.........
        ....554444444444449945555.......
        .....55944444444444444445555....
        ......55444444444444444444555...
        ..........ff..44444444444444....
        ..........ff..ff................
        .........fff.fff................
        .........fff.fff................
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        `)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile3`, function (sprite, location) {
    if (controller.A.isPressed()) {
        drinkWater()
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile19`, function (sprite, location) {
    if (spawnEnemies == 0) {
        for (let value of tiles.getTilesByType(assets.tile`myTile14`)) {
            fiend = sprites.create(img`
                . . . . . f f f f f f f . . . . 
                . . . f f 6 6 6 6 6 6 6 f f . . 
                . . f 6 6 6 9 9 6 6 6 6 6 6 f . 
                . . f 6 9 6 6 6 6 6 6 6 6 6 f . 
                . f 6 6 6 6 6 6 6 6 6 6 6 6 6 f 
                . f 6 9 6 6 6 6 6 6 6 6 6 6 6 f 
                . f 6 6 6 6 6 6 6 6 6 6 6 6 6 f 
                . f 6 6 6 6 6 6 6 6 6 6 6 6 6 f 
                . f 6 6 6 6 6 6 6 6 6 6 6 6 6 f 
                . f 6 6 6 6 6 6 6 6 6 6 6 6 6 f 
                . f 6 6 6 6 6 6 6 6 6 6 6 6 6 f 
                . . f 6 6 6 6 6 6 6 6 6 6 6 f . 
                . . f 6 6 6 6 6 6 6 6 6 6 6 f . 
                . . . f f 6 6 6 6 6 6 6 f f . . 
                . . . . . f f f f f f f . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.Enemy)
            fiend.follow(mySprite, 70)
            tiles.placeOnTile(fiend, value)
            tiles.setTileAt(value, assets.tile`tile19`)
            mySprite.sayText("They only attack me when I'm on their territory", 5000, true)
            spawnEnemies = 1
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile34`, function (sprite, location) {
    if (controller.A.isPressed()) {
        drinkWater()
    }
})
function startBar (top: number, barSprite: Sprite, color: number) {
    barSprite.top = top
    createBar(barSprite, color)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile18`, function (sprite, location) {
    boss2()
})
function makeBars () {
    textBars = sprites.create(assets.image`myImage2`, SpriteKind.text)
    textBars.z = 200
    textBars.setFlag(SpriteFlag.RelativeToCamera, true)
    textBars.left = 10
    textBars.top = 102
    hungerBar = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Bar)
    startBar(110, hungerBar, 7)
    thirstBar = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Bar)
    startBar(104, thirstBar, 9)
    hungerPercent = 100
    thirstPercent = 100
}
function lvl1 () {
    scene.setBackgroundColor(11)
    tiles.setCurrentTilemap(tilemap`level6`)
    mySprite = sprites.create(img`
        ................................
        ................55..............
        ..............555...............
        ............55544...............
        ...........554444...............
        .........99444444...............
        ........44444444..........555...
        .......944444444.......5555555..
        ....555444444444....5555554444..
        ....59444444444...55544444..44..
        ...544444444444.994444444444....
        ...544999944444444444444444.....
        ...5449999444444444444444.......
        ...544999944444444444444........
        ...5449999444444444444..........
        ...54444444444444444............
        ....544444444444444.............
        ....594444444444449.555.........
        ....554444444444449945555.......
        .....55944444444444444445555....
        ......55444444444444444444555...
        ..........ff..44444444444444....
        ..........ff..ff................
        .........fff.fff................
        .........fff.fff................
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        `, SpriteKind.Player)
    scene.cameraFollowSprite(mySprite)
    tiles.placeOnRandomTile(mySprite, assets.tile`tile25`)
    controller.moveSprite(mySprite)
    gameStarted = 1
    spawnFood = 0
    mySprite.sayText("I have to find the mushroom in the labrynth above", 3000, true)
    makeBars()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile17`, function (sprite, location) {
    boss1()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile32`, function (sprite, location) {
    if (controller.A.isPressed()) {
        drinkWater()
    }
})
function boss1 () {
    tiles.setCurrentTilemap(tilemap`level8`)
    info.setLife(5)
    Boss1 = sprites.create(img`
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fd11111111df......
        ......fddd1111dddf......
        ......fbdbfddfbdbf......
        ......fcdcf11fcdcf......
        .......fb111111bf.......
        ......fffcdb1bdffff.....
        ....fc111cbfbfc111cf....
        ....f1b1b1ffff1b1b1f....
        ....fbfbffffffbfbfbf....
        .........ffffff.........
        ...........fff..........
        ........................
        ........................
        ........................
        ........................
        `, SpriteKind.Boss1)
    Boss1Health = statusbars.create(50, 5, StatusBarKind.Boss1Health)
    Boss1Health.attachToSprite(Boss1)
    spike = sprites.create(img`
        . . . . . . . . 1 . . . . . . . 
        . . . . . . . 1 1 . . . . . . . 
        . . . . . . . 1 9 1 . . . . . . 
        . . . . . . . 1 9 1 . . . . . . 
        . . . . . . 1 1 9 1 . . . . . . 
        . . . . . . 1 9 9 1 . . . . . . 
        . . . . . . 1 9 9 9 1 . . . . . 
        . . . . . 1 9 9 6 9 1 . . . . . 
        . . . . . 1 9 9 9 9 9 1 . . . . 
        . . . . 1 9 9 9 9 9 9 1 1 . . . 
        . . . 1 1 9 6 9 9 9 9 9 1 . . . 
        . . . 1 9 9 9 9 9 9 9 9 9 1 . . 
        . . 1 9 9 9 9 9 9 9 9 9 9 1 1 . 
        . 1 1 9 9 9 9 9 9 9 9 6 9 9 1 . 
        . 1 9 9 9 9 9 9 6 9 9 9 9 9 9 1 
        1 1 9 9 6 9 9 9 9 9 9 9 9 9 9 1 
        `, SpriteKind.Spike)
    tiles.placeOnTile(Boss1, tiles.getTileLocation(16, 1))
    gameStarted = 0
    tiles.placeOnRandomTile(spike, sprites.dungeon.darkGroundCenter)
    Boss1.follow(mySprite, 80)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile30`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`tile28`)
    for (let value of tiles.getTilesByType(assets.tile`tile18`)) {
        tiles.setWallAt(value, false)
        mySprite.sayText("Now I can walk on water!", 5000, true)
        mySprite.sayText("I have to find the magma helmet in the ice biome now", 5000, true)
    }
})
function startCutscene () {
    story.printText("You are stuck in the star dimension", 80, 30)
    story.printText("Because you disappointed your boss", 80, 30)
    effects.starField.startScreenEffect()
    story.printText("Your boss was a god", 80, 30)
    story.printText("The only way to escape is to find the portal key", 80, 30)
    story.printText("Then you have to destroy the 2 stars", 80, 30)
    story.printText("Nobody has succeeded before", 80, 30)
    story.printText("Can you?", 80, 30, 1, 15, story.TextSpeed.VerySlow)
    scene.cameraShake(8, 1000)
    lvl1()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile5`, function (sprite, location) {
    if (controller.A.isPressed()) {
        drinkWater()
    }
})
function drinkWater () {
    thirstPercent += 10
    if (thirstPercent > 100) {
        thirstPercent = 100
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile29`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`tile27`)
    for (let value of tiles.getTilesByType(assets.tile`tile23`)) {
        tiles.setTileAt(value, assets.tile`tile24`)
        tiles.setWallAt(value, false)
        mySprite.sayText("Now all walls are removed!", 5000, true)
        mySprite.sayText("I have to find the water boots in the cave now", 5000, true)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.disintegrate, 200)
    hungerPercent += 10
    mySprite.setImage(assets.image`myImage1`)
    pause(500)
    mySprite.setImage(img`
        ................................
        ................55..............
        ..............555...............
        ............55544...............
        ...........554444...............
        .........99444444...............
        ........44444444..........555...
        .......944444444.......5555555..
        ....555444444444....5555554444..
        ....59444444444...55544444..44..
        ...544444444444.994444444444....
        ...544999944444444444444444.....
        ...5449999444444444444444.......
        ...544999944444444444444........
        ...5449999444444444444..........
        ...54444444444444444............
        ....544444444444444.............
        ....594444444444449.555.........
        ....554444444444449945555.......
        .....55944444444444444445555....
        ......55444444444444444444555...
        ..........ff..44444444444444....
        ..........ff..ff................
        .........fff.fff................
        .........fff.fff................
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        ................................
        `)
    if (hungerPercent > 100) {
        hungerPercent = 100
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss1, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    tiles.placeOnTile(Boss1, tiles.getTileLocation(16, 1))
})
sprites.onOverlap(SpriteKind.Boss1, SpriteKind.Spike, function (sprite, otherSprite) {
    Boss1Health.value += -10
    tiles.placeOnRandomTile(spike, sprites.dungeon.darkGroundCenter)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile22`, function (sprite, location) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile16`)
    mySprite.sayText("Lets go destroy all the stars now!", 5000, true)
    lvlCleared = 1
    startGame()
    spawnFood = 1
})
function drawBar (percent: number, barSprite: Sprite, onColor: number) {
    barSprite.image.fill(1)
    fillWidth = percent * (scene.screenWidth() - 20) / 100
    barSprite.image.fillRect(0, 0, fillWidth, barSprite.height, onColor)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.gameOver(false)
})
let boss2Bullet2: Sprite = null
let boss2Bullet1: Sprite = null
let indicator2: Sprite = null
let indicator1: Sprite = null
let meteor: Sprite = null
let fillWidth = 0
let Boss1Health: StatusBarSprite = null
let spawnFood = 0
let thirstPercent = 0
let hungerPercent = 0
let thirstBar: Sprite = null
let hungerBar: Sprite = null
let textBars: Sprite = null
let fiend: Sprite = null
let win2 = 0
let Boss2: Sprite = null
let spike: Sprite = null
let Boss1: Sprite = null
let win1 = 0
let arrow: Sprite = null
let boss2Started = 0
let Boss2Health: StatusBarSprite = null
let mySprite: Sprite = null
let lvlCleared = 0
let gameStarted = 0
let spawnEnemies = 0
spawnEnemies = 0
gameStarted = 0
lvlCleared = 0
startCutscene()
game.onUpdateInterval(5000, function () {
    if (gameStarted == 1 && spawnFood == 1) {
        meteor = sprites.create(assets.image`myImage0`, SpriteKind.Food)
        tiles.placeOnRandomTile(meteor, assets.tile`myTile12`)
        meteor.lifespan = 10000
        if (thirstPercent <= 0) {
            game.setGameOverEffect(false, effects.dissolve)
            game.setGameOverMessage(false, "You died of thirst...")
            game.gameOver(false)
        } else if (hungerPercent <= 0) {
            game.setGameOverEffect(false, effects.melt)
            game.setGameOverMessage(false, "You died of hunger...")
            game.gameOver(false)
        }
    }
})
game.onUpdateInterval(5000, function () {
    if (boss2Started == 1) {
        indicator1 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            `, SpriteKind.indi)
        indicator1.x = randint(10, scene.screenWidth() - 50)
        indicator2 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            . . . . . . 1 1 1 . . . . . . . 
            `, SpriteKind.indi)
        indicator2.x = randint(10, scene.screenWidth() - 50)
        timer.after(1000, function () {
            sprites.destroy(indicator1)
            sprites.destroy(indicator2)
            boss2Bullet1 = sprites.create(img`
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
                . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
                . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
                . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
                . . . 1 1 1 1 1 1 1 1 1 1 1 . . 
                . . . 1 1 1 1 1 1 1 1 1 1 . . . 
                . . . . 1 1 1 1 1 1 1 1 1 . . . 
                . . . . 1 1 1 1 1 1 1 1 . . . . 
                . . . . . 1 1 1 1 1 1 . . . . . 
                . . . . . 1 1 1 1 1 1 . . . . . 
                . . . . . . 1 1 1 1 . . . . . . 
                . . . . . . . 1 1 1 . . . . . . 
                . . . . . . . 1 1 1 . . . . . . 
                . . . . . . . 1 1 . . . . . . . 
                . . . . . . . . 1 . . . . . . . 
                `, SpriteKind.boss2bullet)
            boss2Bullet1.x = indicator1.x
            boss2Bullet1.y = 0
            boss2Bullet1.ay = 1000
            boss2Bullet2 = sprites.create(img`
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
                . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
                . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
                . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
                . . . 1 1 1 1 1 1 1 1 1 1 1 . . 
                . . . 1 1 1 1 1 1 1 1 1 1 . . . 
                . . . . 1 1 1 1 1 1 1 1 1 . . . 
                . . . . 1 1 1 1 1 1 1 1 . . . . 
                . . . . . 1 1 1 1 1 1 . . . . . 
                . . . . . 1 1 1 1 1 1 . . . . . 
                . . . . . . 1 1 1 1 . . . . . . 
                . . . . . . . 1 1 1 . . . . . . 
                . . . . . . . 1 1 1 . . . . . . 
                . . . . . . . 1 1 . . . . . . . 
                . . . . . . . . 1 . . . . . . . 
                `, SpriteKind.boss2bullet)
            boss2Bullet2.x = indicator2.x
            boss2Bullet2.ay = 1000
            boss2Bullet2.y = 0
        })
        timer.after(500, function () {
            sprites.destroy(boss2Bullet1)
            sprites.destroy(boss2Bullet2)
        })
    }
})
game.onUpdateInterval(500, function () {
    if (gameStarted == 1) {
        hungerPercent += -0.4
        thirstPercent += -0.3
        drawBar(hungerPercent, hungerBar, 7)
        drawBar(thirstPercent, thirstBar, 9)
    }
})
game.onUpdateInterval(500, function () {
    if (thirstPercent <= 0) {
        game.setGameOverEffect(false, effects.dissolve)
        game.setGameOverMessage(false, "You died of thirst...")
        game.gameOver(false)
    } else if (hungerPercent <= 0) {
        game.setGameOverEffect(false, effects.melt)
        game.setGameOverMessage(false, "You died of hunger...")
        game.gameOver(false)
    }
})
game.onUpdateInterval(500, function () {
    if (boss2Started == 1) {
        if (Boss2.ay > 0) {
            Boss2.ay = randint(-30, -50)
        } else if (Boss2.ay < 0) {
            Boss2.ay = randint(30, 50)
        }
    }
})
game.onUpdateInterval(500, function () {
    if (win2 == 1 && win1 == 1) {
        gameStarted = 0
        sprites.destroy(hungerBar)
        sprites.destroy(thirstBar)
        sprites.destroy(textBars)
        sprites.destroyAllSpritesOfKind(SpriteKind.Food)
        tiles.setCurrentTilemap(tilemap`level11`)
        scene.setBackgroundColor(15)
        sprites.destroy(mySprite)
        game.splash("Finally you destroyed all the stars,")
        game.splash("Now go back home!")
        game.gameOver(true)
    }
})
game.onUpdateInterval(10000, function () {
    if (spawnFood == 0) {
        meteor = sprites.create(assets.image`myImage0`, SpriteKind.Food)
        tiles.placeOnRandomTile(meteor, assets.tile`tile35`)
        meteor.lifespan = 10000
    }
})
