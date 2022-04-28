import { NextFunction, Request, Response } from 'express';
import holidayService from '@/services/holiday.service';

class HolidayController {
  public holidayService = new holidayService();

  public getTotalHoliday = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const totalHolidays: number = await this.holidayService.calculateHoliday();

      res.status(200).json({ number_of_working_days: totalHolidays });
    } catch (error) {
      next(error);
    }
  };
}

export default HolidayController;
