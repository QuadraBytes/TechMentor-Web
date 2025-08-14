import { useMutation } from "@tanstack/react-query";
import { aiSuggestions } from "../services/aiService";

const useAiSuggestions = (onSuccess, onError) => {
  return useMutation({
    mutationFn: aiSuggestions,
    onSuccess,
    onError,
  });
};

export { useAiSuggestions };
