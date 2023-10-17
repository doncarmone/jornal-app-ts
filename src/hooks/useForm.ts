import { useEffect, useMemo, useState } from 'react';
import { FormChekedValues, UseFormHookValidations } from '../interfaces/interfaces';

export const useForm = <T>(initState: T, formValidations: UseFormHookValidations) => {
  const [formData, setFormData] = useState(initState);
  const [formValidation, setFormValidation] = useState<FormChekedValues | undefined>();


  useEffect(() => {
    setFormData(initState)
  }, [initState])

  useEffect(() => {
    createValidators()
  }, [formData])

  const isFormValid = useMemo(() => {
    if (formValidation)
      for (const formValue of Object.keys(formValidation)) {
        if (formValidation[formValue] !== null) return false;
      }
    return true;

  }, [formValidation]);


  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const name = event.target.name;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const resetForm = () => {
    setFormData({ ...initState });
  };

  const isValidEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const createValidators = () => {
    const formCheckedValues: FormChekedValues = {};
    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage = " Este campo es requerido"] = formValidations[formField];
      formCheckedValues[`${formField}Valid`] = fn(formData[formField] as String) ? null : errorMessage;
    }
    setFormValidation(formCheckedValues);
  }

  return {
    ...formData,
    // properties
    formData,
    //Methods
    onChange,
    resetForm,
    isValidEmail,
    isFormValid,
    ...formValidation
  };
};
