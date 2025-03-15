import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      {/* Title */}
      <Text style={styles.header}>Home</Text>

      {/* Income & Expense Summary*/}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryBox}>
          <Text style={styles.expenseLabel}>Total Expense</Text>
          <Text style={styles.expenseAmount}>- $1,500</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.incomeLabel}>Total Income</Text>
          <Text style={styles.incomeAmount}>+ $3,000</Text>
        </View>
      </View>

      {/* Monthly Summary Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Monthly Summary</Text>
        <BarChart
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr'],
            datasets: [{ data: [2500, 1800, 2200, 2600] }, { data: [1800, 1400, 1600, 2100] }]
          }}
          width={350}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            barPercentage: 0.7,
          }}
          style={styles.chart}
        />
      </View>

      {/* Navigate to Report Screen */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Report')}>
        <Text style={styles.buttonText}>View Reports</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    padding: 20, 
    alignItems: 'center', 
    justifyContent: 'center'
  },

  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },

  summaryContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
    marginBottom: 20 
  },
  summaryBox: { 
    width: '48%', 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    backgroundColor: '#F5F5F5' 
  },
  expenseLabel: { fontSize: 16, color: 'red' },
  incomeLabel: { fontSize: 16, color: 'blue' },
  expenseAmount: { fontSize: 20, fontWeight: 'bold', color: 'red' },
  incomeAmount: { fontSize: 20, fontWeight: 'bold', color: 'blue' },

  chartContainer: { alignItems: 'center', marginBottom: 20 },
  chartTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  chart: { marginVertical: 10, borderRadius: 8 },

  button: { backgroundColor: '#4A90E2', padding: 12, borderRadius: 5, alignItems: 'center', width: '80%' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default HomeScreen;