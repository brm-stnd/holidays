export const Util = {
  pick: (object: any, keys: any): any => {
    return keys.reduce((obj: any, key: number) => {
      if (object && Object.prototype.hasOwnProperty.call(object, key)) {
        obj[key] = object[key];
      }
      return obj;
    }, {});
  },
  dateFormatIso: (date: Date): string => {
    const YYYY = date.getFullYear();
    const MM = date.getMonth() + 1; // Months start at 0
    const DD = date.getDate();

    let newDD;
    let newMM;
    if (DD < 10) {
      newDD = '0' + DD;
    }
    if (MM < 10) {
      newMM = '0' + MM;
    }

    return `${YYYY}-${newMM}-${newDD}`;
  },
  nthDay: (date: Date): string => {
    const nth = ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
      dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return nth[Math.floor(date.getDate() / 7)] + '  ' + dayNames[date.getDay()] + ' of ' + monthNames[date.getMonth()];
  },
};
