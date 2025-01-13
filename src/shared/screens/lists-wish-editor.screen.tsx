import { useState } from 'react';
import {
  FontFamiliesEnum,
  FontWeightEnum,
  ListsWishEditorModeEnum,
} from 'typing';
import { ChooseCollectionAtom } from './atoms';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  BaseButton,
  DefaultHeaderLayout,
  DropdownSelect,
  LargeSwitch,
  ScreenLayout,
  TextField,
  Txt,
} from 'shared/components';
import { CoverImageSetter } from 'shared/components/cover-img-setter';
import {
  grey,
  ListsWishEditorTitleConfig,
  primaryBlack,
  primaryWhite,
} from 'shared/configs';
import { useNavigationStore } from 'store';
import { useNav } from 'shared/hooks';

const CURRENCY = [
  { title: 'USD' },
  { title: 'EUR' },
  { title: 'JPY' },
  { title: 'GBP' },
  { title: 'AUD' },
  { title: 'UAH' },
];

type ModeType = keyof typeof ListsWishEditorTitleConfig;

export const ListsWishEditorScreen = ({ route }: any) => {
  const [imgPath, setImgPath] = useState<string | number>('');
  const [hideSwitchValue, setHideSwitchValue] = useState<boolean>(false);
  const [currency, setCurrency] = useState<string>('');

  const { setBottomBarVisible, setActiveBottomBarTab } = useNavigationStore();
  const { width } = useWindowDimensions();
  const { mode } = route.params as { mode: ModeType };
  const { goBack } = useNav();

  const priceInputsWidth = width / 2 - 30;

  const saveImg = (path: any) => {
    setImgPath(path);
  };

  const onSelectItem = (item: { title: string }) => {
    setCurrency(item.title);
  };

  const onHideWishToggle = () => {
    setHideSwitchValue(!hideSwitchValue);
  };

  const onBackBtnPress = () => {
    setBottomBarVisible(true);
    setActiveBottomBarTab('Home');
    goBack();
  };

  return (
    <ScreenLayout>
      <DefaultHeaderLayout
        title={ListsWishEditorTitleConfig[mode]}
        showBackBtn={true}
        onBackBtnPress={onBackBtnPress}
      />
      <ScrollView contentContainerStyle={styles.scroll_view}>
        <CoverImageSetter
          onSaveImgPath={saveImg}
          imageUrl={imgPath}
          size={120}
          showEditor={true}
          additionalStyle={styles.cover_img}
        />
        <TextField
          containerStyle={{ marginBottom: 24 }}
          label="Name wish"
          placeholder="Enter wish name"
        />

        <View style={styles.price_container}>
          <TextField
            containerStyle={{ width: priceInputsWidth }}
            label="Price"
            placeholder="Enter price"
          />

          <DropdownSelect
            onSelectItem={onSelectItem}
            selectItems={CURRENCY}
            selectTitle={currency ? currency : 'Select a currency'}
            label="Currency"
            containerStyles={{ width: priceInputsWidth, alignSelf: 'flex-end' }}
          />
        </View>

        <TextField
          containerStyle={{ marginBottom: 24 }}
          label="URL"
          placeholder="Add website URL"
        />

        {(mode === ListsWishEditorModeEnum.CreateList ||
          mode === ListsWishEditorModeEnum.EditList) && (
          <ChooseCollectionAtom collectionCoverImg={''} />
        )}

        <Txt style={styles.description_label} content={'Description'} />
        <TextInput
          style={styles.description_input}
          placeholder="Enter a description"
          multiline={true}
          placeholderTextColor={grey}
        />

        <LargeSwitch
          title="Hide wishes from other users"
          onSwitchToggle={onHideWishToggle}
          value={hideSwitchValue}
        />

        <BaseButton
          title="Save"
          mode="primary"
          size="large"
          onPress={() => {}}
        />
      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  price_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  scroll_view: { paddingBottom: 36 },
  cover_img: {
    alignSelf: 'center',
    marginVertical: 24,
  },
  description_label: {
    marginBottom: 8,
    color: '#514F50',
  },
  description_input: {
    height: 100,
    borderRadius: 10,
    backgroundColor: primaryWhite,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FontFamiliesEnum.poppins,
    fontWeight: FontWeightEnum.Regular,
    color: primaryBlack,
    textAlignVertical: 'top',
    textAlign: 'left',
  },
  label: {
    color: '#514F50',
  },
});
