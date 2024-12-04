<template>
  <div class="container" v-if="getUser?.role_id === 1 || getUser?.role_id === 2">
    <h1>Create new Bank</h1>

    <div class="form-container">



        <div class="form-group">
          <label for="model">Name</label>
          <input type="text" class="form-control" id="model" v-model="name">
        </div>

        <div class="form-group">
          <label for="brand">Code</label>
          <input type="text" class="form-control" id="brand" v-model="code">
        </div>

        <div class="form-group">
          <label for="license_plate">
            Expiry date
          </label>
          <input type="date" class="form-control" id="license_plate" v-model="expiry_date">
        </div>

        <div class="form-group">
          <label for="year">cvv</label>
          <input type="text" class="form-control" id="year" v-model="cvv">
        </div>


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
  name: "CreateBank",
  data() {
    return {
      name: '',
      code: '',
      expiry_date: '',
      cvv: '',
      user_id: null


    };
  },

  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {


    async submitForm() {
      let data = {};



        data = {
          name: this.name,
          code: this.code,
          expiry_date: this.expiry_date,
          cvv: this.cvv,
          user_id: this.getUser.id
        };

      axios.post('/api/banks', data).then((response) => {
        console.log(response);
        this.$router.push('/banks');
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
