<template>
  <v-card>
    <v-data-table :headers="headers" :items="filteredItems" dense fixed-header items-per-page="5" class="elevation-1"
      :header-props="{
        style: 'background-color: #4169E1; color: #ffffff;',
      }">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Kệ sách</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Tìm kiếm" single-line
            hide-details></v-text-field>
        </v-toolbar>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    const search = ref('')
    const items = ref([])
    // Khi component được mounted, tải dữ liệu từ localStorage
    onMounted(() => {
      const storedData = localStorage.getItem('keData')
      if (storedData) {
        items.value = JSON.parse(storedData)
      } else {
        console.log('Không có dữ liệu trong localStorage')
      }
    })


    // Computed property để lọc các item theo từ khóa tìm kiếm
    const filteredItems = computed(() => {
      return data.filter((item) => {
        return item.id_ke.toString().includes(search.value)
      })
    })

    return {
      search,
      headers: [
        { title: 'Id_ke', align: 'center', value: 'id_ke', sortable: true },
        { title: 'Sl_loai', align: 'center', value: 'sl_loai', sortable: true },
        { title: 'Is Full', align: 'center', value: 'is_full ', sortable: true },
        { title: 'Is Active', align: 'center', value: 'is_active', sortable: true },
      ],
      filteredItems,
    }
  },
}
// Dữ liệu JSON bạn muốn lưu vào localStorage
const keData = [
  { id_ke: 1, sl_loai: 5, is_full: 'Đầy', is_deleted: false },
  { id_ke: 2, sl_loai: 4, is_full: 'Đầy', is_deleted: false },
  { id_ke: 3, sl_loai: 0, is_full: 'Trống', is_deleted: false },
  { id_ke: 4, sl_loai: 0, is_full: 'Trống', is_deleted: false },
]

if (localStorage.getItem('keData') === null) {
  // Chưa có dữ liệu: thực hiện lưu dữ liệu vào localStorage
  localStorage.setItem('keData', JSON.stringify(keData));
  console.log('Dữ liệu Kệ Sách đã được thêm vào localStorage.');
} else {
  console.log('Dữ liệu Kệ Sách đã tồn tại trong localStorage, không cần thêm.');
}
</script>


<style>
.v-pagination__list {
  width: inherit !important;
}
</style>