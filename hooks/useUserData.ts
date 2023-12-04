import axios from "axios";
import { useQuery } from "react-query";

const fetchData = async () => {
  const res = await axios.get("/api/profile/myProfile");
  return res.data;
};

export const useUserData = () => {
  return useQuery("user", fetchData);
};
