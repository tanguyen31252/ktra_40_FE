<template>
  <div class="table-container">
    <!-- Bảng Kệ Sách -->
    <div class="table-KeSach">
      <v-btn color="primary" @click="addShelf">Thêm Kệ Mới</v-btn>
      <ReusableTable :title="tableTitle" :headers="userHeaders" :items="filteredItems" :item-fields="userFields"
        :items-per-page="5" @row-click="openRowDialog" @add-shelf="addShelf" @delete-shelf="deleteShelf"
        @edit-shelf="editShelf" />

      <!-- Dialog for displaying row click details (Kệ Sách) -->
      <v-dialog v-model="rowDialog" max-width="500px">
        <v-card>
          <v-card-title class="headline">Thông tin chi tiết (Kệ Sách)</v-card-title>
          <v-card-text>
            <p>{{ selectedItem }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeRowDialog">Đóng</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Dialog for adding/editing shelf -->
      <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
          <v-card-title class="text-h5">{{ isEditing ? 'Chỉnh sửa kệ sách' : 'Thêm kệ sách' }}</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field v-model="editedShelf.so_luong_loai_sach" label="Số lượng loại sách"
                type="number"></v-text-field>
              <v-select v-model="editedShelf.tinh_trang" :items="['Trống', 'Đầy']" label="Tình trạng"></v-select>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="closeDialog">Hủy</v-btn>
            <v-btn @click="saveChanges">Lưu</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div class="table-LoaiSach">
      <!-- Bảng Loại Sách -->
      <ReusableTable :title="'Loại Sách'" :headers="userHeadersLoai" :items="userData" :item-fields="userFieldsLoai"
        :items-per-page="5" @row-click="openRowDialogLoai" />

      <!-- Dialog for displaying row click details (Loại Sách) -->
      <v-dialog v-model="rowDialogLoai" max-width="500px">
        <v-card>
          <v-card-title class="headline">Thông tin chi tiết (Loại Sách)</v-card-title>
          <v-card-text>
            <p>{{ selectedItemLoai }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeRowDialogLoai">Đóng</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import ReusableTable from '../components/TestTable.vue';

export default defineComponent({
  name: 'ShelfList',
  components: {
    ReusableTable,
  },
  data() {
    return {
      tableTitle: 'Danh Sách Kệ Sách',
      userHeaders: [
        { title: 'Mã kệ', align: 'center', value: 'id_ke', sortable: true },
        { title: 'Số lượng loại sách', align: 'center', value: 'so_luong_loai_sach', sortable: true },
        { title: 'Tình trạng', align: 'center', value: 'tinh_trang', sortable: true },
      ],
      userFields: [
        { text: 'Mã kệ', value: 'id_ke' },
        { text: 'Số lượng loại sách', value: 'so_luong_loai_sach' },
        { text: 'Tình trạng', value: 'tinh_trang' },
      ],
      userHeadersLoai: [
        { title: 'Loại ', align: 'center', value: 'the_loai_id', sortable: true },
        { title: 'Tên Thể Loại', align: 'center', value: 'ten_the_loai', sortable: true },
        { title: 'Số Lượng Sách', align: 'center', value: 'so_luong_sach', sortable: true },
        { title: 'Kệ', align: 'center', value: 'id_ke', sortable: true },
      ],
      userFieldsLoai: [
        { text: 'Loại', value: 'the_loai_id' },
        { text: 'Tên Thể Loại', value: 'ten_the_loai' },
        { text: 'Số Lượng Sách', value: 'so_luong_sach' },
        { text: 'Kệ', value: 'id_ke' },
      ],
      userData: JSON.parse(localStorage.getItem('LoaiData') || '[]'),
      rowDialog: false,
      selectedItem: {},
      rowDialogLoai: false,
      selectedItemLoai: {},
      dialog: false,
      editedShelf: { id_ke: 0, so_luong_loai_sach: 0, tinh_trang: 'Trống', isActive: true },
      isEditing: false,
      shelves: JSON.parse(localStorage.getItem('bookShelves') || '[]'),
    };
  },
  computed: {
    filteredItems() {
      return this.shelves.filter((item) => item.isActive);
    },
  },
  methods: {
    openRowDialog(item) {
      this.selectedItem = item;
      this.rowDialog = true;
    },
    closeRowDialog() {
      this.rowDialog = false;
      this.selectedItem = {};
    },
    openRowDialogLoai(item) {
      this.selectedItemLoai = item;
      this.rowDialogLoai = true;
    },
    closeRowDialogLoai() {
      this.rowDialogLoai = false;
      this.selectedItemLoai = {};
    },
    addShelf() {
      const existingIds = this.shelves.map((item) => item.id_ke);
      let newId = 1;
      while (existingIds.includes(newId)) {
        newId++;
      }
      this.editedShelf = { id_ke: newId, so_luong_loai_sach: 0, tinh_trang: 'Trống', isActive: true };
      this.dialog = true; // Show dialog to add new shelf
    },
    deleteShelf(item) {
      const index = this.shelves.findIndex((i) => i.id_ke === item.id_ke);
      if (index !== -1) {
        this.shelves[index].isActive = false;
        this.saveShelvesToLocalStorage();
      }
    },
    editShelf(item) {
      this.isEditing = true;
      this.editedShelf = { ...item };
      this.dialog = true; // Show dialog for editing
    },
    closeDialog() {
      this.dialog = false;
      this.editedShelf = { id_ke: 0, so_luong_loai_sach: 0, tinh_trang: 'Trống', isActive: true };
      this.isEditing = false;
    },
    saveChanges() {   
      if (this.editedShelf) {
        if (this.isEditing) {
          const index = this.shelves.findIndex((item) => item.id_ke === this.editedShelf.id_ke);
          if (index !== -1) {
            this.shelves[index] = { ...this.editedShelf };
          }
        } else {
          this.shelves.push({ ...this.editedShelf });
        }
        this.saveShelvesToLocalStorage();
        this.closeDialog();
      }
    },
    saveShelvesToLocalStorage() {
      localStorage.setItem('bookShelves', JSON.stringify(this.shelves));
    },
  },
});
</script>

<style scoped>
.table-container {
  padding: 20px;
}
</style>

<style>
.table-container{
  display: flex;
  flex-wrap: wrap;
}
</style>
