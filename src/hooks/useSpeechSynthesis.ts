"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface UseSpeechSynthesisOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  voiceName?: string;
  onEnd?: () => void;
  onError?: (error: string) => void;
}

interface UseSpeechSynthesisReturn {
  isSupported: boolean;
  isSpeaking: boolean;
  isPaused: boolean;
  voices: SpeechSynthesisVoice[];
  speak: (text: string) => void;
  pause: () => void;
  resume: () => void;
  cancel: () => void;
  setVoice: (voice: SpeechSynthesisVoice) => void;
}

export function useSpeechSynthesis({
  lang = "ko-KR",
  rate = 1,
  pitch = 1,
  volume = 1,
  voiceName,
  onEnd,
  onError,
}: UseSpeechSynthesisOptions = {}): UseSpeechSynthesisReturn {
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setIsSupported(true);

      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);

        // Try to find a Korean voice
        const koreanVoice = availableVoices.find(
          (voice) =>
            voice.lang.startsWith("ko") ||
            (voiceName && voice.name.includes(voiceName))
        );

        if (koreanVoice) {
          setSelectedVoice(koreanVoice);
        } else if (availableVoices.length > 0) {
          // Fallback to first available voice
          setSelectedVoice(availableVoices[0]);
        }
      };

      loadVoices();

      // Chrome loads voices asynchronously
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }

    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [voiceName]);

  const speak = useCallback(
    (text: string) => {
      if (!isSupported || !text.trim()) return;

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = volume;

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        onEnd?.();
      };

      utterance.onerror = (event) => {
        setIsSpeaking(false);
        setIsPaused(false);

        const errorMessages: Record<string, string> = {
          canceled: "음성 합성이 취소되었습니다.",
          interrupted: "음성 합성이 중단되었습니다.",
          "audio-busy": "오디오 장치가 사용 중입니다.",
          "audio-hardware": "오디오 하드웨어 오류가 발생했습니다.",
          network: "네트워크 오류가 발생했습니다.",
          "synthesis-unavailable": "음성 합성을 사용할 수 없습니다.",
          "synthesis-failed": "음성 합성에 실패했습니다.",
          "language-unavailable": "요청한 언어를 사용할 수 없습니다.",
          "voice-unavailable": "요청한 음성을 사용할 수 없습니다.",
          "text-too-long": "텍스트가 너무 깁니다.",
          "invalid-argument": "잘못된 인수입니다.",
        };

        const errorMessage =
          errorMessages[event.error] || `음성 합성 오류: ${event.error}`;

        // Don't report canceled as an error (it's intentional)
        if (event.error !== "canceled" && event.error !== "interrupted") {
          onError?.(errorMessage);
        }
      };

      utterance.onpause = () => {
        setIsPaused(true);
      };

      utterance.onresume = () => {
        setIsPaused(false);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [isSupported, lang, rate, pitch, volume, selectedVoice, onEnd, onError]
  );

  const pause = useCallback(() => {
    if (isSupported && isSpeaking) {
      window.speechSynthesis.pause();
    }
  }, [isSupported, isSpeaking]);

  const resume = useCallback(() => {
    if (isSupported && isPaused) {
      window.speechSynthesis.resume();
    }
  }, [isSupported, isPaused]);

  const cancel = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  }, [isSupported]);

  const setVoice = useCallback((voice: SpeechSynthesisVoice) => {
    setSelectedVoice(voice);
  }, []);

  return {
    isSupported,
    isSpeaking,
    isPaused,
    voices,
    speak,
    pause,
    resume,
    cancel,
    setVoice,
  };
}
