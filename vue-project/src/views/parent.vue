<template>
  <v-row no-gutters>
    <!-- Bảng Kệ Sách -->
    <v-col :cols="12" :md="6" align-self="auto">
      <v-sheet class="pa-2 ma-2">
        <div class="table-wrapper">
          <ReusableTable
            :title="'Kệ sách'"
            :headers="KeSachHeaders"
            :items="filterKeSachItems"
            :itemFields="KeSachField"
            :items-per-page="5"
            @update-item="updateKeSachItem"
            @delete-item="deleteKeSachItem"
            @row-click="handleRowClickKeSach"
          />
        </div>
      </v-sheet>
    </v-col>
    <!-- Bảng Loại Sách -->
    <v-col :cols="12" :md="6">
      <v-sheet class="pa-2 ma-2">
        <div class="table-wrapper">
          <ReusableTable
            :title="'Loại Sách'"
            :headers="LoaiSachHeaders"
            :items="filteredLoaiSachItems"
            :itemFields="LoaiSachField"
            :items-per-page="5"
            @update-item="updateLoaiSachItem"
            @delete-item="deleteLoaiSachItem"
            @row-click="openRowDialog"
          />
        </div>
      </v-sheet>
    </v-col>
  </v-row>

  <!-- Dialog for displaying row click details (Kệ Sách) -->
  <v-dialog v-model="rowDialog" max-width="auto">
    <v-card>
      <v-card-title class="d-flex justify-end">
        <v-btn icon small color="red" dark @click="closeRowDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <ReusableTable
          :title="'Sách'"
          :headers="SachHeaders"
          :items="filteredSachItems"
          :itemFields="SachField"
          :items-per-page="5"
          @update-item="updateSachItem"
          @delete-item="deleteSachItem"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ReusableTable from '../components/TestTable.vue';

