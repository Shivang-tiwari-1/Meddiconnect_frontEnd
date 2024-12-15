export function convertToLocalTime(time: string): string | null {
  const timeParts = time.split(":").map(Number);
  const [hours, minutes, seconds] = timeParts;
  if (
    isNaN(hours) ||
    isNaN(minutes) ||
    (timeParts.length === 3 && isNaN(seconds)) ||
    timeParts.length > 3
  ) {
    console.error("Invalid time values:", { hours, minutes, seconds });
    return null;
  }

  const date = new Date();

  date.setHours(hours, minutes, seconds || 0);

  let adjustedHours = date.getHours();
  const isPM = adjustedHours >= 12;
  adjustedHours = adjustedHours % 12 || 12;

  const formattedTime = `${String(adjustedHours).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}${
    timeParts.length === 3
      ? `:${String(date.getSeconds()).padStart(2, "0")}`
      : ""
  } ${isPM ? "PM" : "AM"}`;
  return formattedTime;
}

export function convertToLocalTime2(time: string): string | null {
  const timeParts = time.split(":").map(Number);

  const [hours, minutes, seconds] = timeParts;

  if (
    isNaN(hours) ||
    isNaN(minutes) ||
    (timeParts.length === 3 && isNaN(seconds)) ||
    timeParts.length > 3
  ) {
    console.error("Invalid time format:", { hours, minutes, seconds });
    return null;
  }

  const now = new Date();
  now.setHours(hours, minutes, seconds || 0);

  const localizedTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: timeParts.length === 3 ? "2-digit" : undefined,
    hour12: true,
  });

  return localizedTime;
}
