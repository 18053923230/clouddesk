import DesktopIcon from './DesktopIcon';

const APPS = [
  'CloudBrowser',
  'FileManager',
  'Settings',
  'Calculator',
  'ImageViewer',
];

const Desktop = () => {
  return (
    <div className="w-full h-full p-4 flex flex-col flex-wrap content-start">
      {APPS.map((appName) => (
        <DesktopIcon key={appName} appName={appName} />
      ))}
    </div>
  );
};

export default Desktop;
