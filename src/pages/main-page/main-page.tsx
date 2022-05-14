import { getProfileSelector, useTypedSelector } from '../../store';

export function MainPage() {
  const { userName } = useTypedSelector(getProfileSelector);
  return <h1>{`Hi ${userName}, I display  your boards`}</h1>;
}
