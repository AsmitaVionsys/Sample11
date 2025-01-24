export default {
    SUCCESS: 'The operation has been successful completed.',
    SOMETHING_WENT_WRONG: 'Something went wrong',
    NOT_FOUND: (entity: string) => {
        return `${entity} not found.`;
    },
    TOO_MANY_REQUESTS: 'Too many requests were made.'
};
