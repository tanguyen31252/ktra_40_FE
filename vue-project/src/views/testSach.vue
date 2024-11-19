<template>
    <div>
      <!-- Bảng LoaiSach -->
      <v-card>
        <v-data-table
          :headers="loaiSachHeaders"
          :items="loaiSachItems"
          class="elevation-1"
          hover
          item-key="idLoaiSach"
        >
          <template #top>
            <v-toolbar flat>
              <v-toolbar-title>Loại Sách</v-toolbar-title>
            </v-toolbar>
          </template>
          <template v-slot:item="{ item }">
            <tr @click="selectLoaiSachRow(item)">
              <td>{{ item.idLoaiSach }}</td>
              <td>{{ item.tenLoai }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
  
      <!-- Dialog cho Bảng Sach -->
      <v-dialog v-model="isDialogOpen" max-width="600px">
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>Sách Theo Loại</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="closeDialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-data-table
            :headers="sachHeaders"
            :items="filteredSachItems"
            class="elevation-1"
            item-key="id"
          >
          </v-data-table>
        </v-card>
      </v-dialog>
  
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  
  export default defineComponent({
    setup() {
      const loaiSachHeaders = ref([
        { title: 'ID Loại Sách', value: 'idLoaiSach' },
        { title: 'Tên Loại Sách', value: 'tenLoai' }
      ]);
  
      const sachHeaders = ref([
        { title: 'ID Sách', value: 'id' },
        { title: 'Tên Sách', value: 'tenSach' },
        { title: 'ID Loại Sách', value: 'idLoaiSach' }
      ]);
  
      const loaiSachItems = ref([
        { idLoaiSach: 1, tenLoai: 'Khoa Học' },
        { idLoaiSach: 2, tenLoai: 'Văn Học' },
        // Các loại sách khác...
      ]);
  
      const sachItems = ref([
        { id: 1, tenSach: 'Sách A', idLoaiSach: 1 },
        { id: 2, tenSach: 'Sách B', idLoaiSach: 2 },
        { id: 3, tenSach: 'Sách C', idLoaiSach: 1 },
        // Các sách khác...
      ]);
  
      const selectedLoaiSachId = ref(null);
      const isDialogOpen = ref(false);
  
      const selectLoaiSachRow = (item) => {
        if (item && item.idLoaiSach !== undefined) {
          selectedLoaiSachId.value = item.idLoaiSach;
          isDialogOpen.value = true; // Mở dialog khi dòng được chọn
        } else {
          console.log("Không thể lấy hàng, dữ liệu không chính xác.");
        }
      };
  
      const closeDialog = () => {
        isDialogOpen.value = false;
        selectedLoaiSachId.value = null; // Tùy chọn: đặt lại Id loại sách khi đóng dialog
      };
  
      const filteredSachItems = computed(() => {
        if (selectedLoaiSachId.value !== null) {
          return sachItems.value.filter(
            (sach) => sach.idLoaiSach === selectedLoaiSachId.value
          );
        }
        return [];
      });
  
      return {
        loaiSachHeaders,
        sachHeaders,
        loaiSachItems,
        sachItems,
        selectedLoaiSachId,
        selectLoaiSachRow,
        filteredSachItems,
        isDialogOpen,
        closeDialog
      };
    }
  });
  </script>