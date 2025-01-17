import dayjs from 'dayjs';


function getDefaultEvent() {
  return {
    id: '',
    basePrice: '',
    dateFrom: new Date().setHours(0,0,0,0),
    dateTo: new Date().setHours(0,0,0,0),
    destination: '',
    isFavorite: false,
    offers: [],
    type: 'flight'
  };
}


function getFormattedDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}


function getDateDifference(dateOne, dateTwo) {
  const diffDay = dayjs(dateOne).diff(dateTwo, 'day');
  const diffHour = dayjs(dateOne).diff(dateTwo, 'hour') - (diffDay * 24);
  const diffMinute = dayjs(dateOne).diff(dateTwo, 'minute') - ((diffHour * 60) + ((diffDay * 24) * 60));

  let diffDayText = '';
  if (diffDay > 0 && diffDay < 10) {
    diffDayText = `0${diffDay}D`;
  } else if (diffDay >= 10) {
    diffDayText = `${diffDay}D`;
  }

  let diffHourText = '';
  if (diffHour !== 0) {
    diffHourText = `${diffHour}H`;
  } else if (diffDay !== 0) {
    diffHourText = '00H';
  }

  const diffMinuteText = diffMinute !== 0 ? `${diffMinute}M` : '00M';

  const diffDateText = `${diffDayText} ${diffHourText} ${diffMinuteText}`;

  return diffDateText;
}


function getCapitalizedString(string) {
  return string[0].toUpperCase() + string.slice(1);
}


function getHtmlId(string) {
  return string.replace(/\s+/g, '-').toLowerCase();
}


function getIdGenerator () {
  let currentValue = 0;

  return function () {
    currentValue += 1;
    return currentValue;
  };
}


export {
  getDefaultEvent,
  getFormattedDate,
  getDateDifference,
  getCapitalizedString,
  getHtmlId,
  getIdGenerator,
};
