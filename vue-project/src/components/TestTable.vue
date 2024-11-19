<template>
  <v-card>
    <v-data-table :headers="computedHeaders" :items="computedItems" dense fixed-header :items-per-page="itemsPerPage"
      class="elevation-1" :header-props="headerProps" hover>
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="addShelf">Thêm kệ sách</v-btn>
          <v-text-field v-model="localSearch" append-icon="mdi-magnify" label="Tìm kiếm" single-line
            hide-details></v-text-field>
        </v-toolbar>
      </template>

      <template #item.actions="{ item }">
        <v-btn small icon @click="onAddToCart(item)">
          <v-icon>mdi-cart-plus</v-icon>
        </v-btn>
        <v-btn small color="primary" @click="onUpdate(item)">Cập nhật</v-btn>
        <v-btn small color="red" @click="onDelete(item)">Xóa</v-btn>
      </template>
    </v-data-table>

    <!-- V-Dialog for updating items -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Cập nhật thông tin</v-card-title>
        <v-card-text>
          <v-form v-if="dialog">
            <v-text-field v-for="field in itemFields" :key="field.value" v-model="editedItem[field.value]"
              :label="field.text"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Hủy</v-btn>
          <v-btn color="blue darken-1" text @click="saveEdit">Lưu</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>


<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

interface Item {
  [key: string]: any;
  deleted?: boolean;
}

interface Field {
  text: string;
  value: string;
}

export default defineComponent({
  name: 'ReusableTable',
  props: {
    title: { type: String, default: 'Bảng' },
    headers: { type: Array, required: true },
    items: { type: Array, required: true },
    itemFields: { type: Array, required: true },
    itemsPerPage: { type: Number, default: 5 },
    headerProps: { type: Object, default: () => ({ style: 'background-color: #4169E1; color: #ffffff;' }) },
  },
  setup(props) {
    const localSearch = ref('');
    const dialog = ref(false);
    const editedItem = ref<Item>({});

    const computedHeaders = computed(() => [
      ...props.headers,
      { text: 'Actions', value: 'actions', sortable: false },
    ]);

    const computedItems = computed(() =>
      props.items.filter((item: Item) =>
        !item.deleted && Object.values(item).some((value) =>
          String(value).toLowerCase().includes(localSearch.value.toLowerCase())
        )
      )
    );

    function addShelf() {
      // Tìm mã kệ mới bằng cách lấy id_ke cao nhất, nếu không có thì gán là 1
      const newId = shelves.value.length > 0 ? Math.max(...shelves.value.map(item => item.id_ke)) + 1 : 1;
      editedShelf.value = { id_ke: newId, so_luong_loai_sach: 0, tinh_trang: 'Trống' };
      dialog.value = true; // Mở dialog để nhập thông tin kệ
    }
    function onAddToCart(item: Item) {
      alert(`Thêm ${item.name || item.item} vào giỏ hàng!`);
    }

    function onUpdate(item: Item) {
      editedItem.value = { ...item };  // sao chép dữ liệu của item vào editedItem
      dialog.value = true;  // mở dialog khi cập nhật
    }

    function onDelete(item: Item) {
      if (confirm('Bạn có chắc chắn muốn xóa mục này không?')) {
        const foundItem = props.items.find((i) => i.id === item.id);
        if (foundItem) foundItem.deleted = true;
      }
    }

    function closeDialog() {
      dialog.value = false;
      editedItem.value = {};
    }

    function saveEdit() {
      const foundItem = props.items.find((i) => i.id === editedItem.value.id);
      if (foundItem) {
        Object.assign(foundItem, editedItem.value);
      }
      closeDialog();
    }

    return {
      localSearch,
      dialog,
      editedItem,
      computedHeaders,
      computedItems,
      onAddToCart,
      onUpdate,
      onDelete,
      closeDialog,
      saveEdit,
    };
  },
});
</script>

<style scoped>
.elevation-1 {
  /* Additional styling if needed */
}
</style>

<style>
  table {
  table-layout: fixed; /* Giữ kích thước cố định cho các ô */
  border-collapse: collapse; /* Loại bỏ khoảng cách giữa các ô */
}
th:nth-child(1), td:nth-child(1) {
  width: 15%; /* Kích thước cột 1 */
}
th:nth-child(2), td:nth-child(2) {
  width: 15%; /* Kích thước cột 2 */
}
th:nth-child(3), td:nth-child(3) {
  width: 35%; /* Kích thước cột 3 */
}
th:nth-child(4), td:nth-child(4) {
  width: 35%; /* Kích thước cột 3 */
}
th, td {
  border: 1px solid #ddd; /* Đường viền ô */
  padding: 8px; /* Khoảng cách trong ô */
  word-wrap: break-word; /* Ngắt dòng nếu quá dài */
}
</style>