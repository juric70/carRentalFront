<template>
  <div class="container" v-if="getUser?.role_id === 1 || getUser?.role_id === 2">
    <h1>Edit your profile</h1>

    <div class="form-container">
      <div class="detail-group">
        <label for="car">Name</label>
        <p id="car"> {{ getUser?.name }} </p>
      </div>

      <div  class="detail-group">
        <label for="model">Email</label>
        <p id="car"> {{ email}} </p>
      </div>




      <div  class="form-group">
        <label for="model">Phone</label>
        <input type="text" class="form-control" id="model" v-model="phone">
      </div>

      <div  class="form-group">
        <label for="model">Address</label>
        <input type="text" class="form-control" id="model" v-model="address">
      </div>

      <label for="city" >City</label>
      <select   class="form-control" id="city" v-model="selectedCity" >
        <option value="" selected>Select city</option>
        <option v-for="city in cities" :key="city.id" :value="city.id">
          {{ city.name }}
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
      selectedCity : null,
      cities: [],
      address: '',
      phone: '',
      email: '',
    };
  },

  computed: {
    ...mapGetters(["getUser"]),

  },

  created() {
    this.getCity();
    this.getUserData();
  },
  methods: {
async getUserData() {
  const response =  axios.get('/getUserProfile/' + this.$route.params.id).then((response) => {
    this.address = response.data.address
    this.phone = response.data.phone
    this.selectedCity = response.data.city_id
    this.email = response.data.email
  });
},
    async getCity() {
      const response = await axios.get('/api/cities/' );
      this.cities = response.data
    },

    async submitForm() {
      let data = {};

      data = {
        city_id: this.selectedCity,
        address: this.address,
        phone: this.phone
      };

      axios.put('/UpdateUserProfile/' + this.$route.params.id, data).then((response) => {

        this.$router.push('/');
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


.detail-group {
  width: 100%;
  margin-bottom: 20px;
}

.detail-group label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
}

.detail-group p {
  background-color: #f9f9f9;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
@media (min-width: 768px) {
  .form-container {
    max-width: 50%;
  }
}

</style>
