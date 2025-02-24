import React, {useState} from 'react';
import {
  Modal,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

const SortModal = ({isVisible, onClose, onSelectOption}: any) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const sortOptions = [
    {label: 'Price Low to High', value: 'price_low_to_high'},
    {label: 'Price High to Low', value: 'price_high_to_low'},
    {label: 'Top Rated', value: 'top_rated'},
    {label: 'Low Rated', value: 'low_rated'},
    {label: 'None', value: 'none'},
  ];

  const handleSelectOption = (value: any) => {
    setSelectedOption(value);
    onSelectOption(value);
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end'}}
          keyboardShouldPersistTaps="handled">
          <View style={styles.modalContent}>
            {sortOptions.map(option => (
              <TouchableOpacity
                key={option.value}
                style={styles.sortOption}
                onPress={() => handleSelectOption(option.value)}>
                <Text style={styles.sortOptionText}>{option.label}</Text>
                {selectedOption === option.value && (
                  <View style={styles.radioButton}>
                    <View style={styles.radioButtonSelected} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default SortModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sortOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sortOptionText: {
    fontSize: 16,
    color: '#000',
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
});
