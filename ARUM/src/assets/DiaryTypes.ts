export type DiaryStackParamList = {
  DiaryEmotion: {
    emoji: string;
  };
  Diary: undefined;
  DiaryEmoji: undefined;
  // RecordDiary: { selectedTags: string[]; selectedEmotionIndex: number; selectedEmotion: string; incompleteData: object, }; 
  RecordDiary: { incompleteData: object, }; 
};
