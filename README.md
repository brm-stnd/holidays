## Holidays
for calculate total weekdays

### Run:

1. `npm install`
2. `npm run start`

### Test:

`npm test`

### Postman Test

`curl --location --request POST 'http://localhost:3000/holidays/calculator' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'start_date=06/01/2022' \
--data-urlencode 'end_date=06/10/2022'`