import axios from "axios";
import { Ticket } from "../types/ticket";

const baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:8080";

export const parkVehicle = async (plateNum: string, vehicleType: number, entrance: number) => {
  return axios
    .post(baseURL + "/park", {
      plateNum,
      vehicleType,
      entrance,
    })
    .then((res) => {
      return res.data?.error || `Park at slot #${res.data.slotNum}`;
    })
    .catch((e) => alert(e.message));
};

export const unparkVehicle = async (ticket: Ticket) => {
  return axios
    .post(baseURL + "/unpark", { vehicle: ticket.vehicle })
    .then((res) => {
      if (res.data?.error) {
        return res.data.error;
      }
      return res.data.charge;
    })
    .catch((e) => alert(e.message));
};

export const getParkingMap = async () => {
  return axios
    .get(baseURL + "/map")
    .then((res) => res.data)
    .catch((e) => alert(e.message));
};
