import React, { createContext, useState, useContext, ReactNode } from 'react';

type Mission = {
  id: string;
  text: string;
  imageUri: string | null;
};
// CompletedMission 타입 추가
type CompletedMission = Mission & {
  title: string;
};

type MissionContextType = {
  missions: Mission[];
  addMission: (mission: Omit<Mission, 'id'>) => void;
  // CompletedMission 관련 타입 추가
  completedMissions: CompletedMission[];
  addCompletedMission: (mission: Omit<CompletedMission, 'id'>) => void;
};

const MissionContext = createContext<MissionContextType | undefined>(undefined);

export const MissionProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [missions, setMissions] = useState<Mission[]>([]);
  // CompletedMission 상태 추가
  const [completedMissions, setCompletedMissions] = useState<CompletedMission[]>([]);

  const addMission = (mission: Omit<Mission, 'id'>) => {
    const newMission = {
      ...mission,
      id: Date.now().toString(), // 간단한 유니크 ID 생성
    };
    setMissions(prevMissions => [...prevMissions, newMission]);
  };

  // addCompletedMission 함수 추가
  const addCompletedMission = (mission: Omit<CompletedMission, 'id'>) => {
    const newCompletedMission = {
      ...mission,
      id: Date.now().toString(), // 간단한 유니크 ID 생성
    };
    setCompletedMissions(prevMissions => [...prevMissions, newCompletedMission]);
  };

  return (
    <MissionContext.Provider value={{ 
      missions, 
      addMission, 
      completedMissions, 
      addCompletedMission 
    }}>
      {children}
    </MissionContext.Provider>
  );
};

export const useMission = () => {
  const context = useContext(MissionContext);
  if (context === undefined) {
    throw new Error('useMission must be used within a MissionProvider');
  }
  return context;
};