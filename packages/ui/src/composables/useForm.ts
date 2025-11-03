import { ref, computed, readonly, Ref } from 'vue';

/**
 * 폼 필드 상태 타입 정의
 */
export interface FormField<T = any> {
  value: T;
  error: string | null;
  touched: boolean;
  dirty: boolean;
}

/**
 * 폼 상태 타입 정의
 */
export interface FormState<T extends Record<string, any>> {
  fields: { [K in keyof T]: FormField<T[K]> };
  isValid: boolean;
  isDirty: boolean;
  isTouched: boolean;
}

/**
 * 폼 관리를 위한 composable
 *
 * @param initialValues - 초기 폼 값들
 * @param validators - 유효성 검사 함수들
 * @returns 폼 상태와 관련 메서드들
 */
export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validators?: { [K in keyof T]?: (value: T[K]) => string | null }
): {
  fields: Ref<{ [K in keyof T]: FormField<T[K]> }>;
  values: Ref<T>;
  errors: Ref<{ [K in keyof T]: string | null }>;
  isValid: Ref<boolean>;
  isDirty: Ref<boolean>;
  isTouched: Ref<boolean>;
  isSubmitting: Ref<boolean>;
  setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void;
  setFieldTouched: <K extends keyof T>(field: K) => void;
  setFieldError: <K extends keyof T>(field: K, error: string) => void;
  setValues: (values: Partial<T>) => void;
  setTouched: () => void;
  reset: () => void;
  validate: () => boolean;
  handleSubmit: (onSubmit: (values: T) => Promise<void> | void) => Promise<void>;
} {
  const fields = ref<{ [K in keyof T]: FormField<T[K]> }>({} as any);
  const isSubmitting = ref(false);

  // 초기 필드 상태 설정
  Object.keys(initialValues).forEach((key) => {
    const fieldKey = key as keyof T;
    fields.value[fieldKey] = {
      value: initialValues[fieldKey],
      error: null,
      touched: false,
      dirty: false,
    };
  });

  /**
   * 특정 필드 값 업데이트
   * @param field - 필드명
   * @param value - 새로운 값
   */
  const setFieldValue = <K extends keyof T>(field: K, value: T[K]) => {
    const fieldState = fields.value[field];
    const isDirty = value !== initialValues[field];

    fieldState.value = value;
    fieldState.dirty = isDirty;

    // 유효성 검사 실행
    if (validators && validators[field]) {
      fieldState.error = validators[field]!(value);
    }
  };

  /**
   * 특정 필드 터치 상태 설정
   * @param field - 필드명
   */
  const setFieldTouched = <K extends keyof T>(field: K) => {
    fields.value[field].touched = true;
  };

  /**
   * 특정 필드 에러 설정
   * @param field - 필드명
   * @param error - 에러 메시지
   */
  const setFieldError = <K extends keyof T>(field: K, error: string) => {
    fields.value[field].error = error;
  };

  /**
   * 모든 필드 값 설정
   * @param values - 새로운 값들
   */
  const setValues = (values: Partial<T>) => {
    Object.keys(values).forEach((key) => {
      const fieldKey = key as keyof T;
      if (fieldKey in fields.value) {
        setFieldValue(fieldKey, values[fieldKey]!);
      }
    });
  };

  /**
   * 모든 필드 터치 상태 설정
   */
  const setTouched = () => {
    Object.keys(fields.value).forEach((key) => {
      const fieldKey = key as keyof T;
      setFieldTouched(fieldKey);
    });
  };

  /**
   * 폼 리셋
   */
  const reset = () => {
    Object.keys(initialValues).forEach((key) => {
      const fieldKey = key as keyof T;
      fields.value[fieldKey] = {
        value: initialValues[fieldKey],
        error: null,
        touched: false,
        dirty: false,
      };
    });
    isSubmitting.value = false;
  };

  /**
   * 폼 유효성 검사
   */
  const validate = () => {
    let isValid = true;

    Object.keys(fields.value).forEach((key) => {
      const fieldKey = key as keyof T;
      const field = fields.value[fieldKey];

      if (validators && validators[fieldKey]) {
        const error = validators[fieldKey]!(field.value);
        field.error = error;
        if (error) isValid = false;
      }
    });

    return isValid;
  };

  /**
   * 폼 제출
   * @param onSubmit - 제출 핸들러
   */
  const handleSubmit = async (onSubmit: (values: T) => Promise<void> | void) => {
    setTouched();

    if (!validate()) {
      return;
    }

    isSubmitting.value = true;

    try {
      const values = Object.keys(fields.value).reduce((acc, key) => {
        const fieldKey = key as keyof T;
        acc[fieldKey] = fields.value[fieldKey].value;
        return acc;
      }, {} as T);

      await onSubmit(values);
    } finally {
      isSubmitting.value = false;
    }
  };

  // Computed 속성들
  const values = computed(() => {
    const result = {} as T;
    Object.keys(fields.value).forEach((key) => {
      const fieldKey = key as keyof T;
      result[fieldKey] = fields.value[fieldKey].value;
    });
    return result;
  });

  const errors = computed(() => {
    const result = {} as { [K in keyof T]: string | null };
    Object.keys(fields.value).forEach((key) => {
      const fieldKey = key as keyof T;
      result[fieldKey] = fields.value[fieldKey].error;
    });
    return result;
  });

  const isValid = computed(() => {
    return (Object.values(fields.value) as FormField[]).every((field) => !field.error);
  });

  const isDirty = computed(() => {
    return (Object.values(fields.value) as FormField[]).some((field) => field.dirty);
  });

  const isTouched = computed(() => {
    return (Object.values(fields.value) as FormField[]).some((field) => field.touched);
  });

  return {
    fields: readonly(fields) as Ref<{ [K in keyof T]: FormField<T[K]> }>,
    values: readonly(values) as Ref<T>,
    errors: readonly(errors) as Ref<{ [K in keyof T]: string | null }>,
    isValid: readonly(isValid) as Ref<boolean>,
    isDirty: readonly(isDirty) as Ref<boolean>,
    isTouched: readonly(isTouched) as Ref<boolean>,
    isSubmitting: readonly(isSubmitting) as Ref<boolean>,
    setFieldValue,
    setFieldTouched,
    setFieldError,
    setValues,
    setTouched,
    reset,
    validate,
    handleSubmit,
  };
}
