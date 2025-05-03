import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 4 }, (_, i) => currentYear + i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

const MonthPickerModal = ({
  visible,
  onClose,
  onSelect,
  selected,
}) => {
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    if (selected) {
      const [year, month] = selected.split('-');
      setSelectedYear(Number(year));
      setSelectedMonth(Number(month));
    }
  }, [selected]);

  const handleConfirm = () => {
    onSelect(`${selectedYear}-${selectedMonth}`);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Year</Text>
          <ScrollView horizontal style={{ marginBottom: 15 }}>
            {YEARS.map((year) => (
              <TouchableOpacity
                key={year}
                onPress={() => setSelectedYear(year)}
                style={[
                  styles.optionButton,
                  selectedYear === year && styles.activeOption,
                ]}
              >
                <Text style={styles.optionText}>{year}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.modalTitle}>Select Month</Text>
          <ScrollView horizontal>
            {MONTHS.map((month) => (
              <TouchableOpacity
                key={month}
                onPress={() => setSelectedMonth(month)}
                style={[
                  styles.optionButton,
                  selectedMonth === month && styles.activeOption,
                ]}
              >
                <Text style={styles.optionText}>{month}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>

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
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  activeOption: {
    backgroundColor: '#cde1f9',
  },
  optionText: {
    fontSize: 16,
  },
  confirmButton: {
    marginTop: 30,
    alignSelf: 'center',
  },
  confirmText: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  cancelText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
