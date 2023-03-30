const io = require('console-read-write');
const color = require('colors')
async function main() {
    var min = await io.read()
    var max = await io.read()
    let count = 0
    let colorc = 1
    let res = 0
    if(/^\d+$/.test(min) != true || /^\d+$/.test(max) != true ) {
        console.log(`${color.red('Please enter a number')}`)
        return
    }
    for(let i = Number(min);i <= Number(max);i++){
        for(let x = 0;x <= i / 2;x++) {
            if(i % x == 0) {
                count++
            }
        } 
        if(count == 1) {
            if(colorc == 1) {
                console.log(`${color.green(i)}`)
            } else if (colorc == 2) {
                console.log(`${color.yellow(i)}`)
            } else if(colorc == 3) {
                console.log(`${color.red(i)}`)
            }
            if(colorc !== 3) {
                colorc++
            } else {
                colorc = 1
            }
            res++
        }
        count = 0 
    }
    if(res == 0) {
        console.log(`${color.red('No prime digits in this diapazon')}`)
    }
}

main();