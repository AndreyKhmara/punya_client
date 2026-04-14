import { useAppDispatch, useAppSelector } from "./app/hooks";
import { setAnswer, setPrompt } from "./features/agent/agentSlice";

function App() {
  const dispatch = useAppDispatch();
  const { answer, prompt } = useAppSelector((state) => state.agent);

  const handleGenerateMockAnswer = () => {
    if (!prompt.trim()) {
      dispatch(setAnswer("Введите текст в поле ниже, чтобы получить ответ."));
      return;
    }

    dispatch(setAnswer(`Ответ на запрос: ${prompt}`));
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold text-slate-900">Hello, I am Punya</h1>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="mb-2 text-sm font-medium text-slate-500">Ответ агента</p>
        <div className="min-h-28 rounded-lg bg-slate-50 p-4 text-slate-800">
          {answer}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <label
          htmlFor="agent-prompt"
          className="mb-2 block text-sm font-medium text-slate-500"
        >
          Ввод
        </label>
        <textarea
          id="agent-prompt"
          className="h-36 w-full resize-none rounded-lg border border-slate-300 p-3 outline-none transition focus:border-slate-500"
          placeholder="Напишите запрос для агента..."
          value={prompt}
          onChange={(event) => dispatch(setPrompt(event.target.value))}
        />
      </section>

      <button
        type="button"
        onClick={handleGenerateMockAnswer}
        className="w-fit rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-700"
      >
        Отправить
      </button>
    </main>
  );
}

export default App;
