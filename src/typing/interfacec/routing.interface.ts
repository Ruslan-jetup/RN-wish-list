export interface IRouteParams {
  navigation: {
    navigate: (to: string, params?: any) => any;
    goBack: () => any;
    getParam: (key: string) => any;
    addListener: (type: string, callback: () => any) => void;
  };
  route: any;
}
