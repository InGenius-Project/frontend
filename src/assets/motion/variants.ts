import { Variants } from 'framer-motion';

export const userAuthVariants: Variants = {
  initial: {
    x: -100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'linear',
    },
  },
  transition: {
    type: 'linear',
  },
};
