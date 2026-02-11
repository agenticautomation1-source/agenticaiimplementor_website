 export const getAIAdvisorResponse = async (
  userPrompt: string,
  history: { role: "user" | "model"; text: string }[]
) => {
  const response = await fetch("/api/ai-advisor", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: userPrompt,
      history,
    }),
  });

  const data = await response.json();

  return data.text;
};
