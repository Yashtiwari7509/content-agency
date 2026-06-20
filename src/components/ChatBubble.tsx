const ChatMessage = () => {
  return (
    <div className="w-full h-full rounded-xl p-3 flex items-center justify-center">
      <div className="space-y-2 w-full ">
        {/* Client Message */}
        <div className="flex items-start gap-2 pb-3">
          <div className="w-6 h-6 rounded-full bg-blue-500 shrink-0 flex items-center justify-center text-white text-[10px] font-semibold">
            SJ
          </div>
          <div className="bg-slate-100 rounded-2xl rounded-tl-none px-3 py-2">
            <p className="text-xs text-black">Need help growing our YouTube</p>
          </div>
        </div>

        {/* Agency Response */}
        <div className="flex items-start gap-2 justify-end">
          <div className="bg-background/50 rounded-2xl rounded-tr-none px-3 py-2">
            <p className="text-xs text-black">We'll make your channel explode!</p>
          </div>
          <div className="w-6 h-6 rounded-full bg-slate-700 shrink-0 flex items-center justify-center text-white text-[10px] font-semibold">
            DW
          </div>
        </div>

        {/* Happy News */}
        <div className="flex items-start gap-2 justify-end">
          <div className="bg-background/50 rounded-2xl rounded-tr-none px-3 py-2">
            <p className="text-xs">You're trending #3 today! 🎉</p>
          </div>
          <div className="w-6 h-6 rounded-full bg-slate-700 shrink-0 flex items-center justify-center text-white text-[10px] font-semibold">
            DW
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
