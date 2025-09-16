export const timehelper = (time) => {
  const timestamp = time || 1733886552;
  const date = new Date(timestamp * 1000);

  console.log(time);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return formattedDate;
};
