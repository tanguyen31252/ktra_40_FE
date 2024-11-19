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
     
    }
  },
})
</script> -->
<!-- <script setup lang="ts">
import f_tableVue from './components/f_table.vue'
// import signin from './components/SignIn.vue'
</script>

<template>
      <f_tableVue/>
</template> -->