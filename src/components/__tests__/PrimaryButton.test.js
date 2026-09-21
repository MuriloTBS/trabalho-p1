import { fireEvent, render, screen } from '@testing-library/react-native';
import PrimaryButton from '../PrimaryButton';

describe('PrimaryButton', () => {
  test('shows the title', async () => {
    await render(<PrimaryButton title="Entrar" onPress={jest.fn()} />);

    expect(screen.getByText('Entrar')).toBeTruthy();
  });

  test('calls onPress when pressed', async () => {
    const onPress = jest.fn();
    await render(<PrimaryButton title="Entrar" onPress={onPress} />);

    await fireEvent.press(screen.getByText('Entrar'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  test('does not call onPress when disabled', async () => {
    const onPress = jest.fn();
    await render(<PrimaryButton title="Entrar" onPress={onPress} disabled />);

    await fireEvent.press(screen.getByRole('button', { name: 'Entrar' }));

    expect(onPress).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Entrar' }).props.accessibilityState).toEqual({ disabled: true });
  });
});
