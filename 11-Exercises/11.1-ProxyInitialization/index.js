/*
    Using a JavaScript Proxy, create a wrapper for adding pre-initialization queues to any object. You should allow the consumer of the wrapper to decide which methods to augment and the name of the property/event that indicates if the component is initialized.
*/


//Proxy Factory
function proxyFactory (target, handler){
     return new Proxy(target, handler)
 } // End Proxy Factory

const preInitHandler = {
  connected: false,
  preInitQueue: [],
  execute: async function () {
    console.log(`Connected and executing`)
    await this.preInitQueue.forEach(command => command())
    this.preInitQueue = []
  },
  get(target, property){
      if(property === 'connect'){
        this.connected = true
        return (...args)=>this.execute(...args)
      }

      if(property === 'disconnect'){
        this.connected = false
      }

      if(this.connected){
        return (...args)=>target[property](...args)
      } //end if connected
      
      console.log(`Not Connected. Queueing Method`)
      return (...args)=>{
        console.log(`Command Queued:`, property, args)
    return new Promise((res,rej)=>{
      const command = () => {
        target[property](...args)
          .then(res,rej)
      }
      this.preInitQueue.push(command)
    })
      }
    }
 }


//Test Object
const db = {
  launch: async (arg)=>console.log(arg)
}


function main(){
    const dbProxy = proxyFactory(db,preInitHandler)
    dbProxy.launch(`Hello1`)
    dbProxy.launch(`Hello3`)
    dbProxy.connect()
    dbProxy.launch(`Hello2`)
    dbProxy.disconnect()
    dbProxy.launch(`Hello4`)
    //Can not reconnect
    //dbProxy.connect()
}

main()