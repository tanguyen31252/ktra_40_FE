<script setup lang="ts">
// import ls_tableVue from './components/ls_table.vue'
// import signin from './components/SignIn.vue'
import TestView from './views/TestView.vue'
import kesach from './views/kesach.vue';
</script> 


 <template>
   <router-view />
</template> 
<!-- <template>
  <div class="table-container">
    <ReusableTable
      :title="tableTitle"
      :headers="userHeaders"
      :items="userData"
      :item-fields="userFields"
      :items-per-page="5"
      :enable-add-to-cart="true"
    />
  </div>
</template>
 <script lang="ts">
import { defineComponent } from 'vue'
import ReusableTable from './components/TestTable.vue'

export default defineComponent({
  name: 'UserList',
  components: {
    ReusableTable,
  },
  data() {
    return {
      tableTitle: 'Danh sách Kệ',
      userHeaders: [
        { title: 'Kệ', align: 'center', value: 'id_ke', sortable: true },
        { title: 'Số lượng loại', align: 'center', value: 'sl_loai', sortable: true },
        { title: 'Tình trạng', align: 'center', value: 'is_full', sortable: true },
        // Thêm các cột khác nếu cần
      ],
      userData: [
        { id_ke: 1, sl_loai: 5, is_full: 'Đã đầy' },
        { id_ke: 2, sl_loai: 4, is_full: 'Đã đầy' },
        { id_ke: 3, sl_loai: 0, is_full: 'Còn chỗ' },
        { id_ke: 4, sl_loai: 0, is_full: 'Còn chỗ' },
    ],
    userFields: [
        { text: 'Kệ', value: 'id_ke' },
        { text: 'Số lượng loại', value: 'sl_loai' },
        { text: 'Tình trạng',value:'is_full'},
    ],
     
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
</script> -->


<!-- <style scoped>
.table-container {
  /* Add any specific styles if necessary */
}
</style> -->

<!-- Script riêng của Bảo Anh, không sài nhưng đừng xoá !!!, để gọi ra thôi -->

<!-- <template>
  <div class="table-container">
    <ReusableTable :title="tableTitle" :headers="userHeaders" :items="userData" :item-fields="userFields"
      :items-per-page="5" :enable-add-to-cart="true" />
  </div>
</template>
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
  }, -->
<!-- // })
//  </script> -->
// <!-- <script setup lang="ts">
// import f_tableVue from './components/f_table.vue'
// // import signin from './components/SignIn.vue'
// </script>

// <template>
//       <f_tableVue/>
// </template> -->
<!-- // </script>
 -->

<!-- <template>
  <div class="table-container">
    <ReusableTable :title="tableTitle" :headers="userHeaders" :items="userData" :item-fields="userFields"
      :items-per-page="5" :enable-add-to-cart="true" />
  </div>
</template>

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
        // Dữ liệu thực tế của bạn sẽ ở đây
      ],
      userFields: [
        // Các trường dữ liệu khác nếu cần
      ],
    }
  },
})
</script>

<style scoped>
.table-container {
  padding: 20px;
}
</style> -->
