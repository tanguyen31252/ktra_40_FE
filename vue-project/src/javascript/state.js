import { ref, watch } from 'vue';

// Biến phản ứng toàn cục
export const selectedKe = ref(localStorage.getItem('selectedKe')
  ? parseInt(localStorage.getItem('selectedKe'), 10)
  : null);
export const selectedLoai = ref(localStorage.getItem('selectedLoai')
  ? parseInt(localStorage.getItem('selectedLoai'), 10)
  : null);
// Theo dõi và đồng bộ với localStorage khi có thay đổi
watch(selectedKe, (newValue) => {
  if (newValue !== null) {
    localStorage.setItem('selectedKe', newValue);
  }
});
watch(selectedLoai, (newValue) => {
  if (newValue !== null) {
    localStorage.setItem('selectedLoai', newValue);
  }
});
