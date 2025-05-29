import moment from "moment";

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
  ).padStart(2, "0")}${timeParts.length === 3
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
export const get_date = () => {
  const date = moment(new Date());
};
export const get_day = () => {
  return moment(new Date).format("dddd").toString().toLowerCase()
}
export const createTime = (time) => {
  if (time === null || time === undefined) {
  } else {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, seconds, 0);
    return date;
  }

};
export const currentTime = () => {
  const now = new Date();
  const currentTime = now.toISOString();
  return currentTime;
};
export const toDatetime = (timeString) => {

  const today = new Date(); 
  const match = timeString.match(/(\d+):(\d+)\s?(AM|PM)/i);

  if (!match) return null;

  let [ , hours, minutes, modifier ] = match;
  hours = parseInt(hours, 10);
  minutes = parseInt(minutes, 10);

  // Convert to 24-hour format
  if (modifier.toUpperCase() === 'PM' && hours !== 12) hours += 12;
  if (modifier.toUpperCase() === 'AM' && hours === 12) hours = 0;

  const datetime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    hours,
    minutes
  );

  return datetime.toISOString();
};
