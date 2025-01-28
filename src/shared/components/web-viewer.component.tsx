import WebView from 'react-native-webview';
import { DefaultHeaderLayout, ScreenLayout } from './layouts';

interface IProps {
  url: string;
  onWebViewerBackPress: () => void;
}

export const WebViewer: React.FC<IProps> = ({ url, onWebViewerBackPress }) => {
  return (
    <ScreenLayout
      horizontalPadding={0}
      headerComponent={
        <DefaultHeaderLayout
          showBackBtn={true}
          onBackBtnPress={onWebViewerBackPress}
          title={'Web viewer'}
        />
      }>
      <WebView source={{ uri: url }} style={{ flex: 1 }} />
    </ScreenLayout>
  );
};
