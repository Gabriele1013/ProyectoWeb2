<template>
  <div class="body">
    <div v-if="formType === 'register'" class="container">
      <h2>Registro de Usuario</h2>
      <label for="fullName">Nombre completo:</label>
      <input type="text" v-model="registerForm.fullName" placeholder="Nombre">
      <p class="small error-message" v-if="errors.fullName">{{ errors.fullName }}</p>
      <label for="email">Correo electrónico:</label>
      <input type="email" v-model="registerForm.email" placeholder="Correo electrónico">
      <p class="small error-message" v-if="errors.email">{{ errors.email }}</p>
      <label for="password">Contraseña:</label>
      <input type="password" v-model="registerForm.password" placeholder="Contraseña">
      <p class="small error-message" v-if="errors.password">{{ errors.password }}</p>
      <label for="confirmPassword">Confirmar contraseña:</label>
      <input type="password" v-model="registerForm.confirmPassword" placeholder="Confirmar contraseña">
      <p class="small error-message" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</p>
      <label for="career">Carrera o especialidad:</label>
      <select v-model="registerForm.career">
        <option value="">Carrera o especialidad</option>
        <option value="Agropecuaria">Agropecuaria</option>
        <option value="Tecnologia de la Información">Tecnologia de la Información</option>
        <option value="Turismo">Turismo</option>
        <option value="Medicina">Medicina</option>
        <option value="Administración de Empresas">Administración de Empresas</option>
        <option value="Arquitectura">Arquitectura</option>
        <option value="Software">Software</option>
      </select>
      <p class="small error-message" v-if="errors.career">{{ errors.career }}</p>
      <label for="graduationYear">Año de graduación:</label>
      <input type="number" v-model="registerForm.graduationYear" placeholder="Año de graduación">
      <p class="small error-message" v-if="errors.graduationYear">{{ errors.graduationYear }}</p>
      <button @click="registerUser">Registrarse</button>
      <button @click="switchForm('login')">Ir a Logueo</button>
    </div>

    <div v-if="formType === 'login'" class="container">
      <h2>Logueo de Usuario</h2>
      <label for="correo">Correo electrónico:</label>
      <input type="email" v-model="loginForm.email" placeholder="Ingresa tu correo electrónico" required>
      <p class="small error-message" v-if="errors.loginEmail">{{ errors.loginEmail }}</p>
      <label for="contrasena">Contraseña:</label>
      <input type="password" v-model="loginForm.password" placeholder="Ingresa tu contraseña" required>
      <p class="small error-message" v-if="errors.loginPassword">{{ errors.loginPassword }}</p>
      <a href="#">¿Olvidaste tu contraseña?</a>
      <button @click="loginUser">Iniciar Sesión</button>
      <button @click="switchForm('register')">Ir a Registro</button>
    </div>

    <div class="container-footer">
      <footer>
        <div class="logo-footer">
          <img src="images/uleam1.png" alt="">
        </div>
        <div class="redes-footer">
          <a href="#"><i class="fa-brands fa-square-facebook icon-redes-footer"></i></a>
          <a href="#"><i class="fa-brands fa-instagram icon-redes-footer"></i></a>
          <a href="#"><i class="fa-brands fa-x-twitter icon-redes-footer"></i></a>
        </div>
        <hr>
        <h4>© 2024 EmpleosULEAM - Todos los Derechos Reservados</h4>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formType: 'register',
      registerForm: {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        career: '',
        graduationYear: ''
      },
      loginForm: {
        email: '',
        password: ''
      },
      errors: {}
    };
  },
  methods: {
    switchForm(type) {
      this.formType = type;
    },
    registerUser() {
      this.errors = {};
      if (!this.registerForm.fullName.trim()) {
        this.errors.fullName = 'Debe ingresar un nombre.';
      } else if (!this.registerForm.fullName.match(/^[a-zA-Z\s]*$/)) {
        this.errors.fullName = 'Ingrese un nombre válido.';
      }
      if (!this.registerForm.email.includes('@')) {
        this.errors.email = 'El correo debe contener "@".';
      }
      if (this.registerForm.password.length < 8 || this.registerForm.password.length > 26 || !this.registerForm.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,26}$/)) {
        this.errors.password = 'La contraseña debe tener entre 8 y 26 caracteres, incluir al menos una letra mayúscula, un número y un carácter especial.';
      }
      if (this.registerForm.confirmPassword !== this.registerForm.password) {
        this.errors.confirmPassword = 'Las contraseñas no coinciden.';
      }
      if (this.registerForm.graduationYear < 2010) {
        this.errors.graduationYear = 'El año de graduación no puede ser anterior a 2010.';
      }
      if (!this.registerForm.career) {
        this.errors.career = 'Por favor, elija una carrera.';
      }

      if (Object.keys(this.errors).length === 0) {
        alert('¡Usuario registrado exitosamente!');
        const user = { ...this.registerForm, numberID: '', phoneNumber: '', age: '', photo: '' };
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.switchForm('login');
      }
    },
    loginUser() {
      this.errors = {};
      const { email, password } = this.loginForm;

      if (!email) {
        this.errors.loginEmail = 'Debe ingresar un correo electrónico.';
      }
      if (!password) {
        this.errors.loginPassword = 'Debe ingresar una contraseña.';
      }

      if (Object.keys(this.errors).length === 0) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        let user = users.find(user => user.email === email && user.password === password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          window.location.href = "menu.html";
        } else {
          alert('Correo electrónico o contraseña incorrectos. Por favor, inténtalo de nuevo.');
        }
      }
    }

  }
};
</script>

<style scoped>
.body {
  background-image: url(https://www.uleam.edu.ec/wp-content/uploads/2022/11/EZM_1396-1024x683.jpg);
  background-size: cover;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container {
  margin-top: 600px;
  margin-bottom: 100px;
  background-color: #ffffff;
  padding: 20px 45px;
  border-radius: 20px;
  box-shadow: 0 4px 25px -15px black;
  max-width: 353px;
  width: 90%;
  max-height: 800px;
  height: 90%
}

input,
select,
button {
  display: block;
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid black;
  border-radius: 6px;
  max-width: 350px;
}

.container button {
  background-color: #935f23;
  border-radius: 20px;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}

.small {
  font-size: 0.8em;
  color: #ff0000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.container-footer {
  width: 100%;
  padding: 40px 0;
  background: #fff;
  margin-top: 40px;
}

.container-footer footer {
  width: 1200px;
  margin: auto;
}

.container-footer footer .logo-footer {
  text-align: center;
}

.container-footer footer .logo-footer img {
  width: 240px;
}

.container-footer footer .redes-footer {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.container-footer footer .redes-footer .icon-redes-footer {
  font-size: 20px;
  margin: 20px;
  background-color: #efefef;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  color: #a2a2a2;
}

.container-footer footer .redes-footer .fa-square-facebook:hover {
  background: #41579A;
  color: #fff;
}

.container-footer footer .redes-footer .fa-x-twitter:hover {
  background: #000;
  color: #fff;
}

.container-footer footer .redes-footer .fa-instagram:hover {
  background: linear-gradient(to top right, #FCDE30, #E9712A, #D2313B, #AE4198, #7540A1, #5443A8);
  color: #fff;
}

.container-footer footer hr {
  margin-top: 20px;
  border: none;
  height: 2px;
  background: #dad5d5;
}

.container-footer h4 {
  text-align: center;
  margin-top: 20px;
  color: #8e8e8e;
  font-weight: 500;
}
</style>
