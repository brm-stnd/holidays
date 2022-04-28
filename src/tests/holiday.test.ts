import request from 'supertest';
import App from '@/app';
import HolidayRoute from '@/routes/holiday.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

const holidayBody = {
  start_date: '12/31/2021',
  end_date: '01/07/2022',
};

describe('Testing Holiday', () => {
  describe('[POST] /holidays/calculator', () => {
    it('response statusCode 200 / success', async () => {
      const holidayRoute = new HolidayRoute();
      const app = new App([holidayRoute]);

      const { status, text } = await request(app.getServer()).post(`${holidayRoute.path}/calculator`).send(holidayBody);
      const textParse = JSON.parse(text);

      expect(status).toEqual(200);
      expect(textParse).toHaveProperty('number_of_working_days', expect.any(Number));
      expect(textParse.number_of_working_days).toEqual(3);
    });

    it('response statusCode 200 / success with national holiday', async () => {
      const holidayRoute = new HolidayRoute();
      const app = new App([holidayRoute]);

      const { status, text } = await request(app.getServer()).post(`${holidayRoute.path}/calculator`).send({
        start_date: '01/31/2022',
        end_date: '02/05/2022',
      });
      const textParse = JSON.parse(text);

      expect(status).toEqual(200);
      expect(textParse).toHaveProperty('number_of_working_days', expect.any(Number));
      expect(textParse.number_of_working_days).toEqual(2);
    });

    it('response statusCode 200 / success with national holiday at saturday', async () => {
      const holidayRoute = new HolidayRoute();
      const app = new App([holidayRoute]);

      const { status, text } = await request(app.getServer()).post(`${holidayRoute.path}/calculator`).send({
        start_date: '12/31/2021',
        end_date: '01/08/2022',
      });
      const textParse = JSON.parse(text);

      expect(status).toEqual(200);
      expect(textParse).toHaveProperty('number_of_working_days', expect.any(Number));
      expect(textParse.number_of_working_days).toEqual(4);
    });

    it('response statusCode 200 / success with Certain Occurrences Days', async () => {
      const holidayRoute = new HolidayRoute();
      const app = new App([holidayRoute]);

      const { status, text } = await request(app.getServer()).post(`${holidayRoute.path}/calculator`).send({
        start_date: '06/01/2022',
        end_date: '06/10/2022',
      });
      const textParse = JSON.parse(text);

      expect(status).toEqual(200);
      expect(textParse).toHaveProperty('number_of_working_days', expect.any(Number));
      expect(textParse.number_of_working_days).toEqual(5);
    });

    it('response statusCode 400 when end date less than start_date', async () => {
      const holidayRoute = new HolidayRoute();
      const app = new App([holidayRoute]);

      const { status, text } = await request(app.getServer())
        .post(`${holidayRoute.path}/calculator`)
        .send({
          ...holidayBody,
          end_date: '01/07/2021',
        });
      const textParse = JSON.parse(text);

      expect(status).toEqual(400);
      expect(textParse).toHaveProperty('error', expect.any(String));
      expect(textParse.error).toEqual('"end_date" must be greater than or equal to "ref:start_date"');
    });

    it('response statusCode 400 when start date undefined', async () => {
      const holidayRoute = new HolidayRoute();
      const app = new App([holidayRoute]);

      const { status, text } = await request(app.getServer())
        .post(`${holidayRoute.path}/calculator`)
        .send({
          ...holidayBody,
          start_date: undefined,
        });
      const textParse = JSON.parse(text);

      expect(status).toEqual(400);
      expect(textParse).toHaveProperty('error', expect.any(String));
      expect(textParse.error).toEqual('"start_date" is required');
    });

    it('response statusCode 400 when end date undefined', async () => {
      const holidayRoute = new HolidayRoute();
      const app = new App([holidayRoute]);

      const { status, text } = await request(app.getServer())
        .post(`${holidayRoute.path}/calculator`)
        .send({
          ...holidayBody,
          end_date: undefined,
        });
      const textParse = JSON.parse(text);

      expect(status).toEqual(400);
      expect(textParse).toHaveProperty('error', expect.any(String));
      expect(textParse.error).toEqual('"end_date" is required');
    });
  });
});
