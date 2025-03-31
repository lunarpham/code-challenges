import React from "react";

export default function Hero() {
  return (
    <div id="hero" className="py-12 md:py-24 lg:py-32">
      <div className="px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Giải pháp tuyệt vời cho doanh nghiệp của bạn
              </h1>
              <p className="max-w-[600px] md:text-xl opacity-60">
                Chúng tôi cung cấp các giải pháp hiệu quả giúp doanh nghiệp của
                bạn phát triển nhanh chóng và bền vững.
              </p>
            </div>
            <div className="flex gap-2 text-sm">
              <button className="px-8 py-2 h-11 rounded-md bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disable:pointer-events-none">
                Bắt đầu ngay
              </button>
              <button className="px-8 py-2 h-11 rounded-md bg-transparent text-black border border-black/10 dark:border-gray-200/20 hover:bg-black/10 dark:text-white dark:hover:bg-white/10 inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disable:pointer-events-none">
                Tìm hiểu thêm
              </button>
            </div>
          </div>
          <div className="mx-auto flex items-center justify-center">
            <img
              src="./hero-image.svg"
              alt="hero-image"
              className="w-[550px] rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
