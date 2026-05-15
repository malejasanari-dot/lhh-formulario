import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import 'react-day-picker/style.css'

import { cn } from "../../utils/cn"

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-bold text-text-primary",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border border-border-primary rounded-md flex items-center justify-center transition-all hover:bg-text-primary/5 text-text-primary"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-text-secondary rounded-md w-9 font-normal text-[0.8rem] uppercase tracking-widest",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent-primary/10 [&:has([aria-selected])]:bg-accent-primary/10 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          "h-9 w-9 p-0 font-normal text-text-primary aria-selected:opacity-100 rounded-md transition-all hover:bg-text-primary/10 flex items-center justify-center cursor-pointer bg-transparent border-none"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-accent-primary text-white hover:bg-accent-primary hover:text-white focus:bg-accent-primary focus:text-white shadow-md font-bold !opacity-100",
        day_today: "bg-accent-primary/20 text-accent-primary font-bold",
        day_outside:
          "day-outside text-text-secondary opacity-50 aria-selected:bg-accent-primary/20 aria-selected:text-text-primary aria-selected:opacity-30",
        day_disabled: "text-text-secondary opacity-30 cursor-not-allowed",
        day_range_middle:
          "aria-selected:bg-accent-primary/10 aria-selected:text-text-primary",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
