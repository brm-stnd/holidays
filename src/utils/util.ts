export const Util = {
  pick: (object: any, keys: any): any => {
    return keys.reduce((obj: any, key: number) => {
      if (object && Object.prototype.hasOwnProperty.call(object, key)) {
        obj[key] = object[key];
      }
      return obj;
    }, {});
  },
  dateFormatIso: (date: Date): String => {
    const YYYY = date.getFullYear();
    let MM = date.getMonth() + 1; // Months start at 0
    let DD = date.getDate();

    if (DD < 10) DD = '0' + DD;
    if (MM < 10) MM = '0' + MM;

    return `${YYYY}-${MM}-${DD}`;
  },
  nthDay: (date: Date): String => {
    const newDate = new Date(date);
    const nth = ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
      dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return nth[Math.floor(newDate.getDate() / 7)] + '  ' + dayNames[newDate.getDay()] + ' of ' + monthNames[newDate.getMonth()];
  },
};
