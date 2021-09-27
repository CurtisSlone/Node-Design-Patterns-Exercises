/*
//
// Resource server --- TCP
// Recieves request for resource
// Compresses & Serves Resource via Stream
// Serves multiple resources at once
//
*/
import { fork } from 'child_process'
import { createServer } from "net" 
import fs from 'fs'
import path from 'path'
import { createReadStream } from "fs"
import { createGzip } from "zlib"
// import { basename } from "path"

/*
//
// Server Class
//
*/
class TCPServer {
    //Establish Server Via Constructor
    constructor(resourceRoot){
        // BaseDir of resources
        this.resourceRoot = resourceRoot

        this.server = createServer(socket =>{
            socket.setEncoding('utf8')
            socket
                .on('end',()=>{
                    console.log("Client gracefully disconnected")
                })
                .on('data', (data)=>{
                    //recieve commands from client stdout
                    //output
                    if(data != null) {
                        let args = data.split(' ')
                        switch(args[0]){
                            case "help\n":
                                this.sendHelp(socket)
                                break;
                            case 'get':

                                this.sendResources(socket, ...args.slice(1))
                                break;
                            case "list\n":
                                this.listResources(socket,this.resourceRoot, (err)=>{
                                    if(err)
                                        console.log(err)
                                    console.log("Listed All Resources")
                                })
                                break;
                            default:
                                socket.write("Error:\nPlease check your request syntax. Try typing 'help' to learn more\n\n")
                                break;
                        }
                    } else {
                        socket.write("Error:\nPlease check your request syntax. Try typing 'help' to learn more\n\n")
                    }
                })
                .on('error',(err)=>{
                    console.log(err)
                })
            console.log("Client Connected")
        })
        
    }

    //List Resources
    /*
    // Receive keyword 'list' from client stdout
    // Echos all filenames in resources
    */
    listResources(socket,dir,cb){
        this.readDir(socket,dir,cb)
        cb()
    }

    /*
    Directory checking functions taken from exercise 4.2
    */

    readDir(socket,dir,cb){
        return fs.readdir(dir,'utf8',(err, files) => {
            if(err)
                return cb(err)
            return files.map(files => path.join(dir,files))
            .map(files => this.checkIfDirectory(socket,files,cb))
        })
    }

    checkIfDirectory(socket,file,cb){
        return fs.stat(file, (err, stat) => {
            if(err)
                return cb(err)
            return stat.isDirectory() == true ? this.readDir(socket,file,cb) : socket.write(file.toString() + "\n")
        })
    }

    //Send Single Resource
    /*
    // Receive keyword 'get' with resource name from client stdout
    // if file not found return file not found error
    // Creates readable stream to be consumed nby client
    */
    sendResources(socket, ...resources){
        //map resources to resource root
        let arr =[]
        socket.write("start")
        arr.push(resources.length.toString())
        resources[resources.length - 1] = resources[resources.length - 1].substring(0, resources[resources.length - 1].length - 1 )
        resources.map(res=>arr.push(res))
        socket.write("sig")

        
        //remove escape character from last resource in resources array
        
        let openChannels = resources.length
        resources = resources.map(path=>createReadStream(path))
        
        //Packet Switching algorithm
        for (let i = 0; i < resources.length; i++) {
            resources[i]
              .on('readable', function () { // ①
                let chunk
                while ((chunk = this.read()) !== null) {
                  const outBuff = Buffer.alloc(1 + 4 + chunk.length) // ②
                  outBuff.writeUInt8(i, 0)
                  outBuff.writeUInt32BE(chunk.length, 1)
                  chunk.copy(outBuff, 5)
                  console.log(`Sending packet to channel: ${i}`)
                  socket.write(outBuff) // ③
                }
              })
              .on('end', () => { // ④
                if (--openChannels === 0) {
                  socket.end()
                }
              })
          } 
    }
    
    //Send Help
    /*
    // Send man to client
    */

    sendHelp(socket){
        socket.write(
            "---Resource Downloader---\n\n" +
            "Commands:\n" +
            "list   - List all server resources available for download\n" +
            "get    - Requests resources for download\n " +
            "        Syntax:\n" + 
            "         get example.txt example2.txt\n" +
            "         separate resources with space\n" +
            "help   - Receive use on requesting resources\n\n" 
        )
    }
}

const tcp = new TCPServer("serverResources")

tcp.server.listen(1337, '127.0.0.1',()=>{
    console.log("Waiting on client to establish connection")
})