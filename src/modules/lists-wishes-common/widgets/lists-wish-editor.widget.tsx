import { useEffect } from 'react';
import { useForm, useNav, useToggle } from 'shared/hooks';
import { ListsWishEditorScreen } from 'modules/lists-wishes-common/screens';
import { useNavigationStore } from 'store';
import { validateListsWishEditor } from 'modules/lists-wishes-common/validators';
import {
  CurrenciesEnum,
  ICurrency,
  IListsWishEditorForm,
  IWishItem,
  useListsWishesStore,
} from 'modules';
import { listsWishEditorTitleConfig, successMessageConfig } from '../configs';
import { listWishService } from '../services';
import { useAsyncStorage } from 'shared/hooks/useAsyncStorage.hook';
import Toast from 'react-native-toast-message';

type ModeType = keyof typeof listsWishEditorTitleConfig;

export const ListsWishEditorWidget = ({ route }: any) => {
  const { setBottomBarVisible, setActiveBottomBarTab } = useNavigationStore();
  const { goBack } = useNav();
  const {
    toggleValue: isWishesHidden,
    setToggleValue: setWishesHidden,
    toggler: hideWishesToggler,
  } = useToggle(false);
  const { values, setField, errors, setError, onSubmit, reset } =
    useForm<IListsWishEditorForm>({}, validateListsWishEditor);
  const { itemId } = useListsWishesStore();
  const { getAsyncStorageData } = useAsyncStorage();
  const { mode } = route.params as { mode: ModeType };

  useEffect(() => {
    setField('currency', CurrenciesEnum.USD);
  }, [route]);

  useEffect(() => {
    setField('hideWishes', isWishesHidden);
  }, [isWishesHidden]);

  const CURRENCIES = Object.values(CurrenciesEnum).map(item => ({
    title: item,
  }));

  const onSaveCoverImgPath = (path: string | number) => {
    setField('coverImgPath', path);
  };

  const onSelectCurrency = (item: ICurrency) => {
    setField('currency', item.title);
  };

  const onHideWishesToggle = () => {
    hideWishesToggler();
  };

  const onBackBtnPress = () => {
    setBottomBarVisible(true);
    setActiveBottomBarTab('Home');
    goBack();
  };

  const onFieldChange = (key: keyof IListsWishEditorForm, val: any) => {
    setField(key, val);
  };

  const isItemNameUnique = (
    list: IWishItem[] | null,
    createdItemName: string,
  ): boolean => {
    if (!list) return true;
    return !list.some(
      item => item.itemName.toLowerCase() === createdItemName.toLowerCase(),
    );
  };

  const onSubmitEditorForm = async () => {
    try {
      const fetchedWishes = await getAsyncStorageData('wishes');
      const isUniqueName = isItemNameUnique(fetchedWishes, values.itemName);

      if (!isUniqueName) {
        setError('itemName', 'This name is already taken');
        return;
      }
      await listWishService({
        editorMode: mode,
        id: itemId,
        payload: values,
      });

      setWishesHidden(false);
      reset();
      goBack();
      setBottomBarVisible(true);

      Toast.show({
        type: 'success',
        text1: successMessageConfig[mode],
      });
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    }
  };

  return (
    <ListsWishEditorScreen
      onChangeField={onFieldChange}
      values={{ ...values, hideWishes: isWishesHidden }}
      errors={errors}
      editorMode={mode}
      currenciesList={CURRENCIES}
      editorTitle={listsWishEditorTitleConfig[mode]}
      onHideWishesToggle={onHideWishesToggle}
      onSelectCurrency={onSelectCurrency}
      onBackBtnPress={onBackBtnPress}
      onSaveImagePath={onSaveCoverImgPath}
      onSubmitEditorForm={() => onSubmit(onSubmitEditorForm)}
    />
  );
};
