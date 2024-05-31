<template>
  <div class="container">
    <h1>Cars</h1>
    <button v-if="getUser?.role_id === 2" class="create-button editDel" @click="createItem()">+ Create +</button>
    <table class="table">
      <thead>
      <tr style="color: #6363cb;">
        <th>ID</th>
        <th>Brand</th>
        <th>Model</th>
        <th>Customer service</th>
        <th>License plate</th>
        <th>Year</th>
        <th>Color</th>
        <th>Owner</th>

        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="car in cars" :key="car.id">
        <td>{{ car.id }}</td>
        <td>{{ car.brand }}</td>
        <td>{{ car.model }}</td>
        <td v-if="car.customer_service !== null"> {{ car.customer_service?.phone }} ({{ car.customer_service?.name}})</td>
        <td v-else></td>
        <td>{{ car.license_plate }}</td>
        <td>{{ car.year }}</td>
        <td>{{ car.color }}</td>
        <td>{{ car.user.name }}</td>
        <td>

          <button @click="showMore(car)" class="editDel" style="border: #6363cb 2px solid; color: #6363cb;">Show more</button>
          <button v-if="getUser?.role_id === 2" @click="editItem(car)" class="editDel" style="border: #6363cb 2px solid; color: #6363cb;">Edit</button>
          <button v-if="getUser?.role_id === 2"  @click="deleteItem(car)" class="editDel" style="border: red 2px solid;color: red;">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "Cars Index",
  data() {
    return {
      cars: [],
    }
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  mounted() {
    this.getcars()
  },
  methods: {
    async getcars() {
      axios.get('/api/carsAll').then((response) => {
        this.cars = response.data
      })
    },
    editItem(item) {
      this.$router.push(`/cars/edit/${item.id}`);
    },showMore(item) {
      this.$router.push(`/cars/${item.id}`);
    },
    createItem() {
      this.$router.push('/cars/create');
    },
    deleteItem(item) {
      const confirmed = confirm("Are you sure you want to delete this car?");
      if (confirmed) {
        axios.delete(`/api/cars/${item.id}`).then(() => {
          this.getcars();
        });
      }

    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
}

.table {
  width: 80%;
  margin-top: 20px;
  border-collapse: collapse;
}
.table th {
  border-bottom: 2px solid #6363cb;
  background-color: #ececf9;
  text-align: left;
}
.table td, .table th {
  padding: 10px 0;
}

.table td {
  border-top: 1px solid #6363cb;
  border-bottom: 1px solid #6363cb;
}

.table tr:last-child td {
  border-bottom: none;
}
.editDel{
  padding: 10px;
  border-radius:7px ;
  margin-right:10px;
}
.create-button{
  border: #6363cb 2px solid;
  color: #6363cb;
  width: 300px;
}
</style>