import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";

export function formatDate(createdAt, format) {
  const date = new Date(createdAt);
  const currentDate = new Date();
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 1 day in milliseconds
  const oneYearInMilliseconds = 24 * 60 * 60 * 1000 * 365; // 1 day in milliseconds
  const timeDifference = currentDate - date;

  // if is more than one day
  if (timeDifference > oneYearInMilliseconds || format === "FULL_DATE") {
    const day = date.getDate();
    const month = date.toDateString().split(" ")[1];
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  } else if (timeDifference > oneDayInMilliseconds) {
    const day = date.getDate();
    const month = date.toDateString().split(" ")[1];
    return `${month} ${day}`;
  } else {
    const time = formatDistanceToNowStrict(date, { includeSeconds: true, addSuffix: false });
    return time.split(" ")[0] + time.split(" ")[1][0];
  }
}

export function formatTime(createdAt) {
  const time = new Date(createdAt).toLocaleTimeString().split(":");
  return `${time[0]}:${time[1]} ${time[2].split(" ")[1]} `;
}
