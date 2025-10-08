import React from 'react';
import Table from './common/Table';
import Button from './common/Button';

const UserTable = ({ users, onEdit, onDelete }) => {
  // Definimos las columnas de la tabla
  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'nombre', title: 'Nombre' },
    { key: 'apellidos', title: 'Apellidos' },
    { key: 'edad', title: 'Edad' },
    { key: 'peso', title: 'Peso (kg)' },
    { key: 'grado_estudio', title: 'Grado de Estudio' },
    { key: 'email', title: 'Email' },
    { key: 'ocupacion', title: 'Ocupación' },
  ];

  // Definimos las acciones para cada fila (botones Editar y Eliminar)
  const actions = (user) => (
    <>
      <Button variant="warning" onClick={() => onEdit(user)}>
        Editar
      </Button>
      <Button variant="danger" onClick={() => onDelete(user.id)}>
        Eliminar
      </Button>
    </>
  );

  return (
    <div className="table-container">
    <Table
      columns={columns}
      data={users}
      actions={actions}
    />
  </div>
  );
};

export default UserTable;