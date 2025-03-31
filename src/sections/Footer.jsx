import React from "react";

export default function Footer(props) {
  const siteMap = [
    {
      title: "Sản phẩm",
      link: {
        "Tính năng": "#",
        "Bảng giá": "#",
        "Hướng dẫn": "#",
      },
    },
    {
      title: "Công ty",
      link: {
        "Về chúng tôi": "#",
        Blog: "#",
        "Tuyển dụng": "#",
      },
    },
    {
      title: "Hỗ trợ",
      link: {
        "Liên hệ": "#",
        "Trung tâm trợ giúp": "#",
        "Cộng đồng": "#",
      },
    },
    {
      title: "Pháp lý",
      link: {
        "Điều khoản": "#",
        "Bảo mật": "#",
        Cookie: "#",
      },
    },
  ];
  return (
    <div
      id="footer"
      className="border-t border-black/15 dark:border-white/15 py-6 md:py-10"
    >
      <div className="px-8 xl:container xl:mx-auto xl:px-24 lg:w-11/12 flex flex-col gap-6 md:flex-row md:justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-[#eaeaea] rounded-md"></div>
            <h1 className="font-bold text-xl">Brand</h1>
          </div>
          <div className="flex flex-col text-sm opacity-60">
            <p>© 2025 Brand Inc. </p>
            <p>Tất cả các quyền được bảo lưu.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 text-sm">
          {siteMap.map((item, index) => (
            <div key={index} className="flex flex-col space-y-3">
              <span className="font-medium">{item.title}</span>
              <ul className="space-y-3">
                {Object.entries(item.link).map(([key, value]) => (
                  <li key={key} className="opacity-60">
                    <a href={value}>{key}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
