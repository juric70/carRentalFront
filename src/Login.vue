<template>
  <div class="container">
    <h1>Login</h1>
    <div class="form-container">
      <form @submit.prevent="submitLogin">
        <div class="input-group">
          <label for="email">Email:</label>
          <input type="text" id="email " v-model="email" required>
        </div>
        <div class="input-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit" class="submit-button">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {

    ...mapActions(['login']),
    async submitLogin() {
      try {
        await this.login({ email: this.email, password: this.password }).then(response => {

          this.$router.push('/');
        });

      } catch (error) {
        console.error('Failed to login:', error);
      }
    }
  }
};
</script>


<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60vh;
  }
  
  h1 {
    margin-bottom: 50px;
  }
  
  .form-container {
    width: 100%;
    max-width: 400px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }
  
  .input-group {
    margin-bottom: 20px;
  }
  
  .input-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .input-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .submit-button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #6363cb;
    color: #fff;
    cursor: pointer;
  }
  
  .submit-button:hover {
    background-color: #5050a7;
  }
  </style>