import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ContextMenu } from 'shared';
import { Icon } from 'shared/components/icon.component';
import { IconBtnNamesEnum, ListsWishEditorModeEnum } from 'typing';

interface IProps {
  iconColor?: string;
  onPress: (currentTab: string) => void;
  onOpenEditor: (mode: ListsWishEditorModeEnum) => void;
  toggleAddMenu: () => void;
  isAddMenuVisible: boolean;
  route: string;
}

export const TabAddBtn: React.FC<IProps> = ({
  iconColor,
  onPress,
  onOpenEditor,
  isAddMenuVisible,
  toggleAddMenu,
  route,
}) => {
  return (
    <>
      <TouchableOpacity onPress={() => onPress(route)} style={styles.container}>
        <Icon color={iconColor} name={IconBtnNamesEnum.Plus} size={34} />
      </TouchableOpacity>

      <ContextMenu
        isVisible={isAddMenuVisible}
        toggleContextMenu={toggleAddMenu}
        options={[
          {
            label: 'Add a wish',
            onPress: () => onOpenEditor(ListsWishEditorModeEnum.AddWish),
          },
          {
            label: 'Create a list',
            onPress: () => onOpenEditor(ListsWishEditorModeEnum.CreateList),
          },
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    top: -40,
    backgroundColor: 'white',
    borderRadius: 30,
  },
});
