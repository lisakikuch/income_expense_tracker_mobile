import React from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 3 }, (_, i) => currentYear + i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

const MonthPickerModal = ({
  visible,
  onClose,
  onSelect,
  selected,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select a Month</Text>

          <ScrollView>
            {YEARS.map((year) => (
              <View key={year}>
                <Text style={styles.yearTitle}>-- {year} --</Text>
                {MONTHS.map((month) => {
                  const value = `${year}-${month}`;
                  return (
                    <TouchableOpacity
                      key={value}
                      onPress={() => onSelect(value)}
                      style={[styles.monthOption, value === selected && styles.activeMonth]}
                    >
                      <Text style={styles.monthOptionText}>{value}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default MonthPickerModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    maxHeight: '70%',
  },
  yearTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 4,
    textAlign: 'center',
    color: '#333'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  monthOption: {
    paddingVertical: 10
  },
  activeMonth: {
    backgroundColor: '#e0e0e0',
  },
  monthOptionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  cancelButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
  cancelText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold'
  },
});
