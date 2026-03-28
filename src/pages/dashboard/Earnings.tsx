import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, DollarSign, CreditCard, Download } from 'lucide-react';

const Earnings = () => {
  const earningsData = {
    thisMonth: 24580,
    lastMonth: 21340,
    totalEarnings: 156720,
    pendingPayout: 12450,
  };

  const transactions = [
    { date: '2026-03-25', type: 'Subscription', amount: 499, status: 'Completed' },
    { date: '2026-03-24', type: 'Premium Article', amount: 299, status: 'Completed' },
    { date: '2026-03-23', type: 'Subscription', amount: 499, status: 'Completed' },
    { date: '2026-03-22', type: 'eBook Purchase', amount: 999, status: 'Completed' },
    { date: '2026-03-21', type: 'Subscription', amount: 499, status: 'Pending' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Earnings</h1>
        <p className="text-muted-foreground">Track your revenue and payouts</p>
      </div>

      {/* Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <DollarSign className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">₹{earningsData.thisMonth.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">This Month</p>
          <p className="text-xs text-green-500 mt-1">
            +{Math.round(((earningsData.thisMonth - earningsData.lastMonth) / earningsData.lastMonth) * 100)}% from last month
          </p>
        </Card>

        <Card className="p-6">
          <TrendingUp className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">₹{earningsData.totalEarnings.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Total Earnings</p>
        </Card>

        <Card className="p-6">
          <CreditCard className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">₹{earningsData.pendingPayout.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Pending Payout</p>
        </Card>

        <Card className="p-6 bg-primary text-white">
          <p className="text-sm mb-2">Available to Withdraw</p>
          <p className="text-3xl font-bold mb-4">₹{earningsData.pendingPayout.toLocaleString()}</p>
          <Button size="sm" variant="secondary">
            Withdraw
          </Button>
        </Card>
      </div>

      {/* Transaction History */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Transaction History</h3>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-left">
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Type</th>
                <th className="pb-3 font-semibold">Amount</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index} className="border-b">
                  <td className="py-4">{transaction.date}</td>
                  <td className="py-4">{transaction.type}</td>
                  <td className="py-4 font-semibold">₹{transaction.amount}</td>
                  <td className="py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Payout Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Payout Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Bank Account</p>
              <p className="text-sm text-muted-foreground">••••5678 - HDFC Bank</p>
            </div>
            <Button variant="outline" size="sm">
              Update
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Payout Schedule</p>
              <p className="text-sm text-muted-foreground">Monthly on the 1st</p>
            </div>
            <Button variant="outline" size="sm">
              Change
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Earnings;
