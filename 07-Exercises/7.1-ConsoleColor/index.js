/*
- Create ColorConsole class with log() method
- Create subclasses, RedConsole, BlueConsole, GreenConsole
- Create factory function to return correct class based on argument
- Write CLI script for use
*/

/*
PARENT CLASS
*/

class ColorConsole {
    constructor(string, terminal){
        this.string = "I am " + string
        this.terminal = terminal
    }
    log(){
        console.log(`${this.terminal}%s\x1b[0m`, this.string)
    }
}

/*
CHILD CLASSES
*/

// RED
class RedConsole extends ColorConsole {
    constructor(){
        super('red','\x1b[31m')
    }
}

// GREEN
class GreenConsole extends ColorConsole {
    constructor(){
        super('green','\x1b[32m')
    }
}

// BLUE
class BlueConsole extends ColorConsole {
    constructor(){
        super('blue','\x1b[34m')
    }
}

/*
FACTORY METHOD
*/

function colorFactory(string){
    switch(string){
        case 'red':
            return new RedConsole()
        case 'blue':
            return new BlueConsole()
        case 'green':
            return new GreenConsole()
        default:
            console.log(`Did not understand choice. Please select red, blue, or green`)
    }
}

/*
CLI RUN
*/

let color = colorFactory(process.argv[2])
color.log()