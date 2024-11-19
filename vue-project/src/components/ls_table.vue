<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="filteredItems"
      dense
      fixed-header
      items-per-page="5"
      class="elevation-1"
      :header-props="{
        style: 'background-color: #4169E1; color: #ffffff;',
      }"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Bảng</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Tìm kiếm"
            single-line
            hide-details
          ></v-text-field>
        </v-toolbar>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    const search = ref('')
    const items = ref([])
    // Khi component được mounted, tải dữ liệu từ localStorage
    onMounted(() => {
      const storedData = localStorage.getItem('keData')
      if (storedData) {
        items.value = JSON.parse(storedData)
      } else {
        console.log('Không có dữ liệu trong localStorage')
      }
    })

    // Computed property để lọc các item theo từ khóa tìm kiếm
    const filteredItems = computed(() => {
      return data.filter((item) => {
        return item.ten_sach.toString().includes(search.value)
      })
    })

    return {
      search,
      headers: [
       { title: 'id_sach', align: 'center', value: 'id_sach', sortable: true },
        { title: 'ten_sach', align: 'center', value: 'ten_sach', sortable: true },
        { title: 'tac_gia', align: 'center', value: 'tac_gia', sortable: true },
        { title: 'nxb', align: 'center', value: 'nxb', sortable: true },
        { title: 'tinh_trang', align: 'center', value: 'tinh_trang', sortable: true },
        { title: 'the_loai_id', align: 'center', value: 'the_loai_id', sortable: true },

      ],
      filteredItems,
    }
  },
}
// Dữ liệu JSON bạn muốn lưu vào localStorage
const data = [
{ id_sach: 1, ten_sach: "Code dạo kí sự – Lập trình viên đâu phải chỉ biết code", tac_gia: "Phạm Huy Hoàng", nxb: "NXB Dân trí", tinh_trang: "Còn sách"
 ,the_loai_id: 1},
{ id_sach: 2, ten_sach: "Lập trình và cuộc sống", tac_gia: "Jeff Atwood", nxb: "NXB Dân trí", tinh_trang: "Đang mượn"
,the_loai_id: 1},
 { id_sach: 3, ten_sach: "Giáo trình Lập trình C căn bản", tac_gia: "Đoàn Văn Ban", nxb: "NXB Giáo Dục Việt Nam", tinh_trang: "Còn sách"
 ,the_loai_id: 1},
 { id_sach: 4, ten_sach: "Lập trình Python cơ bản và nâng cao", tac_gia: "Phạm Quang Dũng", nxb: "NXB Thông Tin và Truyền Thông", tinh_trang: "Còn sách"
 ,the_loai_id: 1},
 { id_sach: 5, ten_sach: "Cấu trúc dữ liệu và Giải thuật", tac_gia: "Lê Minh Hoàng", nxb: "NXB Khoa Học và Kỹ Thuật", tinh_trang: "Còn sách"
 ,the_loai_id: 1},
 { id_sach: 6, ten_sach: "Thiết kế và lập trình Web với HTML & CSS", tac_gia: "Nguyễn Đức Cương", nxb: "NXB Lao Động Xã Hội", tinh_trang: "Còn sách"
 ,the_loai_id: 1},
 { id_sach: 7, ten_sach: "An toàn bảo mật thông tin", tac_gia: "Đặng Văn Đức", nxb: "NNXB Khoa Học và Kỹ Thuật", tinh_trang: "Còn sách"
 ,the_loai_id: 1},
 { id_sach: 8, ten_sach: "Giáo trình Lập trình C++", tac_gia: "Đỗ Xuân Tiến", nxb: "NXB Giáo Dục Việt Nam", tinh_trang: "Đang mượn"
 ,the_loai_id: 1},
 { id_sach: 9, ten_sach: "Lập trình web với PHP và MySQL", tac_gia: "Trần Văn Hoài", nxb: "NXB Bách Khoa Hà Nội", tinh_trang: "Còn sách"
 ,the_loai_id: 1},
 { id_sach: 10, ten_sach: "Cơ sở dữ liệu quan hệ và SQL", tac_gia: "Nguyễn Minh Hoàng", nxb: "NXB Thông Tin và Truyền Thông", tinh_trang: "Còn sách"
 ,the_loai_id: 1},
 { id_sach: 11, ten_sach: "Công nghệ XML và ứng dụng", tac_gia: "Phạm Thị Thu Thúy", nxb: "NXB Khoa Học và Kỹ Thuật", tinh_trang: "Đang mượn"
 ,the_loai_id: 1},
{ id_sach: 12, ten_sach: "Hướng dẫn lập trình quản lý với Microsoft Access", tac_gia: "Huỳnh Tôn Nghĩa", nxb: "NXB Thanh Niên", tinh_trang: "Đang mượn"
 ,the_loai_id: 1},
 { id_sach: 13, ten_sach: "Giáo trình cơ sở an toàn thông tin", tac_gia: "Nguyễn Khanh Văn", nxb: "NXB Bách Khoa Hà Nội", tinh_trang: "Còn sách"
 ,the_loai_id: 1},
 { id_sach: 14, ten_sach: "Giáo trình mạng máy tính", tac_gia: "Nguyễn Thế Lộc", nxb: "NXB Đại học Sư Phạm", tinh_trang: "Còn sách"
 ,the_loai_id: 1},
{ id_sach: 15, ten_sach: "Quản trị an toàn, An ninh mạng", tac_gia: "Keisuke Kamata", nxb: "NXB Thông tin Truyền thông", tinh_trang: "Còn sách"
 ,the_loai_id: 1},
{ id_sach: 16, ten_sach: "Chiến lược đại dương xanh", tac_gia: "W. Chan Kim và Renée Mauborgne", nxb: "NXB Tri Thức", tinh_trang: "Đang mượn"
 ,the_loai_id: 2},
 { id_sach: 17, ten_sach: "Quản lý chuỗi cung ứng", tac_gia: "PGS.TS. Nguyễn Thanh Liêm", nxb: "NXB Giao Thông Vận Tải", tinh_trang: "Đang mượn"
 ,the_loai_id: 2},
 { id_sach: 18, ten_sach: "Kế toán quản trị doanh nghiệp", tac_gia: "PGS.TS. Nguyễn Văn Công", nxb: "NXB Tài Chính", tinh_trang: "Còn sách"
 ,the_loai_id: 2},
 { id_sach: 19, ten_sach: "Nghệ thuật lãnh đạo", tac_gia: "John C. Maxwell", nxb: "NXB Lao Động", tinh_trang: "Còn sách"
 ,the_loai_id: 2},
 { id_sach: 20, ten_sach: "Quản trị tài chính doanh nghiệp", tac_gia: "PGS.TS. Phạm Hồng Phú", nxb: "NXB Thống Kê", tinh_trang: "Còn sách"
 ,the_loai_id: 2},
 { id_sach: 21, ten_sach: "Quản trị nhân sự hiện đại", tac_gia: "PGS.TS. Nguyễn Hữu Lam", nxb: "NXB Tổng Hợp TP.HCM", tinh_trang: "Đang mượn"
 ,the_loai_id: 2},
 { id_sach: 22, ten_sach: "Quản trị marketing", tac_gia: "PGS.TS. Trương Đình Chiến", nxb: "Đại Học Kinh Tế Quốc Dân", tinh_trang: "Còn sách"
 ,the_loai_id: 2},
{ id_sach: 23, ten_sach: "Chiến lược cạnh tranh", tac_gia: "GS. Michael E. Porter", nxb: "NXB Trẻ", tinh_trang: "Còn sách"
 ,the_loai_id: 2},
 { id_sach: 24, ten_sach: "Quản trị học", tac_gia: "PGS.TS. Nguyễn Thị Liên Diệp", nxb: "NXB Lao Động - Xã Hội", tinh_trang: "Đang mượn"
 ,the_loai_id: 2},
 { id_sach: 25, ten_sach: "Quản Trị Kinh Doanh Hiện Đại", tac_gia: "PGS.TS. Nguyễn Đình Thọ", nxb: "NXB Lao Động Xã Hội", tinh_trang: "Đang mượn"
 ,the_loai_id: 2},
 { id_sach: 26, ten_sach: "Marketing Căn Bản", tac_gia: "GS.TS. Trần Minh Đạo", nxb: "NXB Đại Học Kinh Tế Quốc Dân", tinh_trang: "Còn sách"
 ,the_loai_id: 2},
 { id_sach: 27, ten_sach: "Thiết kế đồ họa – Nghệ thuật và công cụ", tac_gia: "Nguyễn Đức Hưng", nxb: "NXB Đại Học Kinh Tế Quốc Dân", tinh_trang: "Còn sách"
 ,the_loai_id: 3},
 { id_sach: 28, ten_sach: "Hướng dẫn thiết kế đồ họa với Adobe Photoshop", tac_gia: "Trần Thiện Lộc", nxb: "NXB Đại học Quốc gia TP.HCM", tinh_trang: "Đang mượn"
 ,the_loai_id: 3},
 { id_sach: 29, ten_sach: "Học thiết kế đồ họa cùng Illustrator", tac_gia: "Nguyễn Hoàng Nam", nxb: "NXB Lao Động", tinh_trang: "Còn sách"
 ,the_loai_id: 3},
 { id_sach: 30, ten_sach: "Thiết kế đồ họa – Lý thuyết và thực hành", tac_gia: "Nguyễn Minh Hoàng", nxb: "NXB Tổng hợp TP.HCM", tinh_trang: "Còn sách"
 ,the_loai_id: 3},
 { id_sach: 31, ten_sach: "Tạo dựng hình ảnh trong thiết kế đồ họa", tac_gia: "Đoàn Minh Phương", nxb: "NXB Văn hóa - Thông tin", tinh_trang: "Còn sách"
 ,the_loai_id: 3},
 { id_sach: 32, ten_sach: "Thiết kế đồ họa với phần mềm CorelDRAW", tac_gia: "Phan Đức Hải", nxb: "NXB Khoa học và Kỹ thuật", tinh_trang: "Còn sách"
 ,the_loai_id: 3},
 { id_sach: 33, ten_sach: "Adobe InDesign CC – Tự học thiết kế đồ họa", tac_gia: "Phan Văn Nam", nxb: "NXB Hồng Đức", tinh_trang: "Đang mượn"
 ,the_loai_id: 3},
 { id_sach: 34, ten_sach: "Thiết kế đồ họa: Nguyên lý và ứng dụng", tac_gia: "Đặng Hoàng Sơn", nxb: "NXB Đại học Sư phạm TP.HCM", tinh_trang: "Đang mượn"
 ,the_loai_id: 3},
 { id_sach: 35, ten_sach: "Giới thiệu thiết kế đồ họa và các xu hướng mới", tac_gia: "Lê Quang Đức", nxb: "NXB Văn hóa Sài Gòn", tinh_trang: "Còn sách"
 ,the_loai_id: 4},
 { id_sach: 36, ten_sach: "Dược học đại cương", tac_gia: "PGS.TS. Nguyễn Thanh Hải", nxb: "NXB Y học", tinh_trang: "Còn sách"
 ,the_loai_id: 4},
 { id_sach: 37, ten_sach: "Dược lý học", tac_gia: "PGS.TS. Đặng Quốc Chính", nxb: "NXB Y học", tinh_trang: "Đang mượn"
 ,the_loai_id: 4},
 { id_sach: 38, ten_sach: "Dược phẩm và sức khỏe cộng đồng", tac_gia: "TS. Nguyễn Thị Lan", nxb: "NXB Đại học Quốc gia Hà Nội", tinh_trang: "Còn sách"
 ,the_loai_id: 4},
 { id_sach: 39, ten_sach: "Hướng dẫn thực hành dược lý", tac_gia: "PGS.TS. Nguyễn Thị Thúy", nxb: "NXB Y học", tinh_trang: "Còn sách"
 ,the_loai_id: 4},
 { id_sach: 40, ten_sach: "Công nghệ dược", tac_gia: "TS. Phan Thanh Sơn", nxb: "NXB Y học", tinh_trang: "Còn sách"
 ,the_loai_id: 4},
 { id_sach: 41, ten_sach: "Hóa dược", tac_gia: "TS. Nguyễn Đình Lộc", nxb: "NXB Y học", tinh_trang: "Đang mượn"
 ,the_loai_id: 4},
 { id_sach: 42, ten_sach: "Dược liệu học", tac_gia: "TS. Phan Thị Tố Uyên", nxb: "NXB Y học", tinh_trang: "Còn sách"
 ,the_loai_id: 4},
 { id_sach: 43, ten_sach: "Chế phẩm dược", tac_gia: "TS. Nguyễn Thị Kim Oanh", nxb: "NXB Y học", tinh_trang: "Đang mượn"
 ,the_loai_id: 4},
 { id_sach: 44, ten_sach: "Bài giảng dược học lâm sàng", tac_gia: "PGS.TS. Lê Quang Cẩm", nxb: "NXB Đại học Y Hà Nội", tinh_trang: "Còn sách"
 ,the_loai_id: 4},
 { id_sach: 45, ten_sach: "Dược học lâm sàng", tac_gia: "PGS.TS. Trần Minh Huyền", nxb: "NXB Y học", tinh_trang: "Còn sách"
 ,the_loai_id: 4},
 { id_sach: 46, ten_sach: "Thực hành sản xuất thuốc", tac_gia: "PGS.TS. Nguyễn Văn Tâm", nxb: "NXB Đại học Y Dược TP.HCM", tinh_trang: "Còn sách"
 ,the_loai_id: 4},
 { id_sach: 47, ten_sach: "Dược học cổ truyền", tac_gia: "TS. Lê Đình Bôn", nxb: "NXB Y học", tinh_trang: "Đang mượn"
 ,the_loai_id: 4},
 { id_sach: 48, ten_sach: "Dược học cho sinh viên y dược", tac_gia: "PGS.TS. Nguyễn Quang Minh", nxb: "NXB Đại học Y Hà Nội", tinh_trang: "Đang mượn"
 ,the_loai_id: 4},
 { id_sach: 49, ten_sach: "Dược phẩm và bệnh lý học", tac_gia: "TS. Lương Thị Nhàn", nxb: "NXB Y học", tinh_trang: "Còn sách"
 ,the_loai_id: 4},
 { id_sach: 50, ten_sach: "Kiến thức cơ bản về thuốc", tac_gia: "PGS.TS. Trần Hoàng Bích", nxb: "NXB Đại học Y Hà Nội", tinh_trang: "Đang mượn"
 ,the_loai_id: 4},
 { id_sach: 51, ten_sach: "Thuốc và các biện pháp điều trị bệnh", tac_gia: "TS. Nguyễn Phan Khánh", nxb: "NXB Y học", tinh_trang: "Đang mượn"
 ,the_loai_id: 4},
 { id_sach: 52, ten_sach: "Kỹ thuật pha chế thuốc", tac_gia: "PGS.TS. Phan Thị Kim Dung", nxb: "NXB Đại học Y Dược TP.HCM", tinh_trang: "Còn sách"
 ,the_loai_id: 4},
 { id_sach: 53, ten_sach: "Dược phẩm trong điều trị bệnh lý tim mạch", tac_gia: "TS. Lê Minh Trí", nxb: "NXB Y học", tinh_trang: "Còn sách"
 ,the_loai_id: 4},
 { id_sach: 54, ten_sach: "Dược học lâm sàng trong điều trị ung thư", tac_gia: "TS. Nguyễn Mạnh Toàn", nxb: "NXB Y học", tinh_trang: "Còn sách"
 ,the_loai_id: 4},
 { id_sach: 55, ten_sach: "Công nghệ sản xuất thuốc tiêm", tac_gia: "PGS.TS. Nguyễn Hoàng Sơn", nxb: "NXB Y học", tinh_trang: "Đang mượn"
 ,the_loai_id: 4},
 { id_sach: 56, ten_sach: "Tra cứu thuốc", tac_gia: "Lê Quang Đức", nxb: "NXB Văn hóa Sài Gòn", tinh_trang: "Còn sách"
 ,the_loai_id: 4},
 { id_sach: 57, ten_sach: "Khám phá miền Tây Việt Nam", tac_gia: "Nguyễn Thị Lan", nxb: "NXB Du lịch", tinh_trang: "Còn sách"
 ,the_loai_id: 5},
 { id_sach: 58, ten_sach: "Hành trình khám phá Phú Quốc", tac_gia: "Trần Văn Hùng", nxb: "NXB Trẻ", tinh_trang: "Còn sách"
 ,the_loai_id: 5},
 { id_sach: 59, ten_sach: "Du lịch miền Bắc Việt Nam", tac_gia: "Lê Minh Tâm", nxb: "NXB Chính trị Quốc gia", tinh_trang: "Còn sách"
 ,the_loai_id: 5},
 { id_sach: 60, ten_sach: "Khám phá vịnh Hạ Long", tac_gia: "Phan Thiên An", nxb: "NXB Hà Nội", tinh_trang: "Đang mượn"
 ,the_loai_id: 5},
 { id_sach: 61, ten_sach: "Du lịch văn hóa Huế", tac_gia: "Nguyễn Hoàng Sơn", nxb: "NXB Khoa học Xã hội", tinh_trang: "Đang mượn"
 ,the_loai_id: 5},
 { id_sach: 62, ten_sach: "Lịch sử và du lịch Sài Gòn", tac_gia: "Lê Minh Quân", nxb: "NXB Văn hóa Sài Gòn", tinh_trang: "Còn sách"
 ,the_loai_id: 5},
 { id_sach: 63, ten_sach: "Lý thuyết ngôn ngữ học", tac_gia: "Nguyễn Đức Dân", nxb: "NXB Giáo dục Việt Nam", tinh_trang: "Đang mượn"
 ,the_loai_id: 6},
 { id_sach: 64, ten_sach: "Nhập môn ngữ âm học", tac_gia: "Trần Thị Lý", nxb: "NXB Đại học Quốc gia Hà Nội", tinh_trang: "Còn sách"
 ,the_loai_id: 6},
 { id_sach: 65, ten_sach: "Ngữ pháp tiếng Việt", tac_gia: "Phan Thị Minh Châu", nxb: "NXB Khoa học Xã hội", tinh_trang: "Còn sách"
 ,the_loai_id: 6},
 { id_sach: 66, ten_sach: "Từ vựng học tiếng Việt", tac_gia: "Nguyễn Văn Linh", nxb: "NXB Văn hóa Thông tin", tinh_trang: "Còn sách"
 ,the_loai_id: 6},
 { id_sach: 67, ten_sach: "Lịch sử ngôn ngữ học Việt Nam", tac_gia: "Trần Quang Tuấn", nxb: "NXB Đại học Quốc gia TP.HCM", tinh_trang: "Đang mượn"
 ,the_loai_id: 6},
 { id_sach: 68, ten_sach: "Các trường phái ngôn ngữ học hiện đại", tac_gia: "Lê Hồng Sơn", nxb: "NXB Khoa học Xã hội", tinh_trang: "Còn sách"
 ,the_loai_id: 6},
 { id_sach: 69, ten_sach: "Ngữ nghĩa học và ứng dụng", tac_gia: "Trần Ngọc Thêm", nxb: "NXB Chính trị Quốc gia", tinh_trang: "Còn sách"
 ,the_loai_id: 6},
 { id_sach: 70, ten_sach: "Cơ sở ngôn ngữ học", tac_gia: "Nguyễn Hữu Dũng", nxb: "NXB Đại học Sư phạm", tinh_trang: "Đang mượn"
 ,the_loai_id: 6},
 { id_sach: 71, ten_sach: "Phân tích câu tiếng Việt", tac_gia: "Lê Quang Anh", nxb: "NXB Đại học Sư phạm", tinh_trang: "Còn sách"
 ,the_loai_id: 6},
 { id_sach: 72, ten_sach: "Chuyên đề ngữ pháp tiếng Việt", tac_gia: "Nguyễn Thị Thu", nxb: "NXB Khoa học Xã hộ", tinh_trang: "Còn sách"
 ,the_loai_id: 6},
 { id_sach: 73, ten_sach: "Các phương pháp nghiên cứu ngôn ngữ", tac_gia: "Phan Thị Bích", nxb: "NXB Giáo dục Việt Nam", tinh_trang: "Còn sách"
 ,the_loai_id: 6},
 { id_sach: 74, ten_sach: "Sử dụng ngôn ngữ trong giao tiếp", tac_gia: "Lê Minh Tân", nxb: "NXB Văn hóa Thông tin", tinh_trang: "Còn sách"
 ,the_loai_id: 6},
 { id_sach: 75, ten_sach: "Ngữ pháp tiếng Việt ứng dụng", tac_gia: "Nguyễn Hoàng Hải", nxb: "NXB Đại học Quốc gia TP.HCM", tinh_trang: "Đang mượn"
 ,the_loai_id: 6},
 { id_sach: 76, ten_sach: "Ngữ âm tiếng Việt trong lý thuyết và thực hành", tac_gia: "Trần Hữu Phúc", nxb: "NXB Khoa học Xã hội", tinh_trang: "Còn sách"
 ,the_loai_id: 6},
 { id_sach: 77, ten_sach: "Lý thuyết và thực hành phân tích ngữ nghĩa", tac_gia: "Nguyễn Ngọc Bích", nxb: "NXB Đại học Sư phạm", tinh_trang: "Đang mượn"
 ,the_loai_id: 6},
 { id_sach: 78, ten_sach: "Sơ đồ hóa ngữ pháp tiếng Việt", tac_gia: "Phan Văn Hòa", nxb: "NXB Đại học Quốc gia TP.HC", tinh_trang: "Còn sách"
 ,the_loai_id: 6},
 { id_sach: 79, ten_sach: "Giới thiệu các trường phái ngữ âm học", tac_gia: "Lê Minh Lộc", nxb: "NXB Khoa học Xã hội", tinh_trang: "Còn sách"
 ,the_loai_id: 6},
 { id_sach: 80, ten_sach: "Hướng dẫn nghiên cứu ngôn ngữ học thực nghiệm", tac_gia: "Trần Thanh Tâm", nxb: "NXB Giáo dục Việt Nam", tinh_trang: "Còn sách"
 ,the_loai_id: 6},
 { id_sach: 81, ten_sach: "Khảo sát ngữ âm học tiếng Việt", tac_gia: "Nguyễn Đình Hùng", nxb: "NXB Đại học Sư phạm", tinh_trang: "Đang mượn"
 ,the_loai_id: 6},
 { id_sach: 82, ten_sach: "Nhập môn lý thuyết ngôn ngữ học", tac_gia: "Lê Thu Hương", nxb: "NXB Đại học Quốc gia TP.HCM", tinh_trang: "Còn sách"
 ,the_loai_id: 6},
 { id_sach: 83, ten_sach: "Tìm hiểu cấu trúc câu tiếng Việt", tac_gia: "Nguyễn Quốc Duy", nxb: "NXB Văn hóa Thông tin", tinh_trang: "Đang mượn"
 ,the_loai_id: 6},
 { id_sach: 84, ten_sach: "Tiếng Việt và các phương pháp nghiên cứu ngữ âm", tac_gia: "Trần Tuấn Kiệt", nxb: "NXB Khoa học Xã hội", tinh_trang: "Còn sách"
 ,the_loai_id: 6},
 { id_sach: 85, ten_sach: "Ngôn ngữ học và văn học", tac_gia: "Lê Hồng Thủy", nxb: "XB Giáo dục Việt Nam", tinh_trang: "Đang mượn"
 ,the_loai_id: 6},
 { id_sach: 86, ten_sach: "Các phương pháp giảng dạy ngôn ngữ", tac_gia: "Nguyễn Thị Mai", nxb: "NXB Đại học Quốc gia Hà Nội", tinh_trang: "Còn sách"
 ,the_loai_id: 6},
 { id_sach: 87, ten_sach: "Từ điển ngữ pháp tiếng Việt", tac_gia: "Phan Thiên Hương", nxb: "NXB Khoa học Xã hội", tinh_trang: "Còn sách"
 ,the_loai_id: 6},
 { id_sach: 88, ten_sach: "Ngôn ngữ học và văn hóa Việt Nam", tac_gia: "Nguyễn Thu Lan", nxb: "NNXB Đại học Sư phạm", tinh_trang: "Đang mượn"
 ,the_loai_id: 6},
 { id_sach: 89, ten_sach: "Cấu trúc câu trong ngữ pháp tiếng Việt", tac_gia: "Trần Quang Duy", nxb: "NXB Đại học Quốc gia TP.HCM", tinh_trang: "Còn sách"
 ,the_loai_id: 6},
 { id_sach: 90, ten_sach: "Giải thích ngữ pháp tiếng Việt", tac_gia: "Lê Quang Hải", nxb: "NXB Khoa học Xã hội", tinh_trang: "Còn sách"
 ,the_loai_id: 6},
 { id_sach: 91, ten_sach: "Tiếng Việt và ngữ pháp ứng dụng", tac_gia: "Nguyễn Đan Quân", nxb: "NXB Giáo dục Việt Nam", tinh_trang: "Đang mượn"
 ,the_loai_id: 6},
 { id_sach: 92, ten_sach: "Hướng dẫn nghiên cứu ngữ nghĩa tiếng Việt", tac_gia: "Trần Thị Thu", nxb: "NXB Đại học Sư phạm", tinh_trang: "Còn sách"
 ,the_loai_id: 6},
 { id_sach: 93, ten_sach: "Tìm hiểu cấu trúc ngữ pháp tiếng Việt", tac_gia: "Lê Thiện Thắng", nxb: "NXB Khoa học Xã hội", tinh_trang: "Còn sách"
 ,the_loai_id: 6},
 { id_sach: 94, ten_sach: "Kỹ năng giao tiếp hiệu quả", tac_gia: "Nguyễn Thị Lan", nxb: "NXB Thanh Niên", tinh_trang: "Còn sách"
 ,the_loai_id: 7},
 { id_sach: 95, ten_sach: "Làm chủ cảm xúc", tac_gia: "Trần Minh Hoàng", nxb: "NXB Lao Động", tinh_trang: "Còn sách"
 ,the_loai_id: 7},
 { id_sach: 96, ten_sach: "Quản lý thời gian hiệu quả", tac_gia: "Phạm Thanh Tùng", nxb: "NXB Dân Trí", tinh_trang: "Đang mượn"
 ,the_loai_id: 7},
 { id_sach: 97, ten_sach: "Kỹ năng thuyết trình", tac_gia: "Lê Minh Trí", nxb: "NXB Tổng hợp TP.HCM", tinh_trang: "Còn sách"
 ,the_loai_id: 7},
 { id_sach: 98, ten_sach: "Tinh thần khởi nghiệp", tac_gia: "Nguyễn Hương Giang", nxb: "NXB Trẻ", tinh_trang: "Còn sách"
 ,the_loai_id: 7},
 { id_sach: 99, ten_sach: "Làm việc nhóm hiệu quả", tac_gia: "Vũ Minh Tú", nxb: "NXB Thế Giới", tinh_trang: "Còn sách"
 ,the_loai_id: 7},
 { id_sach: 100, ten_sach: "Sự tự tin trong công việc", tac_gia: "Hoàng Văn Tấn", nxb: "NXB Hồng Đức", tinh_trang: "Còn sách"
 ,the_loai_id: 7},
 { id_sach: 101, ten_sach: "Kỹ năng giải quyết xung đột", tac_gia: "Trần Thị Minh Châu", nxb: "NXB Kinh Tế", tinh_trang: "Còn sách"
 ,the_loai_id: 7},
 { id_sach: 102, ten_sach: "Lãnh đạo hiệu quả", tac_gia: "Lê Thị Mai", nxb: "NXB Phụ nữ", tinh_trang: "Còn sách"
 ,the_loai_id: 7},
 { id_sach: 103, ten_sach: "Kỹ năng quản lý stress", tac_gia: "Nguyễn Hồng Sơn", nxb: "NXB Văn Hóa Sài Gòn", tinh_trang: "Đang mượn"
 ,the_loai_id: 7},
 { id_sach: 104, ten_sach: "Làm việc hiệu quả trong môi trường đa văn hóa", tac_gia: "Phan Đăng Khoa", nxb: "NXB Lao Động - Xã Hội", tinh_trang: "Còn sách"
 ,the_loai_id: 7},
 { id_sach: 105, ten_sach: "Thuyết phục và ảnh hưởng", tac_gia: "Trương Hoài Nam", nxb: "NXB Thế Giới", tinh_trang: "Còn sách"
 ,the_loai_id: 7},
 { id_sach: 106, ten_sach: "Khám phá bản thân và phát triển kỹ năng", tac_gia: "Phan Thị Bích", nxb: "NXB Khoa Học Xã Hội", tinh_trang: "Còn sách"
 ,the_loai_id: 7},
 { id_sach: 107, ten_sach: "Giao tiếp phi ngôn ngữ", tac_gia: "Lê Quang Hải", nxb: "NXB Học viện Chính trị", tinh_trang: "Còn sách"
 ,the_loai_id: 7},
 { id_sach: 108, ten_sach: "Khả năng lãnh đạo và quản lý", tac_gia: "Trần Minh Sơn", nxb: "NXB Tổng hợp TP.HCM", tinh_trang: "Còn sách"
 ,the_loai_id: 7},
 { id_sach: 109, ten_sach: "Ứng dụng NLP trong giao tiếp", tac_gia: "Nguyễn Thị Thúy", nxb: "NXB Tri Thức", tinh_trang: "Còn sách"
 ,the_loai_id: 7},
 { id_sach: 110, ten_sach: "Kỹ năng sáng tạo trong công việc", tac_gia: "Vũ Minh Hải", nxb: "NXB Văn hóa Sài Gòn", tinh_trang: "Còn sách"
 ,the_loai_id: 7},
 { id_sach: 111, ten_sach: "Tư duy phản biện trong công việc", tac_gia: "Nguyễn Thị Mai Lan", nxb: "NXB Đại học Quốc gia Hà Nội", tinh_trang: "Còn sách"
 ,the_loai_id: 7},
 { id_sach: 112, ten_sach: "Quản lý thay đổi trong tổ chức", tac_gia: "Trần Thị Quế", nxb: "NXB Phụ nữ", tinh_trang: "Còn sách"
 ,the_loai_id: 7},
 { id_sach: 113, ten_sach: "Phát triển kỹ năng lãnh đạo", tac_gia: "Nguyễn Tiến Dũng", nxb: "NXB Chính trị Quốc gia", tinh_trang: "Còn sách"
 ,the_loai_id: 7},
 { id_sach: 114, ten_sach: "Làm việc nhóm và giải quyết vấn đề", tac_gia: "Lê Thị Thanh", nxb: "NXB Lao Động", tinh_trang: "Còn sách"
 ,the_loai_id: 7},
{ id_sach: 115, ten_sach: "Công nghệ sinh học trong nông nghiệp", tac_gia: "Nguyễn Thị Lan", nxb: "NXB Nông nghiệp", tinh_trang: "Còn sách"
 ,the_loai_id: 8},
 { id_sach: 116, ten_sach: "Hệ thống canh tác nông nghiệp bền vững", tac_gia: "Trần Minh Tâm", nxb: "NXB Khoa học và Kỹ thuật", tinh_trang: "Còn sách"
 ,the_loai_id: 8},
 { id_sach: 117, ten_sach: "Quản lý tài nguyên nước trong nông nghiệp", tac_gia: "Phạm Văn Thanh", nxb: "NXB Nông nghiệp", tinh_trang: "Còn sách"
 ,the_loai_id: 8},
 { id_sach: 118, ten_sach: "Biến đổi khí hậu và nông nghiệp", tac_gia: "Lê Thị Lan Anh", nxb: "NXB Chính trị Quốc gia", tinh_trang: "Còn sách"
 ,the_loai_id: 8},
 { id_sach: 119, ten_sach: "Nông nghiệp hữu cơ và phát triển bền vững", tac_gia: "Nguyễn Phương Mai", nxb: "NXB Nông nghiệp", tinh_trang: "Còn sách"
 ,the_loai_id: 8},
 { id_sach: 120, ten_sach: "Thực hành trồng cây ăn quả", tac_gia: "Trần Quốc Tuấn", nxb: "NXB Đại học Quốc gia Hà Nội", tinh_trang: "Còn sách"
 ,the_loai_id: 8},
 { id_sach: 121, ten_sach: "Lịch sử và phát triển nông nghiệp Việt Nam", tac_gia: "Lê Quốc Thịnh", nxb: "NXB Văn hóa Thông tin", tinh_trang: "Còn sách"
 ,the_loai_id: 8},
 { id_sach: 122, ten_sach: "Kỹ thuật chăn nuôi gia cầm", tac_gia: "Nguyễn Hồng Sơn", nxb: "NXB Khoa học và Kỹ thuật", tinh_trang: "Còn sách"
 ,the_loai_id: 8},
 { id_sach: 123, ten_sach: "Môi trường nông thôn và bảo vệ đất đai", tac_gia: "Nguyễn Thị Bình", nxb: "NXB Đại học Nông nghiệp", tinh_trang: "Còn sách"
 ,the_loai_id: 8},
 { id_sach: 124, ten_sach: "Ứng dụng công nghệ sinh học trong bảo vệ môi trường", tac_gia: "Lê Minh Tùng", nxb: "NXB Nông nghiệp", tinh_trang: "Còn sách"
 ,the_loai_id: 8},
 { id_sach: 125, ten_sach: "Nông nghiệp và phát triển nông thôn bền vững", tac_gia: "Trần Đức Toàn", nxb: "NXB Khoa học Xã hội", tinh_trang: "Còn sách"
 ,the_loai_id: 8},
 { id_sach: 126, ten_sach: "Kỹ thuật trồng cây dược liệu", tac_gia: "Phan Thị Bích Ngọc", nxb: "NXB Nông nghiệp", tinh_trang: "Còn sách"
 ,the_loai_id: 8},
 { id_sach: 127, ten_sach: "Chăn nuôi bền vững và an toàn thực phẩm", tac_gia: "Nguyễn Thị Thúy", nxb: "NXB Khoa học và Kỹ thuật", tinh_trang: "Còn sách"
 ,the_loai_id: 8},
 { id_sach: 128, ten_sach: "Đánh giá tác động môi trường trong sản xuất nông nghiệp", tac_gia: "Lê Hồng Sơn", nxb: "NXB Nông nghiệp", tinh_trang: "Còn sách"
 ,the_loai_id: 8},
 { id_sach: 129, ten_sach: "Bóng đá và chiến thuật", tac_gia: "Nguyễn Văn Hoàng", nxb: "NXB Thể thao", tinh_trang: "Còn sách"
 ,the_loai_id: 9},
 { id_sach: 130, ten_sach: "Cẩm nang thể dục thể thao", tac_gia: "Trần Minh Bảo", nxb: "NXB Thể thao", tinh_trang: "Còn sách"
 ,the_loai_id: 9},
 { id_sach: 131, ten_sach: "Lịch sử thể thao Việt Nam", tac_gia: "Lê Quang Cường", nxb: "NXB Văn hóa Thông tin", tinh_trang: "Còn sách"
 ,the_loai_id: 9},
 { id_sach: 132, ten_sach: "Yoga cho người mới bắt đầu", tac_gia: "Phan Thị Hương", nxb: "NXB Sức khỏe", tinh_trang: "Còn sách"
 ,the_loai_id: 9},
 { id_sach: 133, ten_sach: "Chạy bộ và sức khỏe", tac_gia: "Nguyễn Thị Phương", nxb: "NXB Thể thao", tinh_trang: "Còn sách"
 ,the_loai_id: 9},
 { id_sach: 134, ten_sach: "Bí quyết dinh dưỡng cho vận động viên", tac_gia: "Lê Thiên Thu", nxb: "NXB Thể dục thể thao", tinh_trang: "Còn sách"
 ,the_loai_id: 9},
 { id_sach: 135, ten_sach: "Hướng dẫn tập thể hình tại nhà", tac_gia: "Nguyễn Minh Du", nxb: "NXB Y học", tinh_trang: "Còn sách"
 ,the_loai_id: 9},
 { id_sach: 136, ten_sach: "Kỹ thuật chơi cầu lông", tac_gia: "Trần Đại Huy", nxb: "NXB Thể thao", tinh_trang: "Đang mượn"
 ,the_loai_id: 9},
 { id_sach: 137, ten_sach: "Bóng rổ cho mọi người", tac_gia: "Lê Thanh Khôi", nxb: "NXB Thể dục thể thao", tinh_trang: "Còn sách"
 ,the_loai_id: 9},
 { id_sach: 138, ten_sach: "Chạy marathon và sức khỏe", tac_gia: "Vũ Anh Thư", nxb: "NXB Văn hóa Thông tin", tinh_trang: "Còn sách"
 ,the_loai_id: 9},
 { id_sach: 139, ten_sach: "Học bơi cho người mới bắt đầu", tac_gia: "Nguyễn Phú Quốc", nxb: "NXB Thể thao", tinh_trang: "Còn sách"
 ,the_loai_id: 9},
 { id_sach: 140, ten_sach: "Hướng dẫn thi đấu thể thao", tac_gia: "Trần Minh Vinh", nxb: "NXB Thể dục thể thao", tinh_trang: "Còn sách"
 ,the_loai_id: 9},
 { id_sach: 141, ten_sach: "Dạy tennis cho người mới", tac_gia: "NLê Quang Ngọc", nxb: "NXB Thể thao", tinh_trang: "Đang mượn"
 ,the_loai_id: 9},
 
]

// Chuyển đối tượng JSON thành chuỗi và lưu vào localStorage
localStorage.setItem('keData', JSON.stringify(data))

// Đọc dữ liệu từ localStorage
const storedData = localStorage.getItem('keData')

// Kiểm tra xem có dữ liệu trong localStorage không
if (storedData) {
  const parsedData = JSON.parse(storedData)
  console.log(parsedData)
} else {
  console.log('Không có dữ liệu trong localStorage')
}
</script>


<style>
.v-pagination__list {
  width: inherit !important;
}
</style>