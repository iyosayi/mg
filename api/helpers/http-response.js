export function makeHttpError({ statusCode, id, title, errorMessage, stack }) {
  const toReturn = {
    errors: [
      {
        id,
        title,
        error: errorMessage,
        stack
      }
    ]
  }

  return {
    headers: {
      'Content-Type': 'application/vnd.api+json'
    },
    statusCode,
    data: JSON.stringify(toReturn)
  }
}

export const apiResponse = ({ status, statusCode, message, data }) => {
  const toReturn = {
    status,
    message,
    data
  }
  return {
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json'
    },
    statusCode,
    data: JSON.stringify(toReturn)
  }
}
