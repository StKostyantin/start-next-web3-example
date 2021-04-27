import { useState } from 'react';

const useFormState = () => {
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>(null);

  return {
    isSubmitting,
    setSubmitting,
    success,
    setSuccess,
    errors,
    setErrors,
  };
};

export default useFormState;
