/*
 mediastream.js
 Author: Jaycen Horton
 ipfs-webrtc
 Version 0.0.1
 --
 Test of MediaStream API: getUserMedia
*/

navigator.getWebcam = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);

navigator.getWebcam(
    //constraints 
    { video: true, audio: false}, 

    //successCallback
    gotWebcam,

    //errorCallback
    function(err) {
      console.log("Oops! Something's not right." + err);
    });

function gotWebcam(stream) { 
     localVideo.src = window.URL.createObjectURL(stream);
     localVideo.play();

     //Display some of the attributes of the MediaStream and MediaStreamTrack
     //First, reach into the MediaStream object to access info about the MediaStreamTrack
     var video_track = stream.getVideoTracks()[0];
     //Show this info in a div
     var output = document.getElementById('output');
     //Print ID of the MediaStream object
     output.innerHTML = "stream id = " + stream.id + "<BR>";
     //Print info about the MediaStreamTrack
     output.innerHTML += "track readyState = " + video_track.readyState + "<BR>";
     output.innerHTML += "track id = " + video_track.id + "<BR>";
     output.innerHTML += "kind = " + video_track.kind + "<BR>";

};
