import { useMutation } from "@tanstack/react-query";
import { getRecommendations } from "../apis/aiApis";

const useAiSuggestions = (onSuccess, onError) => {
  return useMutation({
    mutationFn: getRecommendations,
    onSuccess,
    onError,
  });
};

export { useAiSuggestions };
