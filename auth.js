// web app's Firebase configuration
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
    const auth = firebase.auth();
    const database = firebase.database();
// Set up our register function
function register() {
  // Get all our input fields
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const full_name = document.getElementById('full_name').value;

  // Validate input fields
  if (!validate_email(email) || !validate_password(password)) {
    alert('Error!');
    return;
  }

  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      const user = auth.currentUser;

      // Add this user to Firebase Database
      const database_ref = database.ref();

      // Create User data
      const user_data = {
        email: email,
        full_name: full_name,
        last_login: Date.now()
      };

      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data);

      // Store user name in local storage
      localStorage.setItem('userFullName', full_name);

      // Done
      alert('User Created!');
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      const error_message = error.message;
      alert(error_message);
    });
}

// Set up our login function
function login() {
  // Get all our input fields
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Validate input fields
  if (!validate_email(email) || !validate_password(password)) {
    alert('Wrong Email or Password');
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      const user = auth.currentUser;

      // Update last login time in database
      const database_ref = database.ref();
      const user_data = {
        last_login: Date.now()
      };
      database_ref.child('users/' + user.uid).update(user_data);

      // Store user name in local storage
      database_ref.child('users/' + user.uid).once('value').then((snapshot) => {
        const user_data = snapshot.val();
        localStorage.setItem('userFullName', user_data.full_name);

        // Redirect to home page (index.html)
        window.location.href = "index.html";
      });
    })
    .catch(function(error) {
      const error_message = error.message;
      alert(error_message);
    });
}

    // Validate Functions
    function validate_email(email) {
      const expression = /^[^@]+@\w+(\.\w+)+\w$/;
      return expression.test(email);
    }

    function validate_password(password) {
      return password.length >= 6;
    }

    function validate_field(field) {
      return field != null && field.length > 0;
    }

    // Function to show welcome message
    function showWelcomeMessage(name) {
      const navbar = document.getElementById('navbar');
      const welcomeMessage = document.createElement('div');
      welcomeMessage.id = 'welcomeMessage';
      welcomeMessage.textContent = `Welcome, ${name}`;
      navbar.appendChild(welcomeMessage);
    }

    // Function to hide welcome message
    function hideWelcomeMessage() {
      const welcomeMessage = document.getElementById('welcomeMessage');
      if (welcomeMessage) {
        welcomeMessage.remove();
      }
    }

    // Check authentication state and update navbar
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, display welcome message
        const database_ref = database.ref('users/' + user.uid);
        database_ref.once('value').then((snapshot) => {
          const user_data = snapshot.val();
          const displayName = user_data.full_name;
          showWelcomeMessage(displayName);
        });
      } else {
        // User is signed out, hide welcome message
        hideWelcomeMessage();
      }
    });