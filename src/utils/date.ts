import { format, isToday, isYesterday } from "date-fns";

export const formatDate = (dateString?: string) => {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);

  if (isToday(date)) {
    return format(date, "HH:mm");
  }

  if (isYesterday(date)) {
    return "Yesterday";
  }

  return format(date, "M/d/y");
};
