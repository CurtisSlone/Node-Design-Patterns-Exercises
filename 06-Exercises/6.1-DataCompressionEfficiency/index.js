/*
- write a command-line script that compresses files uszing zlib algorithms
- measure time and compression efficiency
- Utilize streams
*/
import { createGzip, createBrotliCompress, createDeflate } from "zlib"
import { PassThrough, pipeline, Transform } from "stream"
import { createReadStream, createWriteStream } from "fs"
import { hrtime } from "process";


const filename = process.argv[2]
const algorithmList = [
    {
        name: "Gzip",
        method: createGzip
    },
    {
        name: "Brotli",
        method: createBrotliCompress
    },
    {
        name: "Deflate",
        method: createDeflate
    }
]

function algorithmMeasurement(algorithm, file, algorithmName){
    
        let startTimer
        let totalBytes = 0
        let endTimer
        const monitor = new PassThrough()
        monitor.on('data', (chunk) => {
            totalBytes += chunk.length
        })
        monitor.on('finish', () => {
            endTimer = hrtime.bigint()
            console.log(`${algorithmName}: ${totalBytes} Bytes in ${hrtime.bigint() - startTimer} nano seconds`)
        })
        
        pipeline(
            createReadStream(file),
            new Transform({
                defaultEncoding: 'utf8',
                transform (chunk, encoding, cb) {
                  startTimer = hrtime.bigint()
                  cb()
                },
                flush (cb) {.1
                  cb()
                }
              }),
            algorithm(),
            monitor,
            (err)=>{
                console.log(err)
            }
        )

}

async function main(){
    for(const algorithm of algorithmList){
        await algorithmMeasurement(algorithm.method,filename,algorithm.name)
    }
}

main()