

export const showTimes: Record<number, string[]> = {
  0: ["10:00 AM", "12:00 PM", "3:00 PM", "5:00 PM"], // Sunday
  1: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"],  // Monday
  2: ["10:30 AM", "1:00 PM", "3:30 PM", "6:00 PM"],  // Tuesday
  3: ["9:30 AM", "12:30 PM", "3:00 PM", "7:00 PM"],  // Wednesday
  4: ["8:00 AM", "11:00 AM", "2:00 PM", "5:30 PM"],  // Thursday
  5: ["10:00 AM", "1:00 PM", "4:00 PM", "6:30 PM"],  // Friday
  6: ["9:00 AM", "12:00 PM", "3:00 PM", "5:00 PM"],  // Saturday
};


export const days = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(); // today
  d.setDate(d.getDate() + i); // ✅ safe add days
  console.log(d.toDateString)
  return d;
});
