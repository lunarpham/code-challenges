import React from "react";

export default function Contact(props) {
  return (
    <div className="py-12 md:py-24 lg:py-32">
      <div className="px-4 md:px-6 flex flex-col justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Sẵn sàng bắt đầu?
          </h1>
          <p className="opacity-60 max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Đăng ký ngay hôm nay và trải nghiệm sự khác biệt
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm space-y-2 mt-4">
          <div className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Email của bạn"
              className="h-10 rounded-md bg-transparent text-sm text-white placeholder:text-white/60 px-3 py-2 border border-black/10 dark:border-white/15 p-2 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
            <button className="px-4 py-2 w-full text-sm inline-flex justify-center items-center h-11 rounded-md bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disable:pointer-events-none">
              Đăng ký nhận tư vấn
            </button>
          </div>
          <p className="text-center text-xs opacity-60">
            Bằng cách đăng ký, bạn đồng ý với{" "}
            <a href="#" className="underline">
              Điều khoản dịch vụ
            </a>{" "}
            và{" "}
            <a href="#" className="underline">
              Chính sách bảo mật
            </a>{" "}
            của chúng tôi.
          </p>
        </div>
      </div>
    </div>
  );
}
