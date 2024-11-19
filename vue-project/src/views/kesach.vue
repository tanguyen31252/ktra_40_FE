<template>
    <v-card>
        <!-- Bảng hiển thị danh sách kệ sách -->
        <v-data-table :headers="computedHeaders" :items="shelves" dense fixed-header :items-per-page="itemsPerPage"
            class="elevation-1" :header-props="headerProps" hover>

            <!-- Toolbar trên cùng -->
            <template #top>
                <v-toolbar flat>
                    <v-toolbar-title>{{ title }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="addShelf">Thêm kệ sách</v-btn>
                    <v-text-field v-model="localSearch" append-icon="mdi-magnify" label="Tìm kiếm" single-line
                        hide-details>
                    </v-text-field>
                </v-toolbar>
            </template>

            <!-- Các cột của bảng -->
            <template #item.id_ke="{ item }">
                <span>{{ item.id_ke }}</span>
            </template>
            <template #item.so_luong_loai_sach="{ item }">
                <span>{{ item.so_luong_loai_sach }}</span>
            </template>
            <template #item.tinh_trang="{ item }">
                <span>{{ item.tinh_trang }}</span>
            </template>

            <!-- Các hành động cho từng kệ sách -->
            <template #item.actions="{ item }">
                <v-btn icon color="blue" @click="editShelf(item)">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon color="red" @click="deleteShelf(item)">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-btn icon color="green" @click="viewShelf(item)">
                    <v-icon>mdi-eye</v-icon>
                </v-btn>
            </template>
        </v-data-table>

        <!-- Dialog cho việc chỉnh sửa kệ sách -->
        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card>
                <v-card-title class="text-h5">Chỉnh sửa kệ sách</v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field v-model="editedShelf.so_luong_loai_sach" label="Số lượng loại sách" type="number">
                        </v-text-field>
                        <v-select v-model="editedShelf.tinh_trang" :items="['Trống', 'Đầy']" label="Tình trạng">
                        </v-select>
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
import { useRouter } from 'vue-router';

interface Item {
    id_ke: number;
    so_luong_loai_sach: number;
    tinh_trang: string;
    deleted?: boolean;
}

export default defineComponent({
    name: 'ReusableTable',
    props: {
        title: { type: String, default: 'Bảng' },
        items: { type: Array, required: true },
        itemsPerPage: { type: Number, default: 5 },
        headerProps: {
            type: Object,
            default: () => ({ style: 'background-color: #4169E1; color: #ffffff;' }),
        },
    },
    setup(props) {
        const router = useRouter();
        const localSearch = ref('');

        // Khởi tạo shelves từ localStorage
        const shelves = ref<Item[]>([]);

        // Lấy dữ liệu từ localStorage khi trang được tải lại
        onMounted(() => {
            const storedShelves = localStorage.getItem('bookShelves');
            if (storedShelves) {
                shelves.value = JSON.parse(storedShelves);
            } else {
                // Nếu không có dữ liệu trong localStorage, gán giá trị mặc định
                shelves.value = [
                    { id_ke: 1, so_luong_loai_sach: 0, tinh_trang: 'Trống' },
                    { id_ke: 2, so_luong_loai_sach: 0, tinh_trang: 'Trống' }
                ];
            }
        });

        const dialog = ref(false);
        const editedShelf = ref<Item | null>(null);

        const computedHeaders = computed(() => [
            { text: 'Mã kệ', value: 'id_ke', align: 'start' },
            { text: 'Số lượng loại sách', value: 'so_luong_loai_sach', align: 'center' },
            { text: 'Tình trạng', value: 'tinh_trang', align: 'center' },
            { text: 'Actions', value: 'actions', align: 'end', sortable: false },
        ]);

        const computedItems = computed(() =>
            shelves.value.filter(
                (item: Item) =>
                    !item.deleted &&
                    Object.values(item).some((value) =>
                        String(value).toLowerCase().includes(localSearch.value.toLowerCase())
                    )
            )
        );

        function addShelf() {
            const newId = shelves.value.length > 0 ? Math.max(...shelves.value.map(item => item.id_ke)) + 1 : 1;
            const newShelf = { id_ke: newId, so_luong_loai_sach: 0, tinh_trang: 'Trống' };
            shelves.value.push(newShelf);
            localStorage.setItem('bookShelves', JSON.stringify(shelves.value));
        }

        function deleteShelf(item: Item) {
            const index = shelves.value.findIndex(i => i.id_ke === item.id_ke);
            if (index !== -1) {
                shelves.value.splice(index, 1);
                localStorage.setItem('bookShelves', JSON.stringify(shelves.value));
            }
        }

        function editShelf(item: Item) {
            editedShelf.value = { ...item };
            dialog.value = true;
        }

        function closeDialog() {
            dialog.value = false; // Đóng hộp thoại
            editedShelf.value = null; // Reset dữ liệu chỉnh sửa
        }

        function saveChanges() {
            if (editedShelf.value) {
                const index = shelves.value.findIndex((item) => item.id_ke === editedShelf.value!.id_ke);
                if (index !== -1) {
                    // Cập nhật dữ liệu
                    shelves.value[index] = { ...editedShelf.value };
                }

                // Lưu dữ liệu vào LocalStorage
                localStorage.setItem('bookShelves', JSON.stringify(shelves.value));

                // Đóng hộp thoại
                closeDialog();
            }
        }

        function viewShelf(item: Item) {
            router.push({ name: 'ShelfDetail', params: { id_ke: item.id_ke } });
        }

        return {
            shelves,
            computedHeaders,
            computedItems,
            dialog,
            editedShelf,
            localSearch,
            addShelf,
            deleteShelf,
            editShelf,
            closeDialog,
            saveChanges,
            viewShelf,
        };
    },
});

</script>

<style scoped>
.v-data-table__wrapper {
    text-align: center;
}

.v-data-table-header th {
    text-align: center;
}
</style>
