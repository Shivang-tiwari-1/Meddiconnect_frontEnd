import {
  getAddressFromCoordinates,
  set_coordinates,
} from "../Redux/slices/signup_login.";
import moment from "moment";

export const convertAMPMToISO = (time) => {
  const [hour, minute, second] = time.slice(0, 8).split(":").map(Number);
  const isPM = time.includes("pm") || time.includes("PM");
  const finalHour =
    isPM && hour !== 12 ? hour + 12 : hour === 12 && !isPM ? 0 : hour;
  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    finalHour,
    minute,
    second || 0
  );
};
export const generateTimeIntervals = (
  start: string,
  totalMinutes: number,
  intervalMinutes: number
) => {

  let interval: string[] = [];
  let current = new Date(start);
  for (let i = 0; i < totalMinutes / intervalMinutes; i++) {
    interval.push(current.toTimeString().slice(0, 5));
    current.setMinutes(current.getMinutes() + intervalMinutes);
  }
  return interval;
};
export const convertTo12HourFormat = (date_array: string) => {
  const [hours, minutes] = date_array.split(":");
  let period = "AM";
  let hour = parseInt(hours, 10);
  if (hour >= 12) {
    period = "PM";
    if (hour > 12) {
      hour -= 12;
    }
  } else if (hour === 0) {
    hour = 12;
  }
  return `${hour}:${minutes} ${period}`;
};
export const hours = (start, end) => {
  const starting = convertAMPMToISO(start);
  const ending = convertAMPMToISO(end);
  const differenceInMilliseconds = ending - starting;
  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
  return differenceInHours;
};
export const get_Current_location = async (geolocation_Object, dispatch) => {
  if (geolocation_Object) {
    geolocation_Object.getCurrentPosition(async (position) => {
      const lat = await position.coords.latitude;
      const lng = await position.coords.longitude;
      console.log(lat, lng);
      dispatch(set_coordinates({ lat, lng }));
      const address = await dispatch(
        getAddressFromCoordinates({ latitude: lat, longitude: lng })
      );
      return address;
    });
  }
};
const toRadians = (degrees) => degrees * (Math.PI / 180);
export const haversineDistance = (lat1, lat2, lon1, lon2) => {
  const R = 6371;
  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δφ = toRadians(lat2 - lat1);
  const Δλ = toRadians(lon2 - lon1);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance;
};
export const get_date = () => {
  const now = new Date()
  console.log(now)
  const date = moment(now.toDateString());
  console.log(date)
  console.log(date.day("ddd"))
}