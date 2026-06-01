# Giới thiệu sản phẩm D.O.S.E

## 1. Tổng quan

**D.O.S.E** là viết tắt của **Digital Opportunity for Special Education & Health**.  
Đây là một nền tảng web theo định hướng `social-tech`, được thiết kế để hỗ trợ tiếp cận số, tăng sự thấu hiểu trong cộng đồng và mở rộng cơ hội cho người khuyết tật.

Sản phẩm không chỉ tập trung vào công nghệ hỗ trợ, mà còn kết nối giữa:

- tiếp cận số
- giáo dục cộng đồng
- cơ hội học tập và việc làm
- hỗ trợ cá nhân hóa bằng AI

---

## 2. Bài toán thực tế mà sản phẩm giải quyết

Trong thực tế, nhiều nền tảng số hiện nay vẫn chưa thân thiện với người khuyết tật và chưa thật sự hỗ trợ trải nghiệm hòa nhập.

Các vấn đề nổi bật gồm:

- nhiều website có giao diện khó đọc, khó thao tác hoặc không tối ưu cho bàn phím
- nội dung giáo dục về accessibility và hòa nhập còn rời rạc, khó tiếp cận
- người dùng khuyết tật gặp khó khăn khi tiếp cận học tập, thông tin và cơ hội nghề nghiệp
- trải nghiệm số thường chưa cá nhân hóa theo nhu cầu hỗ trợ cụ thể của từng người
- công nghệ hỗ trợ thường chỉ dừng ở mức kỹ thuật, chưa kết nối với giáo dục, đồng cảm và cộng đồng

D.O.S.E được xây dựng để giải quyết chính những khoảng trống đó bằng một hệ sinh thái số thống nhất, nơi accessibility không phải phần thêm vào sau cùng mà là nền tảng từ đầu.

---

## 3. Chức năng của sản phẩm

D.O.S.E hiện có các nhóm chức năng chính sau:

### 3.1. Hỗ trợ tiếp cận giao diện

- Bật tương phản cao
- Giảm chuyển động
- Chế độ tối
- Tăng giảm cỡ chữ
- Điều hướng bằng bàn phím
- Hỗ trợ phím tắt và keytip

### 3.2. Onboarding cá nhân hóa

- Hỏi nhu cầu hỗ trợ ngay từ đầu
- Gợi ý thiết lập phù hợp theo từng nhóm người dùng
- Lưu lựa chọn để cải thiện trải nghiệm sử dụng

### 3.3. Các module nội dung chính

- **Access**: giới thiệu các giải pháp trợ năng và khả năng tiếp cận
- **Education**: cung cấp nội dung học tập và nâng cao nhận thức
- **Opportunity**: hỗ trợ định hướng nghề nghiệp và tiếp cận cơ hội việc làm
- **Humanity**: kể các câu chuyện, mô phỏng sự đồng cảm và góc nhìn nhân văn

### 3.4. AI Mentor

- Giải thích nội dung dễ hiểu hơn
- Hỗ trợ theo nhịp riêng của người dùng
- Góp phần giảm rào cản khi đọc và tương tác với hệ thống

---

## 4. Đối tượng người dùng

D.O.S.E hướng đến nhiều nhóm người dùng, trong đó trọng tâm là:

### 4.1. Người khuyết tật

- người khiếm thị hoặc thị lực kém
- người khiếm thính hoặc khó nghe
- người gặp khó khăn vận động
- người khó đọc, khó tập trung hoặc khó tiếp nhận thông tin
- người có khó khăn tâm lý hoặc nhận thức

### 4.2. Phụ huynh, giáo viên, nhà trường

- cần công cụ hỗ trợ học tập hòa nhập
- cần tài nguyên để hiểu và đồng hành cùng người học

### 4.3. Doanh nghiệp và tổ chức xã hội

- muốn xây dựng môi trường hòa nhập hơn
- cần hiểu nhu cầu hỗ trợ của người khuyết tật trong học tập và việc làm

### 4.4. Cộng đồng nói chung

- những người muốn học về accessibility
- những người muốn hiểu sâu hơn về đồng cảm và hòa nhập

---

## 5. Luồng trải nghiệm người dùng

Luồng trải nghiệm chính của D.O.S.E có thể mô tả ngắn gọn như sau:

```text
Người dùng truy cập nền tảng
→ onboarding hỏi nhu cầu hỗ trợ
→ hệ thống gợi ý thiết lập trợ năng phù hợp
→ người dùng truy cập các module nội dung
→ AI Mentor hỗ trợ khi cần
→ hệ thống lưu preference cá nhân cho các lần sử dụng sau
```

Luồng này thể hiện định hướng UX của dự án:

- bắt đầu từ nhu cầu thật của người dùng
- giảm rào cản ngay từ bước đầu tiên
- cá nhân hóa trải nghiệm theo khả năng tiếp cận
- duy trì hỗ trợ xuyên suốt thay vì chỉ hỗ trợ một lần

---

## 6. Công nghệ sử dụng

D.O.S.E hiện được xây dựng trên các công nghệ sau:

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python Flask
- **AI Mentor**: OpenRouter API
- **Accessibility**: ARIA attributes, keyboard navigation, skip link, live region
- **Persistence**: Local Storage để lưu preference người dùng
- **Responsive Design**: giao diện thích ứng trên nhiều kích thước màn hình
- **Theme / Display System**: hỗ trợ tương phản cao, chế độ tối, giảm chuyển động và thay đổi cỡ chữ

Việc lựa chọn các công nghệ này giúp sản phẩm:

- dễ triển khai
- dễ mở rộng
- phù hợp để trình bày dưới dạng đồ án, prototype hoặc sản phẩm phát triển tiếp

---

## 7. Giải pháp áp dụng tiêu chuẩn WCAG 2.2 trong sản phẩm

D.O.S.E áp dụng tư duy thiết kế theo hướng hỗ trợ tiếp cận ngay từ đầu, bám theo các nguyên tắc của **WCAG 2.2** gồm: dễ cảm nhận, dễ thao tác, dễ hiểu và đủ bền vững để hoạt động trên nhiều cách sử dụng khác nhau.

### 7.1. Perceivable - Dễ cảm nhận

