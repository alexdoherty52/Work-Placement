// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNNEjo_H7oqvSuGCfm1io-1RZe0U0tQwM",
  authDomain: "sample-auth-2c059.firebaseapp.com",
  databaseURL: "https://sample-auth-2c059-default-rtdb.firebaseio.com",
  projectId: "sample-auth-2c059",
  storageBucket: "sample-auth-2c059.appspot.com",
  messagingSenderId: "424640512716",
  appId: "1:424640512716:web:db7b7c82c31c7feb0ab869",
  measurementId: "G-6M2VY6P1B1"
};


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()
  
  // Set up our register function
  function register () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full_name').value
   
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Error!')
      return
      // Don't continue running the code
    }
    
   
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        email : email,
        full_name : full_name,
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)
  
      // DOne
      alert('User Created!')
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  // Set up our login function
  function login () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Wrong Email or Password')
      return
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
        var user = auth.currentUser;

        // Update last login time in database
        var database_ref = database.ref();
        var user_data = {
            last_login: Date.now()
        };
        database_ref.child('users/' + user.uid).update(user_data);

        // Retrieve user data including full_name
        database_ref.child('users/' + user.uid).once('value')
            .then(function(snapshot) {
                var userData = snapshot.val();
                if (userData && userData.full_name) {
                  var welcomeMessage = document.getElementById('welcome-message');
                    if (welcomeMessage) {
                        welcomeMessage.innerHTML = 'Welcome, <strong>' + userData.full_name + '</strong>';
                    } else {
                        alert('Element with id "welcome-message" not found.');
                    }

                } else {
                  alert('Full name not found in user data.');
                }
            })
            .catch(function(error) {
              alert('Error retrieving user data:', error);
            });

        // Redirect to home page (index.html)
        window.location.href = "index.html"; 
    })
    .catch(function(error) {
        var error_code = error.code;
        var error_message = error.message;
        alert(error_message);
    });



  }
  
  
  
  
  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }
