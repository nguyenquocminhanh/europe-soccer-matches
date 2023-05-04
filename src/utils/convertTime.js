

export function convertTime (dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const date = dateTime.toLocaleDateString('en-US', options);
    const time = dateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
    const timezoneOffset = dateTime.getTimezoneOffset() / 60;
    const timezone = timezoneOffset >= 0 ? `UTC-${timezoneOffset}` : `UTC+${Math.abs(timezoneOffset)}`;
    return {date: date, time: time, timezone: timezone};
}