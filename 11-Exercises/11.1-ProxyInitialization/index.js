/*
    Using a JavaScript Proxy, create a wrapper for adding pre-initialization queues to any object. 
    You should allow the consumer of the wrapper to decide which methods to augment 
    and the name of the property/event that indicates if the component is initialized.
*/


//Proxy Factory
function proxyFactory (target, handler){
     return new Proxy(target, handler)
 } // End Proxy Factory

 // Proxy Handler
const preInitHandler = {
  connected: false,
  preInitQueue: [],
  execute: function () {
    console.log(`Connected and executing`)
    this.preInitQueue.forEach(command => command())
    this.preInitQueue = []
  },
  get(target, property){ 
      if(property === 'connect'){
        this.connected = true
        return (...args)=>this.execute(...args)
      }//end if prop == connect

      if(property === 'disconnect'){
        this.connected = false
      }//end if prop == disconnect

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
       }) //End Promise
      }// End Final Return
    }// End Get Trap
 } //End Proxy Handler 



/*
 Testing
*/

const db = {
  launch: (()=>async (arg)=>console.log(arg))()
}


async function launcher(obj,num){
  await obj.launch(`Hello${num}`)
}
function main(){
    const dbProxy = proxyFactory(db,preInitHandler)
    launcher(dbProxy,1)
    launcher(dbProxy,3)
    dbProxy.connect()
    setTimeout(()=>{
      launcher(dbProxy,2)
    },500)
    dbProxy.disconnect()
    launcher(dbProxy,4)
    //Can not reconnect
    // dbProxy.connect()
}

main()