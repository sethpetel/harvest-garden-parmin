namespace SpriteKind {
    export const Veggie = SpriteKind.create()
    export const Sprout = SpriteKind.create()
}
function addScore(playerInfo: info.PlayerInfo, win: boolean){
     // add a score
    playerInfo.changeScoreBy(1)

    if(playerInfo.score() == 10){
        pause(100)
        game.over(win)
    }
}
function turnSproutToVeggie(theSprout: Sprite, whoToFollow: Sprite){
    // turn the sprout into a veggie
    theSprout.setKind(SpriteKind.Veggie)

    // Pick a random veggie image to change to
    let veggieIndex = randint(0, veggies.length - 1)
    let veggieImg = veggies[veggieIndex]
    theSprout.setImage(veggieImg)
    theSprout.say("")
    theSprout.follow(whoToFollow)
}

sprites.onOverlap(SpriteKind.Player, SpriteKind.Sprout, function (thePlayer, theSprout) {
    // add a score for the player
    addScore(info.player1, true)
    
    // turn the sprout into a veggie
    turnSproutToVeggie(theSprout, thePlayer)

    // Tell the rabbit to pick a new target
    rabbitGoAfterSprout()
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Sprout, function (enemy, theSprout) {
    // add a score for the rabbit
    addScore(info.player2, false)
    
    // turn the sprout into a veggie
    turnSproutToVeggie(theSprout, enemy)

    // Tell the rabbit to pick a new target
    rabbitGoAfterSprout()
})

let targetSprout: Sprite = null
function rabbitGoAfterSprout() {
    // get a list of sprouts and pick a random one
    let sprouts = sprites.allOfKind(SpriteKind.Sprout)

    if(targetSprout == null || targetSprout.kind() == SpriteKind.Veggie){
        if(sprouts.length > 0) {
            let sproutIndex = randint(0, sprouts.length - 1)
            targetSprout = sprouts[sproutIndex]

            // Sprout is locked on by rabbit! Cry for help
            targetSprout.say("Save me!")

            // have the rabbit go after the sprout
            rabbit.follow(targetSprout, 50)
        }
    }
}

game.onUpdateInterval(1000, function () {
    if(availableFieldTiles.length > 0) {
        sprout = sprites.create(sproutImg, SpriteKind.Sprout)
        let groundIndex = randint(0, availableFieldTiles.length - 1)
        let groundTile = availableFieldTiles[groundIndex]
        tiles.placeOnTile(sprout, groundTile)
        availableFieldTiles.removeAt(groundIndex)
        rabbitGoAfterSprout()
    }
})
let sprout: Sprite = null
let veggies = [
img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . 6 6 . . 6 6 6 6 . .
    . . . . . . 6 6 6 6 6 7 7 6 . .
    . . . . . 6 7 7 6 6 7 7 7 6 . .
    . . . . . 6 7 7 6 7 7 6 6 6 . .
    . . 6 6 6 6 7 7 7 7 7 6 6 . . .
    . . 6 7 7 6 7 7 7 7 7 7 6 6 . .
    . . 6 7 7 7 7 7 7 7 7 7 6 6 . .
    . . 6 6 7 7 7 7 7 7 7 6 6 6 . .
    . . . 6 6 6 6 6 7 7 6 6 . . . .
    . . . . . . . 7 7 7 . . . . . .
    . . . . . . . 7 7 1 . . . . . .
    . . . . . . . 7 1 7 . . . . . .
    . . . . . . . e . e . . . . . .
`,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . 7 7 7 . 
    . . . . . . . . . . . . 7 . 7 7 
    . . . . . . . . . 4 4 4 4 . . 7 
    . . . . . . . . 4 4 4 4 4 . . . 
    . . . . . . . . 4 4 4 4 e . . . 
    . . . . . . . 4 4 4 4 e . . . . 
    . . . . . . 4 4 4 4 e . . . . . 
    . . . . . 4 4 4 e e . . . . . . 
    . . . . . 4 4 4 4 . . . . . . . 
    . . . . 4 4 4 e . . . . . . . . 
    . . . . 4 4 e . . . . . . . . . 
    . . . 4 e . . . . . . . . . . . 
    . . 4 4 . . . . . . . . . . . . 
    . . 4 e . . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . 6 6 6 6 . . . . 
    . . . . . . 6 6 7 7 7 6 6 . . . 
    . . . . . 6 7 7 7 6 7 7 6 . . . 
    . . . . 6 7 7 6 6 6 6 7 6 . . . 
    . . . 6 6 7 7 6 7 7 6 7 6 . . . 
    . . . 6 7 7 6 6 7 7 6 7 . . . . 
    . . . 6 7 6 6 7 7 6 6 6 . . . . 
    . . . 6 7 6 7 7 6 6 7 6 . . . . 
    . . . 6 7 6 7 6 7 7 6 . . . . . 
    . . . 6 7 6 6 7 7 6 6 . . . . . 
    . . . . 6 7 7 6 6 . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . 7 7 . . . . . 
    . . . . . e e e e 7 e e e e . . 
    . . . . e e e e e e e e e e e . 
    . . . e e e d e e e e e e e e . 
    . . . e e e e e e e e e e e b . 
    . . e e e e e e e e e e e b b . 
    . . e e e e e e e e e e b b . . 
    . . e e f e e e e e e e b b . . 
    . . e e e e e e e e e b b . . . 
    . . e e e e e e d e b b . . . . 
    . . . . e b b b b b b . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . . 7 . . . . 
    . . . . . . . 7 7 . 7 7 . . . . 
    . . . . . . . . 7 7 7 7 . . . . 
    . . . . . . . . . 7 7 . . . . . 
    . . . . . 4 4 2 2 7 4 2 2 . . . 
    . . . . 4 4 2 2 2 4 2 2 2 . . . 
    . . . . 4 4 2 2 4 2 2 2 2 . . . 
    . . . . 4 4 2 2 4 2 2 2 2 . . . 
    . . . . 2 4 2 2 4 2 2 2 2 . . . 
    . . . . 2 4 2 2 4 2 2 2 2 . . . 
    . . . . . 4 2 2 4 2 2 2 2 . . . 
    . . . . . 4 2 2 4 2 2 2 2 . . . 
    . . . . . 4 4 2 4 2 2 2 2 . . . 
    . . . . . . 4 2 4 4 2 2 2 . . . 
    . . . . . . 4 4 2 4 4 2 . . . . 
    . . . . . . . 4 2 2 . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . 5 5 5 5 . . . . 
    . . . . . . 5 5 5 d 5 5 . . . . 
    . . . . 5 5 5 5 5 5 5 5 5 . . . 
    . . . . 5 d 5 5 5 5 4 4 4 . . . 
    . . . . 5 5 5 5 4 4 4 . . . . . 
    . . . . 5 5 5 4 . . . . . . . . 
    . . . 5 5 5 5 5 5 5 5 5 d . . . 
    . . . 5 5 5 5 5 5 5 d d 5 5 . . 
    . . . 5 5 d d 5 5 5 5 5 5 5 . . 
    . . 5 5 5 d 5 5 5 d 5 5 5 4 . . 
    . . 5 5 5 5 5 5 5 5 5 5 4 4 . . 
    . . 5 5 5 d 5 5 d 5 5 4 4 . . . 
    . . 4 4 4 5 5 5 5 5 4 4 . . . . 
    . . . . 4 4 4 4 4 4 . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . 7 7 7 . . . . . 
    . . . . . . . . 7 . . . . . . . 
    . . . . . . 7 7 7 7 7 . . . . . 
    . . . . . 7 7 7 7 7 7 . . . . . 
    . . . . . c c c a a a . . . . . 
    . . . . . a a a a a a . . . . . 
    . . . . a a a a a a a a . . . . 
    . . . . c a a a a a a a . . . . 
    . . . . c a a a a a a a . . . . 
    . . . . c c a a a a a a . . . . 
    . . . . . c a a a a a a . . . . 
    . . . . . c c a a a a a . . . . 
    . . . . . . c c a a a a . . . . 
    . . . . . . a c c c . . . . . . 
    . . . . . . . . . . . . . . . . 
    `
]
let sproutImg = img`
    . . . . 
    . 7 . 7 
    7 7 7 7 
    . 7 7 . 
    `
let player = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . f . . . . . . . . . . . . . 
    . f . . . . . . . . . . . . . . 
    f f . . . . . . . . . 4 4 . . . 
    f . . . . . . . . . 4 f 4 . . . 
    f . . . . . . . . . f f 4 4 . . 
    f f . . . . . . . 4 4 4 4 4 4 . 
    . f . . . . . . . . f f f f . . 
    . f f f f f f f f f f f 5 f f . 
    . . f f f f f f f f f f f f f . 
    . . f f f f f f f f f . . . . . 
    . . f . f . . . f . f . . . . . 
    . . f . f . . . f . f . . . . . 
    . . f . f . . . f . f . . . . . 
    `, SpriteKind.Player)
player.z = 10
let rabbit = sprites.create(img`
    . . . . . . 1 . . 1 1 . . . . . 
    . . . . . 1 1 . . 1 . . . . . . 
    . . . . . 1 3 . 1 1 . . . . . . 
    . . . . . 1 3 . 1 3 . . . . . . 
    . . . . . 1 3 . 1 3 . . . . . . 
    . . . . . 1 1 1 1 1 . . . . . . 
    . . . . . 1 f 1 1 f . . . . . . 
    . . . . . 1 1 1 1 1 . . . . . . 
    . . . . . 1 1 1 1 1 . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . 1 1 1 1 1 1 1 . . . . . 
    . . . . 1 . 1 1 1 . 1 . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 . 1 . . . . . . . 
    . . . . . . 1 . 1 . . . . . . . 
    `, SpriteKind.Enemy)
rabbit.z = 10
scene.setBackgroundColor(13)
tiles.setTilemap(tilemap`level`)
controller.moveSprite(player)
scene.cameraFollowSprite(player)
info.player1.setScore(0)
info.player2.setScore(0)
let availableFieldTiles = tiles.getTilesByType(myTiles.tile1)

let msg = `It's harvest time!
But there is a problem...
There is a rabbit in the feild.
She is eating all our veggies!
Harvest your veggies before the rabbit does!
Don't worry, The rabbit will be fine.
She can eat other things.
Like grass or leaves or garbage...
Good luck!
`
game.showLongText(msg, DialogLayout.Full)