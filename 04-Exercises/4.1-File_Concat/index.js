/*
Concatenate Files
- Must preserve file content ordering, sequential execution
- must be callback style
- requires two or more sources, one destination and one callback
-
*/
import fs from 'fs'

//Application fields
let args = process.argv; //all args
let src = args.slice(2,args.length - 1) //Source Files
let dest = args[args.length - 1] //Destination file

function concatFiles (src, dest, cb) {
    //Validate more than one source file to concatenate
    if (src.length <= 1)
        return console.log(`Not enough source files`)
    readWrite(0, src, dest, cb)
}

function readWrite(index,src,dest,cb){
    console.log(index)
    if(index == src.length )
        return cb()
    fs.readFile(src[index], 'utf8', (err, fileContent)=> {
        if (err)
            return cb(err)
        console.log(fileContent)
        saveBuffer(dest,fileContent,cb)
    })
    readWrite(index + 1, src, dest, cb)
}

//Save Buffer to Dest file
function saveBuffer(dest, contents, cb){
    console.log(dest)
    return fs.appendFile(dest, contents, err => {
        if (err)
            return cb(err)
        cb()
    })
}

function validateArgs() {//Validate enough cli argument length
if(process.argv.length < 5) 
    return console.log(`Not enough arguments`)
}

validateArgs()

concatFiles(src, dest, err => {
    if(err){
        console.error(err)
        process.exit(1)
    }
    console.log(`Completed file concatenation`)
})
