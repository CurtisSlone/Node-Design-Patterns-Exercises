/*
- Implement logging with the following methods:
  info(), warn(),debug(),error()
- Logger accepts different strategies to define how message is logged
*/
import { appendFile} from 'fs'
class Logger {
    constructor(loggingStrategy){
        this.loggingStrategy = loggingStrategy
    }

    debug(msg){
        this.loggingStrategy.log("DEBUG",msg)
    }

    info(msg){
        this.loggingStrategy.log("INFO",msg)
    }

    warn(msg){
        this.loggingStrategy.log("WARN",msg)
    }

    error(msg){
        this.loggingStrategy.log("ERROR",msg)
    }
}

const consoleStrategy ={
    log:  (level,msg) => console.log(`${new Date()} : ${level} : ${msg}`)
}

const fileStrategy ={
    log:  (level,msg) => appendFile("log.txt",`${new Date()} : ${level} : ${msg}\n`, err => {if (err ) throw err})
}

const consoleLogger = new Logger(consoleStrategy)
const fileLogger = new Logger(fileStrategy)

consoleLogger.debug("Bad Function")
consoleLogger.warn("Warning")
consoleLogger.info("Process started")
consoleLogger.error("Something went wrong")

fileLogger.debug("Bad Function")
fileLogger.warn("Warning")
fileLogger.info("Process started")
fileLogger.error("Something went wrong")