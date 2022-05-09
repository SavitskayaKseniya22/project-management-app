export interface test {
  something: 'idk';
}

export interface InnerRef<T extends HTMLElement> {
  innerRef?: React.Ref<T>;
}
