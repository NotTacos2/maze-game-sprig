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
const killteleporter = "k"
const winner = tune`
306.1224489795918: B4~306.1224489795918 + D5~306.1224489795918 + C5^306.1224489795918,
306.1224489795918: A4~306.1224489795918,
306.1224489795918: B4~306.1224489795918,
306.1224489795918,
306.1224489795918: C5~306.1224489795918,
306.1224489795918: C5~306.1224489795918,
306.1224489795918: D5~306.1224489795918,
306.1224489795918: G4~306.1224489795918 + F5~306.1224489795918 + D5^306.1224489795918,
306.1224489795918: C5^306.1224489795918 + E5^306.1224489795918,
306.1224489795918: D5~306.1224489795918 + G5~306.1224489795918,
306.1224489795918: D5~306.1224489795918 + C5~306.1224489795918 + B4~306.1224489795918 + E5^306.1224489795918 + F5^306.1224489795918,
306.1224489795918: D5^306.1224489795918 + E5^306.1224489795918 + C5^306.1224489795918,
306.1224489795918: C5^306.1224489795918,
306.1224489795918: D5^306.1224489795918,
306.1224489795918: C5~306.1224489795918,
306.1224489795918: B4^306.1224489795918 + C5~306.1224489795918,
306.1224489795918: C5^306.1224489795918 + B4~306.1224489795918,
306.1224489795918: G4^306.1224489795918 + B4^306.1224489795918 + C5^306.1224489795918,
306.1224489795918: C5^306.1224489795918,
306.1224489795918: F4^306.1224489795918 + C5^306.1224489795918,
306.1224489795918: E5~306.1224489795918 + C5^306.1224489795918,
306.1224489795918: D5^306.1224489795918 + C5^306.1224489795918,
306.1224489795918: C5^306.1224489795918 + D5^306.1224489795918,
306.1224489795918: E5~306.1224489795918,
306.1224489795918: B4^306.1224489795918,
306.1224489795918: C5^306.1224489795918,
306.1224489795918: A4~306.1224489795918,
306.1224489795918: C5~306.1224489795918 + B4~306.1224489795918,
306.1224489795918: D5^306.1224489795918,
306.1224489795918: D5~306.1224489795918,
306.1224489795918: D5^306.1224489795918 + C5^306.1224489795918,
306.1224489795918: D5~306.1224489795918`

const footstep = tune `
161.29032258064515: G4~161.29032258064515,
5000`

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
................`],
  [killteleporter, bitmap`
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
p...w
..w..
.ww.w
..w..
w.ww.
..w..
wtw.a`,
  map`
p.wt...w
..wwww.w
.wwwww.a
.wwwww.w
.wwwww.w
..wwww.a
..wwww.w
a......w`,
  map`
p.wwwwwww
...wwaw..
.wwww.w..
.wwww.ww.
.wwww.ww.
.wwww.w..
.wwww.w.t
.wa.w....
.........`
]

const larplevels = [
  map`
tp.ww`
]

const deadmap = [
  map`
wwwwww
wwwwww
wwwwww
wwwwww
wwwwww
wwwwww`
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
  playTune(footstep)
})

onInput("w", () => {
  getFirst(player).y -= 1
  playTune(footstep)
})

onInput("d", () => {
  getFirst(player).x += 1
  playTune(footstep)
})

onInput("a", () => {
  getFirst(player).x -= 1
  playTune(footstep)
})

let hasbeeninlarpuniverse = false;

afterInput(() => {
  const targetNumber = tilesWith(teleporter).length;
  const numberCovered = tilesWith(teleporter, player).length;

  if (targetNumber > 0 && numberCovered === targetNumber) {
    if (hasbeeninlarpuniverse) {
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
      const playback = playTune(winner, Infinity)
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
      } else if (level == 1) {
        setMap(larpcurrentLevel);
      } else {
        setMap(larpcurrentLevel);
      }
    }
  }

  const killtargetNumber = tilesWith(killteleporter).length;
  const killnumberCovered = tilesWith(killteleporter, player).length;

  if (killtargetNumber > 0 && killnumberCovered === targetNumber) {
    level = 0;

    const deadmessage = addText('Game Over.\nPress J to restart', { 
      x: 2,
      y: 7,
      color: color`3`
    })

    setMap(deadmap[0]);
    console.log("oh no he's dead")

    onInput("j", () => {
      clearText()
      setMap(levels[0])
      deadmessage = addText(`${level}`, { 
        x: 14,
        y: 1,
        color: color`3`
      })
    })
  }
  
})
