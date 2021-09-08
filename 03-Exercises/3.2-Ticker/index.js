import { EventEmitter } from 'events'

let number = process.argv.slice(2)[0];

function ticker(number, cb){
    const emitter = new EventEmitter();
    let count = 0
    setInterval(() => {return emitter.emit('tick', count++)}, 50)
    setTimeout( () => {
        return cb(count)
    }, number)
    
    return emitter
}

ticker(number, count => {console.log(`${count} ticks`);  process.exit();} )
.on('tick', count => count%2==0?console.log(`Tick`) : console.log(`Tock`) )
