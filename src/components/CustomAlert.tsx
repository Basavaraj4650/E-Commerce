import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import {COLORS} from '../constants/theme';
import DynamicIcon from './DynamicIcon';
import {AlertType} from '../constants/config';

interface CustomAlertProps {
  type: AlertType;
  title?: string;
  message: string;
  boldMessage?: string;
  endMessage?: string;
  saveLabel?: string;
  cancelLabel?: string;
  onSave: () => void;
  onCancel?: () => void;
}

const CustomAlert = forwardRef(
  (
    {
      type,
      title,
      message,
      boldMessage,
      endMessage,
      saveLabel,
      cancelLabel,
      onSave,
      onCancel,
    }: CustomAlertProps,
    ref,
  ) => {
    const [visible, setVisible] = useState(false);

    const getColor = () => {
      switch (type) {
        case 'success':
          return '#51B451';
        case 'error':
          return '#EB455B';
        case 'warning':
          return '#F19A38';
        default:
          return '#EB455B';
      }
    };

    const cancelButtonBackgroundColor = (type: any) => {
      switch (type) {
        case 'success':
          return '#EEF7EE';
        case 'error':
          return '#FDECEF';
        case 'warning':
          return '#FEF5EB';
        default:
          return '#D9D9D9';
      }
    };

    const getIcon = () => {
      switch (type) {
        case 'error':
          return (
            <DynamicIcon
              library="Entypo"
              name="circle-with-cross"
              size={28}
              color={getColor()}
            />
          );
        case 'warning':
          return (
            <DynamicIcon
              library="AntDesign"
              name="warning"
              size={28}
              color={getColor()}
            />
          );
        case 'success':
          return (
            <DynamicIcon
              library="MaterialCommunityIcons"
              name="check-circle"
              size={28}
              color={getColor()}
            />
          );
        default:
          return null;
      }
    };

    useImperativeHandle(ref, () => ({
      show: () => setVisible(true),
      hide: () => setVisible(false),
    }));

    return (
      <Modal
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={() => setVisible(false)}>
        <View style={styles.overlay}>
          <View style={styles.alertContainer}>
            <View style={styles.header}>
              {getIcon()}
              <Text style={styles.title}>
                {title || type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </View>
            <Text style={styles.message}>
              {message}
              {boldMessage && (
                <Text style={styles.boldMessage}> {boldMessage}</Text>
              )}
              {endMessage && <Text> {endMessage}</Text>}
            </Text>
            <View style={styles.actions}>
              {onCancel && (
                <TouchableOpacity
                  style={[
                    styles.button,
                    {backgroundColor: cancelButtonBackgroundColor(type)},
                  ]}
                  onPress={onCancel}>
                  <Text style={{color: getColor(), fontWeight: 'bold'}}>
                    {cancelLabel}
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.button, {backgroundColor: getColor()}]}
                onPress={onSave}>
                <Text style={{color: COLORS.white, fontWeight: 'bold'}}>
                  {saveLabel}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: COLORS.black,
  },
  message: {
    fontSize: 16,
    marginLeft: 35,
    marginBottom: 20,
    color: COLORS.black,
  },
  boldMessage: {
    fontWeight: 'bold',
    color: COLORS.black,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 25,
  },
  button: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 80,
    marginLeft: 10,
  },
});

export default CustomAlert;
