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
        <v-data-table :headers="dynamicHeaders" :items="filteredItems" density="compact" :item-key="the_loai_id"
            height="350px" fixed-header :header-props="({ style: 'background-color: #4169E1; color: #ffffff;' })"
            @click:row="onRowClick" hover>
            <template v-slot:item.action="{ item }" v-if="isType1">
                <v-btn icon="mdi-plus-circle" @click.stop="onAddCart(item)"></v-btn>
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
                        <v-text-field v-model="currentItem.ten_the_loai" label="Tên thể loại" required></v-text-field>
                        <v-text-field v-model.number="currentItem.so_luong_sach" label="Số lượng sách" required></v-text-field>
                        <v-text-field v-model.number="currentItem.id_ke" label="Kệ" required></v-text-field>
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
import { ref, computed, onMounted, watch } from 'vue';
import { selectedKe, selectedLoai } from '../javascript/state.js';

interface LoaiSachModel {
    the_loai_id?: number;
    ten_the_loai?: string;
    so_luong_sach?: number;
    id_ke?: number;
    is_deleted?: boolean;
}

const title = 'Loại sách'; // Tiêu đề cho toolbar
const showDialog = ref(false);
const LoaiSachData = ref<Array<LoaiSachModel>>([]);
const currentItem = ref<LoaiSachModel>({});
const add = ref(true);
const search = ref('');
const userRole = localStorage.getItem('userRole');
const isType1 = userRole === '1';

const headers = [
    { title: 'Tên thể loại', align: 'start', key: 'ten_the_loai', },
    { title: 'Số lượng sách', align: 'center', key: 'so_luong_sach' },
];

// Tính toán dynamic để lọc dữ liệu dựa trên search
const filteredItems = computed(() => {
    return LoaiSachData.value.filter(item => !item.is_deleted &&
        item.id_ke === mySelectedKe.value &&
        String(item.ten_the_loai).toLowerCase().includes(search.value.toLowerCase())
    );
});

const dynamicHeaders = computed(() => {
    if (isType1) {
        return [...headers, { title: 'Hành động', align: 'center', key: 'action' }];
    }
    return headers;
});
const mySelectedKe = computed(() => selectedKe.value);
onMounted(() => {
    LoaiSachData.value = loadItemsFromLocalStorage();
});

watch(mySelectedKe, (newVal) => {
    console.log('SelectedKe được thay đổi:', newVal);
});

function loadItemsFromLocalStorage(): Array<LoaiSachModel> {
    const savedData = localStorage.getItem('LoaiData');
    return savedData ? JSON.parse(savedData) : [];
}

function onUpdate(item: LoaiSachModel) {
    showDialog.value = true;
    add.value = false;
    currentItem.value = { ...item }; // Sao chép item vào currentItem
}

function save() {
    if (add.value) {
        const maxId = Math.max(...LoaiSachData.value.map(item => item.the_loai_id || 0));
        currentItem.value.the_loai_id = maxId + 1;
        currentItem.value.is_deleted = false;
        LoaiSachData.value.push({ ...currentItem.value });
    } else {
        // Logic để cập nhật item hiện có
        const index = LoaiSachData.value.findIndex(d => d.the_loai_id === currentItem.value.the_loai_id);
        if (index !== -1) {
            LoaiSachData.value[index] = { ...currentItem.value };
        }
    }

    // Lưu data vào localStorage
    localStorage.setItem('LoaiData', JSON.stringify(LoaiSachData.value));
    showDialog.value = false;
}

function openAddDialog() {
    currentItem.value = {};
    add.value = true;
    showDialog.value = true;
}

function onAddCart(item: LoaiSachModel) {
    confirm('Đã thêm ' + item.the_loai_id + ' vào giỏ hàng');
    console.log(selectedKe);
}

function onDelete(item: LoaiSachModel) {
    if (confirm('Bạn có chắc chắn muốn xóa mục này không?')) {
        item.is_deleted = true;
        console.log(item);
    }
    localStorage.setItem('LoaiData', JSON.stringify(LoaiSachData.value));
}

function onRowClick(event, item) {
    console.log('Row clicked:', item.item.the_loai_id);
    localStorage.setItem('selectedLoai', JSON.stringify(item.item.the_loai_id));
    const newLoai = item.item.the_loai_id; // Lấy từ dữ liệu dòng bị click
    selectedLoai.value = newLoai;
}
</script>
