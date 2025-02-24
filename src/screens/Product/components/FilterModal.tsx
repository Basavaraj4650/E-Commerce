import React from 'react';
import {
  Modal,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';

const FilterModal = ({
  isVisible,
  onClose,
  onSelectCategories,
  selectedCategories,
  categories,
  onSelectPriceRange,
}: any) => {
  const [localSelectedCategories, setLocalSelectedCategories] =
    React.useState<string[]>(selectedCategories);
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(1000); // Adjust max price as needed

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
    onSelectPriceRange({minPrice, maxPrice});
    onClose();
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
            <Text style={styles.sectionTitle}>Categories</Text>
            {categories.map((category: string) => (
              <TouchableOpacity
                key={category}
                style={styles.filterOption}
                onPress={() => handleCategoryToggle(category)}>
                <Text style={styles.filterOptionText}>
                  {category.toUpperCase()}
                </Text>
                {localSelectedCategories.includes(category) && (
                  <View style={styles.checkmark} />
                )}
              </TouchableOpacity>
            ))}
            <Text style={styles.sectionTitle}>Price Range</Text>
            <View style={styles.sliderContainer}>
              <Text style={{color: 'black'}}>Min: ${minPrice}</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1000}
                step={10}
                value={minPrice}
                onValueChange={setMinPrice}
                minimumTrackTintColor="#000"
                maximumTrackTintColor="#ccc"
              />
              <Text style={{color: 'black'}}>Max: ${maxPrice}</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1000}
                step={10}
                value={maxPrice}
                onValueChange={setMaxPrice}
                minimumTrackTintColor="#000"
                maximumTrackTintColor="#ccc"
              />
            </View>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: 'black',
  },
  sliderContainer: {
    marginVertical: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});
