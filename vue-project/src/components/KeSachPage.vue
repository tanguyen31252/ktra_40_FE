<template>
    <div>
        <!-- Tool bar với tiêu đề, tìm kiếm và nút thêm mới -->
        <v-toolbar color="#FFFFFF">
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-inner-icon="mdi-magnify" label="Tìm kiếm" hide-details
                density="comfortable" center-affix flat></v-text-field>
            <v-btn v-if="isType1" icon color="primary" @click="openAddDialog">
                <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
        </v-toolbar>

        <!-- Bảng dữ liệu -->
        <v-data-table :headers="dynamicHeaders" :items="filteredItems" density="compact" :item-key="id_ke" fixed-header
            height="350px" :header-props="({ style: 'background-color: #4169E1; color: #ffffff;' })"
            @click:row="onRowClick" hover>
            <template v-slot:item.action="{ item }" v-if="isType1">
                <v-btn icon="mdi-pencil" @click.stop="onUpdate(item)"></v-btn>
                <v-btn icon="mdi-delete" @click.stop="onDelete(item)"></v-btn>
            </template>
        </v-data-table>

        <!-- Dialog để thêm mới hoặc cập nhật -->
        <v-dialog v-model="showDialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">{{ add ? 'Thêm mới' : 'Cập nhật' }}</span>
                </v-card-title>

                <v-card-text>
                    <v-form ref="form">
                        <!-- <v-text-field v-model="currentItem.id_ke" label="ID kệ" required></v-text-field> -->
                        <v-text-field v-model="currentItem.khoa" label="Khoa" required></v-text-field>
                        <v-text-field type="number" min=0 v-model.number="currentItem.sl_loai" label="Số lượng loại"
                            required></v-text-field>
                        <v-select v-if="!add" v-model="currentItem.is_full" label="Tình trạng" required
                            :items="['Đầy', 'Trống']"></v-select>
                    </v-form>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" @click="showDialog = false">Hủy</v-btn>
                    <v-btn color="blue darken-1" @click="save">Lưu</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { selectedKe } from '../javascript/state.js';
interface KeSachModel {
    id_ke?: number;
    sl_loai?: number;
    is_full?: string;
    is_deleted?: boolean;
}

const title = 'Danh sách kệ'; // Tiêu đề cho toolbar
const showDialog = ref(false);
const KeSachData = ref<Array<KeSachModel>>([]);
const currentItem = ref<KeSachModel>({});
const add = ref(true);
const search = ref('');
const userRole = localStorage.getItem('userRole');
const isType1 = userRole === '1';

const headers = [
    { title: 'Kệ', align: 'start', key: 'id_ke' },
    { title: 'Khoa', align: 'start', key: 'khoa' },
    { title: 'Số lượng loại', align: 'start', key: 'sl_loai' },
    { title: 'Tình trạng', align: 'start', key: 'is_full' },
];

// Tính toán dynamic để lọc dữ liệu dựa trên search
const filteredItems = computed(() => {
    return KeSachData.value.filter(item => !item.is_deleted &&
        String(item.id_ke).toLowerCase().includes(search.value.toLowerCase())
    );
});

const dynamicHeaders = computed(() => {
    if (isType1) {
        return [...headers, { title: 'Hành động', align: 'center', key: 'action' }];
    }
    return headers;
});

onMounted(() => {
    KeSachData.value = loadItemsFromLocalStorage();
});

function loadItemsFromLocalStorage(): Array<KeSachModel> {
    const savedData = localStorage.getItem('keData');
    return savedData ? JSON.parse(savedData) : [];
}

function onUpdate(item: KeSachModel) {
    showDialog.value = true;
    add.value = false;
    currentItem.value = { ...item }; // Sao chép item vào currentItem
}

function save() {
    if (add.value) {
        const maxId = Math.max(...KeSachData.value.map(item => item.id_ke || 0));
        currentItem.value.id_ke = maxId + 1;
        currentItem.value.is_deleted = false;
        currentItem.value.is_full = 'Trống';
        KeSachData.value.push({ ...currentItem.value });
    } else {
        // Logic để cập nhật item hiện có
        const index = KeSachData.value.findIndex(d => d.id_ke === currentItem.value.id_ke);
        if (index !== -1) {
            KeSachData.value[index] = { ...currentItem.value };
        }
    }

    // Lưu data vào localStorage
    localStorage.setItem('keData', JSON.stringify(KeSachData.value));
    showDialog.value = false;
}

function openAddDialog() {
    currentItem.value = {};
    add.value = true;
    showDialog.value = true;
}

function onAddCart(item: KeSachModel) {
    confirm('Đã thêm ' + item.id_ke + ' vào giỏ hàng')
}

function onDelete(item: KeSachModel) {
    if (confirm('Bạn có chắc chắn muốn xóa mục này không?')) {
        item.is_deleted = true;
        // console.log(item);
    }
    localStorage.setItem('keData', JSON.stringify(KeSachData.value));
}

function onRowClick(event, item) {
    localStorage.setItem('selectedKe', JSON.stringify(item.item.id_ke));
    const newKe = item.item.id_ke; // Lấy từ dữ liệu dòng bị click
    selectedKe.value = newKe;
}
</script>

<style>
.v-pagination__list {
    width: auto;
}
</style>