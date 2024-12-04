<template>
  <header class="header">

    <h1 @click="goHome()" class="title">CAR RENTAL</h1>
    <div class="button-container">
      <p class="greeting" v-if="isAuthenticated">Hello {{ getUser?.name }}</p>
    <button @click="goToRentals()" class="login-button">Rentals</button>
    <button @click="goToCars()" class="login-button">Cars</button>
    <button @click="goToBanks()" class="login-button">Banks</button>
    <button v-if="getUser?.role_id === 1 || getUser?.role_id === 2" @click="editProfile()" class="login-button">Profile</button>
    <button v-if="getUser?.role_id === 2" @click="goToUsers()" class="login-button">Users</button>
      <button @click="goToLogin()" v-if="!isAuthenticated" class="login-button">Login</button>
      <button @click="goToRegister()" v-if="!isAuthenticated" class="login-button">Register</button>
      <button @click="goToLogout()" v-if="isAuthenticated" class="login-button">Logout</button>

    </div>

  </header>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import editProfile from "@/Users/editProfile.vue";

export default {
  name: "Header",
  computed: {

    ...mapGetters(['isAuthenticated']),
    ...mapGetters(['getUser']),

  },

  methods: {
    ...mapActions(['logout']),
    goToCars() {
      this.$router.push('/cars');
    },
    editProfile() {
      this.$router.push('/users/editProfile/' + this.getUser?.id);
    },
    goToUsers() {
      this.$router.push('/users');
    },
    goToBanks() {
      this.$router.push('/banks');
    },
    goToRentals() {
      this.$router.push('/rental');
    },
    goHome() {
      this.$router.push('/');
    },
    goToLogin() {
      this.$router.push('/login');
    },
    goToRegister() {
      this.$router.push('/register');
    },
    async goToLogout() {
      const confirmed = confirm("Are you sure you want to log out?");
      if (confirmed) {
        await this.logout();
        this.$router.push('/');
      }
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #6363cb;
  padding: 10px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 7%;
}

.button-container {
  display: flex;
  gap: 10px;
}


.title {
  margin: 0;
  color: white;
}

.login-button {
  padding: 10px 20px;
  cursor: pointer;
  box-shadow: none;
  border: none;
  color: white;
  background-color: #6363cb;
}

.greeting {
  margin: 0;
  padding: 10px 20px;
  font-size: 1.2em;
  color: white;
  border-radius: 5px;
}

</style>

