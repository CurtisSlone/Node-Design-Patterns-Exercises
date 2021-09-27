# Client/Server File sharing over TCP socket
## Uses cli from client to retrieve resources via streams
## Node Version: 15

- Run server using "node server"
- After running server run the client in separate cli
- To exit client, use ctrl + d 

- When using get via the client, only use the filename and extension. The resource folder must be omited
- Example:
list

basefolder/resource1.txt
basefolder/resource2.txt
basefolder/resource3.txt

get resource1.txt resource2.txt

## TODO
- Complete writing files to client after demultiplexing streams
- Add Compression/Decompression
- Add Encryption/Decryption