export default defineComponent({
  name: 'ShelfList',
  components: {
    ReusableTable,
  },
  data() {
    return {
      KeSachHeaders: [
        { title: 'Mã kệ', align: 'center', value: 'id_ke', sortable: true },
        { title: 'Số lượng loại sách', align: 'center', value: 'sl_loai', sortable: true },
        { title: 'Tình trạng', align: 'center', value: 'is_full', sortable: true },
        { title: 'Hành Động', align: 'center', value: 'actions', sortable: false }
      ],
      KeSachField: [
        { text: 'Tình trạng', value: 'is_full', type: 'select', options: { items: ['Trống', 'Đầy'] } },
      ],
      KeSachItems: [] as any[],

      LoaiSachHeaders: [
        { title: 'Loại', align: 'center', value: 'the_loai_id', sortable: true },
        { title: 'Tên Thể Loại', align: 'center', value: 'ten_the_loai', sortable: true },
        { title: 'Số Lượng Sách', align: 'center', value: 'so_luong_sach', sortable: true },
        { title: 'Hành Động', align: 'center', value: 'actions', sortable: false }
      ],
      LoaiSachField: [
        { text: 'Tên Thể Loại', value: 'ten_the_loai' },
        { text: 'Số Lượng Sách', value: 'so_luong_sach' },
        { text: 'Kệ', value: 'id_ke' },
      ],
      LoaiSachItems: [] as any[],

      SachHeaders: [
        { title: 'Tên sách', align: 'center', value: 'ten_sach', sortable: true },
        { title: 'Tác giả', align: 'center', value: 'tac_gia', sortable: true },
        { title: 'Tình trạng', align: 'center', value: 'tinh_trang', sortable: true },
        { title: 'Hành Động', align: 'center', value: 'actions', sortable: false }
      ],
      SachField: [
        { text: 'Tên Thể Loại', value: 'ten_the_loai' },
        { text: 'Số Lượng Sách', value: 'so_luong_sach' },
        { text: 'Kệ', value: 'id_ke' },
      ],
      SachItems: [] as any[],

      selectedLoaiSachItems: [] as any,
      selectedSachItems: [] as any,
      rowDialog: false,
    };
  },
  created() {
    this.loadKeSachItems();
    this.loadLoaiSachItems();
    this.loadSachItems();
  },
  computed: {
    filterKeSachItems() {
      return this.KeSachItems.filter((item) => !item.is_deleted);
    },
    filteredLoaiSachItems() {
      return this.selectedLoaiSachItems; // Hiển thị các mục liên quan
    },
    filteredSachItems() {
      return this.selectedSachItems; // Hiển thị các mục liên quan
    }
  },
  methods: {
    //function kệ sách
    loadKeSachItems() {
      this.KeSachItems = JSON.parse(localStorage.getItem('keData') || '[]');
    },
    saveKeSachItems() {
      localStorage.setItem('keData', JSON.stringify(this.KeSachItems));
    },
    updateKeSachItem(updatedItem: any) {
      const index = this.KeSachItems.findIndex(item => item.id_ke === updatedItem.id_ke);
      if (index !== -1) {
        // Cập nhật nhưng giữ thông tin xóa mềm
        this.KeSachItems[index] = { ...this.KeSachItems[index], ...updatedItem };
        this.saveKeSachItems();
      }
    },
    deleteKeSachItem(itemId: number) {
      this.KeSachItems = this.KeSachItems.filter(item => item.id_ke !== itemId);
      this.saveKeSachItems();
    },
    addnewKeSachItem(newItem: any) {
      newItem.id_ke = this.KeSachItems.length + 1; // Hoặc logic tạo ID khác
      newItem.is_deleted = false;
      this.KeSachItems.push(newItem);
      this.saveKeSachItems();
    },
    ////////////////////////////////////////////////////////////////

    //function loại sách
    loadLoaiSachItems() {
      this.LoaiSachItems = JSON.parse(localStorage.getItem('LoaiData') || '[]');
    },
    saveLoaiSachItems() {
      localStorage.setItem('LoaiData', JSON.stringify(this.LoaiSachItems));
    },
    updateLoaiSachItem(updatedItem: any) {
      const index = this.LoaiSachItems.findIndex(item => item.the_loai_id === updatedItem.the_loai_id);
      if (index !== -1) {
        this.LoaiSachItems[index] = { ...updatedItem };
        this.saveLoaiSachItems();
      }
    },
    deleteLoaiSachItem(itemId: number) {
      this.LoaiSachItems = this.LoaiSachItems.filter(item => item.the_loai_id !== itemId);
      this.saveLoaiSachItems();
    },
    ////////////////////////////////////////////////////////////////

    // function Sách
    loadSachItems() {
      this.SachItems = JSON.parse(localStorage.getItem('SachData') || '[]');
    },
    saveSachItems() {
      localStorage.setItem('SachData', JSON.stringify(this.SachItems));
    },
    updateSachItem(updatedItem: any) {
      const index = this.SachItems.findIndex(item => item.id_sach === updatedItem.id_sach);
      if (index !== -1) {
        this.SachItems[index] = { ...updatedItem };
        this.saveSachItems();
      }
    },
    deleteSachItem(itemId: number) {
      this.SachItems = this.SachItems.filter(item => item.id_sach !== itemId);
      this.saveSachItems();
    },

    openRowDialog(item) {
      this.rowDialog = true;
      const idLoai = item.the_loai_id;
      this.selectedSachItems = this.SachItems.filter(
        loaiItem => loaiItem.the_loai_id === idLoai
      );
    },
    closeRowDialog() {
      this.rowDialog = false;
      this.selectedSachItems = [];
      console.log(this.rowDialog);
    },

    handleRowClickKeSach(item: any) {
      const idKe = item.id_ke;
      this.selectedLoaiSachItems = this.LoaiSachItems.filter(
        loaiItem => loaiItem.id_ke === idKe
      );
    },
  }
});
</script>

<style>
.table-wrapper{
  padding: 10px;
}
</style>