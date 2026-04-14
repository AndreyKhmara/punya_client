import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setAnswer, setPrompt } from "../../../features/agent/agentSlice";
import axios from "axios";
const FETCH_URL = import.meta.env.VITE_API_URL;

export const useMainBlock = () => {
  const dispatch = useAppDispatch();
  const { answer, prompt } = useAppSelector((state) => state.agent);
  const [isLoading, setIsLoading] = useState(false);

  // TODO в useCallback
  const changeHandler = (event) => dispatch(setPrompt(event.target.value));

  const handleGenerateAnswer = async () => {
    if (!prompt.trim()) {
      dispatch(setAnswer("Введите текст в поле ниже, чтобы получить ответ."));
      return;
    }

    try {
      setIsLoading(true);
      dispatch(setAnswer("Генерирую ответ..."));

      const { data } = await axios.post(FETCH_URL, {
        prompt,
      });

      dispatch(
        setAnswer(data.response?.trim() || "Сервер вернул пустой ответ."),
      );
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response
          ? `HTTP ${error.response.status}`
          : error.message
        : error instanceof Error
          ? error.message
          : "Неизвестная ошибка";

      dispatch(setAnswer(`Ошибка запроса: ${message}`));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    state: { answer, prompt, isLoading },
    methods: { handleGenerateAnswer, changeHandler },
  };
};
