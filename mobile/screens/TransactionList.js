import React from "react";
import { Modal, TouchableOpacity } from "react-native";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import MonthPicker from 'react-native-month-picker';

const transactions = [
  { date: "09/21/2025", category: "Transportation", description: "TTC Monthly Pass: $128.15" },
  { date: "09/20/2025", category: "Eating Out", description: "$5.25" },
  { date: "09/19/2025", category: "Grocery", description: "$15.99" },
  { date: "09/18/2025", category: "Entertainment & Leisure", description: "Trip to Mexico: $3,000" },
  { date: "09/17/2025", category: "Medical", description: "Doctor’s consultant fee: $120.49" },
  { date: "09/17/2023", category: "Eating Out", description: "$50.00" },
  { date: "09/17/2025", category: "Grocery", description: "$30.00" },
];

export default function TransactionsList() {
  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Transactions</h2>
        <Calendar className="w-6 h-6 cursor-pointer" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">September 2025</h3>
      <div className="mt-4 space-y-2">
        {transactions.map((tx, index) => (
          <Card key={index} className="p-3 flex justify-between items-center">
            <CardContent>
              <p className="text-sm font-semibold">{tx.date} - {tx.category}</p>
              <p className="text-xs text-gray-500">{tx.description}</p>
            </CardContent>
            <Button variant="outline" size="sm">Edit</Button>
          </Card>
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <Button variant="outline">Expense</Button>
        <Button variant="default">Income</Button>
      </div>
      <div className="fixed bottom-4 w-full flex justify-around">
        <Button variant="ghost">Home</Button>
        <Button variant="default">Transactions</Button>
        <Button variant="ghost">Reports</Button>
        <Button variant="ghost">Add</Button>
      </div>
    </div>
  );
}
