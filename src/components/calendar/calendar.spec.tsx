import { createDOM } from '@builder.io/qwik/testing'
import { describe, test, expect } from 'vitest'
import { Calendar, CalendarDay, getDaysInLastMonth, getDaysOfCurrentMonth, getDaysOfLastMonth, getDaysOfNextMonth, getMonthName, getNumDaysInMonth, getStartDay } from './calendar';

describe('Calendar', () => {
    test("should render the calendar element", async () => {
        const { render, screen } = await createDOM();
        await render(<Calendar />);
        const calendar = screen.querySelector('[data-test="calendar"]');
        expect(calendar).toBeTruthy();
    });

    test('should return the correct start day for a given date', () => {
        // Test case 1: Monday
        const mondayDate = new Date('2023-06-12'); // June 12, 2023 is a Monday
        expect(getStartDay(mondayDate)).toEqual(0);
    
        // Test case 2: Wednesday
        const wednesdayDate = new Date('2023-06-14'); // June 14, 2023 is a Wednesday
        expect(getStartDay(wednesdayDate)).toEqual(2);
    
        // Test case 3: Sunday
        const sundayDate = new Date('2023-06-18'); // June 18, 2023 is a Sunday
        expect(getStartDay(sundayDate)).toEqual(6);
    });

    test('should return the correct number of days in the month for a given date', () => {
    // Test case 1: February in a non-leap year
    const februaryDate = new Date('2023-02-10'); // February 10, 2023
    expect(getNumDaysInMonth(februaryDate)).toEqual(28);

    // Test case 2: April
    const aprilDate = new Date('2023-04-01'); // April 1, 2023
    expect(getNumDaysInMonth(aprilDate)).toEqual(30);

    // Test case 3: December
    const decemberDate = new Date('2023-12-15'); // December 15, 2023
    expect(getNumDaysInMonth(decemberDate)).toEqual(31);
    });

    test('should return the correct number of days in the last month for a given month and year', () => {
        // Test case 1: January
        const januaryYear = 2023;
        expect(getDaysInLastMonth(0, januaryYear)).toEqual(31);
    
        // Test case 2: April
        const aprilYear = 2023;
        expect(getDaysInLastMonth(4, aprilYear)).toEqual(30);
    
        // Test case 3: February in a non-leap year
        const februaryYear = 2023;
        expect(getDaysInLastMonth(2, februaryYear)).toEqual(28);
    
        // Test case 4: February in a leap year
        const leapYear = 2024;
        expect(getDaysInLastMonth(2, leapYear)).toEqual(29);
      });

    test('should return the correct month name and year for a given month and year', () => {
    // Test case 1: January 2023
    expect(getMonthName(0, 2023)).toEqual('January 2023');

    // Test case 2: May 2022
    expect(getMonthName(4, 2022)).toEqual('May 2022');

    // Test case 3: December 2024
    expect(getMonthName(11, 2024)).toEqual('December 2024');
    });
    
})



