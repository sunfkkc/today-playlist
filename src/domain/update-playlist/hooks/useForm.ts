import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { Form, form } from '@/domain/update-playlist/atoms/form';

export const useForm = (): [
  Form,
  React.Dispatch<React.SetStateAction<Form>>
] => {
  return [useRecoilValue(form), useSetRecoilState(form)];
};

export const useResetForm = () => {
  return useResetRecoilState(form);
};
