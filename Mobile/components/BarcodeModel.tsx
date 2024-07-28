import { Text, Pressable, Dimensions } from 'react-native';
import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { useSelector } from 'react-redux';
import { RootState } from '~/store';
import { Modal, View } from 'react-native-ui-lib';
import { Product } from '~/types/product.type';
const { width: viewportWidth } = Dimensions.get('window');
export interface BarcodeModelProps {
  visble: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onDismiss?: () => void;
  bgDismissable?: boolean;
  code: string;
}

const BarcodeModel = ({
  setVisible,
  visble,
  bgDismissable,
  onDismiss,
  code,
}: BarcodeModelProps) => {
  const handleDismiss = () => {
    setVisible(false);
    onDismiss?.();
  };
  return (
    <Modal animationType="slide" visible={visble} transparent>
      <Pressable
        onPress={bgDismissable ? handleDismiss : () => {}}
        className=" h-full w-full bg-[rgba(0,0,0,0.5)]">
        <Pressable className="m-auto w-fit !rounded-xl bg-white p-6">
          <View center>
            <QRCode size={viewportWidth - 100} value={code} />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default BarcodeModel;
