<!-- <script setup lang="ts">
import f_tableVue from './components/f_table.vue'
import signin from './components/SignIn.vue'
</script> -->

<!-- <template>
      <f_tableVue/>
   <router-v</v-app>iew/>
</template> -->

<template>
  <div class="table-container">
    <ReusableTable
      title="Danh sách người dùng"
      :headers="userHeaders"
      :items="userData"
      :items-per-page="5"
    />
  </div>
</template>

<script lang="ts">
import ReusableTable from './Components/test_table.vue'

export default {
  components: {
    ReusableTable,
  },
  data() {
    return {
      userHeaders: [
        // { title: 'ID', value: 'id' },
        { title: 'Tên', value: 'name' },
        { title: 'Email', value: 'email' },
        // Thêm các cột khác nếu cần
      ],
      userData: [
        { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com' },
        { id: 2, name: 'Trần Thị B', email: 'b@example.com' },
        // Thêm dữ liệu khác nếu cần
      ],
    }
  },
}
</script>

<style scoped>
.table-container :deep() .v-data-table tbody tr:hover {
  background-color: #ff0000;
  color: white;
}
</style>