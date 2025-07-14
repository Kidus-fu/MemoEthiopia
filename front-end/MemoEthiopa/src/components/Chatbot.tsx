import React, { useEffect, useRef, useState } from "react";
import { InfoCircleOutlined, CheckOutlined, PlayCircleOutlined, StopOutlined, CopyOutlined, LikeOutlined, DislikeOutlined, CloseOutlined, LikeFilled } from "@ant-design/icons";
import { useSelector } from 'react-redux';
import { RootState } from '../../src/store/store';
import BotLogo from "../../public/Bot.png"
import api from "../api";
import { motion } from "framer-motion";
import { Button, ConfigProvider,  Modal, theme as antdTheme } from "antd";




interface ChatBotProps {
  name: string;
  uuid: string;
  plan: string;
  bio: string;
  location: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ name, uuid, plan, bio, location }) => {
  const [message, setMessage] = useState("");
  const theme = useSelector((state: RootState) => state.theam.theme);
  const DeveloperTest = useSelector((state: RootState) => state.developertest.border_test);
  const [chatOpen, setChatOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [botTyping, setBotTyping] = useState(false);
  const [copiedIndexai, setCopiedIndexai] = useState<number | null>(null);
  const [copiedIndexuser, setCopiedIndexuser] = useState<number | null>(null);
  const mobilechatdivRef = useRef<HTMLDivElement>(null);
  type ChatMessage = { type: "user" | "bot"; text: string; time: string };
  const [chat, setChat] = useState<ChatMessage[]>([
    { type: 'bot', text: 'Ready when you are.', time: '' }
  ]);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getClassNames = (base: string) => {
    const border = DeveloperTest ? 'border border-red-700' : '';
    const themeStyle =
      theme === 'dark' ? 'bg-[#1e1e1e] text-white' : 'bg-white text-black';
    return `${base} ${border} ${themeStyle}`;
  };
  const speak = (text: string) => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices(); // List of all available voices

    const utter = new SpeechSynthesisUtterance(text);

    // Example: Pick a female US English voice (you can change this)
    const selectedVoice = voices.find(voice =>
      voice.lang === "en-US" && voice.name.includes("Female")
    );

    if (selectedVoice) {
      utter.voice = selectedVoice;
    }

    utter.lang = "en-US";
    utter.rate = 1;
    synth.speak(utter);
  };
  const handlespeak = (text: string) => {
    setVoiceEnabled(true)
    speak(text)
  }
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setVoiceEnabled(false)
        stopSpeaking()
      }
    };
    const data = {
      message: 'Hi',
      user_info: {
        name: name,
        bio: bio,
        joined_at: null,
        plan: plan,
        location: location,
        uuid: uuid,
        is_verified: false,
      },
    };

    api.post("memoai/otcb/", data)
      .then(() => {
        null
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setBotTyping(false); // Hide typing
      });

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const stopSpeaking = () => {
    setVoiceEnabled(false)
    window.speechSynthesis.cancel();
  };
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setChatOpen(false);
        setVoiceEnabled(false)
        stopSpeaking()
      }

      if (chatOpen && inputRef.current) {
        inputRef.current.focus();
      }
    };
    document.addEventListener("keydown", handleKeyPress);

    // Cleanup to prevent multiple listeners
    // mode -> llama3-8b-8192
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [chatOpen]);


  const handleSend = () => {
    if (!message.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString();

    const userMessage: ChatMessage = { type: "user", text: message, time: time };
    setChat(prev => [...prev, userMessage]);
    setMessage("");
    setBotTyping(true);

    const date = now.toLocaleDateString();
    const data = {
      message: message,
      user_info: {
        name: name,
        bio: bio,
        joined_at: date,
        plan: plan,
        location: location,
        uuid: uuid,
        is_verified: false,
      },
    };

    api.post("memoai/otcb/", data)
      .then((res) => {
        const response = res.data.response;
        const aiMessage = response[0][1];

        const now = new Date();

        setChat(prev => [...prev, { type: "bot", text: aiMessage, time: now.toLocaleTimeString() }]);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setBotTyping(false); // Hide typing
      });
  };
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, botTyping]);

  useEffect(() => {
    let startY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;


      if (!mobilechatdivRef.current) return;


      // Close threshold
      if (deltaY > 300) {
        setChatOpen(false);
      }
    };
    const chatDiv = mobilechatdivRef.current;

    if (chatDiv) {
      chatDiv.addEventListener("touchstart", handleTouchStart, { passive: true });
      chatDiv.addEventListener("touchmove", handleTouchMove, { passive: true });
    }

    return () => {
      if (chatDiv) {
        chatDiv.removeEventListener("touchstart", handleTouchStart);
        chatDiv.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, [chatOpen]);
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCopy = (text: string, index: number, type: string) => {
    copyToClipboard(text);
    if (type === "ai") {
      setCopiedIndexai(index);
      setTimeout(() => setCopiedIndexai(null), 1000);
    } else {
      setCopiedIndexuser(index);
      setTimeout(() => setCopiedIndexuser(null), 1000);
    }
  };
  const infoList = [
    { label: "OTCB", value: "One Time Chat Bot" },
    { label: "Saving", value: "No memory or history" },
    { label: "Model", value: "llama3-8b-8192" },
    { label: "Voice", value: "Speech synthesis supported" },
    { label: "Location", value: "Access on permission" },
    { label: "Today", value: new Date().toLocaleDateString() },
  ];

  return (
    <>
      <ConfigProvider theme={{
        algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        components: {
          Modal: {
          }
        },
        token: {
          colorBgMask: "rgb(1, 1, 1,0.9)"
        }
      }}>
        <Modal
          title="OTCB Information"
          closable={{ 'aria-label': 'Custom Close Button' }}
          open={isModalOpen}
          footer={
            <Button
              onClick={() => setIsModalOpen(false)}
            >Ok</Button>
          }
          onCancel={() => setIsModalOpen(false)}
        >
          <div className={`m-2   p-2  ${theme === "dark" ? "border-gray-800" : "border-gray-300"}`}>
            <div className={`m-2 p-2`}>
              {infoList.map((item, index) => (
                <div key={index} className={`flex justify-between m-2 p-2 border-b ${theme === "dark" ? "border-gray-800" : "border-gray-300"}`}>
                  <div>{item.label}</div>
                  <div>{item.value}</div>
                </div>
              ))}
            </div>
          </div>

        </Modal>
      </ConfigProvider>
      <div className={`fixed z-50 bg-black/35  h-full w-full transition-all delay-500 ${chatOpen ? "block" : "hidden"}`} ></div>
      {chatOpen && (
        <>

          {/* Aude r8 v10 rwd 5.2l 540hp */}
          <div className={getClassNames(`fixed  w-full h-2/3 mb-7 md:right-2.5 z-50 select-none  lg:w-[490px] lg:h-[720px] bottom-0  rounded-xl shadow-lg flex transition-all delay-500 ease flex-col overflow-hidden font-sans `)} ref={mobilechatdivRef}>
            <p className="text-center" id="closeChat">________</p>
            {/* Header */}
            <div className={`flex items-center justify-between p-4 border-b ${theme === "dark" ? "border-gray-800" : "border-gray-300"}`}>
              <div className="flex items-center gap-2">
                <div className="bg-white p-1 rounded-full">
                  <img
                    src={BotLogo}
                    alt="Bot"
                    className="w-6 h-6 rounded-full"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-bold">OTCB</h2>
                  <p className="text-green-500 text-xs">● Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                

                <button className=" p-1 rounded-sm transition-all delay-300">
                  <CloseOutlined className="text-xl cursor-pointer  " onClick={() => {
                    setChatOpen(false);

                    setVoiceEnabled(false)
                    stopSpeaking()
                  }} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 select-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {chat.map((msg, index) => (
                <>
                  <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] p-3 select-auto rounded-xl text-sm whitespace-pre-line
        ${msg.type === "user" ? "bg-violet-600 text-white rounded-br-none rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl" : "bg-gray-100 text-black rounded-tl-2xl rounded-br-2xl rounded-tr-2xl rounded-bl-none w-auto"}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        key={index}
                      ><div className="select-auto">{msg.type === "user" ? msg.text : msg.text}</div>
                        <div className="text-[10px] text-right mt-1 flex justify-end items-center gap-1 ">
                          {msg.type === "user" && <CheckOutlined />}
                          {msg.time}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                  <div className="flex gap-1 justify-end">
                    {copiedIndexuser === index && (
                      <span className="text-xs  text-green-500"><CheckOutlined /> Copied!</span>
                    )}
                    {msg.type === "user" && <CopyOutlined className="text-lg" onClick={() => handleCopy(msg.text, index, "user")} />}
                  </div>
                  <div className={`flex gap-1.5 ml-2`}>
                    {msg.type === "bot" && (
                      <>
                        {voiceEnabled ? (
                          <StopOutlined className="text-lg" onClick={() => stopSpeaking()} />
                        ) : (
                          <PlayCircleOutlined className="text-lg" onClick={() => handlespeak(msg.text)} />
                        )}

                        <CopyOutlined
                          className="text-lg"
                          onClick={() => handleCopy(msg.text, index, "ai")}
                        />

                        {/* Like / Dislike */}
                        {liked ? (
                          <LikeFilled className="text-lg text-blue-500" />
                        ) : (
                          <>
                            <LikeOutlined
                              className="text-lg"
                              onClick={() => {
                                setLiked(true);
                                setDisliked(false);
                              }}
                            />
                            <DislikeOutlined
                              className={`text-lg ${disliked ? "text-red-500" : ""}`}
                              onClick={() => {
                                setDisliked(!disliked);
                                if (liked) setLiked(false);
                              }}
                            />
                          </>
                        )}


                      </>
                    )}
                    {copiedIndexai === index && (
                      <span className="text-xs  text-green-500"><CheckOutlined /> Copied!</span>
                    )}
                  </div>
                </>
              ))}

              {botTyping && (
                <div className="flex justify-start">
                  <motion.div
                    className="bg-gray-200 text-black px-3 py-2 rounded-tl-2xl rounded-br-2xl rounded-tr-2xl rounded-bl-none text-sm"
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                  >
                    <motion.div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-gray-700 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-700 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-700 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </motion.div>
                  </motion.div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>


            {/* Quick buttons */}
            <div className={"flex flex-wrap gap-2 p-3 select-none"}>
              <button className={getClassNames(`${theme === "dark" ? "border-gray-800" : "border-gray-300"} border px-3 py-1 rounded-full text-xs`)} onClick={() => setMessage("What is MemoEthiopia?")}>What is MemoEthiopia?</button>
              <button className={getClassNames(`${theme === "dark" ? "border-gray-800" : "border-gray-300"} border px-3 py-1 rounded-full text-xs`)} onClick={() => setMessage("How can i start it?")}>How can i start it?</button>
              <button className={getClassNames(`${theme === "dark" ? "border-gray-800" : "border-gray-300"} border px-3 py-1 rounded-full text-xs`)} onClick={() => setMessage("FAQs")}>FAQs</button>


            </div>


            {/* Footer */}
            <div className={`p-3 border-t border ${theme === "dark" ? "border-gray-800" : "border-gray-300"} flex items-center gap-2`}>
              <InfoCircleOutlined className="text-xl " onClick={() => setIsModalOpen(true)} />
              <input
                type="text"
                placeholder="Type your message here..."
                className={getClassNames(`flex-1 p-3 text-sm rounded-xl outline-none border ${theme === "dark" ? "border-gray-800" : "border-gray-300"}`)}
                value={message}
                ref={inputRef}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
              />
              <button
                onClick={handleSend}
                className="text-white bg-violet-600 px-4 py-3 rounded-full text-sm hover:bg-violet-700"
              >
                ➤
              </button>
            </div>
          </div>
        </>
      )}
      <button
        onClick={() => setChatOpen(true)}
        className={`fixed bottom-1 right-1 md:hidden border block z-50 ${theme === "drak" ? "bg-violet-300 border-gray-800" : "bg-violet-200 border-gray-300"} m-4 p-5 rounded-full shadow-lg  transition-all ${chatOpen ? 'hidden' : 'block'
          }`}
      >
        <img
          src={BotLogo}
          alt="Bot"
          className="w-6 h-6 rounded-full"
        />
      </button>
      {/* Chat Toggle Button */}
      <div className="fixed z-50 bottom-0 right-2 hidden md:block">
        <button
          onClick={() => setChatOpen(true)}
          className={`bg-violet-200 m-4 p-5 rounded-full shadow-lg  transition-all ${chatOpen ? 'hidden' : 'block'
            }`}
        >
          <img
            src={BotLogo}
            alt="Bot"
            className="w-6 h-6 rounded-full"
          />
        </button>

      </div>
    </>
  );
};

export default ChatBot;
