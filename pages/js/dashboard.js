const liveRegion = document.getElementById("dashboardLiveRegion");
const menuToggle = document.getElementById("menuToggle");
const sideNav = document.getElementById("sideNav");
const mobileNavBackdrop = document.getElementById("mobileNavBackdrop");
const mentorOpenButton = document.getElementById("mentorOpenButton");
const mentorSuggestionButton = document.getElementById("mentorSuggestionButton");
const mentorFeedback = document.getElementById("mentorFeedback");
const dashboardWelcomeTitle = document.getElementById("dashboardWelcomeTitle");
const dashboardHeroEyebrow = document.getElementById("dashboardHeroEyebrow");
const dashboardHeroTitle = document.getElementById("dashboard-hero-title");
const dashboardHeroIntro = document.getElementById("dashboardHeroIntro");
const dashboardProfileArt = document.getElementById("dashboardProfileArt");
const dashboardProfileIllustration = document.getElementById("dashboardProfileIllustration");
const dashboardProfileGlyph = document.getElementById("dashboardProfileGlyph");
const dashboardProfileArtCaption = document.getElementById("dashboardProfileArtCaption");
const profileTraitsIntro = document.getElementById("profileTraitsIntro");
const profileTraitsList = document.getElementById("profileTraitsList");
const profileSupportList = document.getElementById("profileSupportList");
const profileLearningList = document.getElementById("profileLearningList");
const profileGuidanceIntro = document.getElementById("profileGuidanceIntro");
const profileSolutionList = document.getElementById("profileSolutionList");
const profileScenarioList = document.getElementById("profileScenarioList");
const profileChecklistList = document.getElementById("profileChecklistList");
const metricActiveLessons = document.getElementById("metricActiveLessons");
const metricWeeklyProgress = document.getElementById("metricWeeklyProgress");
const metricMentorTips = document.getElementById("metricMentorTips");
const continueLink = document.getElementById("continueLink");
const continueTag = document.getElementById("continueTag");
const continueLessonTitle = document.getElementById("continueLessonTitle");
const continueLessonDesc = document.getElementById("continueLessonDesc");
const continueProgressBar = document.getElementById("continueProgressBar");
const continueProgressFill = document.getElementById("continueProgressFill");
const continueProgressText = document.getElementById("continueProgressText");
const continuePrimaryButton = document.getElementById("continuePrimaryButton");
const continueSecondaryButton = document.getElementById("continueSecondaryButton");
const progressList = document.getElementById("progressList");
const mentorIntro = document.getElementById("mentorIntro");
const recommendedGrid = document.getElementById("recommendedGrid");
const communityFeed = document.getElementById("communityFeed");

let lastMenuTrigger = null;

const profileIllustrationMap = {
  vision: `
    <svg viewBox="0 0 320 220" role="img" aria-label="Minh hoa cho nhom khiem thi va thi giac">
      <rect x="62" y="48" width="196" height="118" rx="28" fill="rgba(255,255,255,0.92)" />
      <circle cx="114" cy="106" r="28" fill="#1d5b3c" opacity="0.14" />
      <circle cx="206" cy="106" r="28" fill="#1d5b3c" opacity="0.14" />
      <path d="M48 110c28-30 67-45 112-45s84 15 112 45c-28 30-67 45-112 45S76 140 48 110z" fill="none" stroke="#1d5b3c" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="160" cy="110" r="24" fill="#5f9f7a" />
      <circle cx="160" cy="110" r="10" fill="#ffffff" />
      <path d="M104 180h112" stroke="#1d5b3c" stroke-width="10" stroke-linecap="round" />
    </svg>
  `,
  hearing: `
    <svg viewBox="0 0 320 220" role="img" aria-label="Minh hoa cho nhom khiem thinh va thinh giac">
      <rect x="72" y="34" width="176" height="152" rx="30" fill="rgba(255,255,255,0.92)" />
      <path d="M140 86c0-20 16-36 36-36 19 0 34 14 34 32 0 16-10 24-23 33-10 7-15 14-15 26" fill="none" stroke="#1e557c" stroke-width="12" stroke-linecap="round"/>
      <path d="M172 158v2" stroke="#1e557c" stroke-width="12" stroke-linecap="round"/>
      <path d="M220 72c20 12 33 34 33 58" fill="none" stroke="#6ca7d4" stroke-width="10" stroke-linecap="round"/>
      <path d="M240 58c28 18 46 48 46 82" fill="none" stroke="#6ca7d4" stroke-width="8" stroke-linecap="round" opacity="0.85"/>
      <rect x="96" y="164" width="128" height="22" rx="11" fill="#6ca7d4" opacity="0.28" />
      <text x="160" y="180" text-anchor="middle" font-size="20" font-weight="800" fill="#1e557c">CC</text>
    </svg>
  `,
  mobility: `
    <svg viewBox="0 0 320 220" role="img" aria-label="Minh hoa cho nhom kho khan van dong">
      <rect x="76" y="28" width="168" height="164" rx="28" fill="rgba(255,255,255,0.92)" />
      <rect x="108" y="62" width="104" height="68" rx="20" fill="#78ab9a" opacity="0.2" />
      <path d="M160 70v52" stroke="#1f5a4a" stroke-width="12" stroke-linecap="round"/>
      <path d="M134 96h52" stroke="#1f5a4a" stroke-width="12" stroke-linecap="round"/>
      <circle cx="118" cy="154" r="16" fill="#1f5a4a" opacity="0.16" />
      <circle cx="202" cy="154" r="16" fill="#1f5a4a" opacity="0.16" />
      <path d="M116 154h88" stroke="#1f5a4a" stroke-width="10" stroke-linecap="round"/>
      <path d="M104 52l-18 18" stroke="#78ab9a" stroke-width="8" stroke-linecap="round"/>
      <path d="M216 52l18 18" stroke="#78ab9a" stroke-width="8" stroke-linecap="round"/>
    </svg>
  `,
  cognitive: `
    <svg viewBox="0 0 320 220" role="img" aria-label="Minh hoa cho nhom kho khan nhan thuc va hoc tap">
      <rect x="68" y="34" width="184" height="152" rx="28" fill="rgba(255,255,255,0.92)" />
      <rect x="100" y="68" width="120" height="18" rx="9" fill="#46508d" opacity="0.18" />
      <rect x="100" y="98" width="84" height="18" rx="9" fill="#46508d" opacity="0.18" />
      <rect x="100" y="128" width="102" height="18" rx="9" fill="#46508d" opacity="0.18" />
      <circle cx="222" cy="107" r="26" fill="#9aa3dd" opacity="0.28" />
      <path d="M216 108l8 8 18-22" stroke="#46508d" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="160" y="176" text-anchor="middle" font-size="24" font-weight="800" fill="#46508d">1 2 3</text>
    </svg>
  `,
  mental: `
    <svg viewBox="0 0 320 220" role="img" aria-label="Minh hoa cho nhom kho khan suc khoe tam than">
      <rect x="64" y="34" width="192" height="152" rx="32" fill="rgba(255,255,255,0.92)" />
      <path d="M160 82c10-18 36-20 48-4 13 16 6 40-12 56l-36 30-36-30c-18-16-25-40-12-56 12-16 38-14 48 4z" fill="#d7a168" opacity="0.34"/>
      <path d="M110 78c8-10 20-16 34-16 6 0 11 1 16 3 5-2 10-3 16-3 14 0 26 6 34 16" fill="none" stroke="#7f4f20" stroke-width="8" stroke-linecap="round"/>
      <path d="M102 154c18-16 37-24 58-24 21 0 40 8 58 24" fill="none" stroke="#7f4f20" stroke-width="10" stroke-linecap="round"/>
      <circle cx="138" cy="106" r="8" fill="#7f4f20" />
      <circle cx="182" cy="106" r="8" fill="#7f4f20" />
    </svg>
  `
};

function renderProfileIllustration(profileKey, profile) {
  if (!dashboardProfileIllustration) return;

  if (profile.imageSrc) {
    dashboardProfileIllustration.innerHTML = `
      <img
        class="profile-art-photo"
        src="${profile.imageSrc}"
        alt="${profile.imageAlt || profile.label}"
      />
    `;

    const photo = dashboardProfileIllustration.querySelector("img");
    photo?.addEventListener(
      "error",
      () => {
        dashboardProfileIllustration.innerHTML =
          profileIllustrationMap[profileKey] ||
          `<span class="profile-art-glyph">${profile.glyph}</span>`;
      },
      { once: true }
    );
    return;
  }

  dashboardProfileIllustration.innerHTML =
    profileIllustrationMap[profileKey] ||
    `<span class="profile-art-glyph">${profile.glyph}</span>`;
}

const profileCopyMap = {
  vision: {
    label: "Khiếm thị / thị giác",
    eyebrow: "Không gian học tập cho bạn",
    title: "Bạn đang ở chế độ học tập ưu tiên thị giác dễ tiếp cận",
    intro:
      "Bảng điều khiển này có thể được tối ưu thêm cho trình đọc màn hình, cấu trúc rõ ràng và điều hướng tuần tự.",
    glyph: "A",
    artCaption: "Biểu tượng chữ nổi bật đại diện cho không gian ưu tiên đọc, nghe nội dung bằng công cụ hỗ trợ và định hướng rõ ràng.",
    imageSrc: "asset/khiemthi.png",
    imageAlt: "Anh dai dien cho nguoi khiem thi",
    accentSoft: "#d8f5e2",
    accentStrong: "#5f9f7a",
    accentText: "#1d5b3c",
    traitsIntro:
      "Những đặc điểm thường gặp dưới đây giúp hệ thống tổ chức nội dung theo cách dễ theo dõi và ít gây cản trở hơn cho bạn.",
    traits: [
      "Dễ tiếp nhận thông tin tốt hơn khi nội dung có thứ tự rõ, tiêu đề phân cấp và ít phụ thuộc vào hình ảnh thuần túy.",
      "Cần mô tả thay thế cho hình, biểu đồ và nút chức năng để không bỏ lỡ ý quan trọng.",
      "Thường có lợi hơn khi điều hướng theo tiêu đề, vùng chính của trang hoặc phím tắt thay vì phải rà soát toàn màn hình."
    ],
    supports: [
      "Tăng tương phản chữ và nền để nhận diện thông tin nhanh hơn.",
      "Giữ nhãn nút ngắn, rõ nghĩa và nhất quán xuyên suốt hành trình học.",
      "Ưu tiên phiên bản tương thích tốt với trình đọc màn hình hoặc công cụ phóng to."
    ],
    learning: [
      "Bắt đầu bằng dàn ý bài học trước, sau đó đi theo từng tiêu đề lớn.",
      "Nghe nội dung qua trình đọc màn hình hoặc bản đọc tóm tắt để tạo bức tranh tổng thể.",
      "Lưu lại phím tắt và các điểm mốc quan trọng để quay lại nhanh khi cần."
    ],
    metrics: ["03 nội dung đang mở", "+16% so với tuần trước", "02 gợi ý mới từ Trợ lý AI"],
    continue: {
      linkLabel: "Mở toàn bộ nội dung",
      tag: "Nội dung ưu tiên",
      title: "Trợ năng thị giác: đọc nội dung số rõ ràng hơn",
      desc: "Bạn đang xem phần về cấu trúc tiêu đề, mô tả ảnh và cách dùng trình đọc màn hình để đi qua trang nhanh hơn.",
      progress: 72,
      progressLabel: "72% đã xem",
      primaryLabel: "Tiếp tục xem",
      secondaryLabel: "Nghe lại bằng audio"
    },
    progress: [
      ["Điều hướng bằng tiêu đề và vùng chính", "82%"],
      ["Mô tả ảnh và nội dung thay thế", "74%"],
      ["Tùy chỉnh tương phản và cỡ chữ", "69%"]
    ],
    mentor:
      "Trợ lý AI có thể đọc tóm tắt nội dung, mô tả lại bố cục trang và đề xuất bước tiếp theo phù hợp với cách tiếp cận bằng âm thanh.",
    recommended: [
      ["09 phút", "Độ tương phản và kiểu chữ dễ đọc", "Hiểu cách chọn màu, cỡ chữ và khoảng cách để nội dung rõ hơn khi dùng thị lực yếu hoặc phóng to màn hình."],
      ["11 phút", "Trình đọc màn hình hoạt động như thế nào", "Nắm những nguyên tắc cơ bản để đọc trang bằng tiêu đề, vùng chính, liên kết và biểu mẫu."],
      ["08 phút", "Cách yêu cầu tài liệu dễ tiếp cận", "Mẫu câu ngắn để xin phiên bản có mô tả ảnh, tệp PDF dễ đọc hoặc nội dung theo cấu trúc rõ ràng."]
    ],
    community: [
      ["Người đồng hành cộng đồng", "Buổi chia sẻ về mô tả ảnh trong tài liệu học tập", "Nhóm cộng đồng sẽ cùng xem cách viết mô tả thay thế và cách tránh đặt thông tin quan trọng chỉ trong hình ảnh."],
      ["Câu chuyện người dùng", "Một thành viên chia sẻ cách học hiệu quả hơn với trình đọc màn hình", "Bạn ấy đã thay đổi thứ tự đọc, lưu phím tắt quan trọng và giảm thời gian tìm ý chính trong bài giảng số."],
      ["Hỗ trợ đồng đẳng", "Kho tài liệu dễ đọc đang được cập nhật thêm", "Cộng đồng vừa thêm các tài liệu có tiêu đề rõ, bản đọc ngắn và nội dung chia khối để bạn truy cập nhanh hơn."]
    ],
    guidanceIntro:
      "Phiên bản này ưu tiên những giải pháp giúp bạn đọc, nghe và định hướng nội dung số rõ ràng hơn mà không bị phụ thuộc vào cách trình bày thuần hình ảnh.",
    solutions: [
      "Ưu tiên tài liệu có tiêu đề rõ, mô tả ảnh đầy đủ và cấu trúc nội dung có thể đi tuần tự.",
      "Sử dụng trình đọc màn hình hoặc công cụ đọc to để nắm khung nội dung trước khi đọc sâu.",
      "Bật tương phản cao, tăng cỡ chữ hoặc phóng to màn hình khi cần nhận diện nhanh các điểm chính."
    ],
    scenarios: [
      "Gặp slide có quá nhiều chữ trong ảnh và không có mô tả thay thế.",
      "Gặp biểu mẫu dài nhưng nhãn trường nhập không rõ hoặc thứ tự tab lộn xộn.",
      "Gặp tài liệu PDF khó đọc, không có tiêu đề rõ và không thể dò ý chính nhanh."
    ],
    checklist: [
      "Kiểm tra xem nội dung quan trọng có đang nằm riêng trong ảnh hay không.",
      "Tìm tiêu đề lớn trước, sau đó mới đi vào từng đoạn nhỏ.",
      "Nếu đọc khó, ưu tiên xin bản chữ, bản chép lời hoặc phiên bản dễ truy cập hơn."
    ]
  },
  hearing: {
    label: "Khiếm thính / thính giác",
    eyebrow: "Không gian học tập cho bạn",
    title: "Bạn đang ở chế độ học tập ưu tiên nội dung trực quan",
    intro:
      "Bảng điều khiển này có thể được tối ưu thêm cho phụ đề, bản chép lời và các tín hiệu hiển thị rõ ràng.",
    glyph: "CC",
    artCaption: "Biểu tượng phụ đề đại diện cho không gian học tập ưu tiên chữ viết, tín hiệu hình ảnh và nội dung dễ quan sát.",
    imageSrc: "asset/khiemthinh.png",
    imageAlt: "Anh dai dien cho nguoi khiem thinh",
    accentSoft: "#e3f4ff",
    accentStrong: "#6ca7d4",
    accentText: "#1e557c",
    traitsIntro:
      "Trang này sẽ nhấn mạnh các điểm mạnh về quan sát trực quan và giảm phụ thuộc vào âm thanh để bạn theo kịp nội dung tốt hơn.",
    traits: [
      "Tiếp nhận tốt hơn khi thông tin được trình bày bằng chữ, sơ đồ, tín hiệu hình ảnh hoặc bố cục dễ quét mắt.",
      "Có thể bỏ lỡ nội dung quan trọng nếu thông báo chỉ xuất hiện qua âm thanh hoặc lời nói nhanh.",
      "Thường cần đồng bộ giữa nội dung nhìn thấy trên màn hình và phần giải thích kèm theo."
    ],
    supports: [
      "Cung cấp phụ đề, bản chép lời và ghi chú tóm tắt cho video hoặc âm thanh.",
      "Biến tín hiệu cảnh báo thành thông báo trực quan rõ ràng trên màn hình.",
      "Ưu tiên bố cục có biểu tượng, minh họa và các mốc thông tin dễ định vị."
    ],
    learning: [
      "Đọc bản chép lời trước để nắm ý chính rồi mới xem video chi tiết.",
      "Ghi chú theo sơ đồ hoặc cột ý chính để tiết kiệm công sức theo dõi.",
      "Chọn tài liệu có hình minh họa, gạch đầu dòng rõ và ví dụ trực quan để học nhanh hơn."
    ],
    metrics: ["04 nội dung đang mở", "+14% so với tuần trước", "03 gợi ý mới từ Trợ lý AI"],
    continue: {
      linkLabel: "Mở toàn bộ nội dung",
      tag: "Nội dung ưu tiên",
      title: "Phụ đề, bản chép lời và tín hiệu trực quan trong học tập số",
      desc: "Bạn đang xem phần hướng dẫn nhận biết nội dung quan trọng qua chữ viết, biểu tượng và sơ đồ thay vì phụ thuộc vào lời nói.",
      progress: 65,
      progressLabel: "65% đã xem",
      primaryLabel: "Tiếp tục xem",
      secondaryLabel: "Mở bản chép lời"
    },
    progress: [
      ["Đọc và dùng bản chép lời hiệu quả", "88%"],
      ["Nhận biết tín hiệu trực quan", "61%"],
      ["Yêu cầu phụ đề và bản chép lời", "70%"]
    ],
    mentor:
      "Trợ lý AI có thể tóm tắt video thành gạch đầu dòng ngắn, chuyển âm thanh thành bản chép lời và gợi ý nội dung trực quan dễ theo dõi hơn.",
    recommended: [
      ["10 phút", "Phụ đề tốt cần có gì", "Hiểu sự khác nhau giữa phụ đề cơ bản, phụ đề đầy đủ ngữ cảnh và bản chép lời hỗ trợ học tập."],
      ["12 phút", "Tổ chức ghi chú theo sơ đồ", "Một cách ghi chú trực quan để không bị mất ý chính khi theo dõi lớp học hoặc bài giảng video."],
      ["07 phút", "Mẫu câu xin tài liệu dạng chữ", "Những cách diễn đạt ngắn gọn để xin giáo viên hoặc nhóm học cung cấp phụ đề, bản chép lời hoặc tóm tắt."]
    ],
    community: [
      ["Người đồng hành cộng đồng", "Workshop mini về phụ đề trong thuyết trình", "Buổi chia sẻ tập trung vào cách làm slide và video dễ theo dõi hơn cho người khiếm thính."],
      ["Câu chuyện người dùng", "Một thành viên cải thiện việc học nhờ bản chép lời", "Bạn ấy chia sẻ cách đọc bản chép lời trước, đánh dấu ý chính và quay lại video ở đúng đoạn cần xem."],
      ["Hỗ trợ đồng đẳng", "Nhóm cộng đồng đang thu thập video có phụ đề tốt", "Danh sách tài liệu trực quan và bản chép lời đang được cập nhật để mọi người dễ tra cứu hơn."]
    ],
    guidanceIntro:
      "Phiên bản này tập trung vào việc biến thông tin nghe được thành thông tin nhìn thấy được, để bạn không bỏ lỡ ý chính trong lớp học, video hay buổi thuyết trình.",
    solutions: [
      "Ưu tiên phụ đề đồng bộ, bản chép lời rõ ràng và nội dung có sơ đồ hoặc gạch đầu dòng dễ quét mắt.",
      "Chuyển các tín hiệu âm thanh thành thông báo chữ hoặc dấu hiệu hiển thị trên màn hình.",
      "Chuẩn bị ghi chú trực quan trước khi vào buổi học để theo dõi nội dung dễ hơn."
    ],
    scenarios: [
      "Video không có phụ đề hoặc phụ đề thiếu ngữ cảnh quan trọng.",
      "Thông báo hệ thống chỉ có âm báo mà không có nội dung chữ.",
      "Bài giảng nói nhanh, đổi chủ đề liên tục và không có slide tóm tắt."
    ],
    checklist: [
      "Xem trước có bản chép lời hay phụ đề trước khi bắt đầu nội dung.",
      "Đánh dấu những phần cần xin bản chép lời hoặc tóm tắt bằng chữ.",
      "Ưu tiên tài liệu có sơ đồ, biểu tượng và ví dụ trực quan nếu cần xem lại."
    ]
  },
  mobility: {
    label: "Khó khăn vận động",
    eyebrow: "Không gian học tập cho bạn",
    title: "Bạn đang ở chế độ học tập ưu tiên thao tác ngắn gọn",
    intro:
      "Bảng điều khiển này có thể được tối ưu thêm cho vùng bấm lớn, ít bước thao tác và điều hướng bàn phím.",
    glyph: "+",
    artCaption: "Biểu tượng vùng bấm lớn đại diện cho không gian học tập giảm thao tác lặp, giảm yêu cầu chính xác tay và rút ngắn đường đi.",
    imageSrc: "asset/khokhanvandong.png",
    imageAlt: "Anh dai dien cho nguoi gap kho khan van dong",
    accentSoft: "#e0f6ef",
    accentStrong: "#78ab9a",
    accentText: "#1f5a4a",
    traitsIntro:
      "Những đặc điểm này giúp hệ thống hiểu rằng bạn cần một luồng học ngắn, vùng tương tác rộng và khả năng điều hướng ít mệt hơn.",
    traits: [
      "Dễ mệt khi phải bấm nhiều lần, rê chuột chính xác hoặc thực hiện chuỗi thao tác dài.",
      "Cần vùng chạm rộng, khoảng cách hợp lý giữa các nút và phản hồi rõ ràng sau mỗi thao tác.",
      "Có thể thuận tiện hơn khi dùng bàn phím, công tắc hỗ trợ hoặc thiết bị nhập thay thế."
    ],
    supports: [
      "Rút gọn số bước trong biểu mẫu và các luồng thao tác chính.",
      "Giữ các nút hành động lớn, dễ bấm và nằm ở vị trí dễ đoán.",
      "Đảm bảo thứ tự tab hợp lý để hoàn thành tác vụ mà không phải dùng chuột quá nhiều."
    ],
    learning: [
      "Chia phiên học thành từng mục ngắn để tránh mỏi tay hoặc quá tải vận động.",
      "Ưu tiên bài học có nút tiếp tục rõ và cho phép quay lại dễ dàng.",
      "Thiết lập phím tắt hoặc công cụ hỗ trợ từ đầu để giảm thao tác lặp lại."
    ],
    metrics: ["03 nội dung đang mở", "+12% so với tuần trước", "02 gợi ý mới từ Trợ lý AI"],
    continue: {
      linkLabel: "Mở toàn bộ nội dung",
      tag: "Nội dung ưu tiên",
      title: "Giảm thao tác lặp khi dùng trang học tập",
      desc: "Bạn đang xem phần về vùng bấm lớn, thứ tự tab hợp lý và cách rút ngắn các bước thao tác thường gặp trong môi trường số.",
      progress: 58,
      progressLabel: "58% đã xem",
      primaryLabel: "Tiếp tục xem",
      secondaryLabel: "Mở bản tóm tắt"
    },
    progress: [
      ["Rút gọn thao tác trong biểu mẫu", "63%"],
      ["Điều hướng bàn phím hiệu quả", "72%"],
      ["Tổ chức phiên dùng máy ít mệt hơn", "55%"]
    ],
    mentor:
      "Trợ lý AI có thể gợi ý đường đi ngắn hơn trên trang, nhắc các điểm dừng hợp lý và đề xuất công cụ giúp giảm thao tác lặp.",
    recommended: [
      ["08 phút", "Bàn phím thay cho chuột trong tác vụ cơ bản", "Một số thao tác thiết yếu để giảm phụ thuộc vào rê chuột chính xác hoặc kéo thả."],
      ["10 phút", "Thiết kế vùng bấm lớn và rõ", "Hiểu vì sao kích thước nút, khoảng cách và vị trí thao tác ảnh hưởng nhiều tới trải nghiệm vận động."],
      ["09 phút", "Tự sắp xếp nhịp nghỉ khi dùng máy", "Cách nhận biết lúc nên dừng, đổi tư thế hoặc chia tác vụ để tránh mỏi quá mức."]
    ],
    community: [
      ["Người đồng hành cộng đồng", "Buổi trao đổi về điều hướng bàn phím trong lớp học số", "Nhóm cộng đồng sẽ cùng chia sẻ cách dùng tab, vùng được chọn và phím tắt để giảm thao tác lặp."],
      ["Câu chuyện người dùng", "Một thành viên rút ngắn 1 nửa số thao tác khi học online", "Bạn ấy thay đổi cách dùng phím tắt và chọn nền tảng có luồng thao tác ngắn hơn."],
      ["Hỗ trợ đồng đẳng", "Danh sách công cụ hỗ trợ thao tác đang được cập nhật", "Cộng đồng vừa bổ sung các gợi ý về công tắc, bàn phím thay thế và mẹo thao tác tiết kiệm sức hơn."]
    ],
    guidanceIntro:
      "Phiên bản này ưu tiên những giải pháp giúp bạn hoàn thành tác vụ với ít bước hơn, ít mỏi hơn và ít phụ thuộc hơn vào thao tác chính xác bằng tay.",
    solutions: [
      "Chọn các luồng thao tác ngắn, ít trường nhập và có nút tiếp tục rõ ràng.",
      "Ưu tiên điều hướng bàn phím, vùng bấm lớn và vị trí nút dễ đoán.",
      "Dùng công cụ hỗ trợ hoặc phím tắt để giảm số lần lặp đi lặp lại cùng một thao tác."
    ],
    scenarios: [
      "Biểu mẫu quá dài, phải cuộn và bấm nhiều lần mới hoàn thành.",
      "Nút bấm nhỏ, đặt sát nhau hoặc yêu cầu kéo thả khó kiểm soát.",
      "Trang không hỗ trợ tab hợp lý nên phải quay lại bằng chuột nhiều lần."
    ],
    checklist: [
      "Ưu tiên bàn phím hoặc lối tắt nếu thao tác chuột làm bạn mệt nhanh.",
      "Chia tác vụ dài thành từng lượt ngắn có điểm nghỉ rõ ràng.",
      "Nếu một trang quá nhiều bước, đổi sang phiên bản đơn giản hơn trước khi tiếp tục."
    ]
  },
  cognitive: {
    label: "Khó khăn nhận thức / học tập",
    eyebrow: "Không gian học tập cho bạn",
    title: "Bạn đang ở chế độ học tập ưu tiên nội dung đơn giản",
    intro:
      "Bảng điều khiển này có thể được tối ưu thêm bằng câu ngắn, từng bước nhỏ và nhịp tiếp nhận nhẹ hơn.",
    glyph: "IQ",
    artCaption: "Biểu tượng nhịp học chậm rãi đại diện cho không gian học tập ít nhiễu, hướng dẫn ngắn và từng bước rõ ràng.",
    imageSrc: "asset/khokhannhanthuc,hoc tap.png",
    imageAlt: "Anh dai dien cho nguoi gap kho khan nhan thuc va hoc tap",
    accentSoft: "#f2f3ff",
    accentStrong: "#9aa3dd",
    accentText: "#46508d",
    traitsIntro:
      "Mục này tóm tắt các đặc điểm phổ biến để nội dung được chia nhỏ hơn, trực tiếp hơn và dễ theo dõi trong từng bước.",
    traits: [
      "Dễ quá tải khi một màn hình chứa quá nhiều chữ, quá nhiều lựa chọn hoặc nhiều yêu cầu cùng lúc.",
      "Tiếp nhận hiệu quả hơn khi thông tin được chia khối nhỏ, nhắc lại ý chính và có ví dụ cụ thể.",
      "Cần nhịp học chậm hơn một chút để hiểu, ghi nhớ và chuyển sang bước tiếp theo tự tin hơn."
    ],
    supports: [
      "Giảm nhiễu thị giác, giữ câu ngắn và làm nổi bật hành động tiếp theo.",
      "Thêm danh sách kiểm tra hoặc tóm tắt sau mỗi phần để củng cố hiểu biết.",
      "Ưu tiên một nhiệm vụ chính trên mỗi màn hình thay vì dồn nhiều mục tiêu."
    ],
    learning: [
      "Đọc tiêu đề trước để xác định mục tiêu rồi mới đi vào từng đoạn ngắn.",
      "Gạch ra 2 đến 3 việc cần làm thay vì cố nhớ cả bài học một lúc.",
      "Tạm dừng sau mỗi phần để tự nhắc lại ý chính bằng ngôn ngữ của mình."
    ],
    metrics: ["04 nội dung đang mở", "+19% so với tuần trước", "03 gợi ý mới từ Trợ lý AI"],
    continue: {
      linkLabel: "Mở toàn bộ nội dung",
      tag: "Nội dung ưu tiên",
      title: "Chia thông tin thành từng bước nhỏ dễ theo dõi",
      desc: "Bạn đang xem phần về cách dùng danh sách kiểm tra, tóm tắt ý chính và giới hạn mỗi màn hình chỉ còn một việc quan trọng cần làm.",
      progress: 77,
      progressLabel: "77% đã xem",
      primaryLabel: "Tiếp tục xem",
      secondaryLabel: "Xem bản siêu ngắn"
    },
    progress: [
      ["Danh sách 3 bước", "84%"],
      ["Giảm nhiễu và đọc ý chính", "76%"],
      ["Nhận biết quá tải thông tin", "71%"]
    ],
    mentor:
      "Trợ lý AI có thể rút gọn nội dung thành câu ngắn, chia từng bước rõ ràng và nhắc lại ý chính sau mỗi phần để bạn theo dõi dễ hơn.",
    recommended: [
      ["07 phút", "Cách đọc nhanh một trang nhiều chữ", "Ưu tiên nhìn tiêu đề, ý chính và hành động tiếp theo trước khi đọc sâu vào chi tiết."],
      ["09 phút", "Biến nội dung dài thành danh sách kiểm tra", "Một phương pháp đơn giản để chia nhiệm vụ thành 2 đến 3 bước dễ nhớ hơn."],
      ["08 phút", "Dừng đúng lúc khi quá tải", "Những dấu hiệu cho thấy bạn cần nghỉ, đổi cách tiếp cận hoặc nhờ thêm hỗ trợ."]
    ],
    community: [
      ["Người đồng hành cộng đồng", "Buổi chia sẻ về ngôn ngữ đơn giản trong tài liệu học", "Cộng đồng cùng xem cách viết câu ngắn, rõ và ít gây quá tải hơn cho người đọc."],
      ["Câu chuyện người dùng", "Một thành viên học hiệu quả hơn nhờ danh sách kiểm tra", "Bạn ấy chia mỗi nội dung thành 3 việc nhỏ và theo dõi được tiến độ mà không bị ngợp."],
      ["Hỗ trợ đồng đẳng", "Kho tóm tắt siêu ngắn đang được mở rộng", "Cộng đồng đang thêm các bản rút gọn, bản gạch đầu dòng và mẫu trình bày dễ hiểu hơn."]
    ],
    guidanceIntro:
      "Phiên bản này tập trung vào việc làm nội dung gọn hơn, rõ hơn và ít gây quá tải hơn để bạn giữ được mạch hiểu từ đầu đến cuối.",
    solutions: [
      "Chia nội dung thành từng bước nhỏ, mỗi màn hình chỉ giữ một mục tiêu chính.",
      "Dùng danh sách kiểm tra, tóm tắt ý chính và ví dụ cụ thể để giảm áp lực ghi nhớ.",
      "Ưu tiên bản siêu ngắn hoặc bản gạch đầu dòng nếu nội dung gốc quá dày đặc."
    ],
    scenarios: [
      "Một trang có quá nhiều chữ, nhiều nút và không rõ nên bắt đầu từ đâu.",
      "Nội dung dài nhưng không có tóm tắt hay đánh dấu ý chính.",
      "Bị ngợp khi vừa phải đọc, vừa phải nhớ, vừa phải quyết định nhiều việc cùng lúc."
    ],
    checklist: [
      "Đọc tiêu đề trước rồi tìm ngay hành động tiếp theo quan trọng nhất.",
      "Tự rút ra 2 đến 3 ý chính trước khi chuyển sang phần khác.",
      "Nếu thấy quá tải, dừng lại và chuyển sang bản ngắn hơn hoặc nhờ Trợ lý AI tóm tắt."
    ]
  },
  mental: {
    label: "Khó khăn sức khỏe tâm thần",
    eyebrow: "Không gian học tập cho bạn",
    title: "Bạn đang ở chế độ học tập ưu tiên cảm giác an toàn",
    intro:
      "Bảng điều khiển này có thể được tối ưu thêm để giảm áp lực, giảm nhiễu và giữ nhịp học linh hoạt hơn.",
    glyph: "EQ",
    artCaption: "Biểu tượng cân bằng cảm xúc đại diện cho không gian học tập dịu hơn, ít kích thích và cho phép bạn quay lại theo nhịp riêng.",
    imageSrc: "asset/khokhansuckhoetamthan.png",
    imageAlt: "Anh dai dien cho nguoi gap kho khan suc khoe tam than",
    accentSoft: "#f8ecd9",
    accentStrong: "#d7a168",
    accentText: "#7f4f20",
    traitsIntro:
      "Khi kéo xuống, bạn sẽ thấy các đặc điểm giúp hệ thống giữ trải nghiệm dịu hơn, an toàn hơn và ít tạo áp lực thành tích.",
    traits: [
      "Có thể nhạy cảm hơn với nội dung dồn dập, cảnh báo mạnh hoặc quá nhiều kích thích cùng lúc.",
      "Cần một nhịp học linh hoạt để có thể tạm dừng, nghỉ ngắn và quay lại mà không bị mất hướng.",
      "Thường học hiệu quả hơn trong môi trường trung tính, không phán xét và không tạo cảm giác thất bại."
    ],
    supports: [
      "Giảm các yếu tố gây xao nhãng và chỉ giữ lại những tín hiệu thật sự cần thiết.",
      "Cho phép tạm dừng hoặc quay lại bài học dễ dàng mà không làm mất tiến độ chính.",
      "Dùng ngôn ngữ hỗ trợ nhẹ nhàng, trung tính và khích lệ vừa đủ."
    ],
    learning: [
      "Chọn khoảng thời gian học ngắn nhưng đều thay vì ép bản thân học quá lâu.",
      "Tự thiết lập điểm nghỉ rõ ràng để giữ cảm giác kiểm soát và an toàn.",
      "Bắt đầu bằng các mục dễ trước, sau đó mới chuyển dần sang phần cần nhiều năng lượng hơn."
    ],
    metrics: ["02 nội dung đang mở", "+11% so với tuần trước", "02 gợi ý dịu nhẹ từ Trợ lý AI"],
    continue: {
      linkLabel: "Mở toàn bộ nội dung",
      tag: "Nội dung ưu tiên",
      title: "Giữ cảm giác an toàn khi tiếp cận nội dung số",
      desc: "Bạn đang xem phần về nhịp học nhẹ hơn, cách nhận biết dấu hiệu căng thẳng và những điều chỉnh giúp giảm áp lực khi quay lại nội dung.",
      progress: 61,
      progressLabel: "61% đã xem",
      primaryLabel: "Tiếp tục xem",
      secondaryLabel: "Mở chế độ dịu hơn"
    },
    progress: [
      ["Nhận biết dấu hiệu căng thẳng", "68%"],
      ["Thiết lập điểm nghỉ an toàn", "59%"],
      ["Dùng ngôn ngữ hỗ trợ với chính mình", "64%"]
    ],
    mentor:
      "Trợ lý AI có thể tóm tắt nội dung theo nhịp chậm hơn, gợi ý điểm nghỉ và đề xuất các bước nhẹ nhàng hơn khi bạn cảm thấy quá tải.",
    recommended: [
      ["08 phút", "Nhịp học đủ nhẹ để không kiệt sức", "Gợi ý cách chia thời gian, chọn mục tiêu nhỏ và quay lại nội dung mà không tự gây áp lực."],
      ["10 phút", "Tạo góc học an toàn", "Những điều chỉnh về ánh sáng, âm thanh, thời lượng và mức kích thích để trải nghiệm học dịu hơn."],
      ["07 phút", "Mẫu câu xin hỗ trợ không tự trách bản thân", "Một số cách diễn đạt ngắn gọn để nói về giới hạn hiện tại và nhu cầu hỗ trợ." ]
    ],
    community: [
      ["Người đồng hành cộng đồng", "Buổi trò chuyện về học tập không áp lực", "Nhóm cộng đồng sẽ chia sẻ những cách giữ nhịp học an toàn hơn mà vẫn duy trì được kết nối."],
      ["Câu chuyện người dùng", "Một thành viên tìm lại cảm giác kiểm soát khi học online", "Bạn ấy đã thay đổi mục tiêu, thêm điểm nghỉ và dùng ngôn ngữ trung tính hơn với chính mình."],
      ["Hỗ trợ đồng đẳng", "Không gian phản tư nhẹ nhàng cuối tuần", "Bạn có thể tham gia một vòng chia sẻ nhỏ, không phán xét, để nghe góc nhìn từ những người đồng hành khác."]
    ],
    guidanceIntro:
      "Phiên bản này ưu tiên cảm giác an toàn, nhịp tiếp cận nhẹ hơn và những điều chỉnh giúp bạn quay lại nội dung mà không tự tạo thêm áp lực.",
    solutions: [
      "Giữ nhịp học ngắn, cho phép tạm dừng và quay lại mà không mất định hướng.",
      "Ưu tiên giao diện ít cảnh báo gắt, ít kích thích và ngôn ngữ trung tính hơn.",
      "Dùng Trợ lý AI để tóm tắt nội dung theo nhịp chậm hơn khi bạn cần."
    ],
    scenarios: [
      "Nội dung quá dồn dập khiến bạn thấy căng thẳng hoặc muốn rời trang ngay.",
      "Thông báo, deadline hoặc lời nhắc khiến cảm giác áp lực tăng lên nhanh.",
      "Khó quay lại nội dung sau khi nghỉ vì sợ mình đang bị tụt lại."
    ],
    checklist: [
      "Tự chọn điểm dừng trước khi bắt đầu thay vì cố xem hết một lần.",
      "Nếu thấy quá tải, chuyển sang mục nhẹ hơn hoặc mở bản tóm tắt trước.",
      "Giữ mục tiêu nhỏ và cụ thể để tránh cảm giác thất bại không cần thiết."
    ]
  }
};

function renderProgressList(items) {
  if (!progressList) return;
  progressList.innerHTML = items
    .map(([label, value]) => `<li><span>${label}</span><strong>${value}</strong></li>`)
    .join("");
}

function renderRecommended(items) {
  if (!recommendedGrid) return;
  recommendedGrid.innerHTML = items
    .map(
      ([tag, title, text]) => `
        <article class="mini-card recommended-card" role="listitem">
          <p class="story-tag">${tag}</p>
          <h3>${title}</h3>
          <p>${text}</p>
        </article>
      `
    )
    .join("");
}

function renderCommunityFeed(items) {
  if (!communityFeed) return;
  communityFeed.innerHTML = items
    .map(
      ([tag, title, text]) => `
        <article class="feed-item" role="listitem">
          <p class="story-tag">${tag}</p>
          <h3>${title}</h3>
          <p>${text}</p>
        </article>
      `
    )
    .join("");
}

function announce(message) {
  if (!liveRegion) return;
  liveRegion.textContent = "";
  window.setTimeout(() => {
    liveRegion.textContent = message;
  }, 30);
}

function applyProfileFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const profileKey = params.get("profile");
  const profile = profileCopyMap[profileKey];

  if (!profile) return;

  if (dashboardWelcomeTitle) {
    dashboardWelcomeTitle.textContent = `Xin chào, ${profile.label}`;
  }

  if (dashboardHeroEyebrow) {
    dashboardHeroEyebrow.textContent = profile.eyebrow;
  }

  if (dashboardHeroTitle) {
    dashboardHeroTitle.textContent = profile.title;
  }

  if (dashboardHeroIntro) {
    dashboardHeroIntro.textContent = profile.intro;
  }

  if (dashboardProfileGlyph) {
    dashboardProfileGlyph.textContent = profile.glyph;
  }

  renderProfileIllustration(profileKey, profile);

  if (dashboardProfileArtCaption) {
    dashboardProfileArtCaption.textContent = profile.artCaption;
  }

  if (dashboardProfileArt) {
    dashboardProfileArt.style.setProperty("--profile-accent-soft", profile.accentSoft);
    dashboardProfileArt.style.setProperty("--profile-accent-strong", profile.accentStrong);
    dashboardProfileArt.style.setProperty("--profile-accent-text", profile.accentText);
  }

  if (profileTraitsIntro) {
    profileTraitsIntro.textContent = profile.traitsIntro;
  }

  if (profileTraitsList) {
    profileTraitsList.innerHTML = profile.traits.map((item) => `<li>${item}</li>`).join("");
  }

  if (profileSupportList) {
    profileSupportList.innerHTML = profile.supports.map((item) => `<li>${item}</li>`).join("");
  }

  if (profileLearningList) {
    profileLearningList.innerHTML = profile.learning.map((item) => `<li>${item}</li>`).join("");
  }

  if (profileGuidanceIntro) {
    profileGuidanceIntro.textContent = profile.guidanceIntro;
  }

  if (profileSolutionList) {
    profileSolutionList.innerHTML = profile.solutions.map((item) => `<li>${item}</li>`).join("");
  }

  if (profileScenarioList) {
    profileScenarioList.innerHTML = profile.scenarios.map((item) => `<li>${item}</li>`).join("");
  }

  if (profileChecklistList) {
    profileChecklistList.innerHTML = profile.checklist.map((item) => `<li>${item}</li>`).join("");
  }

  if (metricActiveLessons) metricActiveLessons.textContent = profile.metrics[0];
  if (metricWeeklyProgress) metricWeeklyProgress.textContent = profile.metrics[1];
  if (metricMentorTips) metricMentorTips.textContent = profile.metrics[2];

  if (continueLink) continueLink.textContent = profile.continue.linkLabel;
  if (continueTag) continueTag.textContent = profile.continue.tag;
  if (continueLessonTitle) continueLessonTitle.textContent = profile.continue.title;
  if (continueLessonDesc) continueLessonDesc.textContent = profile.continue.desc;
  if (continueProgressBar) continueProgressBar.setAttribute("aria-valuenow", String(profile.continue.progress));
  if (continueProgressFill) continueProgressFill.style.width = `${profile.continue.progress}%`;
  if (continueProgressText) continueProgressText.textContent = profile.continue.progressLabel;
  if (continuePrimaryButton) continuePrimaryButton.textContent = profile.continue.primaryLabel;
  if (continueSecondaryButton) continueSecondaryButton.textContent = profile.continue.secondaryLabel;

  renderProgressList(profile.progress);

  if (mentorIntro) mentorIntro.textContent = profile.mentor;

  renderRecommended(profile.recommended);
  renderCommunityFeed(profile.community);

  announce(`Đã mở không gian học tập cho ${profile.label}.`);
}

function getFocusableElements(container) {
  if (!container) return [];
  return Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  );
}

function openMobileNav(trigger) {
  if (!sideNav || !menuToggle || window.innerWidth > 992) return;
  lastMenuTrigger = trigger || document.activeElement;
  sideNav.classList.add("is-open");
  menuToggle.setAttribute("aria-expanded", "true");
  if (mobileNavBackdrop) mobileNavBackdrop.hidden = false;
  const focusables = getFocusableElements(sideNav);
  if (focusables[0]) focusables[0].focus();
  announce("Đã mở sidebar dashboard.");
}

function closeMobileNav() {
  if (!sideNav || !menuToggle) return;
  sideNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  if (mobileNavBackdrop) mobileNavBackdrop.hidden = true;
  if (lastMenuTrigger && typeof lastMenuTrigger.focus === "function") {
    lastMenuTrigger.focus();
  }
  announce("Đã đóng sidebar dashboard.");
}

if (menuToggle && sideNav) {
  menuToggle.addEventListener("click", () => {
    if (sideNav.classList.contains("is-open")) {
      closeMobileNav();
    } else {
      openMobileNav(menuToggle);
    }
  });

  sideNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 992) {
        closeMobileNav();
      }
    });
  });
}

if (mobileNavBackdrop) {
  mobileNavBackdrop.addEventListener("click", closeMobileNav);
}

if (sideNav) {
  sideNav.addEventListener("keydown", (event) => {
    if (!sideNav.classList.contains("is-open") || event.key !== "Tab") return;
    const focusables = getFocusableElements(sideNav);
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && sideNav && sideNav.classList.contains("is-open")) {
    event.preventDefault();
    closeMobileNav();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 992 && sideNav && sideNav.classList.contains("is-open")) {
    sideNav.classList.remove("is-open");
    if (mobileNavBackdrop) mobileNavBackdrop.hidden = true;
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
  }
});

applyProfileFromQuery();

if (mentorOpenButton && mentorFeedback) {
  mentorOpenButton.addEventListener("click", () => {
    mentorFeedback.textContent = "Trợ lý AI gợi ý: tiếp tục bài học Giao tiếp hòa nhập và tóm tắt phần còn lại thành 3 bước ngắn.";
    announce("Trợ lý AI đã mở gợi ý học tập.");
  });
}

if (mentorSuggestionButton && mentorFeedback) {
  mentorSuggestionButton.addEventListener("click", () => {
    mentorFeedback.textContent = "Gợi ý tiếp theo: Thị lực yếu trong môi trường số, vì bạn đang tiến tốt ở nhóm bài học trợ năng cơ bản.";
    announce("Đã hiển thị gợi ý bài học tiếp theo.");
  });
}
