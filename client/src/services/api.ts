import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:8080";

export const parkVehicle = async (plateNum: string, vehicleType: number, entrance: number) => {
  return axios
    .post(baseURL + "/park", {
      plateNum,
      vehicleType,
      entrance,
    })
    .then((res) => {
      alert(res.data?.error || "Successfully parked.");
    });
};

export const getParkingMap = async () => {
  return axios.get(baseURL + "/map");
};
