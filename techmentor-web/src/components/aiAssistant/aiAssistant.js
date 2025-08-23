import { useState } from "react";
import "./aiAssistant.css";
import { useAiSuggestions } from "../../hooks/useAiApi";

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! Tell me what you need to learn.",
    },
  ]);

  const { mutate, isLoading } = useAiSuggestions(
    (data) => {
      setMessages((prev) => [...prev, { sender: "ai", text: data.aiRecommendations }]);
    },
    (error) => {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Sorry, I couldn't get a response." },
      ]);
    }
  );

  const handleSend = () => {
    if (!prompt.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: prompt }]);
    mutate(prompt);
    setPrompt("");
  };

  return (
    <div className="ai-assistant-container">
      {isOpen && (
        <div className="ai-chat-box">
          <div className="ai-chat-header">
            <span>AI Assistant</span>
            <button className="close-button" onClick={() => setIsOpen(false)}>✕</button>
          </div>
          <div className="ai-chat-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`ai-message ${
                  msg.sender === "user" ? "user" : "ai"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="ai-chat-input">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask me anything..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend} disabled={isLoading}>
              {isLoading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
      {!isOpen && (
        <button className="ai-floating-button" onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}
    </div>
  );
}
