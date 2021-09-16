/*
- Replace Original TaskQueuePC async/await with promises
- Remove any async/await
- Original found at: 
https://github.com/PacktPublishing/Node.js-Design-Patterns-Third-Edition/blob/master/05-asynchronous-control-flow-patterns-with-promises-and-async-await/11-asyncawait-web-spider-v4/TaskQueuePC.js

*/

/*
- Replace Original TaskQueuePC async/await with promises
- Remove any async/await
- Original found at: 
https://github.com/PacktPublishing/Node.js-Design-Patterns-Third-Edition/blob/master/05-asynchronous-control-flow-patterns-with-promises-and-async-await/11-asyncawait-web-spider-v4/TaskQueuePC.js

*/

export class TaskQueuePC {
    constructor (concurrency) {
      this.taskQueue = []
      this.consumerQueue = []
  
      // spawn consumers
      for (let i = 0; i < concurrency; i++) {
        this.consumer()
      }
    }
  
    consumer () {
        //remove async, return promise to make consumer thenable for async
      return new Promise((resolve,reject)=>{
          try{
            const task = this.getNextTask()
            resolve(task) //resolve task to pass to next promise
          } catch (err) {
              reject(err)
          }
      })
        .then(task=>task()) //resolve and complete task
        .then(()=>this.consumer()) // recursively call consumer
    }
  
    getNextTask () { //remove async key word as getNextTask will be async
      return new Promise((resolve) => {
        if (this.taskQueue.length !== 0) {
          return resolve(this.taskQueue.shift())
        }
        this.consumerQueue.push(resolve)
      })
    }
  
    runTask (task) {
      return new Promise((resolve, reject) => {
        const taskWrapper = () => {
          const taskPromise = task()
          taskPromise.then(resolve, reject)
          return taskPromise
        }
  
        if (this.consumerQueue.length !== 0) {
          // there is a sleeping consumer available, use it to run our task
          const consumer = this.consumerQueue.shift()
          consumer(taskWrapper)
        } else {
          // all consumers are busy, enqueue the task
          this.taskQueue.push(taskWrapper)
        }
      })
    }
  }
  