/*
// Client makes request for resources via TCP Connection
// Recieves files via streams
// Decompresses resources, then writes to location
*/
import net from 'net'

let client = new net.Socket()

client.connect({
    port: 1337,
    host: "localhost"
})

client.on('data', data=>{
    if(data != null)
        console.log(data.toString())
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