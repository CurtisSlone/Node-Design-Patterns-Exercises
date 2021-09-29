/*
- Create proxy to add timestamp to console object methods
*/

// Proxy using object literal
class ConsoleProxy {
    constructor(consoleObject){
        this.consoleObject = consoleObject
    }


    log(message){
        return this.consoleObject.log(`${new Date().toISOString()} ${message}`)
    }

    error(message){
        return this.consoleObject.error(`${new Date().toISOString()} ${message}`)
    }

    debug(message){
        return this.consoleObject.debug(`${new Date().toISOString()} ${message}`)
    }

    info(message){
        return this.consoleObject.info(`${new Date().toISOString()} ${message}`)
    }
}

const consoleProxy = new ConsoleProxy(console)
consoleProxy.log("message")
consoleProxy.error("err")
consoleProxy.debug("debug")
consoleProxy.info("info")