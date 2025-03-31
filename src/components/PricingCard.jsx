import React from "react";
import { IoCheckmark } from "react-icons/io5";

export default function PricingCard({ plan, selectedPlan, onSelectPlan }) {
  const convertPrice = (price) => {
    const formattedPrice = price
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formattedPrice + "đ";
  };

  console.log(selectedPlan);

  return (
    <div
      className={
        "flex flex-col rounded-lg p-6 border shadow-sm cursor-pointer" +
        (selectedPlan === plan.id
          ? "border-black dark:border-white ring-1 ring-black dark:ring-white"
          : "border-black/15 dark:border-white/15 hover:border-black dark:hover:border-white")
      }
      onClick={() => onSelectPlan(plan.id)}
    >
      {plan.bestValue && (
        <div className="inline-block rounded-full px-3 py-1 text-xs mb-4 self-start bg-black text-white dark:bg-white dark:text-black">
          Phổ biến nhất
        </div>
      )}
      <h3 className="font-bold text-2xl">{plan.name}</h3>
      <span className="flex items-baseline gap-1 mt-4">
        <span className="font-bold text-3xl">{convertPrice(plan.price)}</span>
        <span className="opacity-60 text-sm"> /tháng</span>
      </span>
      <p className="text-sm opacity-60 mt-2">{plan.description}</p>
      <ul className="mt-6 space-y-3">
        {plan.features.map((feature, index) => (
          <li key={index}>
            <span className="flex items-center gap-2">
              <span>
                <IoCheckmark />
              </span>{" "}
              {feature}
            </span>
          </li>
        ))}
      </ul>
      <button
        className={
          "mt-8 inline-flex w-full items-center justify-center h-10 px-4 py-2 rounded-md border border-black/15 dark:border-white/15 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" +
          (selectedPlan === plan.id
            ? " bg-black text-white dark:bg-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90"
            : " bg-white text-black dark:bg-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10")
        }
      >
        {selectedPlan === plan.id
          ? "Đăng ký ngay"
          : plan.name === "Doanh nghiệp"
          ? "Liên hệ bán hàng"
          : "Bắt đầu miễn phí"}
      </button>
    </div>
  );
}
