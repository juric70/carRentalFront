<template>
  <div class="container" v-if="getUser.role_id === 2">
    <h1>Users</h1>
    <table class="table">
      <thead>
      <tr style="color: #6363cb;">

        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Address</th>
        <th>City</th>
        <th>Role</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.phone }}</td>

        <td>{{ user.address }}</td>
        <td>{{ user.city?.name }}</td>
        <td>{{ user.role?.name }}</td>

        <td>
          <button v-if="getUser?.role_id === 2" @click="editItem(user)" class="editDel" style="border: #6363cb 2px solid; color: #6363cb;">EditRole</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="container" v-else>
    <h1>Access Denied</h1>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "usersIndex",
  data() {
    return {
      users: [],
    }
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  mounted() {
    this.getusers()
  },
  methods: {
    async getusers() {
      axios.get('/showAllUsers' ).then((response) => {
        this.users = response.data
      })
    },
    editItem(item) {
      this.$router.push(`/users/editRole/${item.id}`);
    },showMore(item) {
      this.$router.push(`/users/${item.id}`);
    },
    createItem() {
      this.$router.push('/users/create');
    },
    deleteItem(item) {
      const confirmed = confirm("Are you sure you want to delete this bank?");
      if (confirmed) {
        axios.delete(`/api/users/${item.id}`).then(() => {
          this.getusers();
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