<template>
    <v-dialog v-model="showMuonSachDialog" persistent max-width="90vw" :style="{ maxHeight: '80vh' }">
        <v-card>
            <!-- Toolbar cho dialog -->
            <v-toolbar color="#FFFFFF">
                <v-toolbar-title>{{ title }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-inner-icon="mdi-magnify" label="Tìm kiếm" hide-details
                    density="comfortable" center-affix flat>
                </v-text-field>
                <v-btn v-if="isType1" icon color="primary" @click="openMuonSachDialog">
                    <v-icon>mdi-plus-circle</v-icon>
                </v-btn>
            </v-toolbar>

            <!-- Bảng dữ liệu -->
            <v-data-table :headers="headers" :items="filteredItems" density="compact" :item-key="id_sach" height="350px"
                fixed-header :header-props="({ style: 'background-color: #4169E1; color: #ffffff;' })" hover>
                <template v-slot:item.action="{ item }">
                    <v-btn icon='mdi-minus-circle' @click.stop="onDelete(item)"></v-btn>
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
                <v-btn color="red darken-1" @click="DongMuonSach">Đóng</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- nút giỏ hàng -->
    <div class="content-container">
        <!-- Nút giỏ hàng -->
        <button class="cart-button" @click="openMuonSachDialog">
            <span class="mdi mdi-cart-variant"></span>
        </button>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue';
import { MuonSach, SachData } from '../javascript/state.js';

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

const title = 'Danh sách mượn'; // Tiêu đề cho toolbar
const showDialog = ref(false);
const showMuonSachDialog = ref(false);
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
    { title: 'Trả sách', align: 'center', key: 'action' }
];

// Tính toán dynamic để lọc dữ liệu dựa trên search
const filteredItems = computed(() => {
    return MuonSach.value.filter(item => !item.is_deleted &&
        String(item.ten_sach).toLowerCase().includes(search.value.toLowerCase())
    );
});

onMounted(() => {
    MuonSach.value = loadItemsFromLocalStorage();
    // SachData.value = JSON.parse(localStorage.getItem('SachData'));
});

watch(MuonSach, (newVal) => {
    // console.log(newVal);
});
watch(SachData, (newVal) => { })

function loadItemsFromLocalStorage(): Array<SachModel> {
    const savedData = localStorage.getItem('MuonSach');
    return savedData ? JSON.parse(savedData) : [];
}

function openMuonSachDialog() {
    currentItem.value = {};
    showMuonSachDialog.value = true;
}

function onDelete(item: SachModel) {
    item.isAdded = false;
    const index = SachData.value.findIndex(d => d.id_sach === item.id_sach);
    if (index !== -1) {
        SachData.value[index] = { ...item };
    }
    // MuonSach.value.removeItem(item);
    console.log('trả sách: ', item);
    localStorage.setItem('SachData', JSON.stringify(SachData.value));
    // console.log(item);
    // item.isAdded = false;
    // // localStorage.setItem('SachData', JSON.stringify(MuonSach.value));
    // console.log(item);
    MuonSach.value = MuonSach.value.filter(existed => existed.id_sach !== item.id_sach);

}

function DongMuonSach() {
    showMuonSachDialog.value = false;
}

</script>

<style scoped>
.content-container {
    /* Sử dụng Flexbox để sắp xếp nội dung theo chiều dọc */
    display: flex;
    flex-direction: column;
    padding: 20px;
    /* Đảm bảo có đủ không gian cho nút và khoảng cách */
}

.cart-button {
    background-color: rgba(24, 103, 192, 1);
    border: none;
    border-radius: 50%;
    width: 56px;
    height: 56px;
    color: white;
    align-self: end;
    /* Căn giữa theo chiều ngang nếu cần */
    margin-top: auto;
    /* Đẩy nút xuống cuối của phần tử cha */
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
</style>