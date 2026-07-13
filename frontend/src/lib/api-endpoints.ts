export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    ME: '/auth/me',
  },
  PROPERTIES: {
    LIST: '/properties',
    CREATE: '/properties',
    GET_ONE: (id: string) => `/properties/${id}`,
    UPDATE: (id: string) => `/properties/${id}`,
    DELETE: (id: string) => `/properties/${id}`,
    UPLOAD_IMAGES: (id: string) => `/properties/${id}/images`,
  },
  FAVORITES: {
    ADD: '/favorites',
    LIST: '/favorites',
    REMOVE: (id: string) => `/favorites/${id}`,
    IS_FAVORITE: (id: string) => `/favorites/is-favorite/${id}`,
  },
  REVIEWS: {
    CREATE: '/reviews',
    GET_PROPERTY_REVIEWS: (id: string) => `/reviews/property/${id}`,
    GET_AVERAGE_RATING: (id: string) => `/reviews/property/${id}/average`,
    DELETE: (id: string) => `/reviews/${id}`,
  },
  MESSAGES: {
    SEND: '/messages',
    GET_CONVERSATION: (userId: string) => `/messages/conversation/${userId}`,
    GET_USER_MESSAGES: '/messages',
    GET_UNREAD_COUNT: '/messages/unread/count',
    MARK_AS_READ: (id: string) => `/messages/${id}/read`,
  },
  VISITS: {
    REQUEST: '/visits',
    GET_PROPERTY_VISITS: (id: string) => `/visits/property/${id}`,
    GET_USER_VISITS: '/visits/user/my-visits',
    UPDATE_STATUS: (id: string) => `/visits/${id}/status`,
    CANCEL: (id: string) => `/visits/${id}`,
  },
  PROFILE: {
    GET: '/profile',
    UPDATE: '/profile',
    CHANGE_PASSWORD: '/profile/change-password',
    DELETE: '/profile',
  },
};
