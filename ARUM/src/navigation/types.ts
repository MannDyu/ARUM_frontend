// types.ts

import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  
  // Mission related screens
  Mission: { 
    selectedArea?: string; 
    completedMissionId?: string; 
    missionStatus?: 'select' | 'finish' | 'completed' | 'success' 
  };
  CompletedMission: undefined;
  CompletedMissionRecord: { selectedArea?: string };
  CompletedMissionDetail: { missionId: string };
  EditCompletedMission: { missionId: string };
  SelectSection: undefined;
  DailyMission: { 
    selectedArea?: string;
    missionStatus: 'select' | 'finish' | 'completed' | 'success';
    onMissionComplete: () => void;
    onMissionSuccess: () => void;
  };

  // SelfTest related screens
  SelfTest: undefined;
  TestStart: undefined;
  TestReport: { score: number };
  TestPage: undefined;
  TestLoading: undefined;
  FindCenter: undefined;
};

export interface ImageUploaderProps {
  imageUri: string;
  onUpload: (uri: string) => void;
}


export type RootStackScreenProps<T extends keyof RootStackParamList> = 
  StackScreenProps<RootStackParamList, T>;

// 기존에 정의한 다른 타입들도 여기에 포함...

export type NavigationProp<T extends keyof RootStackParamList> = 
  StackNavigationProp<RootStackParamList, T>;

export type MissionScreenNavigationProp = NavigationProp<'Mission'>;
export type DailyMissionScreenNavigationProp = NavigationProp<'DailyMission'>;
export type SelfTestScreenNavigationProp = NavigationProp<'SelfTest'>;
// 필요한 다른 화면별 NavigationProp 타입들...