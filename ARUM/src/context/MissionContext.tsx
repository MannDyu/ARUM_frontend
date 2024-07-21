import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Mission, CompletedMission, MissionContextType } from '../assets/types'

// type Mission = {
//   id: string;
//   text: string;
//   imageUri: string | null;
// };
// CompletedMission 타입 추가
// type CompletedMission = Mission & {
//   title: string;
// };

// type MissionContextType = {
//   missions: Mission[];
//   // addMission: (mission: Omit<Mission, 'id'>) => void;
//   addMission: (mission: Mission) => void;
//   // CompletedMission 관련 타입 추가
//   completedMissions: CompletedMission[];
//   addCompletedMission: (mission: Omit<CompletedMission, "id">) => void;
//   updateCompletedMission: (updatedMission: CompletedMission) => void;
// };

const MissionContext = createContext<MissionContextType | undefined>(undefined);

export const MissionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [completedMissions, setCompletedMissions] = useState<CompletedMission[]>([]);
  
  // CompletedMission 상태 추가
  // const [completedMissions, setCompletedMissions] = useState<CompletedMission[]>([]);

  // const addMission = (mission: Omit<Mission, 'id'>) => {
  //   const newMission = {
  //     ...mission,
  //     id: Date.now().toString(), // 간단한 유니크 ID 생성
  //   };
  //   setMissions(prevMissions => [...prevMissions, newMission]);
  // };
  const addMission = (mission: Mission) => {
    setMissions(prevMissions => [...prevMissions, mission]);
  };


  // addCompletedMission 함수 추가
  const addCompletedMission = (mission: Omit<CompletedMission, 'id'>) => {
    const newCompletedMission = {
      ...mission,
      id: Date.now().toString(),
    };
    setCompletedMissions(prevMissions => [...prevMissions, newCompletedMission]);
    return newCompletedMission.id;
  };
  // const addCompletedMission = (mission: Omit<CompletedMission, 'id'>) => {
  //   const newCompletedMission = {
  //     ...mission,
  //     id: Date.now().toString(), // 간단한 유니크 ID 생성
  //   };
  //   setCompletedMissions(prevMissions => [...prevMissions, newCompletedMission]);
  //   return newCompletedMission.id;
  // };
  // edit
  const updateCompletedMission = (updatedMission: CompletedMission) => {
    setCompletedMissions(prevMissions => 
      prevMissions.map(mission => 
        mission.id === updatedMission.id ? updatedMission : mission
      )
    );
  };

  useEffect(() => {
    console.log('Completed Missions updated:', completedMissions);
  }, [completedMissions]);
  // const updateCompletedMission = (updatedMission: CompletedMission) => {
  //   setCompletedMissions(prevMissions => 
  //     prevMissions.map(mission => 
  //       mission.id === updatedMission.id ? updatedMission : mission
  //     )
  //   );


  return (
    <MissionContext.Provider value={{ 
      completedMissions, 
      addCompletedMission, 
      updateCompletedMission,
      missions,
      addMission
    }}>
      {children}
    </MissionContext.Provider>
  );
};


export const useMission = () => {
  const context = useContext(MissionContext);
  if (!context) {
    throw new Error('useMission must be used within a MissionProvider');
  }
  return context;
};


// export const useMission = () => {
//   const context = useContext(MissionContext);
//   if (context === undefined) {
//     throw new Error('useMission must be used within a MissionProvider');
//   }
//   return context;
// };