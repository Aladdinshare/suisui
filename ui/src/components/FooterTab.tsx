import { useState } from 'react';

const FooterTab = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('Account');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 p-4 flex justify-between">
      <button
        className={`text-white font-bold ${activeTab === 'Account' ? 'underline' : ''}`}
        onClick={() => handleTabChange('Account')}
      >
        Account
      </button>
      <button
        className={`text-white font-bold ${activeTab === 'Tinder' ? 'underline' : ''}`}
        onClick={() => handleTabChange('Tinder')}
      >
        Tinder
      </button>
      <button
        className={`text-white font-bold ${activeTab === 'Timeline' ? 'underline' : ''}`}
        onClick={() => handleTabChange('Timeline')}
      >
        Timeline
      </button>
    </div>
  );
};

export default FooterTab;
