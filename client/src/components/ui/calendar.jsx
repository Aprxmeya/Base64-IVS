"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, useNavigation, useDayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// This is the new custom caption component
function CalendarCaption({ displayMonth }) {
  const { goToMonth, nextMonth, previousMonth } = useNavigation()
  const { fromYear, toYear } = useDayPicker()

  const years = []
  for (let i = fromYear; i <= toYear; i++) {
    years.push(i)
  }

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December",
  ]

  const handleYearChange = (year) => {
    const newDate = new Date(displayMonth)
    newDate.setFullYear(parseInt(year))
    goToMonth(newDate)
  }

  const handleMonthChange = (monthIndex) => {
    const newDate = new Date(displayMonth)
    newDate.setMonth(parseInt(monthIndex))
    goToMonth(newDate)
  }

  return (
    <div className="flex justify-between items-center px-2 py-1">
      <button
        onClick={() => previousMonth && previousMonth()}
        disabled={!previousMonth}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0"
        )}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <div className="flex gap-2">
        <Select
          onValueChange={handleMonthChange}
          value={displayMonth.getMonth().toString()}
        >
          <SelectTrigger className="w-[120px] focus:ring-0">
            <SelectValue placeholder="Select Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month, index) => (
              <SelectItem key={month} value={index.toString()}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          onValueChange={handleYearChange}
          value={displayMonth.getFullYear().toString()}
        >
          <SelectTrigger className="w-[90px] focus:ring-0">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <button
        onClick={() => nextMonth && nextMonth()}
        disabled={!nextMonth}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0"
        )}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  fromYear = new Date().getFullYear() - 100, // Default year range
  toYear = new Date().getFullYear() + 10,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 border rounded-md bg-card", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        // Remove default caption styles, as we have a custom one
        caption: "hidden", 
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      // 👇 Use the custom caption component
      components={{
        Caption: CalendarCaption,
      }}
      fromYear={fromYear}
      toYear={toYear}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }