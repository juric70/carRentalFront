<template>
  <div class="container" v-if="getUser?.role_id === 1 || getUser?.role_id === 2">
    <h1>Edit user role</h1>

    <div class="form-container">

      <div class="form-group">
        <label for="model">For user: {{getUser?.neme}} edit role</label>
      </div>

      <label for="city" >Role</label>
      <select class="form-control" id="city" v-model="selectedRole" >
        <option value="" selected>Select role</option>
        <option v-for="role in roles" :key="role.id" :value="role.id">
          {{ role.name }}
        </option>
      </select>


      <button class="btn btn-secondary" @click="submitForm">Submit form</button>

    </div>
  </div>

  <div class="container" v-else>
    <h1>Access denied</h1>
  </div>

</template>

<script>
import axios from "axios";
import {mapGetters} from "vuex";

export default {
  name: "editRole",
  data() {
    return {
      name: '',
      code: '',
      expiry_date: '',
      cvv: '',
      user_id: null,
      roles: [],
      selectedRole: null


    };
  },

  computed: {
    ...mapGetters(["getUser"]),
  },

  created() {
    this.getRole();
  },
  methods: {

    async getRole() {
      const response = await axios.get('/api/roles/' );
      this.roles = response.data
    },

    async submitForm() {
      let data = {};



      data = {
        role_id: this.selectedRole
      };

      axios.put('/UpdateUserRole/' + this.$route.params.id, data).then((response) => {

        this.$router.push('/users');
      });

    },


  },
};
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 60px;
}

.form-container {
  width: 100%;
  max-width: 50%;
}

.form-group {
  width: 100%;
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 7px;
  border: 1px solid #6363cb;
  border-radius: 5px;
}

.btn {
  width: 100%;
  padding: 7px 20px;
  border: 1.5px solid #6363cb;
  border-radius: 5px;
  margin-top: 10px;
}

@media (min-width: 768px) {
  .form-container {
    max-width: 50%;
  }
}

</style>
