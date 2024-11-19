<template>
    <v-card>
        <!-- Bảng hiển thị danh sách kệ sách -->
        <v-data-table :headers="computedHeaders" :items="computedItems" dense fixed-header
            :items-per-page="itemsPerPage" hover class="custom-table">
            <!-- Toolbar trên cùng -->
            <template #top>
                <v-toolbar flat>
                    <v-toolbar-title>{{ title }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="addShelf">Thêm kệ sách</v-btn>
                    <v-text-field v-model="localSearch" append-icon="mdi-magnify" label="Tìm mã kệ" single-line
                        hide-details></v-text-field>
                </v-toolbar>
            </template>

            <!-- Headers của bảng -->
            <template #headers="{ props }">
                <tr class="custom-header">
                    <th v-for="header in computedHeaders" :key="header.value" class="header-cell">
                        {{ header.text }}
                    </th>
                </tr>
            </template>

            <!-- Slot cho từng cột -->
            <template #item.id_ke="{ item }">
                <span>{{ item.id_ke }}</span>
            </template>

            <template #item.so_luong_loai_sach="{ item }">
                <span>{{ item.so_luong_loai_sach }}</span>
            </template>

            <template #item.tinh_trang="{ item }">
                <span>{{ item.tinh_trang }}</span>
            </template>

            <!-- Slot cho các hành động -->
            <template #item.actions="{ item }">
                <v-btn icon color="blue" @click="editShelf(item)">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon color="red" @click="deleteShelf(item)">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </template>
        </v-data-table>

        <!-- Dialog chỉnh sửa -->
        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card>
                <v-card-title class="text-h5">{{ isEditing ? 'Chỉnh sửa kệ sách' : 'Thêm kệ sách' }}</v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field v-model="editedShelf.so_luong_loai_sach" label="Số lượng loại sách"
                            type="number"></v-text-field>
                        <v-select v-model="editedShelf.tinh_trang" :items="['Trống', 'Đầy']"
                            label="Tình trạng"></v-select>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="red" @click="closeDialog">Hủy</v-btn>
                    <v-btn text color="green" @click="saveChanges">Lưu</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';

interface Item {
    id_ke: number;
    so_luong_loai_sach: number;
    tinh_trang: string;
    is_active: boolean;
}

export default defineComponent({
    name: 'ReusableTable',
    props: {
        title: { type: String, default: 'Bảng' },
        itemsPerPage: { type: Number, default: 5 },
        headerProps: {
            type: Object,
            default: () => ({ style: 'background-color: #4169E1; color: #ffffff;' }),
        },
    },
    setup(props) {
        const localSearch = ref('');
        const shelves = ref<Item[]>([]);
        const dialog = ref(false);
        const editedShelf = ref<Item | null>(null);
        const isEditing = ref(false); // Chỉ thị đang sửa hay thêm

        // Lấy dữ liệu từ localStorage khi trang được tải
        onMounted(() => {
            const storedShelves = localStorage.getItem('bookShelves');
            shelves.value = storedShelves ? JSON.parse(storedShelves) : [
                { id_ke: 1, so_luong_loai_sach: 0, tinh_trang: 'Trống', is_active: true },
                { id_ke: 2, so_luong_loai_sach: 0, tinh_trang: 'Trống', is_active: true },
            ];
        });

        // Headers của bảng
        const computedHeaders = computed(() => [
            { text: 'Mã kệ', value: 'id_ke', align: 'start' },
            { text: 'Số lượng loại sách', value: 'so_luong_loai_sach', align: 'center' },
            { text: 'Tình trạng', value: 'tinh_trang', align: 'center' },
            { text: 'Tính năng', value: 'actions', align: 'end', sortable: false },
        ]);

        // Lọc danh sách theo mã kệ và chỉ hiển thị những kệ có is_active = true
        const computedItems = computed(() => {
            if (!localSearch.value.trim()) return shelves.value.filter(item => item.is_active); // Chỉ hiển thị các item có is_active là true
            return shelves.value.filter(item => item.is_active && String(item.id_ke).toLowerCase().includes(localSearch.value.toLowerCase()));
        });

        // Thêm kệ mới
        function addShelf() {
            const newId = shelves.value.length > 0 ? Math.max(...shelves.value.map(item => item.id_ke)) + 1 : 1;
            editedShelf.value = { id_ke: newId, so_luong_loai_sach: 0, tinh_trang: 'Trống', is_active: true };
            dialog.value = true;
        }

        // Xóa kệ (đánh dấu là không hoạt động)
        function deleteShelf(item: Item) {
            const index = shelves.value.findIndex(i => i.id_ke === item.id_ke);
            if (index !== -1) {
                shelves.value[index].is_active = false; // Đánh dấu là không hiển thị
                saveShelvesToLocalStorage();
            }
        }

        // Chỉnh sửa kệ
        function editShelf(item: Item) {
            isEditing.value = true;
            editedShelf.value = { ...item };
            dialog.value = true;
        }

        // Đóng dialog chỉnh sửa
        function closeDialog() {
            dialog.value = false;
            editedShelf.value = {};
        }

        // Lưu thay đổi
        function saveChanges() {
            if (editedShelf.value) {
                if (isEditing.value) {
                    const index = shelves.value.findIndex(item => item.id_ke === editedShelf.value!.id_ke);
                    if (index !== -1) shelves.value[index] = { ...editedShelf.value };
                } else {
                    shelves.value.push({ ...editedShelf.value });
                }
                saveShelvesToLocalStorage();
                closeDialog();
            }
        }

        // Lưu dữ liệu vào localStorage
        function saveShelvesToLocalStorage() {
            localStorage.setItem('bookShelves', JSON.stringify(shelves.value));
        }

        return {
            localSearch,
            shelves,
            computedHeaders,
            computedItems,
            dialog,
            editedShelf,
            isEditing,
            addShelf,
            deleteShelf,
            editShelf,
            closeDialog,
            saveChanges,
        };
    },
});
</script>

<style scoped>
.custom-table {
    width: 100%;
}

.custom-table th,
.custom-table td {
    text-align: center;
}

.custom-table th {
    background-color: #4169e1;
    color: white;
    font-weight: bold;
}

.custom-header .v-data-table-header th {
    color: #ffffff !important;
    background-color: #4169E1;
    text-align: center;
}
</style>
