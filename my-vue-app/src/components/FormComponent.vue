<script setup lang="ts">
import { useAdvancedValidation } from '../composables/useAdvancedValidation';
import { required, checkEmailExists, validEmail, minLength, passwordsMatch, validDateOfBirth } from '../composables/validationRules';

// Начальные значения формы
const initialValues = { email: '', password: '', confirmPassword: '', birthDate: '' };

// Определение правил валидации
const rules = {
  email: [required(), validEmail(), async (value: string) => await checkEmailExists(value)],
  password: [required(), minLength(8)],
  confirmPassword: [required(), passwordsMatch()],
  birthDate: [required(), validDateOfBirth()],
};

const { state, validateField, validateForm, isValid } = useAdvancedValidation(initialValues, rules);

const handleSubmit = async () => {
  await validateForm();
  if (isValid.value) {
    alert('Форма успешно отправлена!');
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label>Email:</label>
      <input v-model="state.values.email" @blur="validateField('email')" />
      <p v-if="state.errors.email" class="error">{{ state.errors.email }}</p>
      <p v-if="state.validating.email" class="validating">Проверка email...</p>
    </div>

    <div>
      <label>Пароль:</label>
      <input type="password" v-model="state.values.password" @blur="validateField('password')" />
      <p v-if="state.errors.password" class="error">{{ state.errors.password }}</p>
    </div>

    <div>
      <label>Подтвердите пароль:</label>
      <input type="password" v-model="state.values.confirmPassword" @blur="validateField('confirmPassword')" />
      <p v-if="state.errors.confirmPassword" class="error">{{ state.errors.confirmPassword }}</p>
    </div>

    <div>
      <label>Дата рождения:</label>
      <input type="date" v-model="state.values.birthDate" @blur="validateField('birthDate')" />
      <p v-if="state.errors.birthDate" class="warning">{{ state.errors.birthDate }}</p>
    </div>

    <button type="submit">Отправить</button>
  </form>
</template>

