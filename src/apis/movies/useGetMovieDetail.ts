import { MovieDetail } from "../../../types/responseType/responseType";
import { setIsDetailError } from "../../store/store";
import { options, url } from "../config/config";

const useGetMovieDetail = () => {
  const fetchMovieDetail = async (id: number): Promise<MovieDetail | null> => {
    const detailUrl = url.detail;
    try {
      const response = await fetch(detailUrl(id), options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data in App:", error);
      setIsDetailError(true);
    }
    return null;
  };

  return { fetchMovieDetail };
};

export default useGetMovieDetail;
