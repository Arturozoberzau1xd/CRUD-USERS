import React, { useState, useEffect } from 'react';
import { userService } from './services/userService';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import Modal from './components/common/Modal';
import Button from './components/common/Button';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await userService.getAllUsers();
      setUsers(response.data);
    } catch (err) {
      setError('Error al cargar los usuarios: ' + (err.message || 'Error desconocido'));
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      await userService.createUser(userData);
      await loadUsers();
      setIsModalOpen(false);
      setSuccessMessage('Usuario creado exitosamente!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Error al crear usuario: ' + (err.message || 'Error desconocido'));
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      await userService.updateUser(editingUser.id, userData);
      await loadUsers();
      setIsModalOpen(false);
      setEditingUser(null);
      setSuccessMessage('Usuario actualizado exitosamente!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Error al actualizar usuario: ' + (err.message || 'Error desconocido'));
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        await userService.deleteUser(userId);
        await loadUsers();
        setSuccessMessage('Usuario eliminado exitosamente!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        setError('Error al eliminar usuario: ' + (err.message || 'Error desconocido'));
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setError('');
  };

  const handleSubmit = (userData) => {
    if (editingUser) {
      handleUpdateUser(userData);
    } else {
      handleCreateUser(userData);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>CRUD de Usuarios</h1>
        <Button 
          variant="success" 
          onClick={() => setIsModalOpen(true)}
        >
          Nuevo Usuario
        </Button>
      </header>

      <main className="app-main">
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
        
        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        {loading ? (
          <div className="loading">Cargando usuarios...</div>
        ) : (
          <UserTable
            users={users}
            onEdit={handleEdit}
            onDelete={handleDeleteUser}
          />
        )}
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingUser ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
      >
        <UserForm
          user={editingUser}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          isEditing={!!editingUser}
        />
      </Modal>
    </div>
  );
}

export default App;