- sử dụng màu sắc và độ tương phản rõ ràng
- có chế độ tương phản cao cho người thị lực kém
- cho phép tăng cỡ chữ để nội dung dễ đọc hơn
- ưu tiên văn bản rõ ràng, cấu trúc dễ quét
- hỗ trợ AI Mentor để diễn giải lại nội dung khi cần

### 7.2. Operable - Dễ thao tác

- hỗ trợ điều hướng bằng bàn phím
- có skip link để bỏ qua vùng điều hướng
- có phím tắt tới đầu trang và nội dung chính
- các nút và vùng chọn có kích thước đủ lớn, rõ vùng focus
- có bảng điều khiển trợ năng để người dùng đổi cách hiển thị nhanh

### 7.3. Understandable - Dễ hiểu

- onboarding hỏi nhu cầu hỗ trợ ngay từ đầu
- nội dung chia theo module rõ ràng
- ngôn ngữ hiển thị gần gũi, dễ hiểu
- AI Mentor hỗ trợ giải thích lại nội dung theo nhịp phù hợp

### 7.4. Robust - Hoạt động ổn định

- giao diện được xây dựng bằng HTML, CSS, JavaScript theo cấu trúc rõ ràng
- có sử dụng thuộc tính hỗ trợ truy cập như `aria-label`, `aria-live`, `aria-expanded`, `aria-hidden`
- nhiều thành phần tương tác được tối ưu cho thao tác chuột và bàn phím

### 7.5. Một số tiêu chí WCAG 2.2 được thể hiện trong sản phẩm

| Tiêu chí WCAG 2.2 | Cách áp dụng trong D.O.S.E |
| --- | --- |
| `1.4.3 Contrast Minimum` | hỗ trợ chế độ tương phản cao và màu chữ rõ ràng |
| `1.4.4 Resize Text` | cho phép tăng cỡ chữ để nội dung dễ đọc hơn |
| `2.1.1 Keyboard` | hỗ trợ điều hướng bằng bàn phím |
| `2.4.1 Bypass Blocks` | có skip link để bỏ qua điều hướng và tới nội dung chính |
| `2.4.7 Focus Visible` | trạng thái focus của nút và vùng chọn được hiển thị rõ |
| `2.5.8 Target Size` | vùng bấm của nút và lựa chọn được làm đủ lớn để thao tác |
| `3.1 Readable` | nội dung sử dụng ngôn ngữ gần gũi, dễ hiểu |
| `4.1.2 Name, Role, Value` | các thành phần tương tác có hỗ trợ `aria-*` phù hợp |

---

## 8. Giá trị nổi bật của sản phẩm

D.O.S.E không chỉ là một website có vài tính năng trợ năng, mà là một hệ sinh thái nội dung và trải nghiệm lấy con người làm trung tâm.

Điểm nổi bật của sản phẩm:

- kết hợp giữa công nghệ, giáo dục và đồng cảm
- hỗ trợ nhiều nhóm người dùng khác nhau
- có định hướng accessibility-first
- có khả năng phát triển thành nền tảng xã hội - giáo dục - nghề nghiệp toàn diện

---

## 9. Kết luận

D.O.S.E là một sản phẩm hướng đến hòa nhập số, nơi công nghệ không chỉ để sử dụng, mà còn để thấu hiểu, hỗ trợ và tạo cơ hội.

Thông qua các chức năng trợ năng, onboarding cá nhân hóa, AI Mentor và các module nội dung chuyên biệt, sản phẩm thể hiện rõ cách áp dụng thực tế các nguyên tắc của **WCAG 2.2** vào một nền tảng phục vụ cộng đồng.

---

## 10. Gợi ý sử dụng file này

Bạn có thể dùng file này để:

- chuyển thành **PDF giới thiệu sản phẩm**
- chép sang **Word** để nộp báo cáo
- dùng làm **kịch bản nói cho video giới thiệu**

Nếu cần bản ngắn hơn để thuyết trình 1-2 phút, có thể rút gọn từ phần:

- Tổng quan
- Chức năng chính
- Đối tượng người dùng
- Giải pháp WCAG 2.2

---

## 11. Bối cảnh xã hội và lý do hình thành sản phẩm

Trong nhiều năm gần đây, chuyển đổi số đã trở thành một xu hướng không thể đảo ngược trong giáo dục, việc làm, truyền thông và đời sống thường nhật. Gần như mọi trải nghiệm quan trọng của con người đều đang được số hóa: học tập trực tuyến, nộp hồ sơ việc làm, đăng ký dịch vụ, tiếp cận tài liệu, tư vấn tâm lý, truyền thông cộng đồng, thậm chí cả việc xây dựng mối quan hệ xã hội và bản sắc cá nhân. Tuy nhiên, dù các nền tảng số phát triển nhanh, không phải ai cũng có cơ hội tiếp cận bình đẳng với chúng.

Người khuyết tật, người có khó khăn về nhận thức, người có vấn đề về thị giác, thính giác, vận động, người khó đọc, khó tập trung hoặc có nhu cầu hỗ trợ tinh thần thường phải đối mặt với một loại rào cản rất đặc thù: rào cản vô hình trong môi trường số. Không giống rào cản vật lý có thể nhìn thấy như bậc thang, cửa hẹp hay lối đi nhỏ, rào cản số thường tồn tại dưới dạng bố cục rối, màu sắc thiếu tương phản, nút bấm nhỏ, điều hướng không dùng được bằng bàn phím, văn bản quá dài, thiếu mô tả nội dung, video không có phụ đề, biểu mẫu không thông báo lỗi rõ ràng, hoặc những trải nghiệm “được thiết kế cho số đông” nhưng bỏ quên nhiều nhóm người dùng yếu thế.

Từ đó, D.O.S.E được hình thành không chỉ như một trang web trợ năng, mà như một nỗ lực thiết kế lại cách công nghệ phục vụ con người. Nếu một nền tảng số có thể hỗ trợ người dùng tiếp cận dễ hơn, học dễ hơn, hiểu nhau hơn và tìm cơ hội tốt hơn, thì giá trị của nó không còn nằm ở “tính năng” nữa mà nằm ở năng lực làm giảm bất bình đẳng trong trải nghiệm số.

Sản phẩm ra đời từ một quan điểm rõ ràng:

- accessibility không phải phần thêm vào sau cùng
- đồng cảm không thể chỉ là khẩu hiệu truyền thông
- giáo dục về hòa nhập phải được tích hợp vào chính trải nghiệm sử dụng
- công nghệ có thể và nên đóng vai trò cầu nối xã hội

Điểm đặc biệt của D.O.S.E là dự án không nhìn người khuyết tật như một “nhóm cần được phục vụ” theo nghĩa thụ động, mà nhìn họ như người dùng trung tâm, có nhu cầu, có năng lực, có mục tiêu phát triển và cần một hệ sinh thái số biết lắng nghe. Từ đó, sản phẩm được tổ chức theo nhiều lớp: lớp giao diện tiếp cận, lớp nội dung giáo dục, lớp cơ hội nghề nghiệp, lớp thấu hiểu nhân văn và lớp hỗ trợ cá nhân hóa bằng AI.

Vì vậy, lý do tồn tại của D.O.S.E không chỉ là “làm một website đẹp” hay “áp dụng WCAG cho đúng yêu cầu”. Lý do sâu hơn là:

- tạo ra một mô hình social-tech có thể nhân rộng
- chứng minh accessibility có thể đi cùng storytelling và giáo dục
- kết nối công nghệ với nhu cầu thật của cộng đồng yếu thế
- mở ra một hướng làm sản phẩm vừa có giá trị kỹ thuật vừa có giá trị xã hội

---

## 12. Tuyên bố vấn đề và tuyên bố giá trị

### 12.1. Tuyên bố vấn đề

Người dùng có nhu cầu hỗ trợ tiếp cận thường gặp khó khăn khi sử dụng các nền tảng số do giao diện chưa thân thiện, nội dung chưa được tổ chức phù hợp và hệ thống chưa đủ khả năng cá nhân hóa theo nhu cầu thật của họ. Bên cạnh đó, cộng đồng nói chung, phụ huynh, giáo viên và doanh nghiệp cũng thiếu những không gian số tích hợp vừa cung cấp tri thức accessibility, vừa thúc đẩy đồng cảm, vừa mở ra cơ hội thực tế về học tập và nghề nghiệp.

### 12.2. Tuyên bố giá trị

D.O.S.E mang lại một nền tảng số tích hợp nơi:

- người dùng được hỗ trợ tiếp cận tốt hơn ngay từ lần đầu truy cập
- nội dung được tổ chức theo hướng dễ hiểu và giàu tính nhân văn
- AI Mentor hỗ trợ giảm rào cản nhận thức và thao tác
- cộng đồng có cơ hội học về hòa nhập thông qua nội dung trực quan, thực tế
- học tập, cơ hội và đồng cảm được kết nối trong cùng một sản phẩm

### 12.3. Giá trị cốt lõi của sản phẩm

Các giá trị cốt lõi làm nên định hướng của D.O.S.E bao gồm:

1. **Accessibility-first**  
   Mọi quyết định thiết kế đều ưu tiên khả năng tiếp cận.

2. **Human-centered**  
   Người dùng không bị buộc thích nghi với hệ thống; hệ thống phải thích nghi với người dùng.

3. **Education through experience**  
   Giáo dục về hòa nhập không chỉ nằm ở bài viết, mà còn nằm trong cách người dùng tương tác với giao diện.

4. **Empathy as system design**  
   Đồng cảm được biến thành cấu trúc UX, nội dung, luồng onboarding và hỗ trợ AI.

5. **Opportunity-oriented**  
   Accessibility không chỉ để “đọc được”, mà còn để mở ra học tập, kết nối và nghề nghiệp.

---

## 13. Mục tiêu sản phẩm

### 13.1. Mục tiêu ngắn hạn

Trong giai đoạn hiện tại, D.O.S.E hướng tới các mục tiêu ngắn hạn sau:

- xây dựng một prototype web hoàn chỉnh cho thấy rõ tư duy accessibility-first
- tạo onboarding hỗ trợ người dùng lựa chọn nhu cầu tiếp cận ngay từ đầu
- thể hiện rõ 4 module sứ mệnh: Access, Education, Opportunity, Humanity
- tích hợp AI Mentor ở mức cơ bản để hỗ trợ giải thích nội dung
- áp dụng các tiêu chí quan trọng của WCAG 2.2 vào giao diện và luồng sử dụng

### 13.2. Mục tiêu trung hạn

Trong giai đoạn phát triển tiếp theo, sản phẩm có thể hướng đến:

- tăng chiều sâu nội dung học tập về accessibility và inclusion
- mở rộng hệ thống hồ sơ người dùng và lưu trữ preference cá nhân ổn định hơn
- nâng chất lượng AI Mentor bằng prompt chuyên biệt cho từng nhóm người dùng
- phát triển dashboard cá nhân hóa hơn theo profile sử dụng
- xây dựng các bài đánh giá và bài học theo từng nhóm nhu cầu hỗ trợ

### 13.3. Mục tiêu dài hạn

Ở tầm nhìn dài hạn, D.O.S.E có thể phát triển thành:

- một nền tảng giáo dục cộng đồng về accessibility và hòa nhập
- một hệ thống định hướng nghề nghiệp và kết nối cơ hội cho người khuyết tật
- một không gian số hỗ trợ học tập, mentoring và truyền thông xã hội
- một social innovation project có thể ứng dụng cho trường học, doanh nghiệp và tổ chức xã hội

---

## 14. Phạm vi chức năng của hệ thống

Để giúp tài liệu mang tính đặc tả hơn, có thể mô tả phạm vi hệ thống thành các khối chức năng như sau.

### 14.1. Khối giao diện và điều hướng

Khối này chịu trách nhiệm bảo đảm người dùng có thể tiếp cận hệ thống một cách cơ bản, dễ hiểu và linh hoạt. Các chức năng gồm:

- hiển thị landing page rõ ràng
- thanh điều hướng chính
- sidebar hoặc menu truy cập tới các module
- skip link để đi tới nội dung chính
- keytip và phím tắt giúp thao tác nhanh bằng bàn phím
- panel điều khiển trợ năng để đổi trạng thái hiển thị

### 14.2. Khối cá nhân hóa và preference

Khối này giúp hệ thống ghi nhớ người dùng và điều chỉnh trải nghiệm theo nhu cầu hỗ trợ, gồm:

