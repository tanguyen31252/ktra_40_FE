<template>
  <v-data-table
  filter-mode="some"
    height="windowHeight"
    fixed-header
    hover
    items-per-page=5
    :headers="headers"
    :items="data"
    item-value="name"
    color="red"
    :footer-props="{ 'items-per-page-options': [5, 10, 20, -1] }"
    expand-on-click
  >
  </v-data-table>
</template>

<script lang="ts">
import { VDataTable } from 'vuetify/components';

export default {
  components: {
    VDataTable
  },
  setup() {
    return {
      headers: [
        {
          text: 'Name',
          align: 'center',
          sortable: true,
          value: 'name',
          width: '100px',
          fixed: true
        },
        {
          text: 'Calories',
          align: 'center',
          sortable: true,
          width: '100px',
          value: 'calories',
          fixed: true
        },
      ],
      data: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          test: 1,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          test: 1,
        },
        {
          name: 'Eclair',
          calories: 262,
          test: 1,
        },
        {
          name: 'Cupcake',
          calories: 305,
          test: 1,
        },
        {
          name: 'Gingerbread',
          calories: 356,
          test: 1,
        },
        {
          name: 'Jelly bean',
          calories: 375,
          test: 1,
        },
        {
          name: 'Lollipop',
          calories: 392,
          test: 1,
        },
        {
          name: 'Honeycomb',
          calories: 408,
          test: 1,
        },
        {
          name: 'Donut',
          calories: 452,
          test: 1,
        },
        {
          name: 'KitKat',
          calories: 518,
          test: 1,
        },
      ],
    };
  },
};
</script>