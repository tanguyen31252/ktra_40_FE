<template>
    <v-data-table :headers="headers" :items="sachs" fixed-header items-per-page="5" dense hover>
        <template v-slot:item.action="{ item }">
            <v-btn icon="mdi-pencil" @click="onUpdate(item)"></v-btn>
        </template>
    </v-data-table>
    <dialog-form :showDialog="dialog" :sach="sach">
    </dialog-form>
</template>
<script lang="ts" setup>
import DialogForm from "@/components/Dialog.vue";
import { ref, onMounted } from 'vue';

interface SachModel {
    index: number;
    name: string;
}

interface TableHeaderModel {
    title: string;
    key: string;
}

const headers = ref<Array<TableHeaderModel>>([
    {
        title: 'Kệ',
        key: 'id_ke',
    },
    {
        title: 'Số lượng loại',
        key: 'sl_loai',
    },
    {
        title: 'Tình trạng',
        key: 'is_full',
    },
    {
        title: 'Hành động',
        key: 'action',
    }
]);

// Khởi tạo `sachs` là mảng trống để sau này lấy dữ liệu từ localStorage
const sachs = ref<Array<SachModel>>([]);

const sach = ref<SachModel>({
    index: -1,
    name: ''
});

const dialog = ref(false);

function onUpdate(item: any) {
    Object.assign(sach.value, item);
    dialog.value = true;
}

function onSave() {
    if (sach.value) {
        let item = sachs.value.find(d => { return d.index == sach.value.index });
        if (item) {
            item.name = sach.value.name;
        }

        // Lưu data vào localStorage
        localStorage.setItem('keData', JSON.stringify(sachs.value));
        dialog.value = false;
    }
}

// Sử dụng hook onMounted để lấy dữ liệu từ localStorage khi component được khởi tạo
onMounted(() => {
    const savedData = localStorage.getItem('keData');
    if (savedData) {
        sachs.value = JSON.parse(savedData);
    }
});
</script>
