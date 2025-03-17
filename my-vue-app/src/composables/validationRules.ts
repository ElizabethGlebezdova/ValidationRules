// Проверка, что значение не пустое
export const required = (message = 'Обязательное поле') => (value: any) => {
  return value ? null : message;
};

// Проверка email через API (асинхронно)
export const checkEmailExists = async (email: string) => {
  await new Promise((res) => setTimeout(res, 1000));
  const existingEmails = ['test@example.com', 'admin@example.com'];
  return existingEmails.includes(email) ? 'Этот email уже используется' : null;
};

// Проверка совпадения паролей
export const passwordsMatch = (message = 'Пароли не совпадают') => (value: string, formValues: any) => {
  return value === formValues.password ? null : message;
};

// Проверка даты рождения (должна быть в прошлом)
export const validDateOfBirth = (message = 'Дата рождения должна быть в прошлом') => (value: string) => {
  return new Date(value) < new Date() ? null : message;
};
