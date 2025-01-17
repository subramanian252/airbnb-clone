"use client";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
interface Props {
  reservations: {
    startDate: Date;
    endDate: Date;
  }[];
}

import { DateRange } from "react-date-range";
import { useState } from "react";
import { eachDayOfInterval } from "date-fns";
function DateRangeComp(props: Props) {
  const { reservations } = props;

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  let disabledDates: Date[] = [];
  reservations.forEach((reservation) => {
    const interval = eachDayOfInterval({
      start: new Date(reservation.startDate),
      end: new Date(reservation.endDate),
    });

    disabledDates = [...disabledDates, ...interval];
  });

  return (
    <>
      <input
        type="hidden"
        name="startDate"
        value={state[0].startDate.toISOString()}
      />
      <input
        type="hidden"
        name="endDate"
        value={state[0].endDate.toISOString()}
      />
      <DateRange
        date={new Date()}
        showDateDisplay={false}
        rangeColors={["#ff585f"]}
        ranges={state}
        onChange={(item) => setState([item.selection] as any)}
        minDate={new Date()}
        direction="vertical"
        disabledDates={disabledDates}
      />
    </>
  );
}

export default DateRangeComp;
