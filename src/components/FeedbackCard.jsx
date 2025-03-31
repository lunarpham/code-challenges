import React from "react";

export default function FeedbackCard(testimonial) {
  return (
    <div
      key={testimonial.id}
      className="grid gap-4 rounded-lg border border-black/10 dark:border-white/15 p-6 shadow-sm"
    >
      <p className="opacity-60">"{testimonial.quote}"</p>
      <div className="flex gap-4 justify-start items-center">
        <div className="h-10 w-10 bg-[#f5f5f5] dark:bg-[#262626] rounded-full"></div>
        <div>
          <p className="font-semibold">{testimonial.name}</p>
          <p className="opacity-60">
            {testimonial.title}, {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}
