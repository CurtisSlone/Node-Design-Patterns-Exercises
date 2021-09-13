/*
- takes directory path as input
- asynchronously iterates over all directories and sub-directories
- returns list of files found
*/
import fs from 'fs'
import path from 'path'

//Application fields
let arg = process.argv[2]; //get directory

function listNestedFiles (dir, cb) {
    readDir(dir,cb)
}

function readDir(dir,cb){
    return fs.readdir(dir,'utf8',(err, files) => {
        if(err)
            return cb(err)
        return files.map(files => path.join(dir,files))
        .map(files => checkIfDirectory(files,cb))
    })
}

function checkIfDirectory(file,cb){
    return fs.stat(file, (err, stat) => {
        if(err)
            return cb(err)
        return stat.isDirectory() == true ? readDir(file,cb) : console.log(file)
    })
}

listNestedFiles(arg, err => console.log(err))