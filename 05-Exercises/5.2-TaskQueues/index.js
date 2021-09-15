/*
- Migrate Task Queue class internals from promises to async/await
*/

export class TaskQueue {
  constructor (concurrency) {
    this.concurrency = concurrency
    this.running = 0
    this.queue = []
  }

  runTask (task) {
    return new Promise((resolve, reject) => {
      this.queue.push(() => {
        /* 
            I'm assuming the task() provided by the args
            uses keyword async because the return shows
            the task() using .then
            This suggests that the task is thenable

            // Original
            // return task().then(resolve, reject)

            The modified return will be as follows:

            // return await task()

            Using the await keyword pauses a promise until it is resolved.
            The thenable nature of the task() assumes that the task()
            can be resolved
        */
        // Modified
        return await task()

      })
      process.nextTick(this.next.bind(this))
    })
  }


  next () {
    while (this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift()
      task().finally(() => {
        this.running--
        this.next()
      })
      this.running++
    }
  }
}
