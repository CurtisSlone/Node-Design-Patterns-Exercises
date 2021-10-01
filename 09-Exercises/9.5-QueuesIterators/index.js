
/*
- Implement Async Queue, similar to Ch5 Task Queue
  -- Queues asynchronous tasks to be consumed
- expose asyncIterable to provide ability to process
  elements of queue asynchronously
- the async iterator returned from AsyncQueue should terminate
   after done() is invoked and after all items in queue are consumed
*/

class AsyncQueue {
    constructor(queue = []){
        this.queue = queue
        
    }

    enqueue(asyncTask){
        this.queue.push(asyncTask)
    }

    //Process elements in queue
    [Symbol.asyncIterator](){
        const taskIterator = this.queue[Symbol.iterator]()
        return {
            async next() {
                const iteratorResult = taskIterator.next()
                /*
                To make responsive, when iteratorResult.done
                add wait and listen for available next
                */
                if(iteratorResult.done)
                    return { done: true }
                try{
                  const currentTask =  await iteratorResult.value
                  return {
                      done: false,
                      value: currentTask()
                  }
                } catch (err){
                    return {
                        done: false,
                        value: `${err}`
                    }
                }
            }
            
        }
    }
}


async function main(){

    let taskCount = 3
    let task = (count) => {
        return `Task ${count} completed`
    }
    let taskWrapper = ()=> {
        return task(taskCount)
    }
    let asyncQueue = new AsyncQueue([()=>task(0),()=>task(1),()=>task(2)])

    /*
    Enqueue extra tasks
    */
    setInterval(()=>{
        console.log(`Enqueued Task ${taskCount}`)
        asyncQueue.enqueue(taskWrapper())
        taskCount++
    }, 1000)

    for await (const asyncTask of asyncQueue){
        console.log(asyncTask)
    }
}

main()