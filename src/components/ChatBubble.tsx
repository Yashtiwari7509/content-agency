import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import  { useRef, useState } from "react";

const ChatMessage = () => {
  const msg1Ref = useRef(null);
  const msg2Ref = useRef(null);
  const msg3Ref = useRef(null);
  const typingRef1 = useRef(null);
  const typingRef2 = useRef(null);
  const [showTyping1, setShowTyping1] = useState(false);
  const [showTyping2, setShowTyping2] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Message 1 - slide up fade in
    tl.fromTo(
      msg1Ref.current,
      { opacity: 0, y: 15, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out" }
    ).call(() => {
      setShowTyping1(true);
    });

    // Typing indicator 1
    tl.to({}, { duration: 1.2 }).call(() => {
      setShowTyping1(false);
    });

    // Message 2 - slide up fade in
    tl.fromTo(
      msg2Ref.current,
      { opacity: 0, y: 15, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out" },
      "+=0.1"
    ).call(() => {
      setShowTyping2(true);
    });

    // Typing indicator 2
    tl.to({}, { duration: 1.2 }).call(() => {
      setShowTyping2(false);
    });

    // Message 3 - slide up with slight bounce
    tl.fromTo(
      msg3Ref.current,
      { opacity: 0, y: 15, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.2)",
      },
      "+=0.1"
    );
  });

  useGSAP(() => {
    if (showTyping1 && typingRef1.current) {
      gsap.fromTo(typingRef1.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
    }
  }, [showTyping1]);

  useGSAP(() => {
    if (showTyping2 && typingRef2.current) {
      gsap.fromTo(typingRef2.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
    }
  }, [showTyping2]);

  return (
    <div className="w-full h-full rounded-xl p-3 flex items-center justify-center">
      <div className="space-y-2 w-full ">
        {/* Client Message */}
        <div ref={msg1Ref} className="flex items-start gap-2 opacity-0 pb-3">
          <div className="w-6 h-6 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center text-white text-[10px] font-semibold">
            SJ
          </div>
          <div className="bg-slate-100 rounded-2xl rounded-tl-none px-3 py-2">
            <p className="text-xs text-black">Need help growing our YouTube</p>
          </div>
        </div>

        {/* Typing Indicator 1 */}
        {showTyping1 && (
          <div ref={typingRef1} className="flex items-start gap-2 justify-end">
            <div className="bg-black backdrop-blur rounded-lg rounded-tr-sm px-3 py-2">
              <div className="flex gap-1">
                <div
                  className="size-1 bg-slate-50 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="size-1 bg-slate-50 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="size-1 bg-slate-50 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
            <div className="w-6 h-6 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center text-white text-[10px] font-semibold">
              DW
            </div>
          </div>
        )}

        {/* Agency Response */}
        <div ref={msg2Ref} className="flex items-start gap-2 justify-end opacity-0">
          <div className="bg-background/50 rounded-2xl rounded-tr-none px-3 py-2">
            <p className="text-xs ">We'll make your channel explode!</p>
          </div>
          <div className="w-6 h-6 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center text-white text-[10px] font-semibold">
            DW
          </div>
        </div>

        {/* Typing Indicator 2 */}
        {showTyping2 && (
          <div ref={typingRef2} className="flex items-start gap-2 justify-end">
            <div className="bg-black backdrop-blur rounded-lg rounded-tr-sm px-3 py-2">
              <div className="flex gap-1">
                <div
                  className="size-1 bg-slate-50 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="size-1 bg-slate-50 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="size-1 bg-slate-50 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
            <div className="w-6 h-6 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center text-white text-[10px] font-semibold">
              DW
            </div>
          </div>
        )}

        {/* Happy News */}
        <div ref={msg3Ref} className="flex items-start gap-2 justify-end opacity-0">
          <div className="bg-background/50 rounded-2xl rounded-tr-none px-3 py-2">
            <p className="text-xs">You're trending #3 today! 🎉</p>
          </div>
          <div className="w-6 h-6 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center text-white text-[10px] font-semibold">
            DW
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
