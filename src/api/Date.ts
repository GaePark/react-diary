const date = new Date();

const year = date.getFullYear();
const month = date.getMonth() + 1;
const today = date.getDate();
const hour = date.getHours();
const min = date.getMinutes();

const nowDate = `${year}-${month}-${today} ${hour}:${min}`;
const time = new Date(nowDate);

export const timeStamp = time.getTime();

export const reDate = (today: number) => {
  const returnDate = new Date(today);

  const reyear = returnDate.getFullYear();
  const remonth = returnDate.getMonth() + 1;
  const retoday = returnDate.getDate();
  const rehour = returnDate.getHours();
  const remin = returnDate.getMinutes();
  return `${reyear}-${remonth}-${retoday} ${rehour}:${remin}`;
};
