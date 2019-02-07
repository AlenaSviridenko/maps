const logger = (store) => (next) => (action) => {
    console.group(action.type);
    console.info('Dispatching:', action);

    const result = next(action);

    console.log('Next state ', store.getState());
    console.groupEnd();

    return result;
};

export default logger;