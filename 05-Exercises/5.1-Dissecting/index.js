/*
- implement Promise.all()
- must use promises or async/await
-must be functionally equivalent of Promise.all()
*/

function makeSumTask(a,b){
    return new Promise((resolve, reject)=>{ 
        console.log(a+b)
        resolve(a+b)
    })
}

async function promiseAll(promises){
    for (const promise of promises)
        await promise
}

let promises = [
    makeSumTask(2,3),
    makeSumTask(4,7),
    makeSumTask(1,6),
    makeSumTask("a",8)
]

promiseAll(promises)

//Does no count for on rejected callbacks