/*
    Using a JavaScript Proxy, create a wrapper for adding pre-initialization queues to any object. You should allow the consumer of the wrapper to decide which methods to augment and the name of the property/event that indicates if the component is initialized.
*/

import { EventEmitter } from 'events'

const METHODS_REQUIRING_CONNECTION = ['query']
const deactivate = Symbol('deactivate')

// States for DB
class InitializedState {
    async query (queryString) {
      console.log(`Query executed: ${queryString}`)
    }
} // End initialized state

class QueuingState {
    constructor (db) {
        this.db = db
        this.commandsQueue = []

        METHODS_REQUIRING_CONNECTION.forEach(methodName => {
        this[methodName] = function (...args) {
            console.log('Command queued:', methodName, args)
            return new Promise((resolve, reject) => {
            const command = () => {
                db[methodName](...args)
                .then(resolve, reject)
            }
            this.commandsQueue.push(command)
            })
        }
        })
    }

    [deactivate] () {
        this.commandsQueue.forEach(command => command())
        this.commandsQueue = []
    }
} // End Queuing State

//Proxy Factory
function proxyFactory (target, handler){
     return new Proxy(target, handler)
 } // End Proxy Factory

/*
    Handler for proxy with trap methods
    If target state is not instance of Initialized State &&
    if method !== METHODS_REQUIRING_CONNECTION
        push method(...args) to commands queue

    ??[deactivate] will be called upon state change/ connection??
*/
const preInitHandler = {
     set: function(target, method, args){
         //Check Parameters
        if(target.state instanceof InitializedState && METHODS_REQUIRING_CONNECTION.includes(method))
            return false
        
     }
 }




class DB extends EventEmitter {
  constructor () {
    super()
    this.state = new QueuingState(this)
  }

  async query (queryString) {
    return this.state.query(queryString)
  }

  connect () {
    // simulate the delay of the connection
    setTimeout(() => {
      this.connected = true
      this.emit('connected')
      const oldState = this.state
      this.state = new InitializedState(this)
      oldState[deactivate] && oldState[deactivate]()
    }, 500)
  }
}

function main(){
    const db = new DB()
    db.connect()

    async function updateLastAccess () {
      await db.query(`INSERT (${Date.now()}) INTO "LastAccesses"`)
    }
    
    updateLastAccess()
    setTimeout(() => {
      updateLastAccess()
    }, 600)
    
}

main()