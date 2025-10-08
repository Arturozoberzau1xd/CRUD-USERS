import React, { useState, useEffect } from 'react';
import Input from './common/Input';
import Button from './common/Button';

const UserForm = ({ user, onSubmit, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    edad: '',
    peso: '',
    grado_estudio: '',
    email: '',
    ocupacion: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user && isEditing) {
      setFormData({
        nombre: user.nombre || '',
        apellidos: user.apellidos || '',
        edad: user.edad || '',
        peso: user.peso || '',
        grado_estudio: user.grado_estudio || '',
        email: user.email || '',
        ocupacion: user.ocupacion || ''
      });
    }
  }, [user, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.apellidos.trim()) newErrors.apellidos = 'Los apellidos son requeridos';
    if (!formData.edad || formData.edad < 1) newErrors.edad = 'La edad debe ser mayor a 0';
    if (!formData.peso || formData.peso < 1) newErrors.peso = 'El peso debe ser mayor a 0';
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div className="form-row">
        <Input
          label="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          error={errors.nombre}
        />
        <Input
          label="Apellidos"
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          required
          error={errors.apellidos}
        />
      </div>

      <div className="form-row">
        <Input
          label="Edad"
          type="number"
          name="edad"
          value={formData.edad}
          onChange={handleChange}
          required
          error={errors.edad}
        />
        <Input
          label="Peso (kg)"
          type="number"
          step="0.1"
          name="peso"
          value={formData.peso}
          onChange={handleChange}
          required
          error={errors.peso}
        />
      </div>

      <Input
        label="Grado de Estudio"
        name="grado_estudio"
        value={formData.grado_estudio}
        onChange={handleChange}
        placeholder="Ej: Licenciatura, Maestría, etc."
      />

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        error={errors.email}
      />

      <Input
        label="Ocupación"
        name="ocupacion"
        value={formData.ocupacion}
        onChange={handleChange}
        placeholder="Ej: Ingeniero, Doctor, etc."
      />

      <div className="form-actions">
        <Button type="submit" variant="primary">
          {isEditing ? 'Actualizar Usuario' : 'Crear Usuario'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default UserForm;