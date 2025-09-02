import { AIResponse, TTP } from "../types";

const fetchCVEDetails = async (cveId: string): Promise<string> => {
  try {
    const response = await fetch(
      `https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=${cveId}`
    );
    const data = await response.json();

    if (data.vulnerabilities && data.vulnerabilities.length > 0) {
      return data.vulnerabilities[0].cve.descriptions[0].value;
    }
    throw new Error("CVE not found");
  } catch (error) {
    console.error("Error fetching CVE details:", error);
    throw error;
  }
};

const fetchTTPs = async (description: string): Promise<TTP> => {
  const response = await fetch("https://cve-to-ttp-api.onrender.com/predict", {
    method: "POST",
    body: JSON.stringify({ description }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch TTPs");
  }
  const data = await response.json();
  console.log("data: ", data);

  return data;
};

const fetchTTPDetailsFromOpenAI = async (
  ttpId: string[]
): Promise<Record<string, { name: string; description: string }>> => {
  const OPENAI_API_KEY =
    "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"; // 🔐 Use env variable in production

const prompt = `Explain what the MITRE ATT&CK TTP IDs ${ttpId.join(", ")} refer to. For each, provide a short name and a detailed description of mitre. Respond in this JSON format:

{
  "T1059": {
    "name": "Command and Scripting Interpreter",
    "description": "This technique involves..."
  },
  "T1071": {
    "name": "Application Layer Protocol",
    "description": "This technique is used for..."
  }
}`;


  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // or "gpt-3.5-turbo" if needed
        messages: [
          { role: "system", content: "You are a cybersecurity expert." },
          { role: "user", content: prompt },
        ],
        temperature: 0.3,
      }),
    });

    const result = await response.json();
    const message = result.choices[0].message.content;

    const parsed = JSON.parse(message);
    return parsed;
  } catch (err) {
    console.error("Error fetching from OpenAI:", err);
    return ttpId.reduce((acc, id) => {
      acc[id] = {
        name: id,
        description: "No description found from OpenAI.",
      };
      return acc;
    }, {} as Record<string, { name: string; description: string }>);
  }
};

export const processQuery = async (input: string): Promise<AIResponse> => {
  const startTime = Date.now();
  const cveRegex = /CVE-\d{4}-\d{4,7}/i;
  const isCveId = cveRegex.test(input);

  try {
    // 🔁 STEP 1: Get CVE description if input is a CVE ID
    const cveId = isCveId ? input.toUpperCase() : undefined;
    const description = isCveId ? await fetchCVEDetails(cveId) : input;

    console.log("description: ", description);

    // 🔁 STEP 2: Send description to model
    const ttps = await fetchTTPs(description);

    // 🔁 STEP 3: Get detailed TTP info from OpenAI
    const ttpDetails = await fetchTTPDetailsFromOpenAI(ttps.predicted_ttps);

    const mappedTTPs = ttps.predicted_ttps.map((ttpId: string) => {
      const ttp = ttpDetails[ttpId];
      return {
        id: ttpId,
        name: ttp?.name || "Unknown TTP",
        description: ttp?.description || "No description available.",
        tactic: "Predicted Tactic",
      };
    });

    // 🔁 STEP 4: Return response
    return {
      cveId,
      description,
      ttps: mappedTTPs,
      processingTime: (Date.now() - startTime) / 1000,
    };
  } catch (error) {
    console.error("Error processing query:", error);
    throw error;
  }
};

