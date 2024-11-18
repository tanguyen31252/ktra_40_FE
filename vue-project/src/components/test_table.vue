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
      <template #top>
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

      <template #item.actions="{ item }">
        <template v-if="enableAddToCart">
          <v-btn small icon @click="onAddToCart(item)">
            <v-icon>mdi-cart-plus</v-icon>
          </v-btn>
        </template>
        <!-- <v-btn small color="primary" @click="onUpdate(item)">Cập nhật</v-btn>
        <v-btn small color="red" @click="onDelete(item)">Xóa</v-btn> -->
      </template>
    </v-data-table>

    <!-- Code cho dialog cập nhật và các phần khác -->
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

interface Item {
  [key: string]: any
  deleted?: boolean
}

interface Field {
  text: string
  value: string
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
    enableAddToCart: { type: Boolean, default: true },
  },
  setup(props) {
    const localSearch = ref('')
    const dialog = ref(false)
    const editedItem = ref<Item>({})

    const computedHeaders = computed(() => [
      ...props.headers,
      { text: 'Actions', value: 'actions', sortable: false },
    ])

    const computedItems = computed(() =>
      props.items.filter(
        (item: Item) =>
          !item.deleted &&
          Object.values(item).some((value) =>
            String(value).toLowerCase().includes(localSearch.value.toLowerCase())
          )
      )
    )

    function onAddToCart(item: Item) {
      alert(`Thêm ${item.name || item.item} vào giỏ hàng!`)
    }

    function onUpdate(item: Item) {
      editedItem.value = { ...item }
      dialog.value = true
    }

    function onDelete(item: Item) {
      if (confirm('Bạn có chắc chắn muốn xóa mục này không?')) {
        const foundItem = props.items.find((i) => i.id === item.id)
        if (foundItem) foundItem.deleted = true
      }
    }

    function closeDialog() {
      dialog.value = false
      editedItem.value = {}
    }

    function saveEdit() {
      const foundItem = props.items.find((i) => i.id === editedItem.value.id)
      if (foundItem) {
        Object.assign(foundItem, editedItem.value)
      }
      closeDialog()
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
    }
  },
})
</script>

<style scoped>
.elevation-1 {
  /* Additional styling if needed */
}
</style>