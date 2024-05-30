<template>
  <header class="header">
    <h1 class="title" >CAR RENTAL</h1>
    <button class="login-button">Login</button>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {}
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #6363cb; /* Change the background color to blue */
  padding: 10px; /* Reduce the padding */
  position: fixed; /* Make the header fixed */
  width: 100%; /* Make the header full width */
  top: 0; /* Position the header at the top */
  left: 0; /* Position the header at the left */
  z-index: 1000; /* Ensure the header is above other elements */
  height: 7%;
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
</style>    