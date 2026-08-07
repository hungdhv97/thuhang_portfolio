export const profile = {
  name: "Thái Thị Thu Hằng",
  shortName: "Thu Hằng",
  role: "Business Analyst · HRM / ERP",
  location: "Hà Nội",
  years: "7+ năm",
  headline: "Làm rõ yêu cầu rối - đưa hệ thống vào vận hành.",
};

export const about = {
  summary:
    "Với hơn 7 năm kinh nghiệm chuyên sâu trong lĩnh vực phân tích nghiệp vụ HRM và ERP, tôi đã dẫn dắt nhiều dự án chuyển đổi số quan trọng cho các tổ chức lớn. Sự am hiểu về cả quy trình thực tế lẫn quy trình phần mềm giúp tôi tạo ra những giải pháp tối ưu, thực tiễn và dễ sử dụng.",
  location: "Hà Nội",
};

export type WorkItem = {
  id: string;
  name: string;
  company: string;
  role: string;
  /** Bối cảnh / pain point trước khi làm */
  problem: string;
  /** Việc BA đã làm */
  action: string;
  /** Kết quả đo được / outcome */
  result: string;
  tags: string[];
  note?: string;
};

export const work: WorkItem[] = [
  {
    id: "g-hero",
    name: "G-Hero / G-Stars",
    company: "Golden Gate",
    role: "Business Analyst",
    problem:
      "700+ nhà hàng cần theo dõi kinh doanh tập đoàn; đào tạo và vận hành ERP quy mô lớn.",
    action:
      "Prototype Figma, SRS, HDSD, video đào tạo - Forecasting, Work Schedule, Job Market, Role Management, Racing S.",
    result:
      "ERP cho 1.000 quản lý; đào tạo 1.000 quản lý và 16.000 nhân viên.",
    tags: ["ERP", "FnB", "Figma", "SRS", "Đào tạo"],
    note: "Khen thưởng golive - 09/2023",
  },
  {
    id: "ihrp",
    name: "iHRP",
    company: "Golden Gate",
    role: "Business Analyst",
    problem:
      "Quản trị nhân sự phân mảnh cho hàng chục nghìn nhân sự nhà hàng và văn phòng.",
    action:
      "Phân tích nghiệp vụ sâu, tối ưu quy trình phê duyệt tài liệu, testcase chuyên sâu.",
    result:
      "HRM cho 16.000 end-users: hồ sơ, chấm công nhà hàng & văn phòng, tiền lương.",
    tags: ["HRM", "Chấm công", "Lương", "Testcase"],
  },
  {
    id: "g-rms",
    name: "G-RMS",
    company: "Golden Gate",
    role: "Business Analyst",
    problem:
      "Nhiều app/hệ thống với phân quyền và đăng nhập tách rời, khó kiểm soát.",
    action:
      "Toàn bộ vòng đời BA: khảo sát yêu cầu, prototype Figma, SRS, test hệ thống.",
    result:
      "Phân quyền role, dữ liệu và SSO thống nhất cho toàn bộ app đang dùng tại Golden Gate.",
    tags: ["SSO", "Phân quyền", "Figma", "SRS"],
  },
  {
    id: "g-survey",
    name: "G-Survey",
    company: "Golden Gate",
    role: "Business Analyst",
    problem:
      "Cần khảo sát nội bộ có ngân hàng câu hỏi, phân quyền, báo cáo và đánh giá 360.",
    action: "Từ khảo sát yêu cầu, prototype Figma tới SRS và test.",
    result:
      "Hệ thống khảo sát vận hành với quản lý bài thi, báo cáo và đánh giá 360°.",
    tags: ["Survey", "360°", "Figma", "SRS"],
  },
  {
    id: "bidv",
    name: "PeopleSoft HCM - BIDV",
    company: "FPT Information System",
    role: "Business Analyst · Teamlead",
    problem:
      "Triển khai HCM tổng thể cho ngân hàng lớn, nhiều phân hệ và đội BA cần dẫn dắt.",
    action:
      "Teamlead 5+ nhân sự; SRS, mô hình hóa quy trình, testcase, HDSD; đứng lớp đào tạo 500 người tại Hà Nội và TP.HCM.",
    result:
      "Dẫn dắt Core HR, Thi đua-Khen thưởng và Đào tạo; golive được khen thưởng - 2020.",
    tags: ["PeopleSoft", "HRM", "Teamlead", "SRS"],
    note: "Khen thưởng golive phân hệ Đào tạo & Thi đua-Khen thưởng - 2020",
  },
];

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  compact?: boolean;
};

export const experience: ExperienceItem[] = [
  {
    company: "Golden Gate",
    role: "Business Analyst",
    period: "04/2021 - 08/2024",
  },
  {
    company: "FPT Information System",
    role: "Business Analyst · Teamlead",
    period: "11/2017 - 04/2021",
  },
  {
    company: "Techcombank",
    role: "L&D / HRBP / Talent Acquisition",
    period: "2016 - 2017",
    compact: true,
  },
];

export const skills = {
  ba: [
    "Business Analysis",
    "BRD",
    "FRS",
    "SRS",
    "Jira",
    "Mockups",
    "Wireframing",
    "Balsamiq",
    "Figma",
    "Prototyping",
    "SQL",
    "AI",
  ],
  domain: [
    "ERP",
    "HRM/HCM",
    "PeopleSoft",
    "FnB",
    "Survey System",
    "360° feedback",
  ],
  soft: ["Đào tạo người dùng", "Teamlead", "Trao đổi & đàm phán"],
  language: "Tiếng Anh: Trung cấp",
};

export const contact = {
  email: "thaihang.neu@gmail.com",
  phone: "0971 013 189",
  portfolioUrl: "https://tinyurl.com/hangttt-ba-portfolio",
  portfolioLabel: "tinyurl.com/hangttt-ba-portfolio",
};

export const education = {
  school: "Đại học Kinh tế Quốc dân",
  degree: "Cử nhân - Quản trị Nguồn nhân lực",
  period: "08/2012 - 08/2016",
  gpa: "GPA 3.43/4.0",
};

/** Abstract CSS marks for work cases */
export const workMarks: Record<string, "orbit" | "stack" | "grid" | "pulse" | "flow"> = {
  "g-hero": "orbit",
  ihrp: "stack",
  "g-rms": "grid",
  "g-survey": "pulse",
  bidv: "flow",
};
