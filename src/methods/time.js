import dayjs from 'dayjs'

export function toTimeRangeString(start, end, onlyDate) {
  if (!start || !end) return ''
  let startDate = dayjs(start).format('YYYY/MM/DD')
  let startTime = dayjs(start).format('HH:mm')
  let startWeekDay = getWeekDay(start)
  let endDate = dayjs(end).format('YYYY/MM/DD')
  let endTime = dayjs(end).format('HH:mm')
  let endWeekDay = getWeekDay(end)

  if (onlyDate)
    return startDate === endDate
      ? `${startDate}(${startWeekDay})`
      : `${startDate}(${startWeekDay}) - ${endDate}(${endWeekDay})`

  return startDate === endDate
    ? `${startDate}(${startWeekDay}) ${startTime} - ${endTime}`
    : `${startDate}(${startWeekDay}) ${startTime} - ${endDate}(${endWeekDay}) ${endTime}`
}

export function getWeekDay(date) {
  let labelMap = ['日', '一', '二', '三', '四', '五', '六']
  let weekIndex = new Date(date).getDay()
  return labelMap[weekIndex]
}