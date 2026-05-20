const $ = (id) => document.getElementById(id);

function announce(message) {
  const status = $("kbdStatus");
  if (status) status.textContent = message;
}

function toggleMode(buttonId, className, label) {
  const button = $(buttonId);
  if (!button) return;

  button.addEventListener("click", () => {
    const next = button.getAttribute("aria-pressed") !== "true";
    button.setAttribute("aria-pressed", String(next));
    document.documentElement.classList.toggle(className, next);
    document.body.classList.toggle(className, next);
    announce(`${label}: ${next ? "đã bật" : "đã tắt"}.`);
  });
}

toggleMode("contrastToggle", "high-contrast", "Chế độ tương phản cao");
toggleMode("fontToggle", "large-text", "Chế độ chữ lớn");
toggleMode("motionToggle", "reduce-motion", "Chế độ giảm chuyển động");

const profileKey = document.body.dataset.profile;
const data = {
  vision: {
    title: "Không gian riêng cho Khiếm thị / thị giác",
    eyebrow: "Thông tin và giải pháp ưu tiên",
    intro:
      "Trang này tổng hợp kiến thức phổ thông, tình huống thường gặp và các giải pháp thực tế giúp bạn tiếp cận nội dung số rõ ràng hơn khi có nhu cầu hỗ trợ về thị giác.",
    image: "asset/khiemthi.png",
    imageAlt: "Ảnh đại diện cho người khiếm thị",
    highlights: [
      ["Bạn nên ưu tiên gì?", "Heading rõ, mô tả ảnh đầy đủ, tương phản đủ mạnh và bố cục đọc tuần tự."],
      ["Rào cản phổ biến", "Nội dung quan trọng nằm trong ảnh, PDF khó đọc, nút không rõ nhãn và biểu mẫu lộn xộn."],
      ["Mục tiêu của trang", "Giúp bạn hiểu rào cản, biết công cụ phù hợp và có mẫu cách xin hỗ trợ rõ ràng."]
    ],
    sections: {
      characteristics: [
        "Tiếp nhận tốt hơn khi nội dung có cấu trúc rõ, chia cấp tiêu đề và thứ tự đọc hợp lý.",
        "Dễ bị cản trở khi thông tin chính nằm riêng trong hình ảnh hoặc màu sắc.",
        "Cần nhãn nút, mô tả ảnh và vùng được chọn đủ rõ để không mất định hướng."
      ],
      solutions: [
        "Dùng trình đọc màn hình hoặc công cụ đọc to để nắm dàn ý nội dung trước.",
        "Bật tương phản cao, tăng cỡ chữ hoặc phóng to theo nhu cầu thực tế.",
        "Ưu tiên tài liệu dạng chữ, trang web có tiêu đề rõ, bản chép lời và mô tả thay thế đầy đủ."
      ],
      requests: [
        "Bạn có thể cho mình bản tài liệu dạng chữ hoặc tệp PDF dễ đọc hơn không?",
        "Phần hình minh họa này có mô tả nội dung chính bằng chữ không?",
        "Biểu mẫu này có phiên bản tương thích tốt hơn với trình đọc màn hình không?"
      ],
      scenarios: [
        "Slide thuyết trình chứa toàn bộ ý chính trong ảnh và không có mô tả.",
        "Biểu mẫu online dùng placeholder thay cho label nên rất khó xác định trường nhập.",
        "PDF scan không thể đọc tuần tự hoặc tìm ý chính bằng công cụ hỗ trợ."
      ],
      tools: [
        "Trình đọc màn hình để nghe và điều hướng nội dung theo tiêu đề, liên kết và các vùng chính của trang.",
        "Phóng to, tăng cỡ chữ, bật tương phản cao hoặc tiện ích đọc nội dung thành tiếng.",
        "Bản chữ rút gọn hoặc bản chép lời để tìm ý chính nhanh hơn."
      ],
      checklist: [
        "Kiểm tra có tiêu đề rõ trước khi đọc sâu.",
        "Xem nội dung quan trọng có đang nằm riêng trong ảnh hay không.",
        "Nếu tài liệu khó đọc, xin phiên bản dạng chữ hoặc mô tả thay thế ngay từ đầu."
      ]
    }
  },
  hearing: {
    title: "Không gian riêng cho Khiếm thính / thính giác",
    eyebrow: "Thông tin và giải pháp ưu tiên",
    intro:
      "Trang này tập trung vào cách tiếp cận thông tin bằng chữ và hình, cùng các giải pháp giúp bạn không bỏ lỡ ý chính trong video, lớp học hay tài liệu số.",
    image: "asset/khiemthinh.png",
    imageAlt: "Ảnh đại diện cho người khiếm thính",
    highlights: [
      ["Bạn nên ưu tiên gì?", "Phụ đề, bản chép lời, sơ đồ trực quan và thông báo bằng chữ."],
      ["Rào cản phổ biến", "Video không phụ đề, thông báo chỉ có âm báo, lời nói nhanh không có phần tóm tắt."],
      ["Mục tiêu của trang", "Giúp bạn nhận diện nội dung nghe được dưới dạng nhìn thấy được."]
    ],
    sections: {
      characteristics: [
        "Tiếp nhận hiệu quả hơn khi nội dung được trình bày bằng chữ, biểu tượng và sơ đồ trực quan.",
        "Dễ bỏ lỡ ý quan trọng nếu thông tin chỉ phát bằng giọng nói hoặc âm báo.",
        "Cần đồng bộ giữa hình ảnh trên màn hình và phần giải thích đi kèm."
      ],
      solutions: [
        "Ưu tiên video có phụ đề đồng bộ và bản chép lời đầy đủ ngữ cảnh.",
        "Yêu cầu thông báo hoặc lời dặn quan trọng được hiển thị bằng chữ.",
        "Dùng ghi chú trực quan để gom ý chính thay vì theo dõi toàn bộ lời nói."
      ],
      requests: [
        "Bạn có thể gửi mình bản chép lời hoặc bản tóm tắt bằng chữ không?",
        "Video này có phụ đề đầy đủ ngữ cảnh và người nói không?",
        "Thông báo quan trọng có thể hiện bằng chữ trên màn hình được không?"
      ],
      scenarios: [
        "Bài giảng online chỉ nói miệng, không phụ đề, không có slide rõ ràng.",
        "Nhóm học họp nhanh bằng voice nhưng không để lại tóm tắt bằng chữ.",
        "Thông báo hệ thống chỉ có âm báo làm bạn không biết chuyện gì xảy ra."
      ],
      tools: [
        "Phụ đề, bản chép lời và phụ đề tự động được kiểm tra lại độ chính xác.",
        "Sơ đồ, biểu tượng, gạch đầu dòng và tài liệu trực quan dễ quét mắt.",
        "Ghi chú song song theo cột ý chính hoặc theo mốc thời gian để theo dõi tốt hơn."
      ],
      checklist: [
        "Kiểm tra video có phụ đề hoặc bản chép lời trước khi xem.",
        "Xin tài liệu chữ nếu nội dung chủ yếu truyền qua âm thanh.",
        "Tóm tắt ý chính ngay sau mỗi phần để không bị mất mạch thông tin."
      ]
    }
  },
  mobility: {
    title: "Không gian riêng cho Khó khăn vận động",
    eyebrow: "Thông tin và giải pháp ưu tiên",
    intro:
      "Trang này tổng hợp các giải pháp giúp bạn dùng nội dung số với ít thao tác hơn, ít mệt hơn và ít phụ thuộc hơn vào các cử động chính xác.",
    image: "asset/khokhanvandong.png",
    imageAlt: "Ảnh đại diện cho người gặp khó khăn vận động",
    highlights: [
      ["Bạn nên ưu tiên gì?", "Vùng bấm lớn, điều hướng bàn phím, thao tác ngắn và ít trường nhập."],
      ["Rào cản phổ biến", "Kéo thả, nút nhỏ, biểu mẫu dài và thứ tự tab không hợp lý."],
      ["Mục tiêu của trang", "Giúp bạn rút ngắn đường đi thao tác và giảm mệt mỏi thể chất."]
    ],
    sections: {
      characteristics: [
        "Dễ mệt nếu phải bấm nhiều lần hoặc rê chuột thật chính xác.",
        "Cần vùng tương tác đủ rộng và phản hồi rõ sau mỗi thao tác.",
        "Thường thuận tiện hơn khi dùng bàn phím hoặc thiết bị nhập hỗ trợ."
      ],
      solutions: [
        "Ưu tiên luồng thao tác ngắn, ít bước và có nút tiếp tục rõ ràng.",
        "Dùng phím tắt, tab hợp lý hoặc công cụ hỗ trợ để giảm thao tác lặp.",
        "Chia việc thành từng lượt ngắn có điểm dừng để tránh quá tải thể chất."
      ],
      requests: [
        "Biểu mẫu này có phiên bản ngắn hơn hoặc ít trường nhập hơn không?",
        "Trang này có hỗ trợ điều hướng bàn phím đầy đủ không?",
        "Có thể thay thao tác kéo thả bằng nút chọn hoặc danh sách không?"
      ],
      scenarios: [
        "Form dài nhiều bước, mỗi bước cần bấm nhiều lần mới qua được.",
        "Nút quá nhỏ hoặc đặt sát nhau khiến rất dễ bấm nhầm.",
        "Trang bắt buộc kéo thả hoặc rê chuột đúng vị trí mới hoàn thành tác vụ."
      ],
      tools: [
        "Điều hướng bàn phím, công tắc hỗ trợ, bàn phím thay thế hoặc phím tắt.",
        "Chế độ đơn giản để giảm nhiễu và tập trung vào nút chính.",
        "Bản tóm tắt hoặc luồng thao tác ngắn để giảm số bước cần đi qua."
      ],
      checklist: [
        "Xem trang có hỗ trợ tab hợp lý trước khi thao tác sâu.",
        "Ưu tiên nút chính và bỏ qua tính năng phụ nếu gây mệt.",
        "Nếu thao tác quá dài, dừng và chia nhỏ thành các lượt ngắn hơn."
      ]
    }
  },
  cognitive: {
    title: "Không gian riêng cho Khó khăn nhận thức / học tập",
    eyebrow: "Thông tin và giải pháp ưu tiên",
    intro:
      "Trang này tập trung vào cách làm nội dung gọn hơn, rõ hơn và dễ theo dõi hơn để giảm cảm giác quá tải khi tiếp cận thông tin số.",
    image: "asset/khokhannhanthuc,hoc tap.png",
    imageAlt: "Ảnh đại diện cho người gặp khó khăn nhận thức và học tập",
    highlights: [
      ["Bạn nên ưu tiên gì?", "Câu ngắn, danh sách kiểm tra, tóm tắt ý chính và từng bước nhỏ."],
      ["Rào cản phổ biến", "Quá nhiều chữ, quá nhiều lựa chọn và nhiều việc phải quyết định cùng lúc."],
      ["Mục tiêu của trang", "Giúp bạn giữ được mạch hiểu và giảm áp lực xử lý thông tin."]
    ],
    sections: {
      characteristics: [
        "Dễ quá tải khi một màn hình có quá nhiều chữ hoặc quá nhiều nút.",
        "Tiếp nhận tốt hơn khi thông tin chia nhỏ và có ví dụ cụ thể.",
        "Cần nhịp đọc chậm hơn một chút để hiểu rồi mới chuyển bước."
      ],
      solutions: [
        "Dùng danh sách kiểm tra, gạch đầu dòng và bản tóm tắt để giữ lại ý chính.",
        "Giảm nhiễu, chỉ tập trung vào một nhiệm vụ chính ở một thời điểm.",
        "Xin bản ngắn hoặc dùng Trợ lý AI để rút nội dung dài thành từng bước."
      ],
      requests: [
        "Bạn có thể gửi mình bản tóm tắt ngắn hơn được không?",
        "Nội dung này có thể chia thành từng bước nhỏ rõ ràng hơn không?",
        "Có ví dụ cụ thể hoặc danh sách kiểm tra để mình theo dõi dễ hơn không?"
      ],
      scenarios: [
        "Trang có nhiều phần cùng lúc và không rõ nên bắt đầu từ đâu.",
        "Tài liệu dài nhưng không có tóm tắt hay đánh dấu ý chính.",
        "Bị ngợp khi phải vừa đọc vừa nhớ vừa quyết định bước tiếp theo."
      ],
      tools: [
        "Danh sách kiểm tra 3 bước, bản gạch đầu dòng, tóm tắt siêu ngắn hoặc bản đọc dễ hiểu.",
        "Trợ lý AI để rút gọn nội dung và nhắc lại ý chính.",
        "Giao diện đơn giản, ít nhiễu và có nhịp nội dung chậm hơn."
      ],
      checklist: [
        "Đọc tiêu đề trước, rồi xác định một việc cần làm ngay.",
        "Tự rút ra 2 đến 3 ý chính trước khi qua phần khác.",
        "Nếu thấy quá tải, dừng lại và chuyển sang bản tóm tắt hoặc danh sách kiểm tra."
      ]
    }
  },
  mental: {
    title: "Không gian riêng cho Khó khăn sức khỏe tâm thần",
    eyebrow: "Thông tin và giải pháp ưu tiên",
    intro:
      "Trang này ưu tiên cảm giác an toàn, nhịp tiếp cận nhẹ hơn và những điều chỉnh giúp bạn quay lại nội dung số mà không tự tạo thêm áp lực cho mình.",
    image: "asset/khokhansuckhoetamthan.png",
    imageAlt: "Ảnh đại diện cho người gặp khó khăn sức khỏe tâm thần",
    highlights: [
      ["Bạn nên ưu tiên gì?", "Nhịp nội dung dịu hơn, ít kích thích, quyền tạm dừng và quay lại dễ dàng."],
      ["Rào cản phổ biến", "Thông tin dồn dập, cảnh báo mạnh, deadline gây áp lực và giao diện quá kích thích."],
      ["Mục tiêu của trang", "Giúp bạn duy trì cảm giác kiểm soát và tiếp cận nội dung theo nhịp riêng."]
    ],
    sections: {
      characteristics: [
        "Có thể nhạy cảm với nội dung quá dồn dập hoặc cảnh báo gắt.",
        "Cần khả năng nghỉ ngắn, quay lại và tiếp tục mà không mất định hướng.",
        "Học hiệu quả hơn trong môi trường ít phán xét và ít áp lực thành tích."
      ],
      solutions: [
        "Chọn nhịp xem ngắn, có điểm nghỉ và mục tiêu nhỏ thay vì cố làm hết.",
        "Ưu tiên giao diện trung tính, ít kích thích và thông báo thật sự cần thiết.",
        "Dùng Trợ lý AI để tóm tắt nội dung hoặc giảm áp lực khi cần quay lại."
      ],
      requests: [
        "Mình có thể xem bản tóm tắt trước rồi mới quay lại nội dung đầy đủ không?",
        "Nội dung này có cách trình bày dịu hơn hoặc ít gây áp lực hơn không?",
        "Mình có thể xin thêm thời gian hoặc chia nhỏ phần này được không?"
      ],
      scenarios: [
        "Nội dung hoặc thông báo khiến bạn thấy căng thẳng ngay từ đầu.",
        "Deadline hoặc lời nhắc liên tục làm tăng cảm giác áp lực.",
        "Bạn rời trang một lúc và ngại quay lại vì sợ mình đang tụt lại."
      ],
      tools: [
        "Bản tóm tắt ngắn, Trợ lý AI với nhịp chậm hơn, giao diện đơn giản và ít cảnh báo.",
        "Điểm nghỉ rõ ràng, danh sách mục dễ trước khó sau.",
        "Không gian cộng đồng phản tư nhẹ nhàng và không phán xét."
      ],
      checklist: [
        "Đặt mục tiêu nhỏ và thực tế trước khi bắt đầu.",
        "Nếu thấy quá tải, chuyển sang mục nhẹ hơn hoặc tóm tắt trước.",
        "Cho phép mình nghỉ và quay lại mà không tự trách bản thân."
      ]
    }
  }
};

const profile = data[profileKey];

function fillList(id, items) {
  const el = $(id);
  if (!el) return;
  el.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
}

if (profile) {
  document.title = `D.O.S.E - ${profile.label}`;
  $("pageEyebrow").textContent = profile.eyebrow;
  $("pageTitle").textContent = profile.title;
  $("pageIntro").textContent = profile.intro;
  $("profileImage").src = profile.image;
  $("profileImage").alt = profile.imageAlt;

  $("highlightOneTitle").textContent = profile.highlights[0][0];
  $("highlightOneText").textContent = profile.highlights[0][1];
  $("highlightTwoTitle").textContent = profile.highlights[1][0];
  $("highlightTwoText").textContent = profile.highlights[1][1];
  $("highlightThreeTitle").textContent = profile.highlights[2][0];
  $("highlightThreeText").textContent = profile.highlights[2][1];

  fillList("characteristicsList", profile.sections.characteristics);
  fillList("solutionsList", profile.sections.solutions);
  fillList("requestsList", profile.sections.requests);
  fillList("scenariosList", profile.sections.scenarios);
  fillList("toolsList", profile.sections.tools);
  fillList("checklistList", profile.sections.checklist);
}

document.addEventListener("keydown", (event) => {
  const useShortcut = event.altKey || event.metaKey;
  if (!useShortcut) return;

  const tag = document.activeElement?.tagName?.toLowerCase();
  if (tag === "input" || tag === "textarea" || tag === "select") return;

  const key = event.key.toLowerCase();
  const routeMap = {
    "1": "home.html",
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
