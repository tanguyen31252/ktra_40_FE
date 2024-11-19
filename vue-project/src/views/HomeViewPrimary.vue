<template>
  <div class="table-container">
    <div class="table-KeSach">
      <ReusableTable
        :title="KeSachTitle"
        :headers="KeSachHeaders"
        :items="KeSachData"
        :item-fields="KeSachField"
        :items-per-page="5"
        :enable-add-to-cart="true"
        @row-click="openRowDialog"
      />

      <!-- Dialog for displaying row click details -->
      <v-dialog v-model="rowDialog" max-width="500px">
        <v-card>
          <v-card-title class="headline">Thông tin chi tiết</v-card-title>
          <v-card-text>
            <p>{{ selectedItem }}</p>
            <!-- Hiển thị thông tin chi tiết của mục đã chọn -->
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeRowDialog">Đóng</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div class="table-LoaiSach">
      <ReusableTable
        :title="LoaiSachTitle"
        :headers="LoaiSachHeaders"
        :items="LoaiSachData"
        :item-fields="LoaiSachField"
        :items-per-page="5"
        :enable-add-to-cart="true"
        @row-click="openRowDialog"
      />

      <!-- Dialog for displaying row click details -->
      <v-dialog v-model="rowDialog" max-width="500px">
        <v-card>
          <v-card-title class="headline">Thông tin chi tiết</v-card-title>
          <v-card-text>
            <p>{{ selectedItem }}</p>
            <!-- Hiển thị thông tin chi tiết của mục đã chọn -->
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeRowDialog">Đóng</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ReusableTable from '../components/TestTable.vue'

export default defineComponent({
  name: 'UserList',
  components: {
    ReusableTable,
  },
  data() {
    return {
      LoaiSachTitle: 'Loại sách',
      LoaiSachHeaders: [
        { title: 'Loại ', align: 'center', value: 'the_loai_id', sortable: true },
        { title: 'Tên Thể Loại', align: 'center', value: 'ten_the_loai', sortable: true },
        { title: 'Số Lượng Sách', align: 'center', value: 'so_luong_sach', sortable: true },
        { title: 'Kệ', align: 'center', value: 'id_ke', sortable: true },
      ],
      LoaiSachData: JSON.parse(localStorage.getItem('LoaiData') || '[]'),
      LoaiSachField: [
        { text: 'Loại', value: 'the_loai_id' },
        { text: 'Tên Thể Loại', value: 'ten_the_loai' },
        { text: 'Số Lượng Sách', value: 'so_luong_sach' },
        { text: 'Kệ', value: 'id_ke' },
      ],
      KeSachTitle: 'Kệ sách',
      KeSachHeaders: [
        { title: 'Loại ', align: 'center', value: 'id_ke', sortable: true },
        { title: 'Tên Thể Loại', align: 'center', value: 'sl_loai', sortable: true },
        // { title: 'Số Lượng Sách', align: 'center', value: 'so_luong_sach', sortable: true },
        // { title: 'Kệ', align: 'center', value: 'id_ke', sortable: true },
      ],
      KeSachData: JSON.parse(localStorage.getItem('keData') || '[]'),
      KeSachField: [
        { text: 'Loại', value: 'id_ke' },
        { text: 'Tên Thể Loại', value: 'sl_loai' },
        // { text: 'Số Lượng Sách', value: 'so_luong_sach' },
        // { text: 'Kệ', value: 'id_ke' },
      ],
      rowDialog: false,
      selectedItem: {},
    }
  },
  computed: {
    filteredItems() {
      if (!this.search) {
        return this.LoaiSachData
      }
      return this.LoaiSachData.filter((item) =>
        Object.values(item).join(' ').toLowerCase().includes(this.search.toLowerCase()),
      )
    },
  },
  methods: {
    openRowDialog(item) {
      this.selectedItem = item
      this.rowDialog = true
    },
    closeRowDialog() {
      this.rowDialog = false
      this.selectedItem = {}
    },
  },
})
</script>

<style>
table {
  table-layout: fixed;
  /* Giữ kích thước cố định cho các ô */
  border-collapse: collapse;
  /* Loại bỏ khoảng cách giữa các ô */
}

th:nth-child(1),
td:nth-child(1) {
  width: 15%;
  /* Kích thước cột 1 */
}

th:nth-child(2),
td:nth-child(2) {
  width: 35%;
  /* Kích thước cột 2 */
}

th:nth-child(3),
td:nth-child(3) {
  width: 15%;
  /* Kích thước cột 3 */
}

th:nth-child(4),
td:nth-child(4) {
  width: 15%;
  /* Kích thước cột 3 */
}

th:nth-child(5),
td:nth-child(5) {
  width: 20%;
  /* Kích thước cột 5 */
}

th,
td {
  border: 1px solid #ddd;
  /* Đường viền ô */
  padding: 8px;
  /* Khoảng cách trong ô */
  word-wrap: break-word;
  /* Ngắt dòng nếu quá dài */
}

.table-container {
  display: flex;
  justify-content: space-between; /* Căn bảng về hai bên trái và phải */
  align-items: flex-start; /* Căn theo đỉnh màn hình */
  padding: 20px; /* Thêm khoảng trống xung quanh */
  
  box-sizing: border-box; /* Đảm bảo padding không ảnh hưởng kích thước */
}

.table-KeSach,
.table-LoaiSach {
  width: 48%; /* Chiều rộng mỗi bảng là 48% màn hình, để có khoảng cách giữa hai bảng */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Hiệu ứng bóng đổ cho bảng */
  border-radius: 20px; /* Bo tròn góc bảng */
  padding: 10px; /* Khoảng cách bên trong bảng */
  background-color: #fff; /* Màu nền bảng */
}

.table-KeSach {
  margin-right: 10px; /* Khoảng cách giữa bảng bên trái và bảng bên phải */
}

.table-LoaiSach {
  margin-left: 10px; /* Khoảng cách giữa bảng bên phải và bảng bên trái */
}

.v-card {
  width: 100%; /* Đảm bảo bảng chiếm toàn bộ chiều rộng của thẻ cha */
}



</style>
