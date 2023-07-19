import { Appointment } from "./appointment";

export interface Timeline {
  appointment: Appointment,
  top: number,
  left: number,
  widthInPercent: number,
}