- onboarding lựa chọn nhóm hỗ trợ
- lưu preference bằng `localStorage`
- ghi nhớ cỡ chữ, tương phản cao, simple mode, giảm chuyển động
- áp lại các thiết lập ở lần truy cập tiếp theo

### 14.3. Khối nội dung giáo dục

Khối này tập trung cung cấp thông tin, tài nguyên, bài học và nội dung nâng cao nhận thức. Nó bao gồm:

- module Access
- module Education
- các bài nội dung chuyên đề theo từng dạng nhu cầu hỗ trợ
- nội dung giới thiệu cộng đồng và các nguyên tắc hòa nhập

### 14.4. Khối cơ hội và định hướng

Khối này hỗ trợ người dùng tiếp cận với con đường học tập và nghề nghiệp, gồm:

- bài assessment hoặc định hướng
- nội dung gợi ý nghề nghiệp
- gợi ý hỗ trợ môi trường làm việc
- kết nối ý niệm giữa năng lực cá nhân và môi trường hòa nhập

### 14.5. Khối AI hỗ trợ

Khối này giữ vai trò đồng hành cùng người dùng trong suốt trải nghiệm:

- trả lời câu hỏi về nội dung
- hỗ trợ diễn giải lại văn bản khó
- giảm tải nhận thức khi người dùng gặp trở ngại
- đóng vai trò mentor mềm trong môi trường số

### 14.6. Khối mô phỏng đồng cảm và nhân văn

Khối này giúp sản phẩm khác biệt so với một website kỹ thuật thuần túy:

- tạo các câu chuyện hoặc mô phỏng trải nghiệm
- chuyển tải giá trị đồng cảm
- giúp cộng đồng hiểu vì sao accessibility quan trọng
- tạo kết nối cảm xúc chứ không chỉ cung cấp thao tác

---

## 15. Phân tích các nhóm người dùng và nhu cầu của họ

Để tài liệu chi tiết hơn, ngoài việc liệt kê đối tượng người dùng, ta cần mô tả sâu hơn động cơ, khó khăn và kỳ vọng của từng nhóm.

### 15.1. Nhóm người khiếm thị hoặc thị lực kém

Đây là nhóm người dùng thường bị ảnh hưởng mạnh bởi:

- tương phản kém
- cỡ chữ nhỏ
- nội dung dàn quá rộng
- hình ảnh không có mô tả
- focus không rõ
- cấu trúc heading không nhất quán

Nhu cầu của họ bao gồm:

- nội dung rõ, tương phản tốt
- khả năng tăng cỡ chữ
- điều hướng bằng bàn phím
- hỗ trợ trình đọc màn hình
- thông báo trạng thái rõ ràng khi bấm nút hoặc gửi biểu mẫu

Giá trị mà D.O.S.E cung cấp cho nhóm này là:

- onboarding nhận diện nhu cầu hỗ trợ
- hỗ trợ tương phản cao và cỡ chữ lớn
- cấu trúc nội dung phân tầng
- AI Mentor có thể hỗ trợ diễn giải lại nội dung theo nhịp phù hợp

### 15.2. Nhóm người khiếm thính hoặc khó nghe

Nhóm này thường không gặp cản trở chính ở thao tác nhìn, nhưng có thể bị hạn chế nếu nền tảng dựa quá nhiều vào âm thanh, video không phụ đề hoặc thông báo phụ thuộc vào tiếng động.

Nhu cầu của họ gồm:

- ưu tiên văn bản và biểu tượng trực quan
- nội dung dễ quét
- chỉ dẫn rõ bằng chữ
- giảm phụ thuộc vào giọng nói hay audio

D.O.S.E hỗ trợ nhóm này bằng:

- nội dung dạng text rõ ràng
- các khối thông tin được chia module
- AI Mentor có thể trả lời trực tiếp bằng chữ
- onboarding và điều hướng không phụ thuộc audio

### 15.3. Nhóm người khó khăn vận động hoặc thao tác

Người dùng nhóm này có thể gặp khó khăn khi phải:

- rê chuột chính xác
- bấm vào vùng chọn quá nhỏ
- thực hiện nhiều bước liên tiếp
- xử lý nhiều chuyển động hoặc tương tác phức tạp

Nhu cầu chính:

- vùng bấm đủ lớn
- điều hướng bàn phím
- ít bước
- hạn chế chuyển động
- cấu trúc tương tác dễ đoán

D.O.S.E phản hồi nhu cầu này bằng:

- target size lớn
- hỗ trợ phím tắt
- panel điều khiển giảm chuyển động
- luồng thao tác ít bước trong các lựa chọn chính

### 15.4. Nhóm người khó đọc, khó tập trung hoặc khó tiếp nhận thông tin

Đây là nhóm rất quan trọng vì trong nhiều sản phẩm số, khó khăn của họ thường ít được để ý hơn so với các dạng khuyết tật dễ nhìn thấy.

Khó khăn thường gặp:

- văn bản quá dài
- giao diện quá rối
- quá nhiều thứ cạnh tranh sự chú ý
- thông tin không được chia nhỏ
- từ ngữ quá kỹ thuật

Nhu cầu chính:

- nội dung ngắn, rõ ý
- chia khối tốt
- cỡ chữ dễ đọc
- nhịp điều hướng nhẹ
- AI hỗ trợ tóm tắt, giải thích

Đây cũng là nhóm thể hiện rõ nhất giá trị của D.O.S.E như một social-tech product, vì sản phẩm không chỉ giải quyết bằng kỹ thuật hiển thị mà còn giải quyết bằng cấu trúc nội dung và mentor hóa trải nghiệm.

### 15.5. Nhóm người có khó khăn tâm lý hoặc nhận thức

Một trải nghiệm số quá gấp, quá ồn hoặc quá dồn dập có thể làm người dùng nhóm này mệt mỏi hoặc quá tải.

Nhu cầu của họ:

- ít áp lực
- giao diện dịu hơn
- giảm chuyển động
- nội dung có nhịp
- cảm giác được hỗ trợ thay vì bị thúc ép

D.O.S.E phản hồi bằng:

- giảm chuyển động
- AI Mentor với giọng điệu hỗ trợ
- onboarding lựa chọn nhu cầu
- các module nội dung giàu tính nhân văn

