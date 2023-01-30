# A react weekly calendar

A weekly calendar with MUI without any date libraries.

Put API key in the .env file with the name REACT_APP_API_URL, like this REACT_APP_API_URL=url_for_the_api

## LIMITATIONS

Data is fetched using native function.

API
From my understanding the external API endpoint dont support any filter so each API call fetches all records. The filter takes place in the hook instead, so an external API callis executed on every week load.

Date
Personally I would like to have used dayjs or momentjs for better and easier date handling, but I dont know if this is allowed. Hence plain javascript date functions is being used.

No support for displaying overlapping events in the calendar
