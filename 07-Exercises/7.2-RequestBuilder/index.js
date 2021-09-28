/*
- Request Builder
- Make class based on http.request() function
- builder must provide HTTP method, URL, query component or URL, header params, and body
- to send, use invoke() method that returns promise
*/

import http from 'http'

/*
BUILDER CLASS
*/

class HTTPBuilder {
    constructor(){
    }
    
    setHostPathAndPort(hostname,path,port){
        this.hostname = hostname
        this.path = path
        this.port = port
        return this
    }

    setMethod(method, postObject){
        this.method = method
        if(method == 'POST')
            this.postData = JSON.stringify(postObject)
        return this
    }

    setHeaders(type, length){
        this.type = type
        this.length = length
        return this
    }

    build(){
        this.options = {
            hostname: this.hostname,
            port: this.port,
            path: this.path,
            method: this.method,
            headers: {
                'Content-Type': this.type,
                'Content-Length': this.length
            }
        }
    }

    invoke(){
        return new Promise((resolve,reject)=>{
            const req = http.request(this.options, (res)=>{
                res.setEncoding('utf8')
                res.on('data', (chunk)=>{
                    console.log(`Body: ${chunk}`)
                })
                res.on('end',()=>{
                    console.log(`No more data`)
                })
            })
            req.on('error',(e)=>{
                console.log(`problem: ${e.message}`)
                reject()
            })
            if(this.method.toUpperCase() == 'POST')
                req.write(this.postData)
            req.end();
            resolve()
        })
    }
}

let httpBuild = new HTTPBuilder()

httpBuild.setHostPathAndPort("www.google.com","/",80)
    .setMethod('GET')
    .setHeaders(null,null)
    .build()

httpBuild.invoke()
    .then(res=>console.log(`okay!: ${res}`))
    .catch(err=> console.log(`not okay: ${err}`))