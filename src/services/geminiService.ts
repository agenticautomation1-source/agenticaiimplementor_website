export const getAIAdvisorResponse = async (
  userPrompt: string,
  history: { role: "user" | "model"; text: string }[]
) => {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userPrompt,
      history,
    }),
  });

  if (!response.ok) {
    throw new Error("Chat API failed");
  }

  const data = await response.json();
  return data.text;
};
