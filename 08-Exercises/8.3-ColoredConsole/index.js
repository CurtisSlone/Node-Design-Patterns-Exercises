/*
- Create Colored Console using decorator
*/

class ColorConsole {
    constructor(string){
        this.string = string
    }
}

class ConsoleDecorator {
    constructor(coloredConsole){
        this.coloredConsole = coloredConsole
    }

    red(){
        console.log(`\x1b[31m%s\x1b[0m`, this.coloredConsole.string)
    }

    green(){
        console.log(`\x1b[32m%s\x1b[0m`, this.coloredConsole.string)
    }

    blue(){
        console.log(`\x1b[34m%s\x1b[0m`, this.coloredConsole.string)
    }
}

const coloredConsole = new ColorConsole("My message")
const consoleDecorator = new ConsoleDecorator(coloredConsole)

consoleDecorator.red()
consoleDecorator.green()
consoleDecorator.blue()