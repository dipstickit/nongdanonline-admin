export const formatUTCDate = dateString => {
  const date = new Date(dateString);

  // Extract hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert 24-hour time to 12-hour time
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Format minutes to always be two digits
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  // Extract day, month, and year
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based
  const year = date.getFullYear();

  // Format day and month to always be two digits
  const formattedDay = day < 10 ? '0' + day : day;
  const formattedMonth = month < 10 ? '0' + month : month;

  // Construct the formatted date string
  const formattedDate = `${hours}:${formattedMinutes}${ampm}, ${formattedDay}/${formattedMonth}/${year}`;

  return formattedDate;
};
