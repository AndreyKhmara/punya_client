import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AgentState = {
  answer: string;
  prompt: string;
};

const initialState: AgentState = {
  answer: "Здесь будет ответ агента...",
  prompt: ""
};

const agentSlice = createSlice({
  name: "agent",
  initialState,
  reducers: {
    setPrompt(state, action: PayloadAction<string>) {
      state.prompt = action.payload;
    },
    setAnswer(state, action: PayloadAction<string>) {
      state.answer = action.payload;
    }
  }
});

export const { setPrompt, setAnswer } = agentSlice.actions;
export default agentSlice.reducer;
