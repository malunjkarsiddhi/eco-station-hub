
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import StationList from './components/StationList';
import JavaCodeViewer from './components/JavaCodeViewer';
import Analytics from './components/Analytics';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'stations':
        return <StationList />;
      case 'analytics':
        return <Analytics />;
      case 'backend':
        return <JavaCodeViewer />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;
