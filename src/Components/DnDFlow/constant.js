export const initialNodes = [
  {
    id: crypto.randomUUID(),
    type: 'messageNode',
    data: { label: 'Start Node' },
    position: { x: 250, y: 5 },
  },
];

export const initAlertContent = {
  type: '',
  message: '',
};

export const AlertType = {
  error: 'Error',
  success: 'Success',
};
