import { FormValues } from 'interfaces/player';

export const validateForm = (formValues: FormValues) => {
  const errors: { message: string } = { message: '' };
  let hasError = false;

  Object.keys(formValues).forEach((key) => {
    switch (key) {
      case 'title':
        if (!formValues.title) {
          errors.message = 'Title is required';
          hasError = true;
        }
        break;

      case 'description':
        if (!formValues.description) {
          errors.message = 'Description is required';
          hasError = true;
        }
        break;

      case 'team':
        if (!formValues.team) {
          errors.message = 'Team is required';
          hasError = true;
        }
        break;

        case 'position':
        if (!formValues.position) {
          errors.message = 'Position is required';
          hasError = true;
        }
        break;

      case 'location':
        if (!formValues.location) {
          errors.message = 'Location is required';
          hasError = true;
        }
        break;

    

      default:
        hasError = false;
    }
  });

  return { hasError, errors };
};

export const hasChanged = (initialValues: FormValues, currentValues: FormValues) => {
  const initialValuesArray = Object.values(initialValues);
  const currentValuesArray = Object.values(currentValues);
  for (let i = 0; i < initialValuesArray.length; i++) {
    if (initialValuesArray[i] !== currentValuesArray[i]) {
      return true;
    }
  }
  return false;
};