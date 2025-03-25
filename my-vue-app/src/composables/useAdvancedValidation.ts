import { reactive, computed } from 'vue';

type ValidatorFn = (value: any, formValues: FormValues) => string | null | Promise<string | null>;
type FieldRules = { [key: string]: ValidatorFn[] };
type FormValues = { [key: string]: any };

export function useAdvancedValidation(initialValues: FormValues, rules: FieldRules) {
  const state = reactive<{ values: FormValues; errors: { [key: string]: string | null }; validating: { [key: string]: boolean } }>({
    values: { ...initialValues },
    errors: {},
    validating: {},
  });

  const validateField = async (field: string) => {
    const value = state.values[field];
    const fieldRules = rules[field] || [];

    state.validating[field] = true;

    for (const rule of fieldRules) {
      const error = await rule(value, state.values);
      if (error) {
        state.errors[field] = error;
        state.validating[field] = false;
        return;
      }
    }

    state.errors[field] = null;
    state.validating[field] = false;
  };

  const validateForm = async () => {
    await Promise.all(Object.keys(rules).map(validateField));
  };

  const isValid = computed(() => Object.values(state.errors).every((error) => !error));

  return { state, validateField, validateForm, isValid };
}