### 15.6. Nhóm phụ huynh và giáo viên

Không phải ai trong nhóm này cũng có khó khăn truy cập, nhưng họ có nhu cầu hiểu học sinh hoặc con em của mình hơn.

Mục tiêu của họ là:

- học cách hỗ trợ đúng
- hiểu về accessibility và inclusion
- tìm tài nguyên thực hành
- hiểu vì sao thiết kế số lại quan trọng với người học yếu thế

Giá trị D.O.S.E mang lại:

- là cầu nối giữa công nghệ và giáo dục
- giúp ngôn ngữ accessibility bớt xa lạ
- tạo môi trường học hỏi thân thiện, trực quan

### 15.7. Nhóm doanh nghiệp và tổ chức xã hội

Họ không chỉ cần hiểu accessibility như một khái niệm, mà cần nhìn thấy nó gắn với:

- trải nghiệm tuyển dụng
- học tập nội bộ
- môi trường làm việc hòa nhập
- truyền thông và trách nhiệm xã hội

Với nhóm này, D.O.S.E có thể trở thành:

- công cụ truyền thông nội bộ
- tài nguyên nâng cao nhận thức
- prototype cho hệ thống hướng nghiệp hòa nhập

---

## 16. User Persona mẫu

Để tài liệu giàu tính UX hơn, phần persona giúp giảng viên hoặc nhà đánh giá nhìn thấy dự án không chỉ từ góc độ kỹ thuật mà từ góc độ con người.

### Persona 1: Minh Anh - người dùng thị lực kém

- Tuổi: 20
- Vai trò: sinh viên năm 2
- Thiết bị chính: laptop
- Mục tiêu: đọc tài liệu dễ hơn, tìm nền tảng học và định hướng nghề nghiệp
- Khó khăn: chữ nhỏ, giao diện tương phản thấp, nội dung dài khó quét
- Kỳ vọng: vừa vào là có thể bật giao diện dễ nhìn, không cần mò nhiều

**D.O.S.E giải quyết ra sao?**

- onboarding hỗ trợ lựa chọn nhu cầu
- tăng cỡ chữ
- tương phản cao
- AI Mentor hỗ trợ giải thích và đồng hành

### Persona 2: Hoàng Nam - người dùng khó tập trung

- Tuổi: 18
- Vai trò: học sinh cuối cấp
- Thiết bị chính: điện thoại và laptop
- Mục tiêu: tìm thông tin nghề nghiệp nhưng không bị quá tải
- Khó khăn: nhiều nội dung quá dài, khó duy trì tập trung
- Kỳ vọng: giao diện rõ, có hướng dẫn, nội dung không quá rối

**D.O.S.E giải quyết ra sao?**

- module chia khối rõ ràng
- onboarding cá nhân hóa
- AI Mentor hỗ trợ diễn giải lại
- cấu trúc nội dung có chủ đích

### Persona 3: Cô Lan - giáo viên hỗ trợ hòa nhập

- Tuổi: 37
- Vai trò: giáo viên
- Mục tiêu: tìm tài nguyên để hiểu học sinh có nhu cầu đặc biệt
- Khó khăn: thiếu nền tảng tích hợp giữa công nghệ, giáo dục và đồng cảm
- Kỳ vọng: có tài nguyên dễ hiểu, có ví dụ thực tế, có định hướng áp dụng

**D.O.S.E giải quyết ra sao?**

- module Education và Humanity
- nội dung contextual hơn là lý thuyết khô
- tạo cầu nối giữa kỹ thuật và thực hành giáo dục

---

## 17. Use case ở mức nghiệp vụ

### 17.1. Use case tổng quát

Người dùng truy cập nền tảng để tìm kiếm một trải nghiệm số phù hợp với nhu cầu hỗ trợ, đồng thời tiếp cận thông tin, học tập, định hướng và được AI hỗ trợ khi cần.

### 17.2. Danh sách use case chính

1. Người dùng truy cập trang chủ
2. Người dùng chọn nhu cầu hỗ trợ qua onboarding
3. Hệ thống áp dụng preference trợ năng
4. Người dùng mở bảng điều khiển trợ năng để tinh chỉnh
5. Người dùng truy cập module Access
6. Người dùng truy cập module Education
7. Người dùng truy cập module Opportunity
8. Người dùng tương tác với AI Mentor
9. Người dùng làm assessment định hướng
10. Hệ thống lưu preference cho lần truy cập tiếp theo

### 17.3. Use case chi tiết: chọn nhu cầu hỗ trợ

**Tác nhân:** người dùng  
**Mục tiêu:** hệ thống biết nhóm hỗ trợ phù hợp ngay từ đầu  
**Tiền điều kiện:** người dùng mở trang chủ  
**Luồng chính:**

1. Hệ thống hiển thị onboarding
2. Người dùng chọn một nhóm nhu cầu hỗ trợ
3. Hệ thống ghi nhận lựa chọn
4. Người dùng bấm “Tiếp tục vào trang”
5. Hệ thống áp dụng preference phù hợp
6. Người dùng tiếp tục khám phá nền tảng

**Kết quả:** trải nghiệm tiếp cận được cá nhân hóa tốt hơn

### 17.4. Use case chi tiết: sử dụng AI Mentor

**Tác nhân:** người dùng  
**Mục tiêu:** được giải thích, hỗ trợ hoặc trả lời câu hỏi  
**Luồng chính:**

1. Người dùng mở khung chat AI Mentor
2. Nhập câu hỏi
3. Hệ thống gửi yêu cầu tới backend
4. Backend gọi API AI
5. Câu trả lời hiển thị lại trên giao diện

**Giá trị:** giảm rào cản nhận thức và hỗ trợ người dùng theo nhịp riêng

---

## 18. Kiến trúc thông tin của sản phẩm

Ở góc nhìn IA, D.O.S.E có thể được mô hình hóa như một hệ thống gồm 4 tầng:

### 18.1. Tầng tiếp cận

- skip link
- cỡ chữ
- tương phản cao
- điều hướng bàn phím
- focus state
- onboarding preference

### 18.2. Tầng nội dung

- nội dung module Access
- nội dung module Education
- nội dung module Humanity
- nội dung story-based và simulation

### 18.3. Tầng định hướng và cơ hội

