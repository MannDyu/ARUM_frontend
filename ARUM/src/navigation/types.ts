// types.ts

import { Route } from '@react-navigation/native';
import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import { ImageSourcePropType } from 'react-native';



export type RootStackParamList = {
  Auth: undefined;
  Main: undefined; //! 추가: 중복방지 위해 수정
  HomeMain: undefined,
  Signup: undefined; //! Home -> HomeMain 중복방지 위해 수정
  Login: undefined;

  TabNavigator: undefined;
  DrawerNavigator: undefined;
  
  // 탭 네비게이터 스크린들
  "홈": undefined;
  "감정일기": undefined;
  "랜덤미션": undefined;
  "자가테스트": undefined;
  "마이페이지": undefined;

  
  // Mission related screens
  MissionMain: {  //! Mission -> MissionMain 중복방지 위해 수정
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
    questData: object;
    missionStatus: 'select' | 'finish' | 'completed' | 'success';
    onMissionComplete: () => void;
    onMissionSuccess: () => void;
  };
  

  // SelfTest related screens
  SelfTestMain: undefined;  //! SelfTest -> SelfTestMain 중복방지 위해 수정
  TestStart: undefined;
  TestReport: { score: number };
  TestPage: undefined;
  TestLoading: { score: number };
  FindCenter: undefined;

  // Diary related screens
  DiaryMain: undefined; //! Diary -> DiaryMain 중복방지 위해 수정
  RecordDiary: { 
    date?: string; 
    editMode?: boolean; 
    diaryId?: string;
  };
  DiaryEmoji: undefined; //! 일단 undefined 🔽 !!수정필요!
  DiaryEmotion: undefined;
  // RecordDiary: { date?: string; editMode?: boolean; diaryId?: string };
  DiaryThumbnail: { diaryId?: string };
  DiaryDetail: { 
    diaryId?: string;
    emoji: any;
    date: string;
    tags: string[];
    answers: string[];
  };
  MyPage: undefined; 

};

export type TabNavigatorParamList = {
  HomeMain: undefined;
  Diary: undefined;
  Mission: undefined;
  SelfTest: undefined;
  MyPage: undefined;
};


// 스크린 네비게이션 관련 타입
export type RootStackScreenProps<T extends keyof RootStackParamList> = 
  StackScreenProps<RootStackParamList, T>;

export type NavigationProp<T extends keyof RootStackParamList> = 
  StackNavigationProp<RootStackParamList, T>;

export type MissionScreenNavigationProp = NavigationProp<'MissionMain'>; //! 수정
export type DailyMissionScreenNavigationProp = NavigationProp<'DailyMission'>; //! 수정
export type SelfTestScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SelfTestMain'>;
export type DiaryScreenNavigationProp = NavigationProp<'DiaryMain'>; //! 수정
export type RecordDiaryScreenNavigationProp = NavigationProp<'RecordDiary'>;
export type DiaryThumbnailScreenNavigationProp = NavigationProp<'DiaryThumbnail'>;
export type DiaryDetailScreenNavigationProp = NavigationProp<'DiaryDetail'>;

export type CompletedMissionScreenNavigationProp = NavigationProp<'CompletedMission'>;
export type CompletedMissionRecordScreenNavigationProp = NavigationProp<'CompletedMissionRecord'>;
export type CompletedMissionDetailScreenNavigationProp = NavigationProp<'CompletedMissionDetail'>;
export type EditCompletedMissionScreenNavigationProp = NavigationProp<'EditCompletedMission'>;
export type SelectSectionScreenNavigationProp = NavigationProp<'SelectSection'>;

// Home 
export type AuthScreenNavigationProp = NavigationProp<'Auth'>;
export type HomeScreenNavigationProp = NavigationProp<'HomeMain'>;
export type SignupScreenNavigationProp = NavigationProp< 'Signup'>;
export type LoginScreenNavigationProp = NavigationProp<'Login'>;

// Self Test
export type TestStartScreenNavigationProp = NavigationProp<'TestStart'>;
export type TestReportScreenNavigationProp = NavigationProp<'TestReport'>;
export type TestPageScreenNavigationProp = NavigationProp<'TestPage'>;
export type TestLoadingScreenNavigationProp = NavigationProp<'TestLoading'>;
export type FindCenterScreenNavigationProp = NavigationProp<'FindCenter'>;


export type MyPageNavigationProp = StackNavigationProp<RootStackParamList, 'MyPage'>;


// 인터페이스 정의
export interface ImageUploaderProps {
  imageUri: string;
  onUpload: (uri: string) => void;
}

export interface QuestionProps {
  onPressNext: () => void;
  isLastQuestion: boolean;
}