// Проверка, что значение не пустое
export const required = (message = 'Обязательное поле') => (value: any) => {
  return value ? null : message;
};

// Проверка email через API
export const checkEmailExists = async (email: string) => {
  await new Promise((res) => setTimeout(res, 1000));
  const existingEmails = ['test@example.com', 'admin@example.com'];
  return existingEmails.includes(email) ? 'Этот email уже используется' : null;
};

// Проверка корректного ввода email
export const validEmail = (message = 'Некорректный формат email') => (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? null : message;
};

// Проверка минимальной длины пароля
export const minLength = (length = 8, message = `Пароль должен быть не менее ${length} символов`) => (value: string) => {
  return value.length >= length ? null : message;
};

// Проверка совпадения паролей
export const passwordsMatch = (message = 'Пароли не совпадают') => (value: string, formValues: any) => {
  return value === formValues.password ? null : message;
};

// Проверка даты рождения (должен быть старше 18 лет)
export const validDateOfBirth = (message = 'Вам должно быть не менее 18 лет') => (value: string) => {
  const birthDate = new Date(value);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const isOldEnough = age > 18 || (age === 18 && today >= new Date(birthDate.setFullYear(birthDate.getFullYear() + 18)));
  return isOldEnough ? null : message;
};
