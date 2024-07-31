export type SelfTestStackParamList = {
  SelfTest: undefined;
  TestStart: undefined;
  SelfTestReport: undefined;
  TestReport: { score: number };
  TestPage : undefined,
  TestLoading: { score: number };
};


export interface QuestionProps {
  onPressNext: () => void;
  isLastQuestion: boolean;
}
