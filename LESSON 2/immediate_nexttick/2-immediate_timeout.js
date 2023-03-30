const fs = require('fs');


fs.readFile('./1-immediate_timeout.js', () => {
    setTimeout(() => {
        console.log('timeout')
    }, 0)
    setImmediate(() => {
        console.log('immediate')
    })  
} )