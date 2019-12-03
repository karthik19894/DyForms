export const findByTestAttr = (wrapper, testDataAttr) => {
  return wrapper.find(`[data-test="${testDataAttr}"]`);
};
