// types.ts
import { StackScreenProps } from '@react-navigation/stack';

export type MissionStackParamList = {
  MissionMain: undefined;
  CompletedMissionRecord: undefined;
  CompletedMissionDetail: { missionId: string };
};

export type CompletedMissionDetailProps = StackScreenProps<MissionStackParamList, 'CompletedMissionDetail'>;