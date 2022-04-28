import { IHolidayBody } from '@interfaces/holiday.interface';
import { Util } from '@utils/util';

class HolidayService {
  public async calculateHoliday(body: IHolidayBody): Promise<number> {
    const { start_date, end_date } = body;

    const singaporePublicHolidays = [
      '2022-12-25',
      '2022-10-24',
      '2022-08-09',
      '2022-07-09',
      '2022-05-15',
      '2022-05-02',
      '2022-05-01',
      '2022-04-15',
      '2022-02-02',
      '2022-02-01',
      '2022-01-01',
    ];

    let certainOccurrencesDays = ['2022-06-06', '2022-01-21'];
    certainOccurrencesDays = certainOccurrencesDays.map(certainOccurrencesDay => Util.nthDay(new Date(certainOccurrencesDay)));

    const loopingStartDate = new Date(start_date.getFullYear(), start_date.getMonth(), start_date.getDate() + 1);
    const loopingEndDate = new Date(end_date.getFullYear(), end_date.getMonth(), end_date.getDate() - 1);

    let totalDate = 0;
    let totalHolidays = 0;
    for (let day = loopingStartDate; day <= loopingEndDate; day.setDate(day.getDate() + 1)) {
      const dateFormatIso = Util.dateFormatIso(day);
      const isWeekend = [0, 6].includes(day.getDay()); // 0 is Sunday, 6 is saturday
      const isSingaporePulicHoliday = singaporePublicHolidays.includes(dateFormatIso);
      const isCertainOccurrencesDays = certainOccurrencesDays.includes(Util.nthDay(day));

      totalDate++;

      if (!isWeekend && (isSingaporePulicHoliday || isCertainOccurrencesDays)) {
        totalHolidays++;
      } else if (isWeekend && (isSingaporePulicHoliday || isCertainOccurrencesDays)) {
        totalHolidays += 2;
      } else if (isWeekend) {
        totalHolidays++;
      }
    }

    return totalDate - totalHolidays;
  }
}

export default HolidayService;
