import React, { useState } from "react";
import PricingCard from "../components/PricingCard";

export default function Pricing() {
  const plans = [
    {
      id: 1,
      name: "Cơ bản",
      price: 199000,
      bestValue: false,
      description: "Dành cho cá nhân và doanh nghiệp nhỏ",
      features: [
        "5 người dùng",
        "10GB lưu trữ",
        "Hỗ trợ email",
        "Các tính năng cơ bản",
      ],
    },
    {
      id: 2,
      name: "Chuyên nghiệp",
      price: 399000,
      bestValue: true,
      description: "Dành cho doanh nghiệp vừa",
      features: [
        "20 người dùng",
        "50GB lưu trữ",
        "Hỗ trợ ưu tiên",
        "Tất cả tính năng cơ bản",
        "Phân tích nâng cao",
        "API tích hợp",
      ],
    },
    {
      id: 3,
      name: "Doanh nghiệp",
      price: 599000,
      bestValue: false,
      description: "Dành cho doanh nghiệp lớn",
      features: [
        "Không giới hạn người dùng",
        "500GB lưu trữ",
        "Hỗ trợ 24/7",
        "Tất cả tính năng chuyên nghiệp",
        "Tuỳ chỉnh theo yêu cầu",
        "Quản lý đa tài khoản",
      ],
    },
  ];

  const [selectedPlan, setSelectedPlan] = useState(
    plans.find((plan) => plan.bestValue)?.id || plans[0].id
  );
  const onSelectPlan = (planId) => {
    setSelectedPlan(planId);
  };
  return (
    <div id="pricing" className="py-12 md:py-24 lg:py-32">
      <div className="px-4 md:px-6 flex flex-col justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center text-center space-y-2  ">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Bảng giá dịch vụ
          </h1>
          <p className="opacity-60 max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Lựa chọn gói dịch vụ phù hợp với nhu cầu của bạn
          </p>
        </div>
        <div className="mx-auto grid w-full md:max-w-5xl gap-6 py-12 lg:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              selectedPlan={parseInt(selectedPlan)}
              onSelectPlan={onSelectPlan}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
