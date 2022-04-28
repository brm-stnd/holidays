import { Router } from 'express';
import HolidayController from '@/controllers/holiday.controller';
import { Routes } from '@interfaces/routes.interface';

class HolidayRoute implements Routes {
  public path = '/holidays';
  public router = Router();
  public holidayController = new HolidayController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/calculator`, this.holidayController.getTotalHoliday);
  }
}

export default HolidayRoute;
