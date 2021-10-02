/*
- Create Logger using Template Pattern
*/
import { appendFile} from 'fs'

class Logger {
    log(level,msg){
        switch(level.toUpperCase()){
            case("DEBUG"):
                this._debug(msg)
                break
            case("INFO"):
                this._info(msg)
                break
            case("WARN"):
                this._warn(msg)
                break
            case("ERROR"):
                this._error(msg)
                break
            default:
                this._warn(msg)
                break
        }
    }
    _debug(msg){
        throw new Error('method must be implemented')
    }

    _info(msg){
        throw new Error('method must be implemented')
    }

    _warn(msg){
        throw new Error('method must be implemented')
    }

    _error(msg){
        throw new Error('method must be implemented')
    }
}

class ConsoleLogger extends Logger {
    _debug(msg){
        console.log(`${new Date()} : DEBUG : ${msg}`)
    }

    _info(msg){
        console.log(`${new Date()} : INFO : ${msg}`)
    }

    _warn(msg){
        console.log(`${new Date()} : WARN : ${msg}`)
    }

    _error(msg){
        console.log(`${new Date()} : ERROR : ${msg}`)
    }
}

class FileLogger extends Logger {
    _debug(msg){
        appendFile("log.txt",`${new Date()} : DEBUG : ${msg}\n`, err => {if (err ) throw err})
        console.log("DEBUG: Logged in file")
    }

    _info(msg){
        appendFile("log.txt",`${new Date()} : DEBUG : ${msg}\n`, err => {if (err ) throw err})
        console.log("INFO: Logged in file")
    }

    _warn(msg){
        appendFile("log.txt",`${new Date()} : DEBUG : ${msg}\n`, err => {if (err ) throw err})
        console.log("WARN: Logged in file")
    }

    _error(msg){
        appendFile("log.txt",`${new Date()} : DEBUG : ${msg}\n`, err => {if (err ) throw err})
        console.log("ERROR: Logged in file")
    }
}

function main(){
const consoleLogger = new ConsoleLogger()
const fileLogger = new FileLogger()

consoleLogger.log("DEBUG", "Bad Function")
consoleLogger.log("INFO", "Process Started")
consoleLogger.log("ERROR", "Something Went Wrong")
consoleLogger.log("WARN", "Warning")

fileLogger.log("DEBUG", "Bad Function")
fileLogger.log("INFO", "Process Started")
fileLogger.log("ERROR", "Something Went Wrong")
fileLogger.log("WARN", "Warning")

}

main()