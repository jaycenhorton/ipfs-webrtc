/*
 ps-webrtc-rtcpeerconnection.js
 Author: Lisa Larson-Kelley (http://learnfromlisa.com)
 WebRTC Fundamentals -- Pluralsight.com
 Version 1.0.0
 --
 Remote video is just a dup of the local video reused in the remote stream, 
 since I there is no signalling implemented in this simple WebRTC example.
*/

var myPeerConnection;
var remotePeerConnection;

var PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
var SessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription;

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

     //Displaying some of the attributes of the MediaStreamTrack
     var video_track = stream.getVideoTracks()[0];
     var output = document.getElementById('output');
     output.innerHTML = "stream id = " + stream.id + "<BR>";
     output.innerHTML += "track readyState = " + video_track.readyState + "<BR>";
     output.innerHTML += "track id = " + video_track.id + "<BR>";
     output.innerHTML += "kind = " + video_track.kind + "<BR>";
     createPeerConnections(stream);
};

function createPeerConnections(stream) {
	//Create the local peer connection
  myPeerConnection = new PeerConnection(null);
	console.log("Created local peer connection object myPeerConnection");
	
	//Create the remote peer connection
  remotePeerConnection = new PeerConnection(null);
	console.log("Created remote peer connection object remotePeerConnection");
  
  //Listen for ICE candidates on each
  myPeerConnection.onicecandidate = gotMyIceCandidate;
	remotePeerConnection.onicecandidate = gotRemoteIceCandidate;

  //Handle streams on each peer
  myPeerConnection.addStream(stream);
  console.log("Added local stream to myPeerConnection");
  remotePeerConnection.onaddstream = gotRemoteStream;

  //Create local peer connection offer
  myPeerConnection.createOffer(gotLocalDescription);
  console.log("Created SDP offer on myPeerConnection");
};

//When local ICE candidate is received...
function gotMyIceCandidate(event){ 
  if (event.candidate) { 
    //Send the local ICE candidate to the remote peer
    remotePeerConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
    //console.log("Local ICE candidate: \n" + event.candidate.candidate);
    console.log("Sent my ICE candidates to remotePeerConnection")
  }
}

//When remote ICE candidates are received by me...
function gotRemoteIceCandidate(event){ 
  if (event.candidate) {
    //Add the remote ICE candidate to my local peer connection
    myPeerConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
    //console.log("Remote ICE candidate: \n " + event.candidate.candidate);
    console.log("Added remote ICE candidates to myPeerConnection")
  }
}

//create the SDP offer!
function gotLocalDescription(description){ 
  myPeerConnection.setLocalDescription(description);
  //console.log("Offer from myPeerConnection: \n" + description.sdp);
  console.log("Created offer from myPeerConnection");
  remotePeerConnection.setRemoteDescription(description);
  remotePeerConnection.createAnswer(gotRemoteDescription);
}

//When remote SDP arrives..
function gotRemoteDescription(description){ 
  remotePeerConnection.setLocalDescription(description);
  //console.log("Answer from remotePeerConnection: \n" + description.sdp);
  console.log("Got answer from remotePeerConnection")
  myPeerConnection.setRemoteDescription(description);
}

//Success! Show the remote video...
function gotRemoteStream(event){ //Success! Show the remote video...
  theirVideo.src = URL.createObjectURL(event.stream);
  theirVideo.play();
  console.log("Got remote stream!");
}
