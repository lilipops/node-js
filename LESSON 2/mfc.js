const EventEmitter = require('events');

const requestTypes = [
    {
        type: 'send',
        payload: 'to send a document'
    },
    {
        type: 'recive',
        payload: 'to recive a document'
    },
    {
        type: 'sign',
        payload: 'to sign a document'
    },
]

class Customer {
    constructor(params) {
        this.type = params.type
        this.payload = params.payload
    }
}

const generateIntRange = (min, max) => {
    min = Math.ceil(min)
    max = Math.ceil(max)

    return Math.floor(Math.random() * (max - min + 1))
}

const delay = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
    })
}

const generateNewCustomer = () => {
    const intervalValue = generateIntRange(1, 5) * 1000
    const params = requestTypes[generateIntRange(0, requestTypes.length - 1)]

    return delay(intervalValue).then(() => new Customer(params))
}

class Handler {
    static send(payload) {
        console.log('Send request')
        console.log(`Custumer need ${payload}`)
    }
    static recive(payload) {
        console.log('Recive request')
        console.log(`Custumer need ${payload}`)
    }
    static sign(payload) {
        console.log('Sign request')
        console.log(`Custumer need ${payload}`)
    }
}
class MFCEmitter extends EventEmitter {}
const emmiter = new MFCEmitter()
emmiter.on('error', console.log)
emmiter.on('send', Handler.send)
emmiter.on('recive', () => {
    try {
        throw new Error('Recive operation - Employe is at launch')
    } catch (e) {
        emmiter.emit('error', e.message)
    }
})
emmiter.on('sign', Handler.sign)

const run = () => {
    generateNewCustomer()
    .then(customer => customer)
    .then(customer => {
        emmiter.emit(customer.type, customer.payload)
    })
    .then(() => run())
}

run()