import _ from 'lodash';
import { ITopTabItem } from 'typing';
import { TopTabs } from 'shared';
import { ScreenLayout, SearchHeaderLayout } from 'shared/components/layouts';

interface IProps {
  tabs: ITopTabItem[];
}
export const SearchCommonScreen: React.FC<IProps> = ({ tabs }) => {

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
