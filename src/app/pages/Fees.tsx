import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Plus, Receipt, Smartphone } from "lucide-react";
import { students, fees } from "../lib/mockData";

export default function Fees() {
  const [selectedStudent, setSelectedStudent] = useState("");

  const handleMpesaRequest = () => {
    alert("M-Pesa payment request sent to parent's phone!");
  };

  const handleRecordPayment = () => {
    alert("Payment recorded successfully! Receipt generated.");
  };

  return (
    <div>
      <h1 className="text-3xl mb-6">Fee Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl">KSh 125,000</p>
            <p className="text-sm text-gray-500">This term</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pending Fees</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl text-red-600">KSh 7,500</p>
            <p className="text-sm text-gray-500">From 2 students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Fee Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {fees.map(fee => (
                <div key={fee.type} className="flex justify-between text-sm">
                  <span>{fee.type}</span>
                  <span>KSh {fee.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 mb-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-700 hover:bg-green-800">
              <Plus className="w-4 h-4 mr-2" />
              Record Payment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Record Fee Payment</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <div>
                <Label>Student</Label>
                <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map(s => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name} - {s.admissionNo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Amount</Label>
                <Input type="number" placeholder="Enter amount" />
              </div>
              <div>
                <Label>Payment Method</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="mpesa">M-Pesa</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Receipt Number</Label>
                <Input placeholder="Auto-generated" disabled value={`RCP${Date.now().toString().slice(-6)}`} />
              </div>
              <div className="flex gap-2">
                <Button type="button" onClick={handleRecordPayment} className="flex-1 bg-green-700 hover:bg-green-800">
                  <Receipt className="w-4 h-4 mr-2" />
                  Record & Print Receipt
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <Button variant="outline" onClick={handleMpesaRequest}>
          <Smartphone className="w-4 h-4 mr-2" />
          Send M-Pesa Request
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Parent</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Total Fees</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map(student => {
              const totalFees = 11000;
              const paid = totalFees - student.balance;

              return (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.parent}</TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell>KSh {totalFees.toLocaleString()}</TableCell>
                  <TableCell>KSh {paid.toLocaleString()}</TableCell>
                  <TableCell className={student.balance > 0 ? "text-red-600" : "text-green-600"}>
                    KSh {student.balance.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-sm ${
                      student.balance === 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {student.balance === 0 ? "Paid" : "Pending"}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
