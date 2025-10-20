import React, { useState } from 'react';
import { Car, CarCategory } from '../../types';

interface CarManagementProps {
  cars: Car[];
  onUpdateCar: (updatedCar: Car) => void;
  onAddCar: (newCar: Car) => void;
  onDeleteCar: (carId: string) => void;
}

const CarFormModal: React.FC<{
    car: Car | null;
    onClose: () => void;
    onSave: (car: Car) => void;
}> = ({ car, onClose, onSave }) => {
    const [formData, setFormData] = useState<Car>(car || {
        id: '',
        name: '',
        category: CarCategory.ECONOMY,
        imageUrl: `https://picsum.photos/seed/newcar${Date.now()}/400/300`,
        seats: 5,
        storage: '2 bags'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'seats' ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center animate-fade-in-up" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg m-4" onClick={(e) => e.stopPropagation()}>
                 <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-brand-dark">{car ? 'Edit Car Details' : 'Add New Car'}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                 </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                        <input name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-gray-900" required />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-gray-900">
                            {Object.values(CarCategory).map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Seats</label>
                            <input type="number" name="seats" value={formData.seats} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-gray-900" required />
                        </div>
                         <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Storage</label>
                            <input name="storage" value={formData.storage} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-gray-900" required />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                        <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-gray-900" required />
                    </div>
                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
                        <button type="submit" className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 shadow-md transition-colors">Save Car</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const CarManagement: React.FC<CarManagementProps> = ({ cars, onUpdateCar, onAddCar, onDeleteCar }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCar, setEditingCar] = useState<Car | null>(null);

    const handleOpenModal = (car: Car | null) => {
        setEditingCar(car);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingCar(null);
        setIsModalOpen(false);
    };

    const handleSaveCar = (car: Car) => {
        if (car.id) {
            onUpdateCar(car);
        } else {
            onAddCar(car);
        }
        handleCloseModal();
    };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg animate-fade-in-up">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-brand-dark">Car Fleet Management</h1>
        <button onClick={() => handleOpenModal(null)} className="bg-brand-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90">
          + Add Car
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Car</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seats</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Storage</th>
              <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cars.map((car) => (
              <tr key={car.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-md object-cover" src={car.imageUrl} alt={car.name} />
                        </div>
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{car.name}</div>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{car.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{car.seats}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{car.storage}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button onClick={() => handleOpenModal(car)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button onClick={() => onDeleteCar(car.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && <CarFormModal car={editingCar} onClose={handleCloseModal} onSave={handleSaveCar} />}
    </div>
  );
};

export default CarManagement;