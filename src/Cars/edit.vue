<template>
  <div class="container" v-if="getUser?.role_id === 2">
    <h1>Edit Car</h1>

    <div class="form-container">

      <div class="form-group">

        <div  class="form-group">
          <label for="model">Model</label>
          <input type="text" class="form-control" id="model" v-model="model">
        </div>

        <div  class="form-group">
          <label for="brand">Brand</label>
          <input type="text" class="form-control" id="brand" v-model="brand">
        </div>

        <div  class="form-group">
          <label for="license_plate">License Plate</label>
          <input type="text" class="form-control" id="license_plate" v-model="license_plate">
        </div>

        <div  class="form-group">
          <label for="year">Year</label>
          <input type="text" class="form-control" id="year" v-model="year">
        </div>

        <div  class="form-group">
          <label for="color">Color</label>
          <input type="text" class="form-control" id="color" v-model="color">
        </div>

        <div  class="form-group">
          <label for="user">User</label>
          <select class="form-control" id="user" v-model="selectedUser" >
            <option value="" selected>Select user</option>
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.name }} - {{ user.email }}
            </option>
          </select>
        </div>


        <label for="customerService">Customer Service</label>
        <select class="form-control" id="customerService" v-model="selectedCustomerService" :disabled="showCustomerServiceForm">
          <option value="" selected>Select customer service</option>
          <option v-for="customerService in customerServices" :key="customerService.id" :value="customerService.id">
            {{ customerService.name }}
          </option>
        </select>

        <button class="btn btn-secondary" @click="showCustomerServiceForm = true" v-if="!showCustomerServiceForm">Add new customer service +</button>
      </div>
      <div v-if="showCustomerServiceForm" class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" v-model="newCustomerService.name">
      </div>
      <div v-if="showCustomerServiceForm" class="form-group">
        <label for="phone">Phone</label>
        <input type="text" class="form-control" id="phone" v-model="newCustomerService.phone">
      </div>
      <div v-if="showCustomerServiceForm" class="form-group">
        <label for="email">Email</label>
        <input type="text" class="form-control" id="email" v-model="newCustomerService.email">
      </div>
      <div v-if="showCustomerServiceForm" class="form-group">
        <label for="address">Address</label>
        <input type="text" class="form-control" id="address" v-model="newCustomerService.address">
      </div>

      <label for="city" v-if="showCustomerServiceForm">City</label>
      <select  v-if="showCustomerServiceForm" class="form-control" id="city" v-model="selectedCity" >
        <option value="" selected>Select city</option>
        <option v-for="city in citys" :key="city.id" :value="city.id">
          {{ city.name }}
        </option>
      </select>

      <div v-if="showCustomerServiceForm" class="form-group">
        <button class="btn btn-secondary" @click="closeForm">Cancel</button>
      </div>


      <button class="btn btn-secondary" @click="submitForm">Submitt form</button>


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
  name: "EditCar",
  data() {
    return {
      showCustomerServiceForm: false,
      brand: '',
      color: '',
      license_plate: '',
      model: '',
      year: '',
      selectedUser: null,
      selectedCustomerService: null,
      selectedCity: null,
      newCustomerService: {
        name: '',
        email: '',
        address: '',
        city_id: null

      },
      users:[],
      customerServices: [],
      citys: [],



    };
  },
  created() {
    this.getData();
    this.getDataForCar();
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    getDataForCar() {
      axios.get('/api/cars/' + this.$route.params.id).then((response) => {
        this.brand = response.data.brand;
        this.color = response.data.color;
        this.license_plate = response.data.license_plate;
        this.model = response.data.model;
        this.year = response.data.year;
        this.selectedUser = response.data.user_id;
        this.selectedCustomerService = response.data.customer_service_id;
        this.selectedCity = response.data.city_id;
      })

    },
    closeForm() {
      this.showCustomerServiceForm = false;
      this.newCustomerService = {
        name: '',
        email: '',
        address: '',
      };
    },
    async getData() {
      axios.get('/api/getForCarCreate').then((response) => {
        this.users = response.data.users;
        this.customerServices = response.data.customerServices;
        this.citys = response.data.city;
      });
    },
    async submitForm() {
      let data = {};

      if (this.newCustomerService.name !== '' ) {
        this.newCustomerService.city_id = this.selectedCity;
        data = {
          customer_service: this.newCustomerService,
          brand: this.brand,
          color: this.color,
          license_plate: this.license_plate,
          model: this.model,
          year: this.year,
          user_id: this.selectedUser
        };
      } else {
        console.log('tu');
        data = {
          customer_service_id: this.selectedCustomerService,
          brand: this.brand,
          color: this.color,
          license_plate: this.license_plate,
          model: this.model,
          year: this.year,
          user_id: this.selectedUser
        };
      }
      axios.put('/api/cars/' + this.$route.params.id , data).then((response) => {
        console.log(response);
        this.$router.push('/cars');
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
