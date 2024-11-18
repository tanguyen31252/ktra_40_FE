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
      :title="tableTitle"
      :headers="userHeaders"
      :items="userData"
      :item-fields="userFields"
      :items-per-page="5"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ReusableTable from './Components/test_table.vue'

export default defineComponent({
  name: 'UserList',
  components: {
    ReusableTable,
  },
  data() {
    return {
      tableTitle: 'Danh sách người dùng',
      userHeaders: [
        { title: 'Tên', value: 'name', sortable: true },
        { title: 'Email', value: 'email', sortable: true },
        // Thêm các cột khác nếu cần
      ],
      userData: [
        { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com', deleted: false },
        { id: 2, name: 'Trần Thị B', email: 'b@example.com', deleted: false },
        // Thêm dữ liệu khác nếu cần
      ],
      userFields: [
        { text: 'Tên', value: 'name' },
        { text: 'Email', value: 'email' },
        // Thêm các field khác nếu cần
      ],
    }
  },
})
</script>

<style scoped>
.table-container {
  /* Add any specific styles if necessary */
}
</style>