import { ref, computed, readonly } from 'vue';

/**
 * 모달 상태 타입 정의
 */
export interface ModalStateExtended {
  isOpen: boolean;
  title?: string;
  content?: string;
  description?: string;
  data?: unknown;
  config?: ModalConfig;
}

/**
 * 모달 설정 타입 정의
 */
export interface ModalConfig {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'confirm' | 'alert';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  actions?: ModalAction[];
  alertVariant?: 'success' | 'info' | 'warning' | 'error';
}

/**
 * 모달 액션 타입 정의
 */
export interface ModalAction {
  label: string;
  variant?: 'contained' | 'outlined';
  size?: 'lg' | 'md' | 'sm';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: {
    name: string;
    size?: 'lg' | 'md' | 'sm';
    color?: string;
  };
  rightIcon?: {
    name: string;
    size?: 'lg' | 'md' | 'sm';
    color?: string;
  };
}

/**
 * 모달 관리를 위한 composable
 * 
 * @param initialState - 초기 모달 상태
 * @returns 모달 상태와 관련 메서드들
 */
export function useModal(initialState: Partial<ModalStateExtended> = {}) {
  const modalState = ref<ModalStateExtended>({
    isOpen: false,
    title: '',
    content: '',
    description: '',
    data: undefined,
    config: {
      size: 'md',
      variant: 'default',
      closeOnOverlayClick: true,
      closeOnEscape: true,
      showCloseButton: true,
      actions: [],
    },
    ...initialState,
  });

  /**
   * 모달 열기
   * @param options - 모달 옵션
   */
  const openModal = (options: Partial<ModalStateExtended> = {}) => {
    modalState.value = {
      ...modalState.value,
      ...options,
      isOpen: true,
    };
  };

  /**
   * 모달 닫기
   */
  const closeModal = () => {
    modalState.value.isOpen = false;
  };

  /**
   * 모달 토글
   */
  const toggleModal = () => {
    modalState.value.isOpen = !modalState.value.isOpen;
  };

  /**
   * 모달 내용 업데이트
   * @param content - 새로운 내용
   */
  const updateContent = (content: string) => {
    modalState.value.content = content;
  };

  /**
   * 모달 제목 업데이트
   * @param title - 새로운 제목
   */
  const updateTitle = (title: string) => {
    modalState.value.title = title;
  };

  /**
   * 모달 설명 업데이트
   * @param description - 새로운 설명
   */
  const updateDescription = (description: string) => {
    modalState.value.description = description;
  };

  /**
   * 모달 데이터 업데이트
   * @param data - 새로운 데이터
   */
  const updateData = (data: unknown) => {
    modalState.value.data = data;
  };

  /**
   * 모달 설정 업데이트
   * @param config - 새로운 설정
   */
  const updateConfig = (config: Partial<ModalConfig>) => {
    modalState.value.config = {
      ...modalState.value.config,
      ...config,
    };
  };

  /**
   * 모달 액션 업데이트
   * @param actions - 새로운 액션들
   */
  const updateActions = (actions: ModalAction[]) => {
    if (modalState.value.config) {
      modalState.value.config.actions = actions;
    }
  };

  /**
   * 확인 모달 열기
   * @param options - 모달 옵션
   */
  const openConfirmModal = (options: {
    title?: string;
    content: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    confirmVariant?: ModalAction['variant'];
    cancelVariant?: ModalAction['variant'];
    size?: ModalConfig['size'];
  }) => {
    const {
      title = '확인',
      content,
      description,
      confirmText = '확인',
      cancelText = '취소',
      confirmVariant = 'contained',
      cancelVariant = 'outlined',
      size = 'md',
    } = options;

    const actions: ModalAction[] = [
      {
        label: cancelText,
        variant: cancelVariant,
        size: 'md',
      },
      {
        label: confirmText,
        variant: confirmVariant,
        size: 'md',
      },
    ];

    openModal({
      title,
      content,
      description,
      config: {
        size,
        variant: 'confirm',
        closeOnOverlayClick: true,
        closeOnEscape: true,
        showCloseButton: true,
        actions,
      },
    });
  };

  /**
   * 알림 모달 열기
   * @param options - 모달 옵션
   */
  const openAlertModal = (options: {
    title?: string;
    content: string;
    description?: string;
    variant: 'success' | 'info' | 'warning' | 'error';
    confirmText?: string;
    size?: ModalConfig['size'];
  }) => {
    const {
      title,
      content,
      description,
      variant,
      confirmText = '확인',
      size = 'md',
    } = options;

    const getButtonVariant = (alertVariant: string): ModalAction['variant'] => {
      switch (alertVariant) {
        case 'success':
          return 'contained';
        case 'info':
          return 'contained';
        case 'warning':
          return 'contained';
        case 'error':
          return 'contained';
        default:
          return 'contained';
      }
    };

    const actions: ModalAction[] = [
      {
        label: confirmText,
        variant: getButtonVariant(variant),
        size: 'md',
      },
    ];

    openModal({
      title,
      content,
      description,
      config: {
        size,
        variant: 'alert',
        closeOnOverlayClick: true,
        closeOnEscape: true,
        showCloseButton: true,
        actions,
        alertVariant: variant,
      },
    });
  };

  /**
   * 모달 완전 초기화
   */
  const resetModal = () => {
    modalState.value = {
      isOpen: false,
      title: '',
      content: '',
      description: '',
      data: undefined,
      config: {
        size: 'md',
        variant: 'default',
        closeOnOverlayClick: true,
        closeOnEscape: true,
        showCloseButton: true,
        actions: [],
      },
    };
  };

  return {
    modalState: readonly(modalState),
    isOpen: computed(() => modalState.value.isOpen),
    title: computed(() => modalState.value.title),
    content: computed(() => modalState.value.content),
    description: computed(() => modalState.value.description),
    data: computed(() => modalState.value.data),
    config: computed(() => modalState.value.config),
    actions: computed(() => modalState.value.config?.actions || []),
    openModal,
    closeModal,
    toggleModal,
    updateContent,
    updateTitle,
    updateDescription,
    updateData,
    updateConfig,
    updateActions,
    openConfirmModal,
    openAlertModal,
    resetModal,
  };
}
