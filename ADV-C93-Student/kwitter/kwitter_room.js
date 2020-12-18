
//ADD YOUR FIREBASE LINKS HERE
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
    console.log(user_name);
    document.getElementById("user_name").innerHTML = "Welcome  " + user_name + "!";

    function addroom(){
      var room_name = document.getElementById("room_name").value;

      console.log(room_name);

      firebase.database().ref("/").child(room_name).update({
            purpose:"adding_user"
      })

      window.location = "kwitter_page.html"

      localStorage.setItem("room_name", room_name);
    }

    function redirect_to_room_name(name){
      console.log(name);

      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html"
    }

    function logout(){
      localStorage.removeItem("user_name");

      localStorage.removeItem("room_name");

      window.location = "index.html";
    }


function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
      console.log("room names = " + Room_names);

      row = "<div class = 'room_name' id = " + Room_names + " onclick = 'redirect_to_room_name(this.id)'>#"+  Room_names + "</div> <hr>"
      document.getElementById("output").innerHTML += row
      //End code
      });});}
getData();

