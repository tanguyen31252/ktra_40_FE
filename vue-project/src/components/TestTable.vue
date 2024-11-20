<template>
  <v-card>
    <v-data-table :headers="computedHeaders" :items="computedItems" dense fixed-header :items-per-page="itemsPerPage"
      class="elevation-1" :header-props="headerProps" hover @click:row="onRowClick" height="400px">
      <template #top>
        <v-toolbar color="#FFFFFF">
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field v-model="localSearch" append-inner-icon="mdi-magnify" label="Tìm kiếm" hide-details
            density="comfortable" center-affix flat></v-text-field>
          <v-btn icon color="primary" @click="openAddDialog">
            <v-icon>mdi-plus-circle</v-icon>
          </v-btn>
        </v-toolbar>
      </template>

      <template #item="{ item }">
      <tr @click="selectRow(item)">
        <td v-for="header in headers" :key="header.value" :class="getColumnClass(header)">
          <template v-if="header.value !== 'actions'">
            {{ item[header.value] }}
          </template>
          <template v-else>
            <v-btn small icon @click.stop="onAddToCart(item)">
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
            <v-btn icon @click.stop="onUpdate(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click.stop="onDelete(item)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </td>
      </tr>
    </template>
    </v-data-table>

    <!-- V-Dialog for updating or adding items -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">{{ dialogMode === 'add' ? 'Thêm Mục Mới' : 'Cập nhật thông tin' }}</v-card-title>
        <v-card-text>
          <v-form v-if="dialog" ref="editForm">
            <template v-for="field in itemFields" :key="field.value">
              <component :is="resolveComponent(field)" v-model="editedItem[field.value]" :label="field.text"
                v-bind="field.options || {}"></component>
            </template>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="closeDialog">Hủy</v-btn>
          <v-btn color="blue darken-1" @click="dialogMode === 'add' ? saveNewItem : saveEdit">Lưu</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

interface Item {
  [key: string]: any;
  is_deleted?: boolean;
}

interface Field {
  text: string;
  value: string;
  type: string;
  options?: object;
}

export default defineComponent({
  name: 'ReusableTable',
  props: {
    title: { type: String, default: 'Bảng' },
    headers: { type: Array, required: true },
    items: { type: Array, required: true },
    itemFields: { type: Array, required: true },
    itemsPerPage: { type: Number, default: 5 },
    headerProps: {
      type: Object,
      default: () => ({ style: 'background-color: #4169E1; color: #ffffff;' }),
    },
  },
  setup(props, { emit }) {
    const localSearch = ref('');
    const dialog = ref(false);
    const dialogMode = ref('edit'); // New state for dialog mode
    const editedItem = ref<Item>({});

    const computedHeaders = computed(() => [
      ...props.headers,
      { text: 'Actions', value: 'actions', sortable: false },
    ]);

    function selectRow(item: Item) {
      emit('row-click', item);
    }

    const computedItems = computed(() =>
      props.items.filter(
        (item: Item) =>
          !item.is_deleted && // Filter out items marked as deleted
          Object.values(item).some(value =>
            String(value).toLowerCase().includes(localSearch.value.toLowerCase()),
          ),
      ),
    );

    function onAddToCart(item: Item) {
      alert(`Thêm ${item.name} vào giỏ hàng!`);
    }

    function onUpdate(item: Item) {
      editedItem.value = { ...item };
      dialogMode.value = 'edit';
      dialog.value = true;
    }

    function onDelete(item: Item) {
      if (confirm('Bạn có chắc chắn muốn xóa mục này không?')) {
        item.is_deleted = true; // Mark the item as deleted
        emit('delete-item', item.id);
      }
    }

    function openAddDialog() {
      editedItem.value = {}; // Clear the item data for adding new
      dialogMode.value = 'add';
      dialog.value = true;
    }

    function closeDialog() {
      dialog.value = false;
      editedItem.value = {};
    }

    function saveEdit() {
      emit('update-item', { ...editedItem.value });
      closeDialog();
    }

    function saveNewItem() {
      // Assign new ID & save new item
      emit('add-item', { ...editedItem.value });
      closeDialog();
    }

    function resolveComponent(field: Field) {
      switch (field.type) {
        case 'select':
          return 'v-select';
        default:
          return 'v-text-field';
      }
    }

    return {
      localSearch,
      dialog,
      dialogMode,
      editedItem,
      computedHeaders,
      computedItems,
      onAddToCart,
      onUpdate,
      onDelete,
      openAddDialog,
      closeDialog,
      saveEdit,
      saveNewItem,
      selectRow,
      resolveComponent
    };
  },
  computed: {
    computedHeaders() {
      // Đảm bảo computedHeaders bao gồm tất cả các headers định nghĩa trong data
      return this.headers;
    }
  },
  methods: {
    getColumnClass(header) {
      return {
        'text-center': header.align === 'center',
        'text-left': header.align === 'left',
        'text-right': header.align === 'right',
      };
    }
  }
});
</script>

<style>
.v-pagination__list {
  width: auto;
}
</style>