import React from 'react';
import {Modal, TouchableOpacity, Text, View, StyleSheet} from 'react-native';

const FilterModal = ({
  isVisible,
  onClose,
  onSelectCategories,
  selectedCategories,
  categories,
}: any) => {
  const [localSelectedCategories, setLocalSelectedCategories] =
    React.useState<string[]>(selectedCategories);

  const handleCategoryToggle = (category: string) => {
    if (localSelectedCategories.includes(category)) {
      setLocalSelectedCategories(
        localSelectedCategories.filter((cat: string) => cat !== category),
      );
    } else {
      setLocalSelectedCategories([...localSelectedCategories, category]);
    }
  };

  const handleApply = () => {
    onSelectCategories(localSelectedCategories);
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {categories.map((category: string) => (
            <TouchableOpacity
              key={category}
              style={styles.filterOption}
              onPress={() => handleCategoryToggle(category)}>
              <Text style={styles.filterOptionText}>{category}</Text>
              {localSelectedCategories.includes(category) && (
                <View style={styles.checkmark} />
              )}
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;

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
  filterOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterOptionText: {
    fontSize: 16,
    color: '#000',
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#000',
  },
  applyButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 10,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
