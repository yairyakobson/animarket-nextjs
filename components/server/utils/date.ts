export const oneMinuteAgo = () =>
  new Date(Date.now() - 1 * 60 * 1000);

export const fiveMinutesAgo = () =>
  new Date(Date.now() - 5 * 60 * 1000);

export const fifteenMinutesFromNow = () =>
  new Date(Date.now() + 15 * 60 * 1000);

export const oneHourFromNow = () =>{
  const date = new Date();
  date.setHours(date.getHours() + 1);
  return date;
}

export const oneWeekFromNow = () =>
  new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

export const oneYearFromNow = () =>
  new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

export const thirtyDaysFromNow = () =>
  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

export const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export const oneWeekAgo = () =>
  new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);