import React from 'react';

const FormAlert = ({errorMessage}) => {
  return (
    <div className="alert alert-danger">
      <strong>Oops!</strong>
      {errorMessage}
    </div>
  );
};

export default FormAlert;