- module Opportunity
- assessment nghề nghiệp
- gợi ý accommodation
- gợi ý cơ hội việc làm mô phỏng

### 18.4. Tầng hỗ trợ thông minh

- AI Mentor
- lưu preference
- khả năng diễn giải lại nội dung

Kiến trúc thông tin này giúp sản phẩm không bị rơi vào tình trạng “nhiều tính năng rời rạc”, mà vận hành như một hệ thống có logic phát triển xuyên suốt.

---

## 19. Chi tiết từng module sản phẩm

### 19.1. Module Access

Module này là nơi người dùng hiểu được accessibility từ cả hai phía:

- như một tập hợp kỹ thuật giao diện
- như một điều kiện cơ bản để mọi người được tiếp cận bình đẳng

Vai trò của module:

- giới thiệu khả năng tiếp cận trong môi trường số
- mô tả vì sao điều hướng, tương phản, cỡ chữ, focus và cấu trúc nội dung quan trọng
- tạo nền tảng nhận thức để người dùng hiểu sản phẩm không chỉ “thân thiện” mà còn “có chủ đích”

Ý nghĩa học thuật:

- thể hiện nhóm phát triển hiểu accessibility như một chuẩn kỹ thuật
- không chỉ bật tắt vài nút, mà đặt nó trong ngữ cảnh trải nghiệm người dùng

### 19.2. Module Education

Module Education mang vai trò cầu nối giữa tri thức và trải nghiệm. Đây không chỉ là nơi đặt bài viết mà là không gian giúp:

- phụ huynh hiểu con em hơn
- giáo viên hiểu học sinh hơn
- cộng đồng hiểu về khái niệm hòa nhập
- người dùng hiểu về chính nhu cầu của mình

Nếu phát triển sâu hơn, module này có thể chứa:

- lộ trình bài học
- phân tầng từ cơ bản đến nâng cao
- tình huống thực tế
- bài tập tự đánh giá
- nội dung đa phương tiện

### 19.3. Module Opportunity

Đây là module có tiềm năng phát triển mạnh về mặt ứng dụng thực tế. Nó biến accessibility từ chuyện “xem được nội dung” thành chuyện “tiếp cận được tương lai”.

Vai trò:

- hỗ trợ người dùng nhìn ra môi trường làm việc phù hợp
- cho thấy accommodation quan trọng thế nào trong nghề nghiệp
- mô phỏng logic kết nối giữa hồ sơ năng lực và môi trường hòa nhập

Đặc biệt, module này cho thấy D.O.S.E không dừng ở awareness mà tiến tới empowerment.

### 19.4. Module Humanity

Humanity là phần làm cho sản phẩm có chiều sâu xã hội. Nếu Access là kỹ thuật, Education là tri thức và Opportunity là tương lai, thì Humanity là lớp cảm xúc và nhân văn.

Vai trò:

- kể chuyện
- mô phỏng trải nghiệm đồng cảm
- giúp cộng đồng hiểu rằng hỗ trợ không phải “ưu ái”, mà là điều kiện để công bằng hơn

Đây là điểm khác biệt rất lớn giữa D.O.S.E và một website thông thường.

---

## 20. Chi tiết giải pháp AI Mentor

AI Mentor là một trong những điểm giúp D.O.S.E không chỉ là nền tảng nội dung tĩnh.

### 20.1. Vai trò của AI Mentor

AI Mentor đóng vai trò:

- người giải thích
- người đồng hành
- bộ phận giảm tải nhận thức
- lớp hỗ trợ trung gian giữa hệ thống và người dùng

### 20.2. Trường hợp sử dụng điển hình

- người dùng không hiểu một đoạn giải thích dài
- người dùng cần hỏi lại bằng ngôn ngữ đơn giản hơn
- người dùng cần hỗ trợ theo nhịp riêng thay vì đọc một khối văn bản lớn
- người dùng cần một cảm giác “có người đồng hành” trong quá trình sử dụng nền tảng

### 20.3. Giá trị accessibility của AI Mentor

AI Mentor đặc biệt hữu ích với:

- người khó đọc
- người khó tập trung
- người cần nội dung được diễn giải lại
- người muốn tương tác chủ động thay vì đọc thụ động

### 20.4. Giới hạn hiện tại

Vì đây là phiên bản prototype/đồ án, AI Mentor hiện mới đóng vai trò hỗ trợ cơ bản. Trong tương lai, có thể mở rộng:

- prompt cá nhân hóa theo profile người dùng
- tóm tắt nội dung theo độ dài mong muốn
- hỗ trợ đa dạng mức ngôn ngữ
- gợi ý nội dung tiếp theo nên đọc

---

## 21. Phân tích accessibility ở mức chi tiết hơn

### 21.1. Khả năng nhìn thấy và đọc nội dung

D.O.S.E hỗ trợ nhìn thấy tốt hơn thông qua:

- tương phản cao
- cỡ chữ điều chỉnh được
- màu sắc tương đối rõ
- vùng nhấn mạnh quan trọng được phân tầng bằng typography

Điểm này quan trọng vì rất nhiều website hiện nay dù có thiết kế đẹp nhưng lại hi sinh khả năng đọc.

### 21.2. Điều hướng và thao tác

Hệ thống có hỗ trợ:

- bàn phím
- skip link
- focus visible
- keytip
- phím tắt đến nội dung chính

Điều này cho thấy sản phẩm không chỉ chăm chút phần hiển thị mà còn chú ý tới luồng thao tác.

### 21.3. Hiểu nội dung

Khả năng hiểu không chỉ đến từ câu chữ ngắn, mà đến từ:

- chia module
- nội dung có thứ tự
- UI giảm nhiễu
- AI Mentor giải thích lại

### 21.4. Khả năng duy trì trạng thái

Preference được lưu lại bằng `localStorage` để:

- người dùng không phải thiết lập lại từ đầu mỗi lần truy cập
- trải nghiệm có tính liên tục
- hệ thống thể hiện được trí nhớ tối thiểu đối với nhu cầu hỗ trợ

### 21.5. Những điểm có thể cải thiện trong tương lai

Để bám sát WCAG 2.2 ở mức tốt hơn nữa, sản phẩm có thể bổ sung:

