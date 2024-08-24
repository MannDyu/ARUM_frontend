// MissionTypes.ts
import { StackScreenProps } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type Mission = {
  id: string;
  text: string;
  imageUri: string | null;
  tag : string ;
};

export type CompletedItem = {
  id:string; 
  title:string;
  date : string;
  tag : string;
}
export type CompletedMission = {
  id: string;
  title: string;
  text: string;
  date: string ;
  imageUri: string | null;
  tag: string;  // tag 필드 추가
};

export type MissionStackParamList = {
  Mission: {
    selectedArea?: string;
    completedMissionId?: string;
    missionStatus?: 'select' | 'finish' | 'completed' | 'success';
    questData: {
      id: number;
      qs_theme: string;
      qs_content: string;
    }
  };
  CompletedMission: undefined;
  CompletedMissionRecord: { selectedArea?: string };
  CompletedMissionDetail: { missionId: string };
  EditCompletedMission: { missionId: string };
  SelectSection: {
    responseData: any; //! 추가 
  };
  DailyMission: { 
    responseData: any; //! 추가 
  //   selectedArea?: string;
  //   missionStatus: 'select' | 'finish' | 'completed' | 'success';
  //   onMissionComplete: () => void;
  //   onMissionSuccess: () => void;
  //   questData: {
  //     id: number;
  //     qs_theme: string;
  //     qs_content: string;
  //   }
  };
};

export type MissionStackScreenProps<T extends keyof MissionStackParamList> = 
  StackScreenProps<MissionStackParamList, T>;

export interface CompletedMissionRecordProps {
  navigation: StackNavigationProp<MissionStackParamList, 'CompletedMissionRecord'>;
  route: RouteProp<MissionStackParamList, 'CompletedMissionRecord'>;
}

export interface CompletedMissionDetailProps {
  route: RouteProp<MissionStackParamList, 'CompletedMissionDetail'>;
  navigation: StackNavigationProp<MissionStackParamList, 'CompletedMissionDetail'>;
}
export type MissionScreenNavigationProp = StackNavigationProp<MissionStackParamList, 'Mission'>;
export type DailyMissionScreenNavigationProp = StackNavigationProp<MissionStackParamList, 'DailyMission'>;

export type MissionContextType = {
  missions: Mission[];
  addMission: (mission: Mission) => void;
  completedMissions: CompletedMission[];
  addCompletedMission: (mission: Omit<CompletedMission, "id">) => string;
  updateCompletedMission: (updatedMission: CompletedMission) => void;
};