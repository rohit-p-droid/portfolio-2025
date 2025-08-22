import { useState, useCallback } from 'react';

export interface UseModalReturn {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModal = (): UseModalReturn => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, openModal, closeModal };
};

export interface ConfirmationState {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  type?: 'danger' | 'warning' | 'info';
  confirmText?: string;
  cancelText?: string;
}

export interface AlertState {
  isOpen: boolean;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  buttonText?: string;
}

export interface UseConfirmationReturn {
  confirmationState: ConfirmationState;
  showConfirmation: (options: Omit<ConfirmationState, 'isOpen'>) => void;
  hideConfirmation: () => void;
}

export const useConfirmation = (): UseConfirmationReturn => {
  const [confirmationState, setConfirmationState] = useState<ConfirmationState>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    type: 'danger'
  });

  const showConfirmation = useCallback((options: Omit<ConfirmationState, 'isOpen'>) => {
    setConfirmationState({
      ...options,
      isOpen: true
    });
  }, []);

  const hideConfirmation = useCallback(() => {
    setConfirmationState(prev => ({ ...prev, isOpen: false }));
  }, []);

  return {
    confirmationState,
    showConfirmation,
    hideConfirmation
  };
};

export interface UseAlertReturn {
  alertState: AlertState;
  showAlert: (options: Omit<AlertState, 'isOpen'>) => void;
  hideAlert: () => void;
}

export const useAlert = (): UseAlertReturn => {
  const [alertState, setAlertState] = useState<AlertState>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  });

  const showAlert = useCallback((options: Omit<AlertState, 'isOpen'>) => {
    setAlertState({
      ...options,
      isOpen: true
    });
  }, []);

  const hideAlert = useCallback(() => {
    setAlertState(prev => ({ ...prev, isOpen: false }));
  }, []);

  return {
    alertState,
    showAlert,
    hideAlert
  };
};
