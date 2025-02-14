// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeKTKuLo700RGu_4rUa110wmy-3Sqpv-o",
  authDomain: "gamechecho-ec379.firebaseapp.com",
  projectId: "gamechecho-ec379",
  storageBucket: "gamechecho-ec379.appspot.com",
  messagingSenderId: "755121061651",
  appId: "1:755121061651:web:79818c1327bfe412dfa4e6",
  measurementId: "G-09E9XFQ7RW"
};

// Initialize Firebase
var proy = firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var email = user.email;
    var emailVerified = user.emailVerified;
    var textoVerificado = emailVerified ? "Email verificado" : "Email no verificado";

    document.getElementById('login').innerHTML = `
      <p>Logueado: ${email}</p>
      <p>${textoVerificado}</p>
      <button onclick="cerrar()">Cerrar sesión</button>
    `;
    console.log(user);
  } else {
    document.getElementById('login').innerHTML = "No logueado";
  }
});

// Función para cerrar sesión


// Función para registrar usuario
function enviar() {
  var email = document.getElementById('email').value;
  var pass = document.getElementById('pass').value;

  // Validación de campos vacíos
  if (email === "" || pass === "") {
    Swal.fire({
      title: 'Error',
      text: 'Por favor, complete todos los campos.',
      icon: 'error',
      confirmButtonText: 'Ok'
    });
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, pass)
  .then(function() {
      verificar();
      // Blanquear los datos
      document.getElementById('email').value = '';
      document.getElementById('pass').value = '';
  })
  .catch(function(error) {
    Swal.fire({
      title: 'Error',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'Ok'
    });
  });
}

// Función para acceder
function acceso() {
  var email = document.getElementById("emailA").value;
  var password = document.getElementById("passA").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
          // Inicio de sesión exitoso
          window.location.href = "Dashboard.html"; // Redirigir a la vista de dashboard
          // Blanquear los datos
          document.getElementById("emailA").value = '';
          document.getElementById("passA").value = '';
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error',
          text: 'Error al iniciar sesión: ' + error.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      });
}

// Función para verificar email
function verificar() {
  var user = firebase.auth().currentUser;
  user.sendEmailVerification()
  .then(function() {
    Swal.fire({
      title: 'Correo de verificación enviado',
      text: 'Revisa tu bandeja de entrada.',
      icon: 'success',
      confirmButtonText: 'Ok'
    });
  })
  .catch(function(error) {
    Swal.fire({
      title: 'Error',
      text: 'Error al enviar el correo de verificación: ' + error.message,
      icon: 'error',
      confirmButtonText: 'Ok'
    });
  });
}


// Referencia al botón de Google
const googleLoginBtn = document.getElementById('google-login-btn');

// Proveedor de autenticación de Google
const provider = new firebase.auth.GoogleAuthProvider();

// Función de login con Google
googleLoginBtn.addEventListener('click', () => {
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            // Usuario autenticado con éxito
            console.log('Usuario autenticado:', result.user);
            
            // Redirigir al dashboard
            window.location.href = "Dashboard.html";
        })
        .catch((error) => {
            Swal.fire({
              title: 'Error',
              text: 'Error en la autenticación con Google: ' + error.message,
              icon: 'error',
              confirmButtonText: 'Ok'
            });
        });
});

function recuperarContrasena() {
  Swal.fire({
    title: 'Recuperar contraseña',
    text: 'Por favor, introduce tu correo electrónico:',
    input: 'email',
    inputPlaceholder: 'Correo electrónico',
    showCancelButton: true,
    confirmButtonText: 'Enviar',
    cancelButtonText: 'Cancelar',
    inputValidator: (value) => {
      if (!value) {
        return '¡Necesitas introducir un correo válido!';
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const email = result.value;  // Obtener el valor del correo electrónico ingresado

      if (email) {
        firebase.auth().sendPasswordResetEmail(email)
          .then(() => {
            Swal.fire({
              title: 'Correo enviado',
              text: 'Se ha enviado un correo electrónico para restablecer tu contraseña.',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error',
              text: error.message,
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          });
      }
    }
  });
}

// Función para autenticar con Microsoft
function loginWithMicrosoft() {
  var provider = new firebase.auth.OAuthProvider('microsoft.com');

  firebase.auth().signInWithPopup(provider)
  .then((result) => {
      // Usuario autenticado con éxito
      console.log('Usuario autenticado:', result.user);
      
      // Intento de redirección
      console.log('Intentando redirigir a Dashboard');
      window.location.href = 'Dashboard.html';
  })
  .catch((error) => {
    Swal.fire({
      title: 'Error',
      text: 'Error en la autenticación con Microsoft: ' + error.message,
      icon: 'error',
      confirmButtonText: 'Ok'
    });
  });
}
// Asignar evento al botón de Microsoft
document.getElementById('microsoft-login-btn').addEventListener('click', loginWithMicrosoft);
