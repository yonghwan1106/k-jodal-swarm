"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Mic,
  Phone,
  PhoneOff,
  Volume2,
  Send,
  User,
  Bot,
  Sparkles,
  Clock,
  Globe,
  Loader2,
  RefreshCw,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isError?: boolean;
}

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Helper to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to strip markdown formatting
const stripMarkdown = (text: string): string => {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')  // **bold** -> bold
    .replace(/\*([^*]+)\*/g, '$1')       // *italic* -> italic
    .replace(/__([^_]+)__/g, '$1')       // __bold__ -> bold
    .replace(/_([^_]+)_/g, '$1')         // _italic_ -> italic
    .replace(/~~([^~]+)~~/g, '$1')       // ~~strikethrough~~ -> strikethrough
    .replace(/`([^`]+)`/g, '$1')         // `code` -> code
    .replace(/^#{1,6}\s+/gm, '')         // # Header -> Header
    .replace(/^\s*[-*+]\s+/gm, '• ')     // - list -> • list
    .replace(/^\s*\d+\.\s+/gm, '')       // 1. list -> list
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // [link](url) -> link
};

const scenarioPrompts = [
  {
    id: 'search',
    label: '입찰 검색',
    userMessage: '이번 주 나온 소프트웨어 입찰 뭐 있어요?'
  },
  {
    id: 'analyze',
    label: '상세 분석',
    userMessage: '첫 번째 공고 자세히 분석해줘'
  },
  {
    id: 'proposal',
    label: '제안서 작성',
    userMessage: '제안서 작성해줘'
  },
  {
    id: 'probability',
    label: '낙찰 확률',
    userMessage: '낙찰 확률 더 올릴 수 있어?'
  }
];

export default function VoicePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'ai',
      content: '안녕하세요, K-조달 AI 음성 상담 서비스입니다. 무엇을 도와드릴까요?\n\n아래 버튼을 눌러 시나리오를 체험하거나, 직접 질문을 입력해보세요.',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isCallActive, setIsCallActive] = useState(true);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [conversationHistory, setConversationHistory] = useState<{role: string; content: string}[]>([]);

  const addMessage = useCallback((role: 'user' | 'ai', content: string, isError = false) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
      isError
    }]);
  }, []);

  const sendToClaudeAPI = useCallback(async (userMessage: string, retryCount = 0): Promise<{ message: string; isError: boolean }> => {
    // Build message history for context
    const newHistory = [
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ];

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newHistory
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Check if we should retry (for server errors, not client errors)
        if (response.status >= 500 && retryCount < MAX_RETRIES) {
          console.log(`API request failed, retrying... (${retryCount + 1}/${MAX_RETRIES})`);
          await delay(RETRY_DELAY * (retryCount + 1)); // Exponential backoff
          return sendToClaudeAPI(userMessage, retryCount + 1);
        }

        // Use user-friendly error message from API
        const errorMessage = data.error || '알 수 없는 오류가 발생했습니다.';
        return { message: errorMessage, isError: true };
      }

      // Update conversation history with both user and AI messages
      setConversationHistory([
        ...newHistory,
        { role: 'assistant', content: data.message }
      ]);

      return { message: data.message, isError: false };
    } catch (error) {
      console.error('Error calling Claude API:', error);

      // Retry on network errors
      if (retryCount < MAX_RETRIES) {
        console.log(`Network error, retrying... (${retryCount + 1}/${MAX_RETRIES})`);
        await delay(RETRY_DELAY * (retryCount + 1));
        return sendToClaudeAPI(userMessage, retryCount + 1);
      }

      return {
        message: '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.',
        isError: true
      };
    }
  }, [conversationHistory]);

  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);

  const handleScenario = async (scenario: typeof scenarioPrompts[0]) => {
    // Add user message
    addMessage('user', scenario.userMessage);
    setIsTyping(true);
    setLastFailedMessage(null);

    // Get AI response from Claude API
    const { message, isError } = await sendToClaudeAPI(scenario.userMessage);

    setIsTyping(false);
    addMessage('ai', message, isError);

    if (isError) {
      setLastFailedMessage(scenario.userMessage);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim() || isTyping) return;

    const userMessage = inputText.trim();
    addMessage('user', userMessage);
    setInputText('');
    setIsTyping(true);
    setLastFailedMessage(null);

    // Get AI response from Claude API
    const { message, isError } = await sendToClaudeAPI(userMessage);

    setIsTyping(false);
    addMessage('ai', message, isError);

    if (isError) {
      setLastFailedMessage(userMessage);
    }
  };

  const handleRetry = async () => {
    if (!lastFailedMessage || isTyping) return;

    setIsTyping(true);
    // Remove last error message
    setMessages(prev => prev.slice(0, -1));

    const { message, isError } = await sendToClaudeAPI(lastFailedMessage);

    setIsTyping(false);
    addMessage('ai', message, isError);

    if (!isError) {
      setLastFailedMessage(null);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Mic className="w-7 h-7 text-[#F59E0B]" />
            AI 음성 상담
          </h1>
          <p className="text-[#94A3B8]">전화 한 통으로 모든 조달 업무를 처리합니다</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-[#A855F7]/20 text-[#A855F7]">
            <Sparkles className="w-3 h-3 mr-1" />
            Claude 4.0 연결됨
          </Badge>
          <Badge className="bg-[#22C55E]/20 text-[#22C55E]">
            <Clock className="w-3 h-3 mr-1" />
            실시간 응답
          </Badge>
          <Badge className="bg-[#3B82F6]/20 text-[#3B82F6]">
            <Globe className="w-3 h-3 mr-1" />
            30개국 다국어 지원
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left - Phone UI */}
        <div className="col-span-5">
          <Card className="bg-[#1E293B]/60 border-[#334155] overflow-hidden">
            {/* Phone header */}
            <div className="p-4 bg-gradient-to-r from-[#F59E0B] to-[#EA580C] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">K-조달 AI</p>
                  <p className="text-white/70 text-sm">
                    {isCallActive ? '통화 중...' : '통화 종료'}
                  </p>
                </div>
              </div>
              {isCallActive && (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-white/70 text-sm font-mono">03:24</span>
                </div>
              )}
            </div>

            {/* Messages */}
            <ScrollArea className="h-[500px] p-4" ref={scrollRef}>
              <div className="space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start gap-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === 'user' ? 'bg-[#3B82F6]/20' : 'bg-[#F59E0B]/20'
                        }`}>
                          {message.role === 'user' ? (
                            <User className="w-4 h-4 text-[#3B82F6]" />
                          ) : (
                            <Bot className="w-4 h-4 text-[#F59E0B]" />
                          )}
                        </div>
                        <div className={`p-3 rounded-2xl ${
                          message.role === 'user'
                            ? 'bg-[#3B82F6] text-white rounded-tr-sm'
                            : message.isError
                              ? 'bg-[#EF4444]/20 text-[#F8FAFC] rounded-tl-sm border border-[#EF4444]/30'
                              : 'bg-[#334155] text-[#F8FAFC] rounded-tl-sm'
                        }`}>
                          {message.isError && (
                            <div className="flex items-center gap-2 mb-2 text-[#EF4444]">
                              <AlertCircle className="w-4 h-4" />
                              <span className="text-xs font-medium">오류 발생</span>
                            </div>
                          )}
                          <p className="text-sm whitespace-pre-line">
                            {message.role === 'ai' ? stripMarkdown(message.content) : message.content}
                          </p>
                          <div className={`flex items-center justify-between mt-1 ${
                            message.role === 'user' ? 'text-white/50' : 'text-[#64748B]'
                          }`}>
                            <p className="text-xs">
                              {message.timestamp.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            {message.isError && lastFailedMessage && (
                              <button
                                onClick={handleRetry}
                                disabled={isTyping}
                                className="flex items-center gap-1 text-xs text-[#F59E0B] hover:text-[#D97706] disabled:opacity-50"
                              >
                                <RefreshCw className="w-3 h-3" />
                                다시 시도
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-[#F59E0B]" />
                    </div>
                    <div className="p-3 rounded-2xl bg-[#334155] rounded-tl-sm">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 text-[#F59E0B] animate-spin" />
                        <span className="text-sm text-[#64748B]">AI가 응답 중...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            {/* Input area */}
            <div className="p-4 border-t border-[#334155]">
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="메시지를 입력하세요..."
                  disabled={isTyping}
                  className="flex-1 p-3 rounded-lg bg-[#334155] border border-[#475569] text-white placeholder-[#64748B] text-sm focus:outline-none focus:border-[#F59E0B] disabled:opacity-50"
                />
                <Button
                  onClick={handleSend}
                  className="bg-[#F59E0B] hover:bg-[#D97706]"
                  disabled={isTyping || !inputText.trim()}
                >
                  {isTyping ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {/* Call controls */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-12 h-12 rounded-full border-[#334155] text-white hover:bg-[#1E293B]"
                >
                  <Volume2 className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  className={`w-14 h-14 rounded-full ${
                    isCallActive ? 'bg-[#EF4444] hover:bg-[#DC2626]' : 'bg-[#22C55E] hover:bg-[#16A34A]'
                  }`}
                  onClick={() => setIsCallActive(!isCallActive)}
                >
                  {isCallActive ? (
                    <PhoneOff className="w-6 h-6" />
                  ) : (
                    <Phone className="w-6 h-6" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-12 h-12 rounded-full border-[#334155] text-white hover:bg-[#1E293B]"
                >
                  <Mic className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right - Scenarios & Info */}
        <div className="col-span-7 space-y-6">
          {/* Scenarios */}
          <Card className="p-6 bg-[#1E293B]/60 border-[#334155]">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#F59E0B]" />
              시나리오 체험
            </h3>
            <p className="text-sm text-[#64748B] mb-4">
              아래 버튼을 클릭하거나 직접 질문을 입력해보세요. Claude 4.0이 실시간으로 응답합니다.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {scenarioPrompts.map((scenario) => (
                <Button
                  key={scenario.id}
                  variant="outline"
                  className="h-auto py-4 border-[#334155] text-white hover:bg-[#1E293B] hover:border-[#F59E0B]/50 justify-start"
                  onClick={() => handleScenario(scenario)}
                  disabled={isTyping}
                >
                  <div className="text-left">
                    <p className="font-medium">{scenario.label}</p>
                    <p className="text-xs text-[#64748B] mt-1">&quot;{scenario.userMessage}&quot;</p>
                  </div>
                </Button>
              ))}
            </div>
          </Card>

          {/* Features */}
          <Card className="p-6 bg-[#1E293B]/60 border-[#334155]">
            <h3 className="font-semibold text-white mb-4">AI 음성 에이전트 특징</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[#334155]/50">
                <Clock className="w-6 h-6 text-[#F59E0B] mb-2" />
                <p className="font-medium text-white">초고속 응답</p>
                <p className="text-sm text-[#64748B]">500ms 이하 응답 지연</p>
              </div>
              <div className="p-4 rounded-lg bg-[#334155]/50">
                <Globe className="w-6 h-6 text-[#3B82F6] mb-2" />
                <p className="font-medium text-white">다국어 지원</p>
                <p className="text-sm text-[#64748B]">30개국 언어 지원</p>
              </div>
              <div className="p-4 rounded-lg bg-[#334155]/50">
                <Mic className="w-6 h-6 text-[#22C55E] mb-2" />
                <p className="font-medium text-white">자연스러운 대화</p>
                <p className="text-sm text-[#64748B]">컨텍스트 유지 대화</p>
              </div>
              <div className="p-4 rounded-lg bg-[#334155]/50">
                <Phone className="w-6 h-6 text-[#A855F7] mb-2" />
                <p className="font-medium text-white">24시간 운영</p>
                <p className="text-sm text-[#64748B]">연중무휴 상담 가능</p>
              </div>
            </div>
          </Card>

          {/* Voice wave visualization */}
          <Card className="p-6 bg-[#1E293B]/60 border-[#334155]">
            <h3 className="font-semibold text-white mb-4">음성 파형</h3>
            <div className="h-20 flex items-center justify-center gap-1">
              {Array.from({ length: 40 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 rounded-full bg-[#F59E0B]"
                  animate={{
                    height: isCallActive ? [8, Math.random() * 60 + 10, 8] : 8
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.05
                  }}
                />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
