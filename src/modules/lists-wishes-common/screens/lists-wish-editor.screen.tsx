import { FontFamiliesEnum, FontWeightEnum } from 'typing';
import { ChooseCollectionAtom } from './atoms';
import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  BaseButton,
  DefaultHeaderLayout,
  DropdownSelect,
  LargeSwitch,
  ScreenLayout,
  TextArea,
  TextField,
} from 'shared/components';
import { CoverImageSetter } from 'shared/components/cover-img-setter';
import { primaryBlack, primaryWhite } from 'shared/configs';

import { ICurrency, IListsWishEditorForm, ListsWishEditorModeEnum } from 'modules';
import { FormErrors } from 'shared/hooks';

interface IProps {
  onChangeField: (key: keyof IListsWishEditorForm, val: any) => void;
  values: IListsWishEditorForm;
  errors: FormErrors<IListsWishEditorForm>;
  editorMode: ListsWishEditorModeEnum;
  currenciesList: ICurrency[];
  editorTitle: string;
  onHideWishesToggle: () => void;
  onSelectCurrency: (currency: ICurrency) => void;
  onBackBtnPress: () => void;
  onSaveImagePath: (path: string | number) => void;
  onSubmitEditorForm: () => void;
}

export const ListsWishEditorScreen: React.FC<IProps> = ({
  onChangeField,
  values,
  errors,
  editorMode,
  currenciesList,
  editorTitle,
  onHideWishesToggle,
  onSelectCurrency,
  onBackBtnPress,
  onSaveImagePath,
  onSubmitEditorForm,
}) => {
  const { width } = useWindowDimensions();
  const priceInputsWidth = width / 2 - 30;

  return (
    <ScreenLayout>
      <DefaultHeaderLayout
        title={editorTitle}
        showBackBtn={true}
        onBackBtnPress={onBackBtnPress}
      />
      <ScrollView contentContainerStyle={styles.scroll_view}>
        <CoverImageSetter
          onSaveImgPath={onSaveImagePath}
          imageUrl={values.coverImgPath}
          size={120}
          showEditor={true}
          additionalStyle={styles.cover_img}
        />
        <TextField
          containerStyle={{ marginBottom: 24 }}
          label="Name wish"
          placeholder="Enter wish name"
          error={errors?.itemName}
          value={values?.itemName}
          onChange={val => onChangeField('itemName', val)}
        />

        <View style={styles.price_container}>
          <TextField
            containerStyle={{ width: priceInputsWidth }}
            label="Price"
            placeholder="Enter price"
            error={errors?.price}
            value={(values?.price ?? '').toString()}
            onChange={val => onChangeField('price', val)}
            keyboardType="number-pad"
          />

          <DropdownSelect
            onSelectItem={onSelectCurrency}
            selectItems={currenciesList}
            selectTitle={values?.currency || 'Select a currency'}
            label="Currency"
            containerStyles={{ width: priceInputsWidth, alignSelf: 'flex-end' }}
            error={errors.currency}
          />
        </View>

        <TextField
          containerStyle={{ marginBottom: 24 }}
          label="URL"
          placeholder="Add website URL"
          error={errors?.itemUrl}
          value={values?.itemUrl}
          onChange={val => onChangeField('itemUrl', val)}
        />

        {(editorMode === ListsWishEditorModeEnum.CreateList ||
          editorMode === ListsWishEditorModeEnum.EditList) && (
          <ChooseCollectionAtom />
        )}

        <TextArea
          placeholder="Enter a description"
          title="Description"
          error={errors?.description}
          value={values?.description}
          onValueChange={val => onChangeField('description', val)}
        />

        <LargeSwitch
          title="Hide wishes from other users"
          onSwitchToggle={onHideWishesToggle}
          value={values?.hideWishes ? values?.hideWishes : false}
        />

        <BaseButton
          title="Save"
          mode="primary"
          size="large"
          onPress={onSubmitEditorForm}
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
