
<template>
  <v-card>
    <v-data-table :headers="headers" :items="filteredItems" dense fixed-header items-per-page="5" class="elevation-1"
      :header-props="{
        style: 'background-color: #4169E1; color: #ffffff;',
      }">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Loại sách</v-toolbar-title>
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
      const storedData = localStorage.getItem('LoaiData')
      if (storedData) {
        items.value = JSON.parse(storedData)
      } else {
        console.log('Không có dữ liệu trong localStorage')
      }
    })

    // Computed property để lọc các item theo từ khóa tìm kiếm
    const filteredItems = computed(() => {
      return data.filter((item) => {
        return item.ten_the_loai.toString().includes(search.value)
      })
    })

    return {
      search,
      headers: [
        { title: 'The_loai_id', align: 'center', value: 'the_loai_id', sortable: true },
        { title: 'Ten_the_loai', align: 'center', value: 'ten_the_loai', sortable: true },
        { title: 'So_luong_sach', align: 'center', value: 'so_luong_sach', sortable: true },
        { title: 'Id_ke', align: 'center', value: 'id_ke', sortable: true },
      ],
      filteredItems,
    }
  },
}
// Dữ liệu JSON bạn muốn lưu vào localStorage
const LoaiData = [
{ the_loai_id: 1, ten_the_loai: "Công nghệ thông tin", so_luong_sach: 15 ,id_ke: 1},
{ the_loai_id: 2, ten_the_loai: "Quản trị kinh doanh", so_luong_sach: 10 ,id_ke: 1},
{ the_loai_id: 3, ten_the_loai: "Thiết kế đồ họa", so_luong_sach: 9 ,id_ke: 1},
{ the_loai_id: 4, ten_the_loai: "Dược học", so_luong_sach: 20 ,id_ke: 1},
{ the_loai_id: 5, ten_the_loai:  "Du lịch và khám phá", so_luong_sach: 5 ,id_ke: 1},
{ the_loai_id: 6, ten_the_loai:  "Ngôn ngữ", so_luong_sach: 30 ,id_ke: 2},
{ the_loai_id: 7, ten_the_loai:  "Kỹ năng sống", so_luong_sach: 20 ,id_ke: 2},
{ the_loai_id: 8, ten_the_loai:  "Nông nghiệp và môi trường", so_luong_sach: 13 ,id_ke: 2},
{ the_loai_id: 9, ten_the_loai: "Thể thao và giải trí", so_luong_sach: 12 ,id_ke: 2},
]

if (localStorage.getItem('LoaiData') === null) {
        // Chưa có dữ liệu: thực hiện lưu dữ liệu vào localStorage
        localStorage.setItem('LoaiData', JSON.stringify(LoaiData));
        console.log('Dữ liệu Loại Sách đã được thêm vào localStorage.');
    } else {
        console.log('Dữ liệu Loại Sách đã tồn tại trong localStorage, không cần thêm.');
    }

</script>
