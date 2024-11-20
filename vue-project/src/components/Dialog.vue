<template>
    <v-dialog max-width="500" v-model="show">
        <v-card title="Cap nhat thong tin">
            <v-card-text>
                <v-text-field :label="'Ten sach'" v-model="sach.name" />
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn text="Close" variant="plain" @click="show = false"></v-btn>

                <v-btn color="primary" text="Save" variant="tonal" @click="onSave"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';


interface SachModel {
    index: number;
    name: string;
}

const {showDialog, sach} = defineProps<{
  showDialog: boolean,
  sach: Sach
}>();

const show: boolean = ref(false);

watch(
    () => showDialog,
    () => {
        show.value = showDialog;
    }
)

</script>