<template>
    <div>
      <div id="loginContainer" class="container" v-show="showLogin">
        <div class="form-group">
          <label for="correo">Correo electrónico:</label>
          <input type="email" id="correo" v-model="email" class="form-control">
        </div>
        <div class="form-group">
          <label for="contrasena">Contraseña:</label>
          <input type="password" id="contrasena" v-model="password" class="form-control">
        </div>
        <button @click="loginUser">Iniciar Sesión</button>
        <button @click="switchForm('register')">Ir a Registrarse</button>
      </div>
      <div class="container" v-show="!showLogin">
        <form @submit.prevent="registerUser">
          <div class="form-group">
            <label for="fullName">Nombre completo:</label>
            <input type="text" id="fullName" v-model="fullName" class="form-control">
          </div>
          <div class="form-group">
            <label for="email">Correo electrónico:</label>
            <input type="email" id="email" v-model="email" class="form-control">
          </div>
          <div class="form-group">
            <label for="password">Contraseña:</label>
            <input type="password" id="password" v-model="password" class="form-control">
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirmar contraseña:</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword" class="form-control">
          </div>
          <div class="form-group">
            <label for="career">Carrera o especialidad:</label>
            <select id="career" v-model="career" class="form-control">
              <option value="" disabled>Elija una carrera</option>
              <option value="Ingeniería">Ingeniería</option>
              <option value="Medicina">Medicina</option>
              <!-- Agregar más opciones según sea necesario -->
            </select>
          </div>
          <div class="form-group">
            <label for="graduationYear">Año de graduación:</label>
            <input type="number" id="graduationYear" v-model="graduationYear" class="form-control">
          </div>
          <button type="submit">Registrarse</button>
          <button @click="switchForm('login')">Ir a Logueo</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showLogin: true,
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        career: '',
        graduationYear: ''
      };
    },
    methods: {
      switchForm(formType) {
        this.showLogin = (formType === 'login');
      },
      registerUser() {
        this.clearErrors();
        if (this.validateForm()) {
          alert('¡Usuario registrado exitosamente!');
          this.switchForm('login');
          localStorage.setItem('userEmail', this.email);
          localStorage.setItem('userPassword', this.password);
          localStorage.setItem('fullName', this.fullName);
          localStorage.setItem('userCareer', this.career);
          localStorage.setItem('userGraduationYear', this.graduationYear);
        }
      },
      loginUser() {
        const storedEmail = localStorage.getItem('userEmail');
        const storedPassword = localStorage.getItem('userPassword');
        if (this.email === storedEmail && this.password === storedPassword) {
          window.location.href = "menu.html";
        } else {
          alert('Correo electrónico o contraseña incorrectos. Por favor, inténtalo de nuevo.');
        }
      },
      clearErrors() {
        document.querySelectorAll('.error-message').forEach(element => element.remove());
      },
      validateForm() {
        let valid = true;
        if (this.fullName.trim() === '') {
          this.showError('fullName', 'Debe ingresar un nombre.');
          valid = false;
        } else if (!this.fullName.match(/^[a-zA-Z\s]*$/)) {
          this.showError('fullName', 'Ingrese un nombre válido.');
          valid = false;
        } else if (!this.email.includes('@')) {
          this.showError('email', 'El correo debe contener "@".');
          valid = false;
        } else if (this.password.length < 8 || this.password.length > 26 || !this.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,26}$/)) {
          this.showError('password', 'La contraseña debe tener entre 8 y 26 caracteres, incluir al menos una letra mayúscula, un número y un carácter especial.');
          valid = false;
        } else if (this.confirmPassword !== this.password) {
          this.showError('confirmPassword', 'Las contraseñas no coinciden.');
          valid = false;
        } else if (this.graduationYear < 2010) {
          this.showError('graduationYear', 'El año de graduación no puede ser anterior a 2010.');
          valid = false;
        } else if (this.career === '') {
          this.showError('career', 'Por favor, elija una carrera.');
          valid = false;
        }
        return valid;
      },
      showError(id, message) {
        document.getElementById(id).insertAdjacentHTML('afterend', `<p class="small error-message">${message}</p>`);
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .form-group {
    margin-bottom: 15px;
  }
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  .form-group input,
  .form-group select {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  button {
    display: inline-block;
    padding: 10px 15px;
    margin-top: 10px;
    background-color: brown;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    background-color: darkred;
  }
  .error-message {
    color: red;
    font-size: 12px;
  }
  </style>
  