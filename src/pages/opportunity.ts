import "../styles/tailwind.css";
import { opportunityContent } from "../page-content/opportunity";
import { renderPage } from "../page-content/render";

export function mount() {
  renderPage(opportunityContent);

type DisabilityType = "vision" | "hearing" | "mobility" | "cognitive" | "mental" | "none";

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T | null;

function announce(message: string) {
  const status = $("kbdStatus");
  if (status) status.textContent = message;
}

function toggleMode(buttonId: string, className: string, label: string) {
  const button = $<HTMLButtonElement>(buttonId);
  if (!button) return;

  button.addEventListener("click", () => {
    const next = button.getAttribute("aria-pressed") !== "true";
    button.setAttribute("aria-pressed", String(next));
    document.documentElement.classList.toggle(className, next);
    document.body.classList.toggle(className, next);
    announce(`${label}: ${next ? "đã bật" : "đã tắt"}.`);
  });
}

function setError(input: HTMLInputElement, message: string) {
  const error = document.getElementById(`${input.id}-error`);
  if (!error) return true;

  if (message) {
    error.textContent = message;
    input.setAttribute("aria-invalid", "true");
    input.setAttribute("aria-describedby", `${input.id}-error`);
    return false;
  }

  error.textContent = "";
  input.removeAttribute("aria-invalid");
  input.removeAttribute("aria-describedby");
  return true;
}

toggleMode("contrastToggle", "high-contrast", "Chế độ tương phản cao");
toggleMode("fontToggle", "large-text", "Chế độ chữ lớn");
toggleMode("motionToggle", "reduce-motion", "Chế độ giảm chuyển động");

// Khởi tạo trắc nghiệm hướng nghiệp
initQuizEvents();

const ACCESS_PROFILE_STORAGE_KEY = "dose-access-profile";


// ==========================================
// --- BỘ TRẮC NGHIỆM HƯỚNG NGHIỆP 20 CÂU HỎI ---
// ==========================================
const questions = [
  {
    text: "Bạn cảm thấy tự tin nhất khi làm việc với:",
    options: [
      { text: "Con số, dữ liệu và phân tích logic máy tính.", profile: "A" },
      { text: "Chữ viết, sáng tạo nội dung và viết kịch bản.", profile: "B" },
      { text: "Thiết kế, đồ họa nghệ thuật và giao diện trực quan.", profile: "C" },
      { text: "Lắng nghe, thấu cảm và trực tiếp hỗ trợ, tư vấn mọi người.", profile: "D" }
    ]
  },
  {
    text: "Khi gặp một vấn đề khó trong công việc, cách giải quyết tự nhiên của bạn là:",
    options: [
      { text: "Tìm quy luật hệ thống, phân tích dữ liệu gốc hoặc lập trình.", profile: "A" },
      { text: "Viết ra các ý tưởng sáng tạo hoặc thảo luận ngay với đồng nghiệp.", profile: "B" },
      { text: "Vẽ sơ đồ tư duy, tìm giải pháp thiết kế hoặc phác thảo trực quan.", profile: "C" },
      { text: "Hỏi han xem vấn đề đó đang ảnh hưởng đến mọi người như thế nào.", profile: "D" }
    ]
  },
  {
    text: "Lĩnh vực học tập hoặc nghiên cứu khiến bạn hứng thú nhất là:",
    options: [
      { text: "Công nghệ thông tin, Toán học hoặc Khoa học máy tính.", profile: "A" },
      { text: "Ngôn ngữ, truyền thông xã hội hoặc marketing nội dung.", profile: "B" },
      { text: "Mỹ thuật, thiết kế đồ họa hoặc UI/UX sản phẩm.", profile: "C" },
      { text: "Tâm lý học, giáo dục đặc biệt hoặc quản trị nhân sự.", profile: "D" }
    ]
  },
  {
    text: "Bạn thích kiểu nhiệm vụ nào nhất khi làm việc nhóm:",
    options: [
      { text: "Thiết lập cơ sở dữ liệu hoặc viết mã/script tự động hóa.", profile: "A" },
      { text: "Biên tập tài liệu, viết bài truyền thông hoặc dịch thuật.", profile: "B" },
      { text: "Thiết kế slide thuyết trình, vẽ minh họa hoặc chỉnh video.", profile: "C" },
      { text: "Làm MC, chăm sóc khách hàng hoặc giải đáp thắc mắc.", profile: "D" }
    ]
  },
  {
    text: "Cách tiếp thu kiến thức mới hiệu quả nhất đối với bạn là:",
    options: [
      { text: "Đọc tài liệu phân tích chi tiết và các sơ đồ cấu trúc logic.", profile: "A" },
      { text: "Nghe audio, sách nói hoặc thảo luận theo kiểu kể chuyện.", profile: "B" },
      { text: "Xem video hướng dẫn, hình ảnh đồ họa hoặc infographic.", profile: "C" },
      { text: "Học qua thực hành trực tiếp cùng một người hướng dẫn kèm cặp.", profile: "D" }
    ]
  },
  {
    text: "Mức độ kiên nhẫn của bạn với chi tiết nhỏ hoặc việc lặp lại:",
    options: [
      { text: "Rất cao, tôi thích sự chính xác và nhất quán tuyệt đối.", profile: "A" },
      { text: "Bình thường, tôi cần thêm yếu tố sáng tạo để giữ cảm hứng.", profile: "B" },
      { text: "Tốt nếu đó là các chi tiết thẩm mỹ hoặc sắp xếp hình ảnh.", profile: "C" },
      { text: "Tôi thích tập trung tương tác với con người hơn quy trình máy móc.", profile: "D" }
    ]
  },
  {
    text: "Hình thức làm việc lý tưởng để bạn phát huy tối đa năng lượng:",
    options: [
      { text: "Làm việc từ xa (Remote 100%) tại nhà hoặc nơi an toàn.", profile: "A", accommodation: "Làm việc từ xa (Remote)" },
      { text: "Kết hợp linh hoạt (Hybrid) giữa văn phòng và tại nhà.", profile: "B", accommodation: "Làm việc Hybrid" },
      { text: "Làm việc trực tiếp tại văn phòng để dễ tương tác xã hội.", profile: "C", accommodation: "Môi trường văn phòng trực tiếp" },
      { text: "Làm việc tự do theo dự án và tiến độ tự quyết.", profile: "D", accommodation: "Lịch trình Freelance tự do" }
    ]
  },
  {
    text: "Mức độ giao tiếp và họp nhóm hằng ngày bạn mong muốn:",
    options: [
      { text: "Tối thiểu, giao tiếp chủ yếu qua tin nhắn hoặc văn bản hướng dẫn.", profile: "A", accommodation: "Giao tiếp văn bản (Asynchronous)" },
      { text: "Vừa phải, có họp ngắn định kỳ và phần lớn thời gian tự xử lý.", profile: "B" },
      { text: "Nhiều, thường xuyên thảo luận nhóm và trao đổi ý tưởng.", profile: "C" },
      { text: "Rất nhiều, liên tục gặp gỡ, trò chuyện và chăm sóc người khác.", profile: "D", accommodation: "Làm việc tương tác nhóm cao" }
    ]
  },
  {
    text: "Bạn muốn kiểm soát thời gian làm việc như thế nào:",
    options: [
      { text: "Khung giờ rất linh hoạt để điều hòa theo năng lượng sinh học.", profile: "A", accommodation: "Thời gian làm việc linh hoạt" },
      { text: "Giờ hành chính cố định để phân định rõ công việc và gia đình.", profile: "B", accommodation: "Giờ làm việc cố định" },
      { text: "Chỉ khoán sản phẩm đầu ra, không quá quan trọng thời gian làm việc.", profile: "C" },
      { text: "Cần nhiều khoảng nghỉ ngắn định sẵn để tránh quá tải năng lượng.", profile: "D", accommodation: "Khoảng nghỉ ngắn thường xuyên (Micro-breaks)" }
    ]
  },
  {
    text: "Cách phản ứng của bạn khi gặp áp lực đột xuất:",
    options: [
      { text: "Bình tĩnh lập kế hoạch và phân rõ các bước thực hiện chi tiết.", profile: "A" },
      { text: "Cần một khoảng lặng hoặc nhịp độ chậm lại để tránh quá tải cảm xúc.", profile: "B", accommodation: "Nhịp độ công việc vừa phải" },
      { text: "Thích ứng nhanh và coi đó là động lực kích thích sáng tạo.", profile: "C" },
      { text: "Cần sự động viên và chia sẻ kịp thời của quản lý hoặc đồng nghiệp.", profile: "D", accommodation: "Hệ thống hỗ trợ tinh thần (Mental Support)" }
    ]
  },
  {
    text: "Môi trường âm thanh và ánh sáng xung quanh ảnh hưởng thế nào đến bạn:",
    options: [
      { text: "Tôi rất nhạy cảm, cần không gian yên tĩnh hoặc giảm kích thích giác quan.", profile: "A", accommodation: "Văn phòng giảm kích thích giác quan (Quiet Zone)" },
      { text: "Bình thường, tôi có thể làm việc ở nơi hơi náo nhiệt như quán cà phê.", profile: "B" },
      { text: "Tôi thích không gian có âm nhạc nhẹ nhàng để thúc đẩy cảm hứng sáng tạo.", profile: "C" },
      { text: "Tôi cần thiết bị riêng chống ồn hoặc điều chỉnh ánh sáng đặc thù.", profile: "D", accommodation: "Thiết bị chống ồn & điều chỉnh ánh sáng riêng" }
    ]
  },
  {
    text: "Thiết bị hoặc tính năng nào giúp bạn thao tác máy tính tốt nhất:",
    options: [
      { text: "Trình đọc màn hình hoặc âm thanh phản hồi.", profile: "A", accommodation: "Tương thích trình đọc màn hình" },
      { text: "Phần mềm phóng to chữ, thay đổi kích thước văn bản hoặc tương phản cao.", profile: "C", accommodation: "Giao diện độ tương phản cao & chữ lớn" },
      { text: "Nhập liệu bằng giọng nói hoặc bàn phím chuyên dụng ảo.", profile: "B", accommodation: "Công cụ nhập liệu thay thế (Speech-to-Text)" },
      { text: "Chuột và bàn phím tiêu chuẩn nhưng giao diện tối giản, ít gây rối mắt.", profile: "D", accommodation: "Giao diện tối giản, trực quan" }
    ]
  },
  {
    text: "Khi làm việc tại văn phòng, bạn cần tiếp cận vật lý nào nhất:",
    options: [
      { text: "Lối đi phẳng, không bậc, thang máy rộng và nhà vệ sinh tiếp cận xe lăn.", profile: "C", accommodation: "Văn phòng không rào cản vật lý (Wheelchair Accessible)" },
      { text: "Khu vực làm việc giảm tiếng ồn, ánh sáng dịu nhẹ để tránh stress.", profile: "A", accommodation: "Góc làm việc yên tĩnh, giảm kích thích" },
      { text: "Bảng hiệu trực quan hoặc hỗ trợ ngôn ngữ ký hiệu tiếng Việt.", profile: "D", accommodation: "Hỗ trợ ngôn ngữ ký hiệu / Bảng hiệu trực quan" },
      { text: "Tôi ưu tiên làm việc tại nhà nên cần hỗ trợ setup công thái học tại nhà.", profile: "B", accommodation: "Hỗ trợ thiết bị công thái học tại nhà" }
    ]
  },
  {
    text: "Hình thức giao tiếp nhiệm vụ giúp bạn nắm bắt nhanh và chính xác nhất:",
    options: [
      { text: "Văn bản chi tiết, liệt kê từng đầu việc cần làm (checklist).", profile: "A", accommodation: "Nhiệm vụ dạng văn bản / Checklist chi tiết" },
      { text: "Video trao đổi trực quan hoặc gặp gỡ trực tiếp.", profile: "C", accommodation: "Hướng dẫn trực quan / Video giải thích" },
      { text: "Kết hợp văn bản kèm sơ đồ hoặc video ngắn minh họa.", profile: "B" },
      { text: "Có người hướng dẫn trực tiếp từ buddy hoặc mentor.", profile: "D", accommodation: "Hệ thống Mentor/Buddy đồng hành" }
    ]
  },
  {
    text: "Yếu tố sức khỏe nào bạn cần doanh nghiệp thấu hiểu nhất:",
    options: [
      { text: "Lịch làm việc linh động để đi khám sức khỏe hoặc trị liệu định kỳ.", profile: "A", accommodation: "Lịch linh hoạt trị liệu y tế" },
      { text: "Được nghỉ ngơi ngắn khi gặp căng thẳng tinh thần đột ngột.", profile: "D", accommodation: "Hỗ trợ phục hồi tâm lý / Nghỉ giải lao linh động" },
      { text: "Sự kiên nhẫn khi giao tiếp do tốc độ nói hoặc gõ phím khác biệt.", profile: "B", accommodation: "Môi trường giao tiếp kiên nhẫn, không hối thúc" },
      { text: "Công cụ công thái học để tránh đau mỏi thể chất kéo dài.", profile: "C", accommodation: "Ghế công thái học / Bàn nâng hạ" }
    ]
  },
  {
    text: "Doanh nghiệp hòa nhập nên thể hiện cam kết rõ nhất ở:",
    options: [
      { text: "Quy trình ứng tuyển mở, cho phép bài test thay thế phỏng vấn áp lực cao.", profile: "A", accommodation: "Quy trình tuyển dụng tiếp cận" },
      { text: "Chính sách hỗ trợ điều chỉnh được công khai rõ trên tin tuyển dụng.", profile: "B", accommodation: "Chính sách Accommodation minh bạch" },
      { text: "Nhân viên được đào tạo bài bản về đa dạng và đồng cảm.", profile: "D", accommodation: "Đồng nghiệp thấu hiểu & được đào tạo tiếp cận" },
      { text: "Sản phẩm và dịch vụ tiếp cận số có sẵn cho toàn bộ nhân sự.", profile: "C" }
    ]
  },
  {
    text: "Trong một dự án chung, vai trò giúp bạn tỏa sáng nhất là:",
    options: [
      { text: "Người thực thi thầm lặng, giải quyết bài toán kỹ thuật phức tạp.", profile: "A" },
      { text: "Người lên ý tưởng sáng tạo, mang lại góc nhìn mới mẻ.", profile: "B" },
      { text: "Người điều phối trực quan, rà soát giao diện và thẩm mỹ tổng quan.", profile: "C" },
      { text: "Người gắn kết đồng đội, hỗ trợ và động viên mọi người.", profile: "D" }
    ]
  },
  {
    text: "Mục tiêu phát triển sự nghiệp quan trọng nhất của bạn trong 2 năm tới là:",
    options: [
      { text: "Trở thành chuyên gia kỹ thuật trong mảng công nghệ chuyên sâu.", profile: "A" },
      { text: "Tự chủ tài chính bền vững qua công việc freelance từ xa.", profile: "B" },
      { text: "Sáng tạo sản phẩm đem lại tác động xã hội cho cộng đồng yếu thế.", profile: "C" },
      { text: "Xây dựng quan hệ đồng nghiệp sâu sắc trong môi trường văn minh.", profile: "D" }
    ]
  },
  {
    text: "Khi nhận phản hồi từ cấp trên, bạn mong muốn điều gì nhất:",
    options: [
      { text: "Góp ý thẳng thắn bằng văn bản cụ thể từng lỗi và cách khắc phục.", profile: "A" },
      { text: "Trao đổi riêng tư, có ghi nhận trước khi chỉ ra điểm cần sửa.", profile: "D" },
      { text: "Phản hồi bằng ghi chú trực quan rõ ràng, tránh nói chung chung.", profile: "C" },
      { text: "Góp ý mang tính định hướng để tôi tự do tìm giải pháp sáng tạo.", profile: "B" }
    ]
  },
  {
    text: "Để bắt đầu một công việc mới tự tin hơn, bạn cần chuẩn bị nhất là:",
    options: [
      { text: "Tài liệu onboarding hướng dẫn quy trình cực kỳ rõ ràng, chi tiết.", profile: "A" },
      { text: "Có một buddy nhiệt tình hỗ trợ trả lời các câu hỏi cơ bản.", profile: "D" },
      { text: "Được chia sẻ cởi mở về nhu cầu hỗ trợ cá nhân với cả nhóm.", profile: "B" },
      { text: "Thời gian thử việc với nhịp độ tăng dần để làm quen áp lực.", profile: "C" }
    ]
  }
];

const profilesData = {
  A: {
    title: "Nhà phát triển công nghệ hỗ trợ (Tech & Assistive Developer)",
    desc: "Bạn có tư duy phân tích sắc bén, yêu thích logic và công nghệ. Bạn phù hợp với lập trình, xử lý dữ liệu, kiểm thử trợ năng web/app hoặc nghiên cứu giải pháp kỹ thuật số giúp phá bỏ rào cản cho người khuyết tật.",
    salary: "15 - 30 triệu VNĐ/tháng",
    trend: "Rất cao, đặc biệt khi doanh nghiệp toàn cầu phải tuân thủ chuẩn tiếp cận số.",
    jobs: [
      {
        title: "Lập trình viên Front-End chuyên về trợ năng",
        company: "EnableTech Group",
        desc: "Đảm bảo mã nguồn tối ưu chuẩn WCAG và tương thích tốt với trình đọc màn hình.",
        tags: ["Remote 100%", "Lương: 18 - 25M", "Screen Reader Aware", "Hợp với bạn: 98%"],
        link: "#"
      },
      {
        title: "Chuyên viên phân tích dữ liệu hòa nhập",
        company: "DOSE Impact Solutions",
        desc: "Khảo sát và lập báo cáo dữ liệu về thị trường lao động cho người khuyết tật.",
        tags: ["Hybrid / Remote", "Lương: 15 - 22M", "Lịch trị liệu linh hoạt", "Hợp với bạn: 92%"],
        link: "#"
      }
    ]
  },
  B: {
    title: "Nhà sáng tạo nội dung hòa nhập (Inclusive Content Creator)",
    desc: "Bạn giàu cảm xúc, có năng khiếu ngôn ngữ và sáng tạo. Bạn phù hợp với viết lách, truyền thông xã hội, dịch thuật hoặc sản xuất nội dung giáo dục đặc biệt để lan tỏa sự đồng cảm.",
    salary: "12 - 22 triệu VNĐ/tháng",
    trend: "Cao, các tổ chức xã hội và doanh nghiệp nhân văn liên tục cần câu chuyện dễ hiểu, tử tế và có sức lan tỏa.",
    jobs: [
      {
        title: "Biên tập viên nội dung giáo dục hòa nhập",
        company: "Special Education Hub",
        desc: "Viết giáo án điện tử dễ hiểu cho học sinh có nhu cầu học tập khác biệt.",
        tags: ["Remote", "Lương: 12 - 16M", "Giao tiếp không hối thúc", "Hợp với bạn: 95%"],
        link: "#"
      },
      {
        title: "Copywriter sáng tạo cho dự án social-tech",
        company: "Humanity Media",
        desc: "Lên chiến dịch truyền thông nâng cao nhận thức cộng đồng về người khiếm thính.",
        tags: ["Hybrid", "Lương: 10 - 15M", "Lịch làm việc linh hoạt", "Hợp với bạn: 89%"],
        link: "#"
      }
    ]
  },
  C: {
    title: "Chuyên viên UI/UX tiếp cận (UI/UX Accessibility Specialist)",
    desc: "Bạn chú trọng chi tiết trực quan, màu sắc và cảm giác tương tác. Bạn có tiềm năng trong thiết kế giao diện tiếp cận, đồ họa hòa nhập hoặc tư vấn không gian làm việc không rào cản.",
    salary: "14 - 25 triệu VNĐ/tháng",
    trend: "Tăng trưởng mạnh cùng xu hướng Inclusive Design trên toàn cầu.",
    jobs: [
      {
        title: "Chuyên viên thiết kế UI/UX Accessibility",
        company: "Digital Access Corp",
        desc: "Thiết kế mockup web/app với bảng màu tương phản cao, cỡ chữ linh hoạt và luồng thao tác rõ.",
        tags: ["Hybrid", "Lương: 16 - 24M", "Lối đi phẳng / Công thái học", "Hợp với bạn: 97%"],
        link: "#"
      },
      {
        title: "Nhà thiết kế đồ họa tiếp cận số",
        company: "Creative Inclusion Agency",
        desc: "Thiết kế infographic trực quan và ấn phẩm truyền thông dễ tiếp cận.",
        tags: ["Remote", "Lương: 12 - 18M", "UI đơn giản trực quan", "Hợp với bạn: 90%"],
        link: "#"
      }
    ]
  },
  D: {
    title: "Chuyên viên hỗ trợ & truyền thông cộng đồng",
    desc: "Bạn có lòng trắc ẩn, thích trò chuyện và hỗ trợ trực tiếp. Bạn phù hợp với tư vấn viên, chăm sóc khách hàng đặc biệt, phiên dịch ngôn ngữ ký hiệu hoặc quản lý cộng đồng.",
    salary: "10 - 18 triệu VNĐ/tháng",
    trend: "Bền vững, các tổ chức luôn cần nhân sự thấu hiểu tâm lý và biết chăm sóc cộng đồng.",
    jobs: [
      {
        title: "Tư vấn viên chăm sóc khách hàng đặc biệt",
        company: "HearUs Vietnam",
        desc: "Hỗ trợ khách hàng điếc qua video call bằng ngôn ngữ ký hiệu hoặc chat trực tuyến.",
        tags: ["On-site/Hybrid", "Lương: 10 - 14M", "Hỗ trợ ký hiệu / Mentor", "Hợp với bạn: 96%"],
        link: "#"
      },
      {
        title: "Chuyên viên kết nối cộng đồng hòa nhập",
        company: "DOSE Foundation",
        desc: "Tổ chức hội thảo hướng nghiệp và đào tạo kỹ năng mềm cho cộng đồng.",
        tags: ["Hybrid", "Lương: 11 - 15M", "Nghỉ ngơi linh động", "Hợp với bạn: 91%"],
        link: "#"
      }
    ]
  }
};
let currentQuestionIndex = 0;
let userAnswers: Array<number | null> = [];
let selectedDisabilityType: DisabilityType | null = null;

function loadSavedAccessProfile() {
  try {
    const value = localStorage.getItem(ACCESS_PROFILE_STORAGE_KEY);
    return value === null ? "" : JSON.parse(value);
  } catch (_error) {
    return "";
  }
}

function mapAccessProfileToDisability(profile: string): DisabilityType | null {
  switch (profile) {
    case "vision":
      return "vision";
    case "hearing":
      return "hearing";
    case "motor":
      return "mobility";
    case "cognitive":
      return "cognitive";
    case "mental":
      return "mental";
    case "default":
      return "none";
    default:
      return null;
  }
}

const disabilityAccommodations = {
  vision: [
    "Tương thích hoàn hảo với Trình đọc màn hình (Screen Reader)",
    "Hỗ trợ phóng to văn bản & Độ tương phản màu cực cao",
    "Mô tả bằng văn bản (Alt text) cho toàn bộ hình ảnh trong tài liệu",
    "Giao tiếp & hướng dẫn công việc ưu tiên định dạng văn bản có cấu trúc"
  ],
  hearing: [
    "Cung cấp phụ đề đầy đủ (Subtitles/Captions) cho các cuộc họp trực tuyến",
    "Giao tiếp bất đồng bộ qua văn bản (Slack/Teams/Email) là chủ yếu",
    "Hỗ trợ phiên dịch Ngôn ngữ ký hiệu (khi cần họp quan trọng)",
    "Không yêu cầu giao tiếp hoặc gọi điện qua điện thoại giọng nói trực tiếp"
  ],
  mobility: [
    "Môi trường văn phòng hoàn toàn không rào cản vật lý (Wheelchair Accessible)",
    "Hỗ trợ bàn làm việc nâng hạ và ghế ngồi công thái học đặc biệt",
    "Lịch làm việc linh hoạt hoặc hỗ trợ làm việc từ xa (Remote/Hybrid)",
    "Vị trí đỗ xe ưu tiên và lối tiếp cận thang máy dễ dàng"
  ],
  cognitive: [
    "Hướng dẫn công việc bằng sơ đồ trực quan & Danh sách đầu việc (Checklist) rõ ràng",
    "Giao diện làm việc tối giản, giảm thiểu các yếu tố gây xao nhãng",
    "Nhịp độ làm việc vừa phải với thời gian hướng dẫn/onboarding kéo dài",
    "Hệ thống Mentor/Buddy hỗ trợ giải thích quy trình tận tình"
  ],
  mental: [
    "Góc làm việc yên tĩnh, giảm kích thích ánh sáng và tiếng ồn (Quiet Zone)",
    "Thời gian làm việc linh động kết hợp khoảng nghỉ ngắn thường xuyên",
    "Lịch làm việc cho phép sắp xếp đi trị liệu hoặc khám định kỳ",
    "Hệ thống hỗ trợ tinh thần, văn hóa doanh nghiệp cởi mở, không phán xét"
  ],
  none: []
};

function initQuizEvents() {
  const startQuizBtn = $<HTMLButtonElement>("startQuizBtn");
  const closeQuizBtn = $<HTMLButtonElement>("closeQuizBtn");
  const beginQuizBtn = $<HTMLButtonElement>("beginQuizBtn");
  const prevQuestionBtn = $<HTMLButtonElement>("prevQuestionBtn");
  const restartQuizBtn = $<HTMLButtonElement>("restartQuizBtn");
  const exitQuizBtn = $<HTMLButtonElement>("exitQuizBtn");
  const disabilityOptions = document.querySelectorAll<HTMLElement>("#disabilityOptions .option-card");
  const submitDisabilityBtn = $<HTMLButtonElement>("submitDisabilityBtn");

  function resetDisabilitySelection() {
    selectedDisabilityType = null;
    if (submitDisabilityBtn) {
      submitDisabilityBtn.disabled = true;
      submitDisabilityBtn.setAttribute("disabled", "true");
    }
    disabilityOptions.forEach((card) => {
      card.classList.remove("selected");
      card.setAttribute("aria-checked", "false");
      const radio = card.querySelector<HTMLInputElement>("input[type='radio']");
      if (radio) radio.checked = false;
    });
  }

  function startQuizQuestions() {
    $("preQuizArea").classList.add("hidden");
    $("quizQuestionArea").classList.remove("hidden");
    currentQuestionIndex = 0;
    userAnswers = new Array(questions.length).fill(null);
    loadQuestion(0);
    announce("Bắt đầu làm bài trắc nghiệm. Câu hỏi số 1.");
  }

  function getSavedDisabilityType() {
    return mapAccessProfileToDisability(loadSavedAccessProfile());
  }

  function selectDisability(disType: DisabilityType | null, cardEl: HTMLElement) {
    if (!disType) return;
    selectedDisabilityType = disType;
    
    disabilityOptions.forEach(card => {
      card.classList.remove("selected");
      card.setAttribute("aria-checked", "false");
      const radio = card.querySelector<HTMLInputElement>("input[type='radio']");
      if (radio) radio.checked = false;
    });

    cardEl.classList.add("selected");
    cardEl.setAttribute("aria-checked", "true");
    const radio = cardEl.querySelector<HTMLInputElement>("input[type='radio']");
    if (radio) radio.checked = true;

    if (submitDisabilityBtn) {
      submitDisabilityBtn.disabled = false;
      submitDisabilityBtn.removeAttribute("disabled");
    }

    const groupName = cardEl.querySelector("strong")?.textContent || disType;
    announce(`Đã chọn nhóm: ${groupName}. Hãy nhấn nút xác nhận bên dưới để bắt đầu.`);
  }

  disabilityOptions.forEach(card => {
    const disType = card.getAttribute("data-disability") as DisabilityType | null;
    
    card.addEventListener("click", () => {
      selectDisability(disType, card);
    });

    card.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        selectDisability(disType, card);
      }
    });
  });

  if (submitDisabilityBtn) {
    submitDisabilityBtn.addEventListener("click", () => {
      if (!selectedDisabilityType) return;
      startQuizQuestions();
    });
  }

  if (startQuizBtn) {
    startQuizBtn.addEventListener("click", () => {
      // Ẩn vùng lọc split-panel đi để tập trung làm bài
      $("splitPanelSection").classList.add("hidden");
      $("assessmentSection").classList.remove("hidden");
      $("quizIntro").classList.add("hidden");
      $("quizQuestionArea").classList.add("hidden");
      $("quizResultsArea").classList.add("hidden");

      $("assessmentSection").scrollIntoView({ behavior: "smooth" });
      const savedDisabilityType = getSavedDisabilityType();

      if (savedDisabilityType) {
        selectedDisabilityType = savedDisabilityType;
        $("preQuizArea").classList.add("hidden");
        startQuizQuestions();
        announce("Đã dùng nhóm hỗ trợ đã chọn trước đó và mở thẳng bài trắc nghiệm.");
        return;
      }

      $("preQuizArea").classList.remove("hidden");
      resetDisabilitySelection();
      announce("Đã mở bộ câu hỏi sơ tuyển nhóm hỗ trợ tiếp cận.");
    });
  }

  if (closeQuizBtn) {
    closeQuizBtn.addEventListener("click", () => {
      // Ẩn trắc nghiệm và hiển thị lại split-panel gốc
      $("assessmentSection").classList.add("hidden");
      $("splitPanelSection").classList.remove("hidden");
      $("splitPanelSection").scrollIntoView({ behavior: "smooth" });
      announce("Đã đóng trắc nghiệm.");
    });
  }

  if (beginQuizBtn) {
    beginQuizBtn.addEventListener("click", () => {
      $("quizIntro").classList.add("hidden");
      $("preQuizArea").classList.remove("hidden");
      $("quizQuestionArea").classList.add("hidden");

      const savedDisabilityType = getSavedDisabilityType();
      if (savedDisabilityType) {
        selectedDisabilityType = savedDisabilityType;
        startQuizQuestions();
        announce("Đã dùng nhóm hỗ trợ đã chọn trước đó và mở thẳng bài trắc nghiệm.");
        return;
      }

      resetDisabilitySelection();
    });
  }

  if (prevQuestionBtn) {
    prevQuestionBtn.addEventListener("click", () => {
      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
      }
    });
  }

  if (restartQuizBtn) {
    restartQuizBtn.addEventListener("click", () => {
      $("quizResultsArea").classList.add("hidden");
      $("preQuizArea").classList.remove("hidden");
      $("quizQuestionArea").classList.add("hidden");

      resetDisabilitySelection();
      
      announce("Vui lòng sơ chọn lại nhóm hỗ trợ tiếp cận của bạn.");
    });
  }

  if (exitQuizBtn) {
    exitQuizBtn.addEventListener("click", () => {
      // Ẩn trắc nghiệm và hiển thị lại split-panel gốc
      $("assessmentSection").classList.add("hidden");
      $("splitPanelSection").classList.remove("hidden");
      $("splitPanelSection").scrollIntoView({ behavior: "smooth" });
      announce("Đã lưu kết quả trắc nghiệm và quay lại màn hình chính.");
    });
  }
}

