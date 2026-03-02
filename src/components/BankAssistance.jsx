import { useState, useRef, useEffect } from "react";
import { Send, ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function BankAssistance() {
  const navigate = useNavigate();
  const location = useLocation();

// ✅ read from sessionStorage instead of location.state
const bankData = JSON.parse(sessionStorage.getItem("selectedBank"))
console.log("bankData:", bankData)
  

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedQueries = bankData
    ? [
        "Contact details",
        "How to donate blood?",
        "Emergency blood request",
        "Operating hours",
        "Blood testing info",
      ]
    : [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBankSpecificResponse = (query, bank) => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("contact")) {
      return `Contact ${bank[" Blood Bank Name"]}:\n\n📞 ${bank[" Mobile"] || "N/A"}\n📧 ${bank[" Email"] || "N/A"}\n🌐 ${bank[" Website"] || "N/A"}`;
    }

    if (lowerQuery.includes("donate")) {
      return `Blood donation at ${bank[" Blood Bank Name"]}:\n
1. Register at the bank
2. Health screening
3. Blood collection
4. Rest & refreshments

📞 Call ${bank[" Mobile"] || "N/A"} to schedule.`;
    }

    if (lowerQuery.includes("emergency")) {
      return `Emergency at ${bank[" Blood Bank Name"]}:
📞 Call: ${bank[" Mobile"] || "N/A"}
🆘 Helpline: ${bank[" Helpline"] || "N/A"}`;
    }

    if (lowerQuery.includes("hours")) {
      return `${bank[" Blood Bank Name"]} Operating Hours:
⏰ Service Time: ${bank[" Service Time"] || "Contact bank for hours"}`;
    }

    if (lowerQuery.includes("test")) {
      return `Blood testing at ${bank[" Blood Bank Name"]}:
🩸 Components Available: ${bank[" Blood Component Available"] || "N/A"}
🔬 Apheresis: ${bank[" Apheresis"] || "N/A"}`;
    }

    return `Hello! Ask me anything about ${bank[" Blood Bank Name"]}`;
  };

  const handleSendMessage = (messageText) => {
    const text = messageText || input.trim();
    if (!text || !bankData) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const assistantMessage = {
        id: Date.now() + 1,
        type: "assistant",
        content: generateBankSpecificResponse(text, bankData),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 800);
  };

  if (!bankData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Blood bank not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 p-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 mb-3 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <h1 className="text-2xl font-bold">{bankData[" Blood Bank Name"]}</h1> {/* ✅ fixed */}
        <p className="text-gray-400 text-sm">{bankData[" Address"]}</p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 && (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center">
                <Sparkles />
              </div>
            </div>
            <h2 className="text-2xl font-bold">How can we help?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
              {suggestedQueries.map((query) => (
                <button
                  key={query}
                  onClick={() => handleSendMessage(query)}
                  className="p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-left hover:bg-red-600/20"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4 mt-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-3 rounded-lg max-w-xl ${
                  msg.type === "user"
                    ? "bg-red-600"
                    : "bg-zinc-900 border border-zinc-800"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
                <p className="text-xs mt-2 opacity-60">
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-zinc-900 border border-zinc-800 px-4 py-3 rounded-lg flex gap-2 items-center">
                <Loader2 className="animate-spin text-red-600" size={16} />
                AI is thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-zinc-800 p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            placeholder="Ask a question..."
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!input.trim() || isLoading}
            className="bg-red-600 px-4 py-2 rounded-lg disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}