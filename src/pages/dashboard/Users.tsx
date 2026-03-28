import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, MoreVertical } from 'lucide-react';

const Users = () => {
  const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'reader', joined: '2026-01-15', status: 'active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'author', joined: '2026-02-20', status: 'active' },
    { id: 3, name: 'Carol Davis', email: 'carol@example.com', role: 'reader', joined: '2026-03-10', status: 'active' },
    { id: 4, name: 'David Wilson', email: 'david@example.com', role: 'author', joined: '2026-01-28', status: 'suspended' },
    { id: 5, name: 'Emma Brown', email: 'emma@example.com', role: 'reader', joined: '2026-03-18', status: 'active' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">User Management</h1>
        <p className="text-muted-foreground">Manage platform users and their roles</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Total Users</p>
          <p className="text-3xl font-bold">125,430</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Authors</p>
          <p className="text-3xl font-bold">50,234</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Readers</p>
          <p className="text-3xl font-bold">75,196</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-1">Active Today</p>
          <p className="text-3xl font-bold">45,678</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search users..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="reader">Reader</SelectItem>
              <SelectItem value="author">Author</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>
      </Card>

      {/* Users Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr className="text-left">
                <th className="p-4 font-semibold">User</th>
                <th className="p-4 font-semibold">Role</th>
                <th className="p-4 font-semibold">Joined</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b hover:bg-muted/30">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                        alt={user.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className="capitalize">
                      {user.role}
                    </Badge>
                  </td>
                  <td className="p-4">{user.joined}</td>
                  <td className="p-4">
                    <Badge
                      variant={user.status === 'active' ? 'default' : 'destructive'}
                      className="capitalize"
                    >
                      {user.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Users;
