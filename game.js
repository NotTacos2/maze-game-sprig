/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Maze Game
@description: just a maze game
@author: NotTacos
@tags: ['tag1', 'tag2']
@addedOn: 2025-00-00
*/

const player = "p"
const wall = "w"
const teleporter = "t"
const faketeleporter = "a"

setLegend(
  [ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................`],
  [ wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [teleporter, bitmap`
................
................
.......3333.....
.....333...33...
....3........3..
...33........3..
...3.........3..
...3.........3..
...3.........3..
...3........3...
...3........3...
...33.......3...
.....33....3....
.......33333....
.........33.....
................`],
  [faketeleporter, bitmap`
................
................
.......3333.....
.....333...33...
....3........3..
...33........3..
...3.........3..
...3.........3..
...3.........3..
...3........3...
...3........3...
...33.......3...
.....33....3....
.......33333....
.........33.....
................`]
)

setSolids([ player, wall ])

let level = 0
let larplevel = -1
const levels = [
  map`
pwwww
.ww.w
.....
.w.w.
awwt.`,
  map`
p....
.....
.....
.....
.....`
]

const larplevels = [
  map`
tp.ww`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

let addTextInGame = addText(`${level}`, { 
  x: 14,
  y: 1,
  color: color`3`
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

let hasbeeninlarpuniverse = false;

afterInput(() => {
  const targetNumber = tilesWith(teleporter).length;
  const numberCovered = tilesWith(teleporter, player).length;

  if (targetNumber > 0 && numberCovered === targetNumber) {
    if (hasbeeninlarpuniverse) {
      level = 0;
      larplevel = -1;
    } else {
      level = level + 1;
    }
    hasbeeninlarpuniverse = false;

    const currentLevel = levels[level];

    addTextInGame = addText(`${level}`, { 
      x: 14,
      y: 1,
      color: color`3`
    })

    console.log(level)
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }

  const larptargetNumber = tilesWith(faketeleporter).length;
  const larpnumberCovered = tilesWith(faketeleporter, player).length;

  if (larptargetNumber > 0 && larpnumberCovered === targetNumber) {
    larplevel = larplevel + 1;
    hasbeeninlarpuniverse = true;

    const larpcurrentLevel = larplevels[larplevel];

    addTextInGame = addText(`${larplevel}`, { 
      x: 14,
      y: 1,
      color: color`3`
    })

    console.log(larplevel)
    console.log("oh no he's in larp universe")
    if (larpcurrentLevel !== undefined) {
      if (level == 0) {
        setMap(larpcurrentLevel);
      }
    }
  }
  
})
