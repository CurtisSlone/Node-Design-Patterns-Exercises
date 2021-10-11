import { resolve, dirname} from 'path'
import { fileURLToPath } from 'url'
import react from 'react'
import reactServer from 'react-dom/server.js'
import htm from 'htm'
import fastify from 'fastify'
import fastifyStatic from 'fastify-static'
import { StaticRouter } from 'react-router-dom'
import App from './App'


// Resolving dirname
const __dirname = dirname(fileURLToPath(import.meta.url))
// React element binding to htm template literal
const html = htm.bind(react.createElement)

/*
    Dynamically serve content based on url path
*/

const template = ({content}) => `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Library App</title>
    <script defer src="/build/main.js"></script><link href="/build/main.css" rel="stylesheet"></head>
    <body>
        <div id="root">${content}</div>
    </body>
    
</html>
`

const server = fastify({logger: true})
server.register(fastifyStatic,{
    root: resolve(__dirname, '..','build'),
    prefix: '/build/'
})

server.get('*', async (req,reply)=>{
    const location = req.raw.originalUrl
    const staticContext = {}
    const serverApp = html`
    <${StaticRouter} 
        location=${location}
        context=${staticContext}
    >
    <${App}/>
    </>
    `
    const content = reactServer.renderToString(serverApp)
    const responseHtml = template({content})
    let code = 200
    if (staticContext.statusCode){
        code = staticContext.statusCode
    }
    reply.code(code).type('text/html').send(responseHtml)
})

const port = Number.parseInt(process.env.PORT) || 3000
const address = process.env.ADDRESS || '127.0.0.1'
server.listen(port,address, function (err){
    if (err) {
        console.error(err)
        process.exit(1)
    }
})