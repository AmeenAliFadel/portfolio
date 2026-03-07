const CanvasLoader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-violet-500/30"></div>

        <div className="absolute inset-0 rounded-full border-4 border-t-violet-500 border-r-violet-400 border-b-transparent border-l-transparent animate-spin"></div>

        <div className="absolute inset-4 rounded-full bg-violet-500/20 animate-pulse"></div>
      </div>
    </div>
  );
};

export default CanvasLoader;