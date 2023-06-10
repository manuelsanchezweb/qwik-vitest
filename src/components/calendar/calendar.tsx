import { component$, $, useSignal } from '@builder.io/qwik'

export interface CalendarDay {
  day: number
  month: number
  year: number
  disabled: boolean
}

/**
 *
 * @param date the date to get the start day of the week for
 * @returns a number representing the day of the week, where Monday=0, ..., Sunday=6
 */
export function getStartDay(date: Date) {
  let startDay = date.getDay()
  return startDay === 0 ? 6 : startDay - 1 // make Monday=0, ..., Sunday=6
}

/**
 *
 * @param date the date to get the number of days in the month for
 * @returns number of days in the month
 */
export function getNumDaysInMonth(date: Date) {
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1)
  nextMonth.setDate(nextMonth.getDate() - 1)
  return nextMonth.getDate()
}

/**
 *
 * @param month The month index, where January=0, ..., December=11
 * @param year The year of the month
 * @returns Number of days in the last month
 */
export function getDaysInLastMonth(month: number, year: number): number {
  return month === 0
    ? new Date(year - 1, 12, 0).getDate() // December of the previous year has index 11
    : new Date(year, month, 0).getDate()
}

/**
 *
 * @param month The month index, where January=0, ..., December=11
 * @param year The year of the month
 * @returns the month name and year, e.g. "January 2023"
 */
export function getMonthName(month: number, year: number) {
  const date = new Date(year, month)
  const formattedMonth = date.getMonth() + 1
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  })
    .format(date)
    .replace(formattedMonth.toString(), '')
}

/**
 * Returns an array of CalendarDay objects representing the days of the previous month.
 * @param startDay The starting day of the current month.
 * @param numDaysLastMonth The number of days in the last month.
 * @param month The month index (0-11) of the current month.
 * @param year The year of the current month.
 * @returns An array of CalendarDay objects representing the days of the last month.
 */
export function getDaysOfLastMonth(
  startDay: number,
  numDaysLastMonth: number,
  month: number,
  year: number
): CalendarDay[] {
  const days: CalendarDay[] = []
  const previousMonth = month === 0 ? 11 : month - 1 // Adjust the month index here. December has index 11 and it is the previous month of January
  const previousYear = month === 0 ? year - 1 : year // Adjust the year here

  for (let i = startDay - 1; i >= 0; i--) {
    days.push({
      day: numDaysLastMonth - startDay + i + 1,
      month: previousMonth,
      year: previousYear,
      disabled: true,
    })
  }
  return days
}

/**
 * Returns an array of CalendarDay objects representing the days of the current month.
 * @param numDays The number of days in the current month.
 * @param month The month index (0-11) of the current month.
 * @param year The year of the current month.
 * @returns An array of CalendarDay objects representing the days of the current month.
 */
export function getDaysOfCurrentMonth(
  numDays: number,
  month: number,
  year: number
): CalendarDay[] {
  const days: CalendarDay[] = []
  for (let i = 1; i <= numDays; i++) {
    days.push({
      day: i,
      month,
      year,
      disabled: false,
    })
  }
  return days
}

/**
 * Updates the provided calendar array with the days of the next month.
 * @param calendar The calendar array to be updated.
 * @param month The month index (0-11) of the current month.
 * @param year The year of the current month.
 */
export function getDaysOfNextMonth(
  calendar: CalendarDay[],
  month: number,
  year: number
): void {
  let nextMonthDay = 1
  while (calendar.length % 7 !== 0) {
    calendar.push({
      day: nextMonthDay++,
      month: month + 1,
      year: month === 11 ? year + 1 : year,
      disabled: true,
    })
  }
}

/**
 * Builds the calendar for a given date.
 * @param date The date for which to build the calendar.
 * @returns An array representing the weeks in the calendar.
 */
function buildCalendar(date: Date) {
  const month = date.getMonth()
  const year = date.getFullYear()
  const calendar: CalendarDay[] = []

  const startDay = getStartDay(new Date(date.getFullYear(), date.getMonth(), 1))
  const numDays = getNumDaysInMonth(date)
  const numDaysLastMonth = getDaysInLastMonth(month, year)

  calendar.push(...getDaysOfLastMonth(startDay, numDaysLastMonth, month, year))
  calendar.push(...getDaysOfCurrentMonth(numDays, month, year))
  getDaysOfNextMonth(calendar, month, year)

  let weeks = []
  while (calendar.length) {
    weeks.push(calendar.splice(0, 7))
  }

  return weeks
}

export const Calendar = component$(() => {
  const date = useSignal(new Date())
  const weeks = buildCalendar(date.value)
  const currentDay = new Date().getDate()
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const incrementMonth = $(() => {
    const previousYear = date.value.getFullYear()
    const previousMonth = date.value.getMonth()
    date.value = new Date(previousYear, previousMonth + 1)
  })

  const decrementMonth = $(() => {
    const previousYear = date.value.getFullYear()
    const previousMonth = date.value.getMonth()
    date.value = new Date(previousYear, previousMonth - 1)
  })

  const goToToday = $(() => {
    const today = new Date()
    date.value = new Date(today.getFullYear(), today.getMonth())
  })

  return (
    <div
      data-test="calendar"
      class="calendar border p-4 sm:p-6 min-h-[470px] flex flex-col gap-3"
    >
      <div class="flex gap-4 py-6 justify-between">
        <button onClick$={decrementMonth}>{'<'}</button>
        <h2>{getMonthName(date.value.getMonth(), date.value.getFullYear())}</h2>
        <button onClick$={incrementMonth}>{'>'}</button>
      </div>
      <button
        class="border bg-gray-200 p-4 rounded-md hover:bg-gray-300 focus:bg-gray-300"
        onClick$={goToToday}
      >
        Today
      </button>{' '}
      {/* New button */}
      <div class="overflow-x-auto max-w-[275px] sm:max-w-full mt-auto">
        <table class="border border-separate border-spacing-2 min-w-full ">
          <thead>
            <tr>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
              <th>Sun</th>
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, index) => (
              <tr key={index}>
                {week.map((day, index) => {
                  const id = `${day.year}-${day.month + 1}-${day.day}`
                  const isToday =
                    day.day === currentDay &&
                    day.month === currentMonth &&
                    day.year === currentYear
                  return (
                    <td
                      key={index}
                      data-id={id}
                      class={{
                        'day min-w-[40px] py-2 cursor-pointer text-center hover:bg-gray-500 focus:bg-gray-500 hover:text-white focus:text-white':
                          true,
                        'bg-gray-200 pointer-events-none text-gray-400':
                          day.disabled,
                        'bg-green-200 hover:bg-red-200 focus:bg-red-200 hover:text-black focus:text-black':
                          isToday,
                      }}
                      onClick$={$(() => alert(id))}
                    >
                      {day.day}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
})
