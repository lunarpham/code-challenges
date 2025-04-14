export const convertISOToDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
    time: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const categories = [
  "Work",
  "Personal",
  "Shopping",
  "Health",
  "Travel",
  "Do not indicate",
];

export const filters = ["All", "On Going", "Done"];
