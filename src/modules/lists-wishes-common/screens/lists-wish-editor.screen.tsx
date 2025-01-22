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
  Loader,
  ScreenLayout,
  TextArea,
  TextField,
} from 'shared/components';
import { CoverImageSetter } from 'shared/components/cover-img-setter';
import { primaryBlack, primaryWhite } from 'shared/configs';

import { ICurrency, IWishEditorForm, ListsWishEditorModeEnum } from 'modules';
import { FormErrors } from 'shared/hooks';

interface IProps {
  onChangeField: (key: keyof IWishEditorForm, val: any) => void;
  values: IWishEditorForm;
  errors: FormErrors<IWishEditorForm>;
  editorMode: ListsWishEditorModeEnum;
  currenciesList: ICurrency[];
  editorTitle: string | null;
  onHideWishesToggle: () => void;
  onSelectCurrency: (currency: ICurrency) => void;
  onBackBtnPress: () => void;
  onSaveImagePath: (path: string | number) => void;
  onSubmitEditorForm: () => void;
  disableSaveBtn: boolean;
  loading: boolean;
  onAddWishesToListPress: () => void;
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
  disableSaveBtn,
  loading,
  onAddWishesToListPress,
}) => {
  const { width } = useWindowDimensions();
  const priceInputsWidth = width / 2 - 30;
  const isWishEditorMode =
    editorMode === ListsWishEditorModeEnum.AddWish ||
    editorMode === ListsWishEditorModeEnum.EditWish;

  return (
    <ScreenLayout>
      <DefaultHeaderLayout
        title={editorTitle}
        showBackBtn={true}
        onBackBtnPress={onBackBtnPress}
      />
      {loading ? (
        <Loader />
      ) : (
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
            placeholder={`Enter ${isWishEditorMode ? 'wish' : 'list'} name`}
            error={errors?.itemName}
            value={values?.itemName}
            onChange={val => onChangeField('itemName', val)}
          />

          {isWishEditorMode && (
            <>
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
                  containerStyles={{
                    width: priceInputsWidth,
                    alignSelf: 'flex-end',
                  }}
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
            </>
          )}

          {!isWishEditorMode && <ChooseCollectionAtom />}
          {isWishEditorMode && (
            <TextArea
              placeholder="Enter a description"
              title="Description"
              error={errors?.description}
              value={values?.description}
              onValueChange={val => onChangeField('description', val)}
            />
          )}

          <LargeSwitch
            title={`Hide ${
              isWishEditorMode ? 'wishes' : 'list'
            } from other users`}
            onSwitchToggle={onHideWishesToggle}
            value={values?.hideItem ? values?.hideItem : false}
          />

          {!isWishEditorMode && (
            <BaseButton
              title="Add wishes to list"
              mode="secondary"
              size="large"
              onPress={onAddWishesToListPress}
              additionalBtnStyles={styles.add_wishes_btn}
              additionalFontStyles={{ color: primaryWhite }}
            />
          )}

          <BaseButton
            title="Save"
            mode="primary"
            size="large"
            onPress={onSubmitEditorForm}
            disabled={disableSaveBtn}
          />
        </ScrollView>
      )}
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
  add_wishes_btn: {
    backgroundColor: primaryBlack,
    marginBottom: 24,
  },
});
