import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

export interface MusicPlayerHandle {
  play: () => void;
  pause: () => void;
  toggle: () => void;
  isPlaying: boolean;
}

export const MusicPlayer = forwardRef<MusicPlayerHandle, {}>((_, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audioSource =
    "/audio/YTDown.com_YouTube_Media_5Q6HBKtxn2Y_My-Love-My-Life_009_128k.mp3";

  useEffect(() => {
    const audio = new Audio(audioSource);
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handlePause);
      audio.pause();
    };
  }, []);

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay policy prevented playback until user gesture
        });
    }
  };

  const pauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  useImperativeHandle(ref, () => ({
    play: playMusic,
    pause: pauseMusic,
    toggle: toggleMusic,
    isPlaying,
  }));

  return (
    <div className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] right-3 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2">
      <button
        onClick={toggleMusic}
        className={`group relative flex min-h-11 items-center gap-2.5 px-3.5 py-2 rounded-full border shadow-md transition-all duration-300 cursor-pointer ${
          isPlaying
            ? "bg-[#8B6F5D] text-white border-[#8B6F5D] shadow-[#8B6F5D]/25"
            : "bg-[#FAF7F2]/95 text-[#6E5343] border-[#BCA89F]/50 hover:border-[#8B6F5D] hover:bg-white backdrop-blur-md"
        }`}
        title={isPlaying ? "Tắt nhạc nền" : "Bật nhạc cưới"}
        aria-label="Điều khiển nhạc nền thiệp cưới"
      >
        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <Volume2 className="w-4 h-4 animate-pulse" />
          ) : (
            <VolumeX className="w-4 h-4 opacity-75" />
          )}
        </div>

        {/* Visualizer bars when playing */}
        {isPlaying ? (
          <div className="flex items-end gap-0.5 h-3.5 w-4">
            <span
              className="w-0.5 bg-white rounded-full animate-bounce h-2"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="w-0.5 bg-white rounded-full animate-bounce h-3.5"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="w-0.5 bg-white rounded-full animate-bounce h-2.5"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        ) : null}
      </button>
    </div>
  );
});

MusicPlayer.displayName = "MusicPlayer";