- kiểm tra thứ tự heading xuyên suốt hơn
- chuẩn hóa nhãn ARIA ở tất cả component
- kiểm tra đầy đủ bằng screen reader thật
- bổ sung phụ đề hoặc transcript khi có video/audio
- đánh giá định lượng bằng Lighthouse và công cụ audit khác

---

## 22. Yêu cầu chức năng

### 22.1. Nhóm yêu cầu chức năng chính

Hệ thống phải cho phép:

- người dùng truy cập trang chủ
- người dùng chọn nhu cầu hỗ trợ qua onboarding
- hệ thống lưu và áp dụng preference hiển thị
- người dùng mở các module nội dung
- người dùng tương tác với AI Mentor
- người dùng dùng bàn phím để điều hướng
- người dùng dùng phím tắt để thao tác nhanh
- người dùng đổi cỡ chữ và chế độ hiển thị

### 22.2. Yêu cầu chức năng cho module Opportunity

Hệ thống phải cho phép:

- người dùng bắt đầu assessment
- hệ thống ghi nhận nhóm hỗ trợ đã chọn
- người dùng hoàn thành bộ câu hỏi
- hệ thống tính toán kết quả
- hệ thống gợi ý accommodation và hướng nghề nghiệp

### 22.3. Yêu cầu chức năng cho AI Mentor

Hệ thống phải cho phép:

- người dùng mở/đóng khung chat
- gửi câu hỏi
- nhận phản hồi từ AI
- hiển thị trạng thái chờ phản hồi

---

## 23. Yêu cầu phi chức năng

### 23.1. Khả năng sử dụng

Sản phẩm cần:

- dễ hiểu
- dễ thao tác
- tránh gây quá tải
- duy trì ngôn ngữ nhất quán

### 23.2. Khả năng tiếp cận

Sản phẩm cần:

- hỗ trợ bàn phím
- hỗ trợ focus
- hỗ trợ cỡ chữ
- hỗ trợ tương phản cao
- có skip link

### 23.3. Khả năng mở rộng

Sản phẩm cần có cấu trúc đủ rõ để sau này:

- thêm module
- thay backend AI
- mở rộng dashboard
- thêm tài khoản người dùng

### 23.4. Hiệu năng ở mức prototype

Với một dự án web định hướng học thuật hoặc prototype, hệ thống cần:

- tải nhanh ở mức cơ bản
- phản hồi giao diện đủ mượt
- không phụ thuộc quá nhiều vào các thư viện nặng

### 23.5. Khả năng bảo trì

Mã nguồn cần:

- có cấu trúc file rõ
- tách HTML/CSS/JS hợp lý
- dễ đọc, dễ chỉnh sửa

---

## 24. Kịch bản sử dụng điển hình

### Kịch bản 1: Người dùng thị lực kém truy cập lần đầu

1. Người dùng truy cập trang chủ
2. Hệ thống hiển thị onboarding
3. Người dùng chọn “Thị lực kém”
4. Bấm “Tiếp tục vào trang”
5. Hệ thống áp dụng cỡ chữ lớn và tương phản cao
6. Người dùng tiếp tục khám phá module Access hoặc Education

### Kịch bản 2: Người dùng khó tập trung tìm cơ hội nghề nghiệp

1. Người dùng truy cập trang
2. Chọn nhóm “Khó đọc, khó tập trung hoặc khó tiếp nhận thông tin”
3. Hệ thống giảm nhiễu hiển thị
4. Người dùng vào module Opportunity
5. Hệ thống dùng preference đã lưu để bỏ qua các bước lặp lại
6. Người dùng làm assessment và nhận gợi ý phù hợp

### Kịch bản 3: Giáo viên tìm tài liệu về hòa nhập

1. Giáo viên truy cập trang
2. Không cần chọn hỗ trợ đặc biệt
3. Truy cập module Education
4. Tìm hiểu nội dung về accessibility và cộng đồng
5. Dùng AI Mentor để hỏi lại những điểm cần làm rõ

---

## 25. Chiến lược nội dung và ngôn ngữ

Một điểm quan trọng của D.O.S.E là ngôn ngữ không mang tính loại trừ. Nhiều sản phẩm trợ năng dễ rơi vào hai cực:

- quá kỹ thuật, khó hiểu
- quá cảm tính, thiếu giá trị ứng dụng

D.O.S.E cần cân bằng giữa:

- ngôn ngữ gần gũi
- tính chính xác
- chiều sâu nhân văn
- khả năng dùng được trong môi trường học thuật

Chiến lược nội dung nên theo các nguyên tắc:

- viết câu vừa phải, tránh dồn ý
- chia khối rõ
- ưu tiên động từ cụ thể
- tránh biệt ngữ nếu không giải thích
- mỗi module có giọng điệu riêng nhưng vẫn nhất quán

---

## 26. Thiết kế trải nghiệm người dùng

### 26.1. Triết lý UX của D.O.S.E

Trải nghiệm người dùng trong D.O.S.E không được xây dựng chỉ để “đẹp” mà để:

- giảm ma sát
- giảm áp lực
- tăng cảm giác được hỗ trợ
- tạo niềm tin rằng hệ thống hiểu nhu cầu của người dùng

### 26.2. Vì sao onboarding quan trọng

Onboarding trong D.O.S.E không phải một bước marketing, mà là một bước đạo đức trong thiết kế. Nó truyền tải thông điệp:

- nhu cầu của bạn được ghi nhận
- hệ thống sẽ điều chỉnh theo bạn
- bạn không phải tự thích nghi với giao diện chuẩn số đông

### 26.3. Vì sao các module được tách riêng

Việc chia thành Access, Education, Opportunity, Humanity giúp:

- người dùng không bị lẫn quá nhiều mục tiêu trong một màn hình
- mỗi mảng có thể phát triển sâu hơn
- giảng viên hoặc nhà đầu tư dễ nhìn thấy tư duy sản phẩm

---

## 27. Đánh giá giá trị học thuật của dự án

Nếu nhìn dưới góc độ đồ án, D.O.S.E có giá trị ở nhiều lớp:

### 27.1. Giá trị kỹ thuật

- biết tổ chức giao diện nhiều trang
- biết lưu trạng thái người dùng
- biết tích hợp backend AI
- biết áp dụng nguyên tắc accessibility vào sản phẩm thật

### 27.2. Giá trị thiết kế

- có tư duy module
- có định hướng onboarding
- có luồng trải nghiệm người dùng
- có cấu trúc nội dung rõ ràng

### 27.3. Giá trị xã hội

- giải quyết một vấn đề có ý nghĩa
- đặt con người yếu thế làm trung tâm
- không chỉ nói về công nghệ, mà nói về cơ hội và hòa nhập

### 27.4. Giá trị phát triển tiếp

Dự án có khả năng phát triển thành:

- capstone
- startup idea
- social innovation project
- portfolio product case study

---

## 28. Rủi ro và giới hạn hiện tại

Để tài liệu chuyên nghiệp hơn, cần thừa nhận những giới hạn hiện tại của sản phẩm.

### 28.1. Giới hạn về dữ liệu

Một số nội dung hiện mới ở mức mô phỏng hoặc prototype, chưa có dữ liệu thực tế quy mô lớn.

### 28.2. Giới hạn về đánh giá accessibility

Sản phẩm đã áp dụng nhiều nguyên tắc WCAG 2.2 nhưng vẫn cần:

- test screen reader thực tế
- test với đa thiết bị
- audit định lượng sâu hơn

### 28.3. Giới hạn về AI

AI Mentor hiện là công cụ hỗ trợ, chưa thay thế được:

- chuyên gia tư vấn
- giáo viên
- mentor thật
- chuyên viên hỗ trợ tâm lý

### 28.4. Giới hạn về hạ tầng

Phiên bản hiện tại phù hợp với prototype, đồ án hoặc demo nhiều hơn là môi trường production quy mô lớn.

---

## 29. Hướng phát triển tiếp theo

### 29.1. Về nội dung

- mở rộng thư viện bài học
- thêm tài liệu theo từng nhóm người dùng
- thêm nội dung chuyên sâu về doanh nghiệp hòa nhập

### 29.2. Về kỹ thuật

- chuẩn hóa component trợ năng hơn nữa
- cải thiện backend AI
- bổ sung hệ thống tài khoản
- lưu preference phía server

### 29.3. Về accessibility

- test định kỳ bằng Lighthouse
- test bằng screen reader
- bổ sung transcript và caption cho nội dung media
- xây dựng checklist audit riêng cho từng module

### 29.4. Về xã hội và cộng đồng

- hợp tác với giáo viên, phụ huynh, tổ chức xã hội
- đưa vào workshop hoặc chương trình giáo dục cộng đồng
- dùng như tài nguyên minh họa cho đào tạo inclusion

---

## 30. Kết luận mở rộng

D.O.S.E là một minh chứng cho việc một dự án web có thể vượt ra ngoài phạm vi “làm đúng chức năng” để chạm tới những câu hỏi lớn hơn của thiết kế công nghệ: Ai đang bị bỏ quên trong quá trình số hóa? Accessibility có phải chỉ là checklist? Đồng cảm có thể được thiết kế thành hệ thống không? Và liệu một nền tảng số có thể vừa hỗ trợ tiếp cận, vừa dạy cộng đồng cách thấu hiểu, vừa mở ra cơ hội thực tế cho người dùng hay không?

Câu trả lời mà D.O.S.E đưa ra là có thể.

Sức mạnh của dự án không nằm ở việc có nhiều hiệu ứng hay công nghệ phức tạp, mà ở chỗ nó tổ chức một trải nghiệm số quanh các nhu cầu con người rất cụ thể. Từ onboarding, điều chỉnh trợ năng, nội dung giáo dục, AI Mentor, cho đến module Opportunity và Humanity, tất cả đều cùng trả lời một câu hỏi: làm sao để công nghệ bớt tạo thêm rào cản và bắt đầu trở thành công cụ chữa lành khoảng cách giữa con người với con người?

Ở cấp độ báo cáo học thuật, D.O.S.E cho thấy nhóm phát triển:

- hiểu bài toán xã hội
- biết chuyển bài toán đó thành cấu trúc sản phẩm
- biết áp dụng nguyên tắc accessibility vào giao diện thật
- biết kết nối UX, nội dung và kỹ thuật

Ở cấp độ sản phẩm, D.O.S.E mở ra một hướng phát triển rất giàu tiềm năng:

- một nền tảng học tập hòa nhập
- một hệ thống mentoring số
- một cổng cơ hội nghề nghiệp tiếp cận tốt hơn
- một social-tech project có thể trưởng thành thành sản phẩm thực tế

Do đó, giá trị của D.O.S.E không chỉ nằm ở việc “xây được một website”, mà nằm ở việc đặt ra một mô hình tư duy sản phẩm có trách nhiệm hơn với con người. Khi accessibility được xem là nền tảng, khi empathy được đưa vào thiết kế, và khi cơ hội trở thành mục tiêu cuối cùng, công nghệ mới thật sự đóng vai trò tích cực trong xã hội.

---

## 31. Phụ lục gợi ý cho báo cáo hoặc thuyết trình

Nếu cần phát triển tài liệu này thành báo cáo hoàn chỉnh hơn nữa, có thể bổ sung các phụ lục sau:

### 31.1. Phụ lục A - Danh sách màn hình chính

- `index.html`
- `pages/home.html`
- `pages/access.html`
- `pages/education.html`
- `pages/opportunity.html`
- `pages/humanity.html`
- `pages/onboarding.html`
- `pages/dashboard.html`

### 31.2. Phụ lục B - Danh sách thành phần accessibility nổi bật

- skip link
- keytip
- high contrast
- text resize
- reduced motion
- live region
- onboarding profile
- focus states

### 31.3. Phụ lục C - Tài liệu có thể phát triển tiếp

- SRS đầy đủ
- Use Case Diagram
- User Persona chi tiết
- Accessibility Audit
- Pitch Deck
- Roadmap phát triển sản phẩm

### 31.4. Phụ lục D - Cách trình bày khi thuyết trình

Khi dùng tài liệu này để thuyết trình, có thể tách thành 5 ý lớn:

1. D.O.S.E giải quyết vấn đề gì
2. Người dùng chính là ai
3. Hệ thống hoạt động ra sao
4. WCAG 2.2 được áp dụng như thế nào
5. Giá trị xã hội và định hướng phát triển của sản phẩm là gì
