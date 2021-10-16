/*
    Using a JavaScript Proxy, create a wrapper for adding pre-initialization queues to any object. You should allow the consumer of the wrapper to decide which methods to augment and the name of the property/event that indicates if the component is initialized.
*/

const queuedFunction = Symbol('queuedFunction')

//Proxy Factory
function proxyFactory (target, handler){
     return new Proxy(target, handler)
 } // End Proxy Factory

const preInitHandler = {
  connected: false,
  preInitQueue: [],
  execute: function (...args) {
    // this.preInitQueue.forEach(command => command())
    // this.preInitQueue = []
   return console.log(`Connected`)
  }, 
  get(target, property){
      if(property === 'connect'){
        this.connected = true
        return (...args)=>this.execute(...args)
      }

      if(!this.connected)
        return (...args)=>console.log(`Disconnected`)

      return (...args)=>{
        return target[property](...args)
      }
    }
 }


//Test Object
const db = {
  launch: (arg)=>console.log(arg)
}

function main(){
    const dbProxy = proxyFactory(db,preInitHandler)
    db.launch(`Hello`)
    dbProxy.launch(`Hello2`)
    
}

main()