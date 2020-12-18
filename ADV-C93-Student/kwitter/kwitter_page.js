var firebaseConfig = {
    apiKey: "AIzaSyDi4AuO_3G8_E1J8dOlWGJ1wAKwxHT6Sf0",
    authDomain: "kitter-c0b2a.firebaseapp.com",
    databaseURL: "https://kitter-c0b2a-default-rtdb.firebaseio.com",
    projectId: "kitter-c0b2a",
    storageBucket: "kitter-c0b2a.appspot.com",
    messagingSenderId: "804852852814",
    appId: "1:804852852814:web:91773cb5ac0493bfdbbb1f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send(){
    msg = document.getElementById("msg").value;

    firebase.database().ref(room_name).push({
        name:user_name,
        message:msg,
        like:0
    });
    document.getElementById("msg").value = " ";
}

function update_likes(message_id){
  console.log("clicked on like button of id:" + message_id);
  button_id = message_id;
  like = document.getElementById(button_id).value;
  updated_like = Number(likes)+ 1
  console.log(updated_like);
  firebase.database().ref(room_name).child(message_id).update({
    like: updated_like
  });
}

function logout(){
  localStorage.removeItem("user_name");

  localStorage.removeItem("room_name");

  window.location.replace("index.html");
}

function getData() {firebase.database().ref("/"+ room_name).on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key; childData = childSnapshot.val();if(childKey != "purpose"){
    firebase_message_id = childKey;
    message_data = childData;
   //Start code
    console.log(firebase_message_id);
    console.log(message_data);

    name = message_data['name'];
    message = message_data['message'];
    likes = message_data['like'];

    name_with_tag = " <h4>"+name+"<img src = 'tick.png' class = 'user_tick'></h4>";
    message_with_tag = "<h4 class = 'message_h4'>"+message+"</h4>"
    like_button = "<button class = 'btn btn-warning' id = "+firebase_message_id+" value = "+likes+" onclick = 'update_likes(this.id)'><span class = 'glyphicon glyphicon-thumbs-up'></span>Like: "+likes+"</button>"
    row = name_with_tag+message_with_tag+like_button;

    document.getElementById("output").innerHTML += row;
   //End code
 } });});}
getData();