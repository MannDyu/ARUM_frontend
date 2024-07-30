// types.ts

import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  DrawerNavigator: undefined;
  
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
  TestLoading: { score: number };
  FindCenter: undefined;

  // Diary related screens
  Diary: undefined;
  RecordDiary: undefined;
  DiaryThumbnail: undefined;
  DiaryDetail: undefined;
};

export interface ImageUploaderProps {
  imageUri: string;
  onUpload: (uri: string) => void;
}


export type RootStackScreenProps<T extends keyof RootStackParamList> = 
  StackScreenProps<RootStackParamList, T>;

export type NavigationProp<T extends keyof RootStackParamList> = 
  StackNavigationProp<RootStackParamList, T>;

export type MissionScreenNavigationProp = NavigationProp<'Mission'>;
export type DailyMissionScreenNavigationProp = NavigationProp<'DailyMission'>;
export type SelfTestScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SelfTest'>;


export interface QuestionProps {
  onPressNext: () => void;
  isLastQuestion: boolean;
}