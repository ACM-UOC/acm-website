export const getGoogleCalendarUrl = (event: { title: string; date: string; description: string }) => {
  const baseUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE";
  const title = encodeURIComponent(event.title);
  const details = encodeURIComponent(event.description);
  
 
  // For static demo, we'll just set it to the day of the event
  const dateParts = event.date.split(" "); // e.g. ["22", "OCT", "2026"]
  const year = dateParts[2];
  const months: { [key: string]: string } = { JAN: "01", FEB: "02", MAR: "03", APR: "04", MAY: "05", JUN: "06", JUL: "07", AUG: "08", SEP: "09", OCT: "10", NOV: "11", DEC: "12" };
  const month = months[dateParts[1]];
  const day = dateParts[0].padStart(2, '0');
  
  const formattedDate = `${year}${month}${day}T100000Z`;
  const endEvent = `${year}${month}${day}T120000Z`;
  
  return `${baseUrl}&text=${title}&details=${details}&dates=${formattedDate}/${endEvent}&location=CSD+UOC`;
};