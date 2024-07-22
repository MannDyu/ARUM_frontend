// types.ts
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
  MissionMain: undefined;
  CompletedMission: undefined;
  CompletedMissionRecord: undefined;
  CompletedMissionDetail: { missionId: string };
  EditCompletedMission: { missionId: string };
};

export interface CompletedMissionRecordProps {
  navigation: StackNavigationProp<MissionStackParamList, 'CompletedMissionRecord'>;
}

export interface CompletedMissionDetailProps {
  route: RouteProp<MissionStackParamList, 'CompletedMissionDetail'>;
  navigation: StackNavigationProp<MissionStackParamList, 'CompletedMissionDetail'>;
}

export type MissionContextType = {
  missions: Mission[];
  addMission: (mission: Mission) => void;
  completedMissions: CompletedMission[];
  addCompletedMission: (mission: Omit<CompletedMission, "id">) => string;
  updateCompletedMission: (updatedMission: CompletedMission) => void;
};