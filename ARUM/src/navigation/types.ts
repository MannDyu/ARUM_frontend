// types.ts

import { Route } from '@react-navigation/native';
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
  RecordDiary: { 
    date?: string; 
    editMode?: boolean; 
    diaryId?: string;
  };
  DiaryEmoji: undefined; //! 일단 undefined 🔽 !!수정필요!
  DiaryEmotion: undefined;
  // RecordDiary: { date?: string; editMode?: boolean; diaryId?: string };
  DiaryThumbnail: { diaryId?: string };
  DiaryDetail: { diaryId?: string };
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
export type DiaryScreenNavigationProp = NavigationProp<'Diary'>;
export type RecordDiaryScreenNavigationProp = NavigationProp<'RecordDiary'>;
export type DiaryThumbnailScreenNavigationProp = NavigationProp<'DiaryThumbnail'>;
export type DiaryDetailScreenNavigationProp = NavigationProp<'DiaryDetail'>;

export type CompletedMissionScreenNavigationProp = NavigationProp<'CompletedMission'>;
export type CompletedMissionRecordScreenNavigationProp = NavigationProp<'CompletedMissionRecord'>;
export type CompletedMissionDetailScreenNavigationProp = NavigationProp<'CompletedMissionDetail'>;
export type EditCompletedMissionScreenNavigationProp = NavigationProp<'EditCompletedMission'>;
export type SelectSectionScreenNavigationProp = NavigationProp<'SelectSection'>;

export type TestStartScreenNavigationProp = NavigationProp<'TestStart'>;
export type TestReportScreenNavigationProp = NavigationProp<'TestReport'>;
export type TestPageScreenNavigationProp = NavigationProp<'TestPage'>;
export type TestLoadingScreenNavigationProp = NavigationProp<'TestLoading'>;
export type FindCenterScreenNavigationProp = NavigationProp<'FindCenter'>;

export interface QuestionProps {
  onPressNext: () => void;
  isLastQuestion: boolean;
}