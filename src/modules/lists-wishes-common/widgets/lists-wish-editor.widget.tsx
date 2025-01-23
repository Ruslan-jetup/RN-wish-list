import { useEffect, useState } from 'react';
import { useForm, useNav, useToggle } from 'shared/hooks';
import { ListsWishEditorScreen } from 'modules/lists-wishes-common/screens';
import { useNavigationStore } from 'store';
import { validateListsWishEditor } from 'modules/lists-wishes-common/validators';
import {
  CurrenciesEnum,
  getWishItemReq,
  ICurrency,
  IWishEditorForm,
  IWishItem,
  ListsWishEditorModeEnum,
  useListsWishesStore,
} from 'modules';
import { listsWishEditorTitleConfig, successMessageConfig } from '../configs';
import { listWishService } from '../services';
import { useAsyncStorage } from 'shared/hooks/useAsyncStorage.hook';
import Toast from 'react-native-toast-message';
import { RouteKey } from 'typing';
import isEqual from 'lodash/isEqual';
import { isUniqueNameHelper } from 'shared';

export const ListsWishEditorWidget = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<IWishEditorForm | null>(
    null,
  );
  const { setBottomBarVisible, setActiveBottomBarTab, activeBottomBarTab } =
    useNavigationStore();
  const { goBack } = useNav();
  const {
    toggleValue: isWishesHidden,
    setToggleValue: setWishesHidden,
    toggler: hideWishesToggler,
  } = useToggle(false);
  const {
    values,
    setField,
    errors,
    setError,
    onSubmit,
    reset,
    set,
    setErrors,
  } = useForm<IWishEditorForm>({}, data =>
    validateListsWishEditor(data, editorMode),
  );
  const { itemId, setItemId, editorMode, setEditorMode } =
    useListsWishesStore();
  const { getAsyncStorageData } = useAsyncStorage();

  useEffect(() => {
    setField('currency', CurrenciesEnum.USD);
    if (editorMode === ListsWishEditorModeEnum.EditWish) {
      fetchCurrentItemData();
    }
  }, [editorMode, activeBottomBarTab]);

  useEffect(() => {
    setField('hideItem', isWishesHidden);
  }, [isWishesHidden]);

  const fetchCurrentItemData = async () => {
    setLoading(true);

    try {
      if (itemId && editorMode === ListsWishEditorModeEnum.EditWish) {
        const response = await getWishItemReq(itemId);

        const fieldsData: IWishItem = {
          coverImgPath: response.data.coverImgPath,
          itemName: response.data.itemName,
          price: response.data.price,
          currency: response.data.currency,
          itemUrl: response.data.itemUrl,
          description: response.data.description,
          hideItem: response.data.hideItem,
        };
        set({ ...fieldsData });
        setInitialValues({ ...fieldsData });
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch {
      //
    }
  };

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

  const resetErrors = Object.keys(values).reduce((acc, key) => {
    acc[key as keyof IWishEditorForm] = '';
    return acc;
  }, {} as Record<keyof IWishEditorForm, string>);

  const onBackBtnPress = () => {
    setBottomBarVisible(true);
    setActiveBottomBarTab(RouteKey.Home);
    setItemId('');
    goBack();
    reset();
    setErrors(resetErrors);
  };

  const onAddWishesToListPress = () => {
    //
  };

  const onFieldChange = (key: keyof IWishEditorForm, val: any) => {
    setField(key, val);
  };

  const isFormChanged = isEqual(values, initialValues);
  const onSubmitEditorForm = async () => {
    if (!editorMode) return;
    try {
      if (
        editorMode === ListsWishEditorModeEnum.AddWish ||
        editorMode === ListsWishEditorModeEnum.CreateList
      ) {
        const fetchedWishes = await getAsyncStorageData('wishes');
        const isUniqueName = isUniqueNameHelper(fetchedWishes, values.itemName);

        if (!isUniqueName) {
          setError('itemName', 'This name is already taken');
          return;
        }
      }

      await listWishService({
        editorMode: editorMode,
        id: itemId,
        payload: values,
      });

      setEditorMode(null);
      setWishesHidden(false);
      reset();
      goBack();
      setBottomBarVisible(true);
      setActiveBottomBarTab(RouteKey.Home);

      Toast.show({
        type: 'success',
        text1: successMessageConfig[editorMode],
      });
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
      });
    }
  };

  return (
    editorMode && (
      <ListsWishEditorScreen
        onChangeField={onFieldChange}
        values={{ ...values, hideItem: isWishesHidden }}
        errors={errors}
        editorMode={editorMode}
        currenciesList={CURRENCIES}
        editorTitle={editorMode && listsWishEditorTitleConfig[editorMode]}
        onHideWishesToggle={onHideWishesToggle}
        onSelectCurrency={onSelectCurrency}
        onBackBtnPress={onBackBtnPress}
        onSaveImagePath={onSaveCoverImgPath}
        onSubmitEditorForm={() => onSubmit(onSubmitEditorForm)}
        disableSaveBtn={isFormChanged}
        loading={isLoading}
        onAddWishesToListPress={onAddWishesToListPress}
      />
    )
  );
};
