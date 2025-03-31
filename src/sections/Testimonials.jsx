import React from "react";
import FeedbackCard from "../components/FeedbackCard";

export default function Testimonials(props) {
  const testimonials = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      title: "CEO",
      company: "Công ty A",
      quote:
        "Sản phẩm tuyệt vời đã giúp công ty chúng tôi tăng hiệu suất làm việc lên 30% chỉ trong vòng 3 tháng.",
    },

    {
      id: 2,
      name: "Trần Thị B",
      title: "Marketing Manager",
      company: "Công ty ABC",
      quote:
        "Giao diện dễ sử dụng và đội ngũ hỗ trợ nhiệt tình. Chúng tôi rất hài lòng khi lựa chọn dịch vụ này.",
    },
    {
      id: 3,
      name: "Lê Văn C",
      title: "CTO",
      company: "Startup DEF",
      quote:
        "Tính năng phân tích dữ liệu đã giúp chúng tôi đưa ra những quyết định kinh doanh chính xác và hiệu quả.",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      title: "HR Manager",
      company: "Tập đoàn DHI",
      quote:
        "Hệ thống đã giúp chúng tôi quản lý nhân sự hiệu quả hơn và tiết kiệm thời gian đáng kể.",
    },
  ];
  return (
    <div id="testimonials" className="py-12 md:py-24 lg:py-32">
      <div className="px-4 md:px-6 flex flex-col justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center text-center space-y-2  ">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Khách hàng nói gì về chúng tôi
          </h1>
          <p className="opacity-60 max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Hàng ngàn khách hàng đã tin tưởng và sử dụng dịch vụ của chúng tôi
          </p>
        </div>
        <div className="mx-auto my-0 grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          {testimonials.map((testimonial) => (
            <FeedbackCard key={testimonial.id} {...testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
}
