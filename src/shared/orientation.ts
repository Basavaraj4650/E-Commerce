import {Dimensions, ScaledSize} from 'react-native';

export const getOrientation = ({
  width,
  height,
}: ScaledSize): 'portrait' | 'landscape' =>
  height >= width ? 'portrait' : 'landscape';

export const isPortrait = (): boolean => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};

export const isLandscape = (): boolean => {
  const dim = Dimensions.get('screen');
  return dim.width >= dim.height;
};

export const subscribeToOrientationChanges = (
  setOrientationCallback: (isLandscape: boolean) => void,
): (() => void) => {
  const handleChange = ({window}: {window: ScaledSize}) => {
    const newOrientation = getOrientation(window);
    setOrientationCallback(newOrientation === 'landscape');
  };

  const subscription = Dimensions.addEventListener('change', handleChange);

  return () => {
    subscription.remove();
  };
};
