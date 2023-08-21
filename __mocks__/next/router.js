const mockedPush = jest.fn();

export const useRouter = () => {
  return {
    push: mockedPush,
  };
};
