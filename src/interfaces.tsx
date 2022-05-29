export interface test {
  something: 'idk';
}

export interface InnerRef<T extends HTMLElement> {
  innerRef?: React.Ref<T>;
}

export interface UserDataModel {
  name: string;
  login: string;
  password: string;
}
