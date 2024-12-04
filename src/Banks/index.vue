<template>
  <div class="container">
    <h1>Banks</h1>
    <button v-if="getUser?.role_id === 2 || getUser?.role_id === 1" class="create-button editDel" @click="createItem()">+ Create +</button>
    <table class="table">
      <thead>
      <tr style="color: #6363cb;">

        <th>Name</th>
        <th>Code</th>
        <th>Expiry Date</th>
        <th>CVV</th>
        

        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="bank in banks" :key="bank.id">
        <td>{{ bank.name }}</td>
        <td>{{ bank.code }}</td>
        <td>{{ bank.expiry_date }}</td>

        <td>{{ bank.cvv }}</td>

        <td>

          <button v-if="getUser?.role_id === 1" @click="editItem(bank)" class="editDel" style="border: #6363cb 2px solid; color: #6363cb;">Edit</button>
          <button v-if="getUser?.role_id === 2"  @click="deleteItem(bank)" class="editDel" style="border: red 2px solid;color: red;">Delete</button>
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
  name: "banksIndex",
  data() {
    return {
      banks: [],
    }
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  mounted() {
    this.getbanks()
  },
  methods: {
    async getbanks() {
      axios.get('/api/banks/' + this.getUser.id).then((response) => {
        this.banks = response.data
      })
    },
    editItem(item) {
      this.$router.push(`/banks/edit/${item.id}`);
    },showMore(item) {
      this.$router.push(`/banks/${item.id}`);
    },
    createItem() {
      this.$router.push('/banks/create');
    },
    deleteItem(item) {
      const confirmed = confirm("Are you sure you want to delete this bank?");
      if (confirmed) {
        axios.delete(`/api/banks/${item.id}`).then(() => {
          this.getbanks();
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