<template>
  <div class="container">
    <button class="goBack" @click="goBack()">Go Back</button>
    <h1>Car Details</h1>
    <button  v-if="getUser?.role_id === 2" class="create-button editDel" @click="editItem()">Edit</button>
    <button  v-if="getUser?.role_id === 2" class="create-button editDel" @click="deleteItem()">Delete</button>
    <div class="details-container">
      <div class="detail-group">
        <label for="car">Model</label>
        <p id="car"> {{ car.model }} </p>
      </div>
      <div class="detail-group">
        <label for="bank">Brand</label>
        <p id="bank">{{ car.brand }}</p>
      </div>
      <div class="detail-group">
        <label for="bank">Year</label>
        <p id="bank">{{ car.year }} €</p>
      </div>


      <div class="detail-group">
        <label for="user">Color</label>
        <p id="user">{{ car.color }}</p>
      </div>

      <div class="detail-group">
        <label for="start_date">License plate</label>
        <p id="start_date">{{ car.license_plate }}</p>
      </div>
      <div class="detail-group">
        <label for="end_date">Owner</label>
        <p id="end_date">{{ car.user?.name }}</p>
      </div>
      <div class="detail-group">
        <label for="status">Customer support name</label>
        <p id="status">{{ car.customer_service?.name }}</p>
      </div>
      <div class="detail-group">
        <label for="status">Customer support phone</label>
        <p id="status">{{ car.customer_service?.phone }}</p>
      </div>
      <div class="detail-group">
        <label for="status">Customer support email</label>
        <p id="status">{{ car.customer_service?.email }}</p>
      </div>
      <div class="detail-group">
        <label for="status">Customer support address</label>
        <p id="status">{{ car.customer_service?.address }}</p>
      </div>
      <div class="detail-group">
        <label for="status">Customer support address</label>
        <p id="status">{{ car.customer_service?.city?.name }}</p>
      </div>


    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "CarsShow",
  data() {
    return {
      car: {
        car: {},
        bill: {
          bank: {},
          user: {},
        }
      },
    };
  },
  mounted() {
    this.fetchcarDetails();
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    editItem() {
      this.$router.push(`/cars/edit/${this.car.id}`);
    },
    deleteItem() {

      const confirmed = confirm("Are you sure you want to delete this car?");
      if (confirmed) {
        axios.delete(`/api/cars/${this.car.id}`).then(() => {

          this.$router.push(`/cars`);

        });
      }
    },
    async fetchcarDetails() {
      const carId = this.$route.params.id;
      try {
        const response = await axios.get(`/api/cars/${carId}`);
        this.car = response.data;
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    },
  },
};
</script>

<style scoped>
.create-button{
  border: #6363cb 2px solid;
  color: #6363cb;
  width: 300px;
}
.editDel{
  padding: 10px;
  border-radius:7px ;
  margin-right:10px;
  margin-bottom: 10px;
}

.container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 60px;
}

.details-container {
  width: 100%;
  max-width: 50%;
  display: flex;
  flex-direction: column;
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
.goBack{


  border: #6363cb 2px solid;
  border-radius: 5px;
  padding: 5px;
  color: #6363cb;
  width: 100px;
}

@media (min-width: 768px) {
  .details-container {
    max-width: 50%;
  }
}
</style>
