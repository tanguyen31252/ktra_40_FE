<template>
  <div class="table-container">
    <ReusableTable :title="tableTitle" :headers="userHeaders" :items="userData" :item-fields="userFields"
      :items-per-page="5" :enable-add-to-cart="true" @row-click="handleRowClick" :item-class="getItemClass" />

    <!-- Dialog for displaying row click details -->
    <v-dialog v-model="rowDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Thông tin chi tiết</v-card-title>
        <v-card-text>
          <p>{{ selectedItem }}</p> <!-- Hiển thị thông tin chi tiết của mục đã chọn -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeRowDialog">Đóng</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ReusableTable from '../components/TestTable.vue';

const nhomTaiSanSelected = ref(null);

const getItemClass = (it: any) => {
  return nhomTaiSanSelected.value && nhomTaiSanSelected.value.id === it.id
    ? 'blue lighten-5 font-weight-medium'
    : 'cursor-pointer';
};

const handleRowClick = (it: any) => {
  nhomTaiSanSelected.value = it;
  console.log(nhomTaiSanSelected);
};

export default defineComponent({
  name: 'UserList',
  components: {
    ReusableTable,
  },
  data() {
    return {
      getItemClass,
      handleRowClick,
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
      rowDialog: false,
      selectedItem: {},
    };
  },
  methods: {
    openRowDialog(item) {
      console.log(getItemClass);
      this.selectedItem = this.userData;
      this.rowDialog = true;
    },
    closeRowDialog() {
      this.rowDialog = false;
      this.selectedItem = {};
    }
  }
});
</script>

<style scoped>
.table-container {
  /* Add any specific styles if necessary */
}
</style>