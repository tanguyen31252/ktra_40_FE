<template>
    <v-dialog class="dialog-container" v-model="showSachDialog" persistent max-width="90vw" :style="{ maxHeight: '80vh' }">
        <v-card>
            <!-- Toolbar cho dialog -->
            <v-toolbar color="#FFFFFF">
                <v-toolbar-title>{{ title }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-inner-icon="mdi-magnify" label="Tìm kiếm" hide-details
                    density="comfortable" center-affix flat>
                </v-text-field>
                <v-btn v-if="isType1" icon color="primary" @click="openAddDialog">
                    <v-icon>mdi-plus-circle</v-icon>
                </v-btn>
            </v-toolbar>

            <!-- Bảng dữ liệu -->
            <v-data-table :headers="headers" :items="filteredItems" density="compact" :item-key="the_loai_id"
                height="350px" fixed-header :header-props="({ style: 'background-color: #4169E1; color: #ffffff;' })"
                hover>
                <template v-slot:item.action="{ item }">
                    <v-btn :icon="getButtonIcon(item)" :disabled="isItemAdded(item)"
                        @click.stop="onAddCart(item)"></v-btn>
                    <v-btn v-if="isType1" icon="mdi-pencil" @click.stop="onUpdate(item)"></v-btn>
                    <v-btn v-if="isType1" icon="mdi-delete" @click.stop="onDelete(item)"></v-btn>
                </template>
            </v-data-table>

            <!-- Dialog để thêm mới hoặc cập nhật thông tin sách -->
            <v-dialog v-model="showDialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="text-h5">{{ add ? 'Thêm mới' : 'Cập nhật' }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-form ref="form">
                            <v-text-field v-model="currentItem.ten_sach" label="Tên sách" required></v-text-field>
                            <v-text-field v-model="currentItem.tac_gia" label="Tác giả" required></v-text-field>
                            <v-text-field v-model="currentItem.nxb" label="NXB" required></v-text-field>
                            <!-- <v-select v-model.number="currentItem.the_loai_id" label="Thể loại" required
                                :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"></v-select> -->
                            <v-select v-if="!add" v-model="currentItem.tinh_trang" label="Tình trạng" required
                                :items="['Hết sách', 'Còn sách']"></v-select>
                        </v-form>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" @click="showDialog = false">Hủy</v-btn>
                        <v-btn color="blue darken-1" @click="save">Lưu</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" @click="DongSach">Đóng</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue';
import { selectedLoai, MuonSach, SachData } from '../javascript/state.js';

interface SachModel {
    id_sach?: number;
    ten_sach?: string;
    tac_gia?: string;
    nxb?: string;
    the_loai_id?: number;
    tinh_trang?: string;
    isAdded?: boolean;
    is_deleted?: boolean;
}

const title = 'Sách'; // Tiêu đề cho toolbar
const showDialog = ref(false);
const showSachDialog = ref(false);
// const SachData = ref<Array<SachModel>>([]);
const currentItem = ref<SachModel>({});
const add = ref(true);
const search = ref('');
const userRole = localStorage.getItem('userRole');
const isType1 = userRole === '1';

const headers = [
    { title: 'Tên sách', align: 'start', key: 'ten_sach', },
    { title: 'Tác giả', align: 'center', key: 'tac_gia' },
    { title: 'NXB', align: 'center', key: 'nxb' },
    { title: 'Tình trạng', align: 'center', key: 'tinh_trang' },
    { title: 'Mượn sách', align: 'center', key: 'action' }
];

// Tính toán dynamic để lọc dữ liệu dựa trên search
const filteredItems = computed(() => {
    return SachData.value.filter(item => !item.is_deleted &&
        item.the_loai_id == selectedLoai.value &&
        String(item.ten_sach).toLowerCase().includes(search.value.toLowerCase())
    );
});

const mySelectedLoai = computed(() => selectedLoai.value);
onMounted(() => {
    SachData.value = loadItemsFromLocalStorage();
});

watch(selectedLoai, (newVal) => {
    if (newVal == null) { return; }
    showSachDialog.value = true;
});

watch(SachData, (newVal) => { })

function loadItemsFromLocalStorage(): Array<SachModel> {
    const savedData = localStorage.getItem('SachData');
    return savedData ? JSON.parse(savedData) : [];
}

function onUpdate(item: SachModel) {
    showDialog.value = true;
    add.value = false;
    currentItem.value = { ...item }; // Sao chép item vào currentItem
}

function save() {
    if (add.value) {
        const maxId = Math.max(...SachData.value.map(item => item.id_sach || 0));
        currentItem.value.id_sach = maxId + 1;
        currentItem.value.is_deleted = false;
        currentItem.value.tinh_trang = 'Còn sách';
        currentItem.value.the_loai_id = selectedLoai.value;
        currentItem.value.isAdded = false;
        SachData.value.push({ ...currentItem.value });
    } else {
        // Logic để cập nhật item hiện có
        const index = SachData.value.findIndex(d => d.id_sach === currentItem.value.id_sach);
        if (index !== -1) {
            SachData.value[index] = { ...currentItem.value };
        }
    }

    // Lưu data vào localStorage
    localStorage.setItem('SachData', JSON.stringify(SachData.value));
    showDialog.value = false;
}

function openAddDialog() {
    currentItem.value = {};
    add.value = true;
    showDialog.value = true;
}

function onAddCart(item: SachModel) {
    if (!isItemAdded(item)) {
        item.isAdded = true;
        MuonSach.value.push(item);
        console.log('mượn sách: ', item);
        localStorage.setItem('SachData', JSON.stringify(SachData.value));
    }
}

function isItemAdded(item: SachModel) {
    // return MuonSach.value.some(addedItem => addedItem.id_sach === item.id_sach);
    return item.tinh_trang === 'Hết sách' || item.isAdded;

}

function getButtonIcon(item: SachModel) {
    if (item.tinh_trang == 'Hết sách') {
        return 'mdi-cancel';
    }

    return isItemAdded(item) ? 'mdi-check-circle' : 'mdi-plus-circle';
}


function onDelete(item: SachModel) {
    if (confirm('Bạn có chắc chắn muốn xóa mục này không?')) {
        item.is_deleted = true;
        // item.isAdded = false;
        // console.log(item);
    }
    localStorage.setItem('SachData', JSON.stringify(SachData.value));
}

function DongSach() {
    showSachDialog.value = false;
    selectedLoai.value = null;
    localStorage.removeItem('selectedLoai');
}

</script>
