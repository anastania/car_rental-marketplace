
import React, { useState } from 'react';
import { User } from '../../types';

interface UserManagementProps {
  users: User[];
  onUpdateUser: (updatedUser: User) => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ users, onUpdateUser }) => {
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleRoleChange = (userId: string, newRole: 'customer' | 'admin') => {
    const userToUpdate = users.find(u => u.id === userId);
    if (userToUpdate) {
      onUpdateUser({ ...userToUpdate, role: newRole });
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg animate-fade-in-up">
      <h1 className="text-2xl font-bold text-brand-dark mb-4">User Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingUser?.id === user.id ? (
                     <select 
                        value={user.role} 
                        onChange={(e) => handleRoleChange(user.id, e.target.value as 'customer' | 'admin')}
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                      </select>
                  ) : (
                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        {user.role}
                      </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {editingUser?.id === user.id ? (
                    <button onClick={() => setEditingUser(null)} className="text-indigo-600 hover:text-indigo-900">Save</button>
                  ) : (
                    <button onClick={() => setEditingUser(user)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
