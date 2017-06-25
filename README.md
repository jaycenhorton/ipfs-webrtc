# ipfs-webrtc
2
A simple webrtc client for ipfs
3
4
## v 0.0.1 : simple localhost webcam viewing
5
### Chrome setup
6
To get chrome to be able to view and display the webcam in the browser you will need to run this over an http server. A quick and simple http server like https://github.com/indexzero/http-server can be used for development and testing purposes. Follow their instructions to install http-server via node, then navigate/cd into the directory in which you want the server to run and run
7
​`http-server`
Then navigate to localhost:8080\mediastream.html
Allow access to camera and then you should be able to view your camera in the web browser.
