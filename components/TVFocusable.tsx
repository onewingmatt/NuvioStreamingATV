import React, { useState, forwardRef } from 'react';
import { 
  Pressable, 
  View, 
  StyleSheet, 
  Platform,
  PressableProps,
  ViewStyle,
  StyleProp
} from 'react-native';

interface TVFocusableProps extends PressableProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  focusedStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  autoFocus?: boolean;
  disabled?: boolean;
}

export const TVFocusable = forwardRef<View, TVFocusableProps>(({
  children,
  style,
  focusedStyle,
  onPress,
  autoFocus = false,
  disabled = false,
  ...props
}, ref) => {
  const [focused, setFocused] = useState(false);

  return (
    <Pressable
      ref={ref}
      {...props}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      focusable={!disabled}
      hasTVPreferredFocus={autoFocus}
      tvParallaxProperties={{
        enabled: true,
        shiftDistanceX: 2.0,
        shiftDistanceY: 2.0,
        tiltAngle: 0.05,
        magnification: 1.08,
      }}
      style={[
        styles.base,
        style,
        focused && styles.focused,
        focused && focusedStyle,
        disabled && styles.disabled
      ]}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {children}
    </Pressable>
  );
});

const styles = StyleSheet.create({
  base: {
    // Base styles - allows focusing
  },
  focused: {
    borderWidth: 3,
    borderColor: '#00D9FF',
    backgroundColor: 'rgba(0, 217, 255, 0.1)',
    transform: [{ scale: 1.05 }],
    shadowColor: '#00D9FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  disabled: {
    opacity: 0.5,
  },
});

TVFocusable.displayName = 'TVFocusable';
