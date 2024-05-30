<template>
  <div class="container">
    <h1>Rental Edit</h1>
    <div class="form-container">
      <div class="form-group">
        <label for="car">Car</label>
        <select class="form-control" id="car" v-model="selectedCar">
          <option disabled value="">Select car</option>
          <option v-for="car in cars" :key="car.id" :value="car.id">
            {{ car.brand }} - {{ car.model }}({{ car.year }})
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="bank">Bank</label>
        <select class="form-control" id="bank" v-model="selectedBank">
          <option disabled value="">Select bank</option>
          <option v-for="bank in banks" :key="bank.id" :value="bank.id">
            {{ bank.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="start_date">Start date</label>
        <input type="date" class="form-control" id="start_date" v-model="start_date">
      </div>

      <div class="form-group">
        <label for="end_date">End date</label>
        <input type="date" class="form-control" id="end_date" v-model="end_date">
      </div>

      <div class="form-group">
        <label for="total">Total €</label>
        <input type="number" class="form-control" id="total" v-model="total">
      </div>

      <div class="form-group">
        <label for="status">Status</label>
        <select class="form-control" id="status" v-model="status">
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
          <option value="refunded">Refunded</option>
          <option value="expired">Expired</option>
          <option value="rejected">Rejected</option>
          <option value="waiting">Waiting</option>          
        </select>
      </div>

      <button class="btn btn-secondary" @click="submitForm">Update</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "edit",
  data() {
    return {
      cars: [],
      banks: [],
      selectedCar: null,
      selectedBank: null,
      start_date: '',
      end_date: '',
      total: '',
      status: ''
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      axios.get('/api/getForEdit').then((response) => {
        this.cars = response.data.cars;
        this.banks = response.data.banks;
        // Ovdje možete implementirati logiku za postavljanje prethodno odabranih vrijednosti za uređivanje računa
      });
    },
    async submitForm() {
      const data = {
        car_id: this.selectedCar,
        bank_id: this.selectedBank,
        start_date: this.start_date,
        end_date: this.end_date,
        total: this.total,
        status: this.status
      };
      // Ovdje implementirajte logiku za slanje uređenih podataka putem HTTP zahtjeva
      axios.put(`/api/rentals/${rentalId}`, data).then((response) => {
        console.log(response);
        // Ovdje možete implementirati redirekciju na odgovarajuću stranicu nakon ažuriranja
      });
    }
  }
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
