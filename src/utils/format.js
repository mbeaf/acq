export const formatValidationErrors = (errors) => {
  return errors.map((error) => {
    const { path, message } = error;
    return `${path.join('.')} - ${message}`;
  });
};
