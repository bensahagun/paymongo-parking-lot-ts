import axios from "axios";
import { Ticket } from "../types/ticket";
import { Vehicle } from "../types/vehicle";
import { hoursToMS } from "../utils/hoursToMS";

const baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:8080";

export const parkVehicle = async (plateNum: string, vehicleType: number, entrance: number) => {
  return axios
    .post(baseURL + "/park", {
      plateNum,
      vehicleType,
      entrance,
    })
    .then((res) => {
      return res.data?.error || "Successfully parked.";
    });
};

export const unparkVehicle = async (ticket: Ticket, hoursStay?: number) => {
  const customTimestamp = hoursStay ? ticket.entryTimestamp + hoursToMS(hoursStay) : null;
  return axios.post(baseURL + "/unpark", { vehicle: ticket.vehicle, customTimestamp }).then((res) => {
    if (res.data?.error) {
      return res.data.error;
    }
    return res.data.charge;
  });
};

export const getParkingMap = async () => {
  return axios.get(baseURL + "/map").then((res) => res.data);
};
