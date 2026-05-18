const $ = (id) => document.getElementById(id);

function announce(message, isError = false) {
  const status = $("kbdStatus");
  if (!status) return;
  status.textContent = message;
  status.classList.toggle("error", isError);
}

document.addEventListener("keydown", (event) => {
  const useShortcut = event.altKey || event.metaKey;
  if (!useShortcut) return;

  const tag = document.activeElement?.tagName?.toLowerCase();
  if (tag === "input" || tag === "textarea" || tag === "select") return;

  const key = event.key.toLowerCase();
  const routeMap = {
    "1": "../index.html",
    "2": "access.html",
    "3": "education.html",
    "4": "opportunity.html",
    "5": "humanity.html"
  };

  if (routeMap[key]) {
    event.preventDefault();
    const keyLabel = event.metaKey ? "⌘" : "Alt/⌥";
    announce(`Đang chuyển trang bằng phím tắt ${keyLabel} + ${key}.`);
    window.location.href = routeMap[key];
    return;
  }

  if (key === "m") {
    event.preventDefault();
    const main = $("main-content");
    if (main) {
      main.focus();
      announce("Đã chuyển tới vùng nội dung chính.");
    }
  }
});

const disabilityProfiles = {
  vision: {
    label: "Khiếm thị / thị giác",
    intro:
      "Giao diện này ưu tiên khả năng đọc bằng trình đọc màn hình, cấu trúc đơn giản và chỉ dẫn rõ ràng theo thứ tự.",
    supports: [
      "Heading được chia cấp rõ ràng và các nút hành động giữ nhãn ngắn, nhất quán.",
      "Mọi hình ảnh cần có mô tả thay thế, nội dung quan trọng không đặt riêng trong ảnh.",
      "Ưu tiên phím tắt, vùng focus nổi bật và bố cục một cột để đọc tuần tự."
    ],
    lessons: [
      ["Bài 1", "Làm quen trình đọc màn hình và cách di chuyển bằng heading, landmark, link."],
      ["Bài 2", "Cá nhân hóa tốc độ đọc, cỡ chữ và tương phản theo môi trường sử dụng."],
      ["Bài 3", "Nhận biết biểu mẫu khó dùng và cách yêu cầu phiên bản dễ truy cập hơn."]
    ],
    helper:
      "Bắt đầu từ giao diện ít nhiễu, đọc từng khối nội dung theo heading, rồi lưu lại bộ phím tắt bạn dùng thường xuyên nhất."
  },
  hearing: {
    label: "Khiếm thính / thính giác",
    intro:
      "Giao diện này ưu tiên truyền đạt bằng chữ và hình, hạn chế phụ thuộc vào âm thanh hoặc thông báo chỉ phát bằng giọng nói.",
    supports: [
      "Video nên có phụ đề đồng bộ và bản chép lời ngắn gọn bên dưới.",
      "Thông báo hệ thống phải xuất hiện bằng văn bản rõ ràng, không chỉ dùng âm báo.",
      "Bài học ưu tiên sơ đồ, icon, tóm tắt đầu dòng và ví dụ trực quan."
    ],
    lessons: [
      ["Bài 1", "Cách tận dụng phụ đề, transcript và ghi chú song song khi học trực tuyến."],
      ["Bài 2", "Đọc nhanh tín hiệu trực quan trong lớp học, cuộc họp và bài giảng video."],
      ["Bài 3", "Mẫu câu đề nghị giáo viên hoặc nhóm học cung cấp nội dung dạng chữ."]
    ],
    helper:
      "Hãy ưu tiên tài liệu có transcript từ đầu, sau đó dùng ghi chú ngắn để gom lại ý chính thay vì cố nhớ toàn bộ lời nói."
  },
  mobility: {
    label: "Khó khăn vận động",
    intro:
      "Giao diện này giảm số lần thao tác, ưu tiên nút lớn, đường đi ngắn và điều hướng mạch lạc từ bàn phím hoặc công cụ hỗ trợ.",
    supports: [
      "Các thao tác quan trọng được gom theo luồng ngắn, tránh yêu cầu kéo thả hoặc nhấn quá nhiều lần.",
      "Vùng bấm rộng, khoảng cách hợp lý và biểu mẫu ít trường nhập hơn.",
      "Điều hướng bàn phím đầy đủ với focus rõ và thứ tự tab ổn định."
    ],
    lessons: [
      ["Bài 1", "Thiết lập phím tắt và công cụ hỗ trợ để giảm thao tác lặp lại."],
      ["Bài 2", "Tổ chức phiên học ngắn, có điểm dừng rõ để tránh quá tải thể chất."],
      ["Bài 3", "Nhận diện giao diện gây mệt và cách chuyển sang luồng thao tác tối giản hơn."]
    ],
    helper:
      "Ưu tiên những đường đi chỉ cần một tay hoặc bàn phím, và đừng ngại bỏ qua các tính năng phụ nếu chúng tăng gánh thao tác."
  },
  cognitive: {
    label: "Khó khăn nhận thức / học tập",
    intro:
      "Giao diện này được tối giản để giúp tiếp nhận dễ hơn: ít nhiễu, câu ngắn, từng bước nhỏ và nhấn mạnh một việc tại một thời điểm.",
    supports: [
      "Nội dung được chia khối nhỏ với tiêu đề rõ, không nhồi quá nhiều ý trong một màn hình.",
      "Ngôn ngữ trực tiếp, ví dụ cụ thể và hướng dẫn tuần tự từng bước.",
      "Ưu tiên nhắc lại ý chính, checklist ngắn và vùng tóm tắt sau mỗi phần."
    ],
    lessons: [
      ["Bài 1", "Đọc hiểu từng bước: xác định mục tiêu, ý chính và hành động tiếp theo."],
      ["Bài 2", "Biến bài học dài thành checklist 3 bước để dễ theo dõi hơn."],
      ["Bài 3", "Cách nhận biết dấu hiệu quá tải thông tin và tạm dừng đúng lúc."]
    ],
    helper:
      "Mỗi lần chỉ tập trung một nhiệm vụ nhỏ. Khi thấy trang quá nhiều chữ, hãy tìm tiêu đề và checklist trước khi đọc sâu."
  },
  mental: {
    label: "Khó khăn sức khỏe tâm thần",
    intro:
      "Giao diện này được thiết kế nhẹ áp lực hơn, giúp bạn giữ cảm giác an toàn, có thể tạm dừng và quay lại mà không bị mất định hướng.",
    supports: [
      "Nhịp nội dung chậm hơn, ít yếu tố gây xao nhãng và không dùng cảnh báo gắt trừ khi thực sự cần.",
      "Các bước học có thể tạm dừng giữa chừng, quay lại dễ dàng và không tạo cảm giác thất bại.",
      "Thông điệp hỗ trợ trung tính, tôn trọng và giảm áp lực thành tích."
    ],
    lessons: [
      ["Bài 1", "Tạo góc học an toàn: giảm kích thích, đặt thời lượng vừa sức và khoảng nghỉ rõ ràng."],
      ["Bài 2", "Nhận biết tín hiệu căng thẳng khi học online và cách dừng đúng lúc."],
      ["Bài 3", "Viết ra nhu cầu hỗ trợ bằng ngôn ngữ ngắn gọn, không tự trách bản thân."]
    ],
    helper:
      "Chọn nhịp học đủ nhẹ cho bạn. Mục tiêu không phải học thật nhiều trong một lần, mà là duy trì được cảm giác an toàn để tiếp tục."
  }
};

const disabilityRouteMap = {
  vision: "disability-vision.html",
  hearing: "disability-hearing.html",
  mobility: "disability-mobility.html",
  cognitive: "disability-cognitive.html",
  mental: "disability-mental.html"
};

const form = $("disabilityForm");
const feedback = $("formFeedback");
form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const selectedType = formData.get("disabilityType");

  if (!selectedType || !disabilityProfiles[selectedType]) {
    feedback.textContent = "Vui lòng chọn một loại khuyết tật để tiếp tục.";
    feedback.classList.add("error");
    announce("Vui lòng chọn một loại khuyết tật để tiếp tục.", true);
    return;
  }

  feedback.textContent = "";
  feedback.classList.remove("error");

  const destination = disabilityRouteMap[selectedType];
  announce(`Đang chuyển tới không gian học tập cho ${disabilityProfiles[selectedType].label}.`);

  if (destination) {
    window.location.href = destination;
  }
});
