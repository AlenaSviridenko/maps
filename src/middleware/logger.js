export default (store) => (next) => async (action) => {
    console.group(action.type);
    console.info('Dispatching:', action);

    const result = await next(action);

    console.log('Next state ', store.getState());
    console.groupEnd();

    return result;
};