function loadQuestion(index) {
  const question = questions[index];
  const qText = $("quizQuestionText");
  const qOptions = $("quizOptions");
  const qCounter = $("quizQuestionCounter");
  const prevBtn = $<HTMLButtonElement>("prevQuestionBtn");

  // Update progress bar
  const progressPercent = Math.round(((index) / questions.length) * 100);
  const progressBar = $("quizProgressBar");
  progressBar.style.width = `${progressPercent}%`;
  progressBar.setAttribute("aria-valuenow", String(progressPercent));
  $("quizProgressText").textContent = `Tiến trình: ${progressPercent}%`;

  qText.textContent = `${index + 1}. ${question.text}`;
  qCounter.textContent = `Câu ${index + 1} của ${questions.length}`;
  prevBtn.disabled = index === 0;

  // Render options
  qOptions.innerHTML = "";
  question.options.forEach((opt, oIdx) => {
    const isSelected = userAnswers[index] === oIdx;
    
    const card = document.createElement("div");
    card.className = `option-card ${isSelected ? 'selected' : ''}`;
    card.setAttribute("role", "radio");
    card.setAttribute("aria-checked", String(isSelected));
    card.setAttribute("tabindex", "0");
    card.id = `opt-card-${oIdx}`;

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `q-${index}`;
    radio.value = String(oIdx);
    radio.id = `q-${index}-opt-${oIdx}`;
    radio.checked = isSelected;
    
    const label = document.createElement("label");
    label.setAttribute("for", radio.id);
    label.textContent = opt.text;
    label.style.cursor = "pointer";

    card.appendChild(radio);
    card.appendChild(label);

    // Event listener for click
    card.addEventListener("click", () => {
      selectOption(index, oIdx);
    });

    // Keyboard support
    card.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        selectOption(index, oIdx);
      }
    });

    qOptions.appendChild(card);
  });

  // Focus the question text so screen reader reads it
  qText.focus();
}

