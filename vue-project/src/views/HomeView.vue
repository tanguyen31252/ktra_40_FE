<script lang="ts" setup>
import KeSachPage from '../components/KeSachPage.vue';
import LoaiSachPage from '../components/LoaiSachPage.vue';
import SachPage from '../components/SachPage.vue';
</script>

<template>
  <div class="table-row">
    <div class="table-container">
      <KeSachPage />
    </div>
    <div class="table-container">
      <LoaiSachPage />
    </div>
  </div>
  <sach-page />
</template>

<style>
.table-row {
  display: flex;
  flex-wrap: wrap; /* Cho phép các phần tử con xuống dòng nếu không còn đủ chỗ */
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin: 20px auto;
  padding: 10px;
}

.table-container {
  flex: 1;
  min-width: 300px; /* Đảm bảo có kích thước tối thiểu cho bảng, điều này sẽ giúp với độ rộng nhỏ */
  padding: 10px;
  border: 2px solid #007BFF;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow: auto;
}

@media (max-width: 768px) {
  .table-container {
    flex: 100%;
    min-width: auto; /* Loại bỏ kích thước tối thiểu khi trên màn hình nhỏ */
  }
}
</style>