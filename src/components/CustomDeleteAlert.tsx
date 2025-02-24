import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../constants/theme';

interface CustomAlertProps {
  onDelete: () => void;
  onCancel?: () => void;
}

const DeleteCustomAlert = forwardRef(
  ({onDelete, onCancel}: CustomAlertProps, ref) => {
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      show: () => setVisible(true),
      hide: () => setVisible(false),
    }));

    return (
      <Modal
        transparent={true}
        animationType="fade"
        visible={visible}
        onRequestClose={() => setVisible(false)}>
        <View style={styles.overlay}>
          <View style={styles.alertContainer}>
            <View style={styles.header}>
              <MaterialIcons name="delete-outline" size={28} color="red" />
              <Text style={styles.title}>Confirm Delete</Text>
            </View>
            <Text style={styles.message}>
              Are you sure you want to remove this item from your cart?
            </Text>
            <View style={[styles.actions, {width: onCancel ? '60%' : '30%'}]}>
              {onCancel && (
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={onCancel}>
                  <Text style={{fontWeight: 'bold', color: '#EB455B'}}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.button, {backgroundColor: '#EB455B'}]}
                onPress={onDelete}>
                <Text style={{color: COLORS.white, fontWeight: 'bold'}}>
                  Remove
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
    marginBottom: 5,
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
  actions: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  cancelButton: {
    marginRight: 10,
    backgroundColor: '#FDECEF',
  },
});

export default DeleteCustomAlert;
