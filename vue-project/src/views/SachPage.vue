<template>
    <v-data-table :headers="headers" :items="sachs">
        <template v-slot:item.action="{ item }">
            <v-btn icon="mdi-pencil" @click="onUpdate(item)"></v-btn>
        </template>
    </v-data-table>
    <dialog-form :showDialog="dialog" :sach="sach">

    </dialog-form>
</template>
<script lang="ts" setup>
import DialogForm from "@/components/Dialog.vue";
import { ref } from 'vue';

interface SachModel {
    index: number;
    name: string;
}

interface TableHeaderModel{
    title: string;
    key: string;
}

const headers = ref<Array<TableHeaderModel>>([
    {
        title: '#',
        key: 'index',
    },
    {
        title: 'Name',
        key: 'name',
    },
    {
        title: 'Hanh dong',
        key: 'action',
    }
])

const sachs = ref<Array<SachModel>>([
    {
        index: 0,
        name: 'Giao duc cong dan'
    },
    {
        index: 1,
        name: 'Tai nghe'
    }
])

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
        if (item)
            item.name = sach.value.name;

        //luuu data vao localstorage
        localStorage.setItem('sachs', JSON.stringify(sachs.value));

        dialog.value = false;
    }
}
</script>