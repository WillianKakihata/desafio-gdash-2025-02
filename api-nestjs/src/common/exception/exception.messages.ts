export const ExceptionMessage = {
  USERS: {
    NOT_FOUND: 'No users found!',
    DELETE_ID: 'Error deleting user by id!',
    GET_ALL: 'Error getting all users!',
    GET_ID: 'Error getting user by id!',
    GET_BY: (field: string): string => `Error getting user by ${field} field!`,
    CREATE: 'Error saving user!',
    UPDATE: 'Error updating user by id!',
    UPDATE_PASSWORD: 'Error updating user password by id!',
    UPDATE_INVALID_PAYLOAD: 'Error invalid payload!',
    CITY_INVALID: 'City is not valid!',
    MAPPER: {
        ARRAY_DOCUMENTS_TO_MODEL_OUT: 'Error convert documentUser to ArrayModelOut!',
        DOCUMENT_TO_MODEL_OUT: 'Error convert documentUser to ModelOut!', 
        UPDATE_REQUEST_TO_UPDATE_MODEL: 'Error convert updateRequest to UpdateUserModelIn',
        SIGNUP_REQUEST_TO_MODEL_IN: 'Error convert SignUpRequest to CreateUserModelIn'
    }
  },

  BCRYPT: {
    PASS_HASH: 'Error pass bcrypt hash'
  },

  AUTH: {
   SIGNUP: {
      ALREADY_EXISTS: 'User already exists!',
      EMAIL_TAKEN: 'Email already taken!',
      USERNAME_TAKEN: 'Username already taken!',
      PASSWORD_MISMATCH: 'Passwords do not match!',
    },
    JWT: {
      INVALID_TOKEN: 'Invalid token!',
      EXPIRED_TOKEN: 'Expired token!',
      MISSING_TOKEN: 'Missing token!',
      SIGN: 'Jwt sign error!'
    },
    SIGNIN: {
      PASSWORD_MISMATCH: 'Passwords do not match!',
    }
  },

  WEATHER: {
    CREATE: 'Error in save weather',
    FIND_ALL: 'Error getting all weathers!',
    MAPPER: {
      ARRAY_DOCUMENTS_TO_MODEL_OUT: 'Error convert All Documents Weather to WeatherArrayModelOut!',
      CREATE: 'Error convert documentWeather to ModelOut!'
    }
  },

  OPENROUTER: {
    GENERIC: 'Failed to generate weather insights.',
    RESPONSE: 'Invalid response from OpenRouter API.',
    NOT_DATA: 'No weather records provided. Cannot generate insights.'
  }
}