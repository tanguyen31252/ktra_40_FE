<template>
    <v-card>
      <v-data-table
        :headers="computedHeaders"
        :items="computedItems"
        dense
        fixed-header
        :items-per-page="itemsPerPage"
        class="elevation-1"
        :header-props="headerProps"
        hover
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="localSearch"
              append-icon="mdi-magnify"
              label="Tìm kiếm"
              single-line
              hide-details
            ></v-text-field>
          </v-toolbar>
        </template>
  
        <template v-slot:item.actions="{ item }">
          <v-btn small color="primary" @click="onUpdate(item)">Cập nhật</v-btn>
          <v-btn small color="red" @click="onDelete(item)">Xóa</v-btn>
        </template>
  
      </v-data-table>
  
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title class="headline">Cập nhật thông tin</v-card-title>
          <v-card-text>
            <v-text-field
              v-for="field in itemFields"
              :key="field.value"
              v-model="editedItem[field.value]"
              :label="field.text"
            ></v-text-field>
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
  export default {
    name: 'ReusableTable',
    props: {
      title: { type: String, default: 'Bảng' },
      headers: { type: Array, required: true},
      items: { type: Array, required: true },
      itemFields: { type: Array, required: true }, // Cấu trúc dữ liệu các trường
      itemsPerPage: { type: Number, default: 5 },
      headerProps: { type: Object, default: () => ({ style: 'background-color: #4169E1; color: #ffffff;' }) },
    },
    data() {
      return {
        localSearch: '',
        dialog: false,
        editedItem: {}, // Bản sao dùng để chỉnh sửa của item hiện tại
      };
    },
    computed: {
      computedHeaders() {
        return [...this.headers, { text: 'Actions', value: 'actions', sortable: false }];
      },
      computedItems() {
        return this.items.filter(item => !item.deleted && Object.values(item).some(value => String(value).toLowerCase().includes(this.localSearch.toLowerCase())));
      },
    },
    methods: {
      onUpdate(item) {
        this.editedItem = { ...item }; // Tạo bản sao để chỉnh sửa
        this.dialog = true;
      },
      onDelete(item) {
        if (confirm('Bạn có chắc chắn muốn xóa mục này không?')) {
          const foundItem = this.items.find(i => i.id === item.id);
          if (foundItem) foundItem.deleted = true; // Xóa mềm bằng cách đặt cờ
        }
      },
      closeDialog() {
        this.dialog = false;
        this.editedItem = {};
      },
      saveEdit() {
        const foundItem = this.items.find(i => i.id === this.editedItem.id);
        if (foundItem) {
          Object.assign(foundItem, this.editedItem);
        }
        this.closeDialog();
      },
    },
  };
  </script>
  
  <style scoped>
  .elevation-1 {
    /* Additional styling if needed */
  }
  </style>