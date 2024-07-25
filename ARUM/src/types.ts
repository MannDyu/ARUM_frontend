export type RootStackParamList = {
  Home: undefined;
  FindCenter: undefined;
  TestReport: { score: number };
  SelectSection: undefined;
  DrawerNavigator: undefined;
  Popup: { title: string; description: string; onConfirm: () => void; onCancel: () => void };
 
};
