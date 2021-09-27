/*
// Client makes request for resources via TCP Connection
// Recieves files via streams
// Decompresses resources, then writes to location
*/
import net from 'net'
import { createWriteStream } from 'fs'

let client = new net.Socket()

client.connect({
    port: 1337,
    host: "localhost" 
})

client.on('data', data=>{
    if(data != null){
      if(data == "start"){
        console.log("happened")
        
      }
      else
        console.log(data.toString())
        

    }
})
.on('connect',()=>{
    console.log("Please request resources.\nType 'help' for assistance.\nPress Ctrl+D to close\n")
})

process.stdin
  .on('readable', () => {
    let chunk
    while ((chunk = process.stdin.read()) !== null) {
      client.write(chunk.toString())
    }
  })
  .on('end', () => client.destroy())


  function demultiplexChannel (source, destinations) {
    let currentChannel = null
    let currentLength = null
  
    source
      .on('readable', () => { // ①
        let chunk
        if (currentChannel === null) { // ②
          chunk = source.read(1)
          currentChannel = chunk && chunk.readUInt8(0)
        }
  
        if (currentLength === null) { // ③
          chunk = source.read(4)
          currentLength = chunk && chunk.readUInt32BE(0)
          if (currentLength === null) {
            return null
          }
        }
  
        chunk = source.read(currentLength) // ④
        if (chunk === null) {
          return null
        }
   
        console.log(`Received packet from: ${currentChannel}`)
        destinations[currentChannel].write(chunk) // ⑤
        currentChannel = null
        currentLength = null
      })
      .on('end', () => { // ⑥
        destinations.forEach(destination => destination.end())
        console.log('Source channel closed')
      })
  }