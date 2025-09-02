import React, { useState } from "react";
import {
  Search,
  Terminal,
  AlertTriangle,
  Copy,
  CornerRightDown,
  Check,
  FileText,
} from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import TypewriterText from "../ui/TypewriterText";
import Loading from "../ui/Loading";
import { processQuery } from "../../utils/mockApi";
import { AIResponse } from "../../types";

const SAMPLE_QUERIES = [
  "CVE-2021-44228",
  "SQL injection vulnerability in web application login form",
  "Insecure deserialization in Java application",
  "Cross-site scripting in user profile page",
];

const AIModelInterface: React.FC = () => {
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<AIResponse | null>(null);
  const [typingComplete, setTypingComplete] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    setIsProcessing(true);
    setResult(null);
    setTypingComplete(false);

    try {
      const response = await processQuery(input);
      setResult(response);
    } catch (error) {
      console.error("Error processing query:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSampleQuery = (query: string) => {
    setInput(query);
  };

  const copyToClipboard = () => {
    if (!result) return;

    // const formatTTPs = result.ttps
    //   .map(
    //     (ttp) => `${ttp.id} (${ttp.tactic}): ${ttp.name}\n${ttp.description}`
    //   )
    //   .join("\n\n");

    const textToCopy = `${
      result.cveId
        ? `CVE ID: ${result.cveId}\nDescription: ${result.description}`
        : `Description: ${result.description}`
    }\n\nMITRE ATT&CK TTPs:}`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="model" className="py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            CVE to MITRE ATT&CK Mapper
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Enter a CVE ID or vulnerability description to map it to relevant
            MITRE ATT&CK framework TTPs.
          </p>
        </div>

        <Card glowing className="mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center border border-gray-700 bg-gray-950 rounded-md p-2 focus-within:border-cyan-700 transition-colors">
              <Terminal className="h-5 w-5 text-cyan-500 mx-2" />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter CVE ID or vulnerability description..."
                className="bg-transparent border-0 flex-1 focus:ring-0 focus:outline-none text-white placeholder-gray-500 font-mono text-sm"
                disabled={isProcessing}
              />
              {input && (
                <button
                  type="button"
                  onClick={() => setInput("")}
                  className="text-gray-500 hover:text-gray-300 p-1"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex justify-between items-center">
              <Button
                type="submit"
                isLoading={isProcessing}
                disabled={!input.trim() || isProcessing}
                className="w-full md:w-auto"
              >
                <Search className="h-4 w-4 mr-2" />
                Analyze Vulnerability
              </Button>

              <span className="hidden md:inline text-xs text-gray-500">
                or try a sample query
              </span>
            </div>
          </form>

          <div className="mt-4 flex flex-wrap gap-2">
            {SAMPLE_QUERIES.map((query, index) => (
              <button
                key={index}
                onClick={() => handleSampleQuery(query)}
                className="text-xs border border-gray-700 bg-gray-800 hover:bg-gray-700 rounded-full px-3 py-1 text-gray-300 transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-700"
              >
                {query}
              </button>
            ))}
          </div>
        </Card>

        {isProcessing && (
          <Card className="text-center py-12">
            <Loading size="lg" className="mb-4" />
            <p className="text-cyan-400 font-mono">
              <TypewriterText text="Analyzing vulnerability patterns..." />
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Mapping to MITRE ATT&CK framework...
            </p>
          </Card>
        )}

        {result && (
          <>
            {result.description && (
              <Card className="mb-6">
                <div className="flex items-start">
                  <div className="bg-cyan-900/20 p-2 rounded mr-3">
                    <FileText className="h-5 w-5 text-cyan-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">
                      CVE Description
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {result.description}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            <Card className="relative overflow-hidden">
              <div className="absolute top-4 right-4 flex space-x-2">
                <button
                  onClick={copyToClipboard}
                  className="p-1.5 rounded hover:bg-gray-800 transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>

              <div className="mb-6 border-b border-gray-800 pb-4">
                <div className="flex items-start">
                  <div className="bg-cyan-900/20 p-2 rounded mr-3">
                    <AlertTriangle className="h-5 w-5 text-cyan-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">
                      Vulnerability Analysis
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {result.cveId ? (
                        <>
                          CVE ID:{" "}
                          <span className="text-cyan-400">{result.cveId}</span>
                        </>
                      ) : (
                        <>
                          Description:{" "}
                          <span className="text-cyan-400">
                            {result.description}
                          </span>
                        </>
                      )}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Analysis completed in {result.processingTime.toFixed(2)}s
                    </p>
                  </div>
                </div>
              </div>

              <h4 className="text-white font-bold mb-3 flex items-center">
                <CornerRightDown className="h-4 w-4 mr-2 text-cyan-500" />
                MITRE ATT&CK Framework TTPs
              </h4>

              <div className="space-y-4">
                {result.ttps.map((ttp, index) => (
                  <div
                    key={index}
                    className="border border-gray-800 rounded-md p-3 hover:border-gray-700 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <span className="font-mono text-cyan-400 mr-2">
                          {ttp.id}
                        </span>
                        <span className="font-bold text-white">{ttp.name}</span>
                      </div>
                      <span className="text-xs bg-gray-800 px-2 py-1 rounded-full text-gray-300">
                        {ttp.tactic}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm font-normal">
                      {typingComplete ? (
                        ttp.description
                      ) : (
                        <TypewriterText
                          text={ttp.description}
                          delay={20}
                          onComplete={() => setTypingComplete(true)}
                        />
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}
      </div>
    </section>
  );
};

export default AIModelInterface;
