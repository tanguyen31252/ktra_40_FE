<template>
    <div class="table-container">
        <ReusableTable :title="tableTitle" :headers="userHeaders" :items="userData" :item-fields="userFields"
            :items-per-page="5" :enable-add-to-cart="true" @row-click="openRowDialog" />

        <!-- Dialog for displaying row click details -->
        <v-dialog v-model="rowDialog" max-width="500px">
            <v-card>
                <v-card-title class="headline">Thông tin chi tiết</v-card-title>
                <v-card-text>
                    <p>{{ selectedItem }}</p> <!-- Hiển thị thông tin chi tiết của mục đã chọn -->
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeRowDialog">Đóng</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ReusableTable from '../components/TestTable.vue';

export default defineComponent({
    name: 'UserList',
    components: {
        ReusableTable,
    },
    data() {
        return {
            tableTitle: 'Loại sách',
            userHeaders: [
                { title: 'Loại ', align: 'center', value: 'id_ke', sortable: true },
                { title: 'Tên Thể Loại', align: 'center', value: 'sl_loai', sortable: true },
                // { title: 'Số Lượng Sách', align: 'center', value: 'so_luong_sach', sortable: true },
                // { title: 'Kệ', align: 'center', value: 'id_ke', sortable: true },
            ],
            userData: JSON.parse(localStorage.getItem('keData') || '[]'),
            userFields: [
                { text: 'Loại', value: 'id_ke' },
                { text: 'Tên Thể Loại', value: 'sl_loai' },
                // { text: 'Số Lượng Sách', value: 'so_luong_sach' },
                // { text: 'Kệ', value: 'id_ke' },
            ],
            rowDialog: false,
            selectedItem: {},
        };
    },
    computed: {
        filteredItems() {
            if (!this.search) {
                return this.userData;
            }
            return this.userData.filter((item) =>
                Object.values(item)
                    .join(' ')
                    .toLowerCase()
                    .includes(this.search.toLowerCase())
            );
        },
    },
    methods: {
        openRowDialog(item) {
            this.selectedItem = item;
            this.rowDialog = true;
        },
        closeRowDialog() {
            this.rowDialog = false;
            this.selectedItem = {};
        },
    },
});
</script>

<style >
table {
    table-layout: fixed;
    /* Giữ kích thước cố định cho các ô */
    border-collapse: collapse;
    /* Loại bỏ khoảng cách giữa các ô */
}

th:nth-child(1),
td:nth-child(1) {
    width: 15%;
    /* Kích thước cột 1 */
}

th:nth-child(2),
td:nth-child(2) {
    width: 35%;
    /* Kích thước cột 2 */
}

th:nth-child(3),
td:nth-child(3) {
    width: 15%;
    /* Kích thước cột 3 */
}

th:nth-child(4),
td:nth-child(4) {
    width: 15%;
    /* Kích thước cột 3 */
}

th:nth-child(5),
td:nth-child(5) {
    width: 20%;
    /* Kích thước cột 5 */
}

th,
td {
    border: 1px solid #ddd;
    /* Đường viền ô */
    padding: 8px;
    /* Khoảng cách trong ô */
    word-wrap: break-word;
    /* Ngắt dòng nếu quá dài */
}
</style>