function selectOption(qIdx: number, oIdx: number) {
  userAnswers[qIdx] = oIdx;
  
  // Highlight selected card
  const cards = $("quizOptions").children;
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove("selected");
    cards[i].setAttribute("aria-checked", "false");
  }
  const selectedCard = $(`opt-card-${oIdx}`);
  if (selectedCard) {
    selectedCard.classList.add("selected");
    selectedCard.setAttribute("aria-checked", "true");
  }

  // Smooth advance
  setTimeout(() => {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      loadQuestion(currentQuestionIndex);
    } else {
      finishQuiz();
    }
  }, 250); // slight delay so user can see selection
}

function finishQuiz() {
  $("quizQuestionArea").classList.add("hidden");
  $("quizResultsArea").classList.remove("hidden");
  
  // Progress bar complete
  const progressBar = $("quizProgressBar");
  progressBar.style.width = "100%";
  progressBar.setAttribute("aria-valuenow", "100");
  $("quizProgressText").textContent = "Hoàn thành: 100%";

  const results = calculateResults();
  showResults(results);
}

function calculateResults() {
  const scores = { A: 0, B: 0, C: 0, D: 0 };
  const collectedAccommodations = new Set();

  userAnswers.forEach((oIdx, qIdx) => {
    if (oIdx === null) return;
    const option = questions[qIdx].options[oIdx];
    
    // Tally profile
    if (option.profile && scores[option.profile] !== undefined) {
      scores[option.profile]++;
    }

    // Collect accommodations
    if (option.accommodation) {
      collectedAccommodations.add(option.accommodation);
    }
  });

  // Identify highest profile
  let maxProfile = "A";
  let maxScore = -1;
  for (const prof in scores) {
    if (scores[prof] > maxScore) {
      maxScore = scores[prof];
      maxProfile = prof;
    }
  }

  // Calculate percentages
  const totalWeight = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
  const percentages = {};
  for (const prof in scores) {
    percentages[prof] = Math.round((scores[prof] / totalWeight) * 100);
  }

  return {
    primary: maxProfile,
    scores: percentages,
    accommodations: Array.from(collectedAccommodations)
  };
}

function showResults(results) {
  const profile = profilesData[results.primary];
  
  $("matchedProfileTitle").textContent = profile.title;
  $("matchedProfileDesc").textContent = profile.desc;
  $("matchedProfileScore").textContent = `${results.scores[results.primary]}%`;

  // Render chart bars
  const chartBars = $("resultChartBars");
  chartBars.innerHTML = "";
  
  const labelsMap = {
    A: "Công nghệ hỗ trợ (Tech & Data)",
    B: "Sáng tạo nội dung (Content Creator)",
    C: "UI/UX & Trợ năng (Accessibility UI/UX)",
    D: "Hỗ trợ & Cộng đồng (Support & Advocate)"
  };

  for (const prof in results.scores) {
    const barItem = document.createElement("div");
    barItem.className = "chart-bar-item";

    const labelRow = document.createElement("div");
    labelRow.className = "chart-bar-label";
    labelRow.innerHTML = `<span>${labelsMap[prof]}</span><strong>${results.scores[prof]}%</strong>`;

    const barBg = document.createElement("div");
    barBg.className = "chart-bar-bg";

    const barFill = document.createElement("div");
    barFill.className = "chart-bar-fill";
    // Set width inside timeout for animation
    setTimeout(() => {
      barFill.style.width = `${results.scores[prof]}%`;
    }, 100);

    barBg.appendChild(barFill);
    barItem.appendChild(labelRow);
    barItem.appendChild(barBg);
    chartBars.appendChild(barItem);
  }

  // Render accommodations
  const accommList = $("recommendedAccommodations");
  accommList.innerHTML = "";
  
  if (results.accommodations.length === 0) {
    accommList.innerHTML = "<li>Cần điều chỉnh linh hoạt theo nhu cầu thực tế từng thời điểm.</li>";
  } else {
    results.accommodations.forEach(acc => {
      const badge = document.createElement("span");
      badge.className = "accommodation-badge";
      badge.innerHTML = `✨ ${acc}`;
      accommList.appendChild(badge);
    });
  }

  // Render matched jobs
  const jobsGrid = $("matchedJobsList");
  jobsGrid.innerHTML = "";
  
  profile.jobs.forEach(job => {
    const card = document.createElement("article");
    card.className = "job-suggestion-card";

    const header = document.createElement("div");
    header.className = "job-header-row";
    header.innerHTML = `<span class="job-company">${job.company}</span> <span class="job-match-badge">Match: ${results.scores[results.primary]}%</span>`;

    const title = document.createElement("h5");
    title.className = "job-title-h5";
    title.textContent = job.title;

    const desc = document.createElement("p");
    desc.className = "job-desc";
    desc.textContent = job.desc;

    const tagsRow = document.createElement("div");
    tagsRow.className = "job-tags-row";
    job.tags.forEach((tag, idx) => {
      const span = document.createElement("span");
      span.className = `job-tag ${idx === 2 ? 'job-tag--accommodation' : idx === 3 ? 'job-tag--score' : ''}`;
      span.textContent = tag;
      tagsRow.appendChild(span);
    });

    const applyBtn = document.createElement("button");
    applyBtn.type = "button";
    applyBtn.className = "btn btn-primary btn-apply-sim";
    applyBtn.textContent = "Ứng tuyển (Mô phỏng)";
    
    applyBtn.addEventListener("click", () => {
      alert(`Chúc mừng! Bạn đang bắt đầu quy trình ứng tuyển công việc "${job.title}" tại ${job.company}.\n\nHệ thống D.O.S.E đã tự động đính kèm chứng nhận hồ sơ năng lực và danh sách Accommodation khuyến nghị của bạn gửi tới bộ phận nhân sự của doanh nghiệp.`);
    });

    card.appendChild(header);
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(tagsRow);
    card.appendChild(applyBtn);
    
    jobsGrid.appendChild(card);
  });

  announce(`Trắc nghiệm hoàn tất. Kết quả phù hợp nhất là: ${profile.title}.`);
}

document.addEventListener("keydown", (event) => {
  const useShortcut = event.altKey || event.metaKey;
  if (!useShortcut) return;

  const tag = document.activeElement?.tagName?.toLowerCase();
  if (tag === "input" || tag === "textarea" || tag === "select") return;

  const key = event.key.toLowerCase();
  const routeMap = {
    "1": "#/home",
    "2": "#/access",
    "3": "#/education",
    "4": "#/opportunity",
    "5": "#/humanity"
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
}

