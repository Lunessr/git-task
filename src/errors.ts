const ERROR_MESSAGES = {
  ALREADY_CREATED: 'User already created',
  ID_NOT_EXIST: 'Current id is not exist',
};

const errors = new Map().set(ERROR_MESSAGES.ALREADY_CREATED, {
  message: 'User already created with this email',
  status: 400,
});
errors.set(ERROR_MESSAGES.ID_NOT_EXIST, {
  message: 'Current id is not exist',
  status: 404,
});

export { errors, ERROR_MESSAGES };
