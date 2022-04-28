import userModel from '@models/users.model';

class HolidayService {
  public users = userModel;

  public async calculateHoliday(): Promise<number> {
    return 3;
  }
}

export default HolidayService;
