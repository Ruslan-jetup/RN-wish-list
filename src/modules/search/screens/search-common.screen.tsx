import _ from 'lodash';
import { ITopTabItem, RouteKey } from 'typing';
import { TopTabs } from 'shared';
import { ScreenLayout, SearchHeaderLayout } from 'shared/components/layouts';
import { primaryWhite } from 'shared/configs';
import { useEffect } from 'react';
import { useNavigationStore } from 'store';
import { statusbarStyleHelper } from 'shared/helpers/statusbar-style.helper';

interface IProps {
  tabs: ITopTabItem[];
}
export const SearchCommonScreen: React.FC<IProps> = ({ tabs }) => {
  const { activeBottomBarTab } = useNavigationStore();
  useEffect(() => {
    if (
      activeBottomBarTab === RouteKey.Search ||
      activeBottomBarTab === RouteKey.Friends
    ) {
      statusbarStyleHelper({
        background: primaryWhite,
        barStyle: 'dark-content',
        translucent: false,
      });
    }
  }, [activeBottomBarTab]);

  return (
    <ScreenLayout
      headerComponent={
        <SearchHeaderLayout
          onSearchPress={_.noop}
          onSearchCancelPress={_.noop}
          onClearPress={_.noop}
          onSearchChange={_.noop}
        />
      }
      viewStyle={{ paddingLeft: 0, paddingRight: 0 }}>
      <TopTabs tabs={tabs} />
    </ScreenLayout>
  );
};
