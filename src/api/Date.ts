const date = new Date();

const year = date.getFullYear();
const month = date.getMonth();
const today = date.getDate();
const hour = date.getHours();
const min = date.getMinutes();

export const nowDate = `${year}-${month}-${today} ${hour}:${min}`;
