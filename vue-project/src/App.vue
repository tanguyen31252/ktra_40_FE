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
    <ReusableTable :title="tableTitle" :headers="userHeaders" :items="userData" :item-fields="userFields"
      :items-per-page="5" />
  </div>
</template>


<!-- Script của Nguyên!!, Bảo Anh khoá lại 18/11 -->
<script lang="ts">
import { defineComponent } from 'vue'
import ReusableTable from './Components/TestTable.vue'

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


<!-- <style scoped>
.table-container {
  /* Add any specific styles if necessary */
}
</style> -->

<!-- Script riêng của Bảo Anh, không sài nhưng đừng xoá !!!, để gọi ra thôi
<script lang="ts">
import { defineComponent } from 'vue'
import ReusableTable from './views/kesach.vue'

export default defineComponent({
  name: 'UserList',
  components: {
    ReusableTable,
  },
  data() {
    return {
      tableTitle: 'Kệ sách',
      userHeaders: [
        { title: 'Mã kệ', value: 'id_ke', sortable: true },
        { title: 'Số lượng loại sách', value: 'num_loaisach', sortable: true },
        { title: 'Tình trạng', value: 'update', sortable: true },
        // Thêm các cột khác nếu cần
      ],
      userData: [
        // Thêm dữ liệu khác nếu cần
      ],
      userFields: [
        // Thêm các field khác nếu cần
    ],
    }
  },
})
</script> -->