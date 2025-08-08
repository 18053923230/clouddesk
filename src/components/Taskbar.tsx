import Clock from './Clock';

const Taskbar = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full h-10 bg-black/30 backdrop-blur-lg flex items-center justify-between px-4">
      <div>
        {/* Placeholder for app icons */}
      </div>
      <Clock />
    </div>
  );
};

export default Taskbar;
