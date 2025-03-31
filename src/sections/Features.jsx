import React from "react";

export default function Features(props) {
  const features = [
    {
      id: 1,
      title: "Dễ dàng sử dụng",
      description:
        "Giao diện thân thiện, dễ sử dụng cho mọi người trong tổ chức của bạn.",
    },
    {
      id: 2,
      title: "Tích hợp nhiều ứng dụng",
      description:
        "Tích hợp với nhiều ứng dụng phổ biến giúp tối ưu hiệu suất làm việc.",
    },
    {
      id: 3,
      title: "Bảo mật thông tin",
      description:
        "Bảo mật thông tin cá nhân và dữ liệu quan trọng của tổ chức.",
    },
    {
      id: 4,
      title: "Hỗ trợ 24/7",
      description: "Hỗ trợ khách hàng 24/7 giúp giải đáp mọi thắc mắc của bạn.",
    },
    {
      id: 5,
      title: "Tùy chỉnh linh hoạt",
      description:
        "Tùy chỉnh theo yêu cầu của doanh nghiệp giúp tối ưu hiệu quả làm việc.",
    },
    {
      id: 6,
      title: "Dễ dàng tích hợp",
      description: "Dễ dàng tích hợp với hệ thống hiện có của doanh nghiệp.",
    },
  ];
  return (
    <div className="py-12 md:py-24 lg:py-32">
      <div className="px-4 md:px-6 flex flex-col justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center text-center space-y-2  ">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Tính năng nổi bật
          </h1>
          <p className="opacity-60 max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Khám phá các tính năng mạnh mẽ giúp doanh nghiệp của bạn phát triển
          </p>
        </div>
        <div className="mx-auto my-0 grid w-full md:max-w-5xl items-stretch gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="grid gap-1 rounded-lg border border-black/10 dark:border-white/15 p-6 shadow-sm"
            >
              <div className="text-xl font-bold">{feature.title}</div>
              <div className="opacity-60">{feature.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
