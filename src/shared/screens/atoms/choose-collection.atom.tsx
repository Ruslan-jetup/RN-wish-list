import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, Txt } from 'shared/components';
import { primaryWhite } from 'shared/configs';
import { IconBtnNamesEnum } from 'typing';

interface IProps {
  collectionCoverImg: string | number;
}

const defaultImg = require('../../../../assets/images/frame_10.png');

export const ChooseCollectionAtom: React.FC<IProps> = ({
  collectionCoverImg,
}) => {
  const imgPath = collectionCoverImg ? collectionCoverImg : defaultImg;
  return (
    <View style={styles.container}>
      <Txt style={styles.label} content={'Choose collection'} />

      <TouchableOpacity style={styles.btn}>
        <View style={styles.left_content}>
          <View style={styles.img_container}>
            <Image style={styles.img} source={imgPath} />
          </View>
          <Txt style={styles.btn_title} content={'ChooseCollectionAtom'} />
        </View>
        <Icon name={IconBtnNamesEnum.Right} size={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 24,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 66,
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: primaryWhite,
    borderRadius: 10,
  },
  left_content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  img_container: {
    width: 40,
    height: 40,
    borderRadius: 4,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  btn_title: {
    paddingHorizontal: 1,
  },
  label: {
    marginBottom: 8,
    color: '#514F50',
  },
});
