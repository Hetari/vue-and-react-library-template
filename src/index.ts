// Import React components
import { Button as ReactButton } from './react/Button';

// Import Vue components
import VueButton from './vue/Button.vue';

// Export conditionally based on the framework, or export all if it’s framework-agnostic
export const ReactComponents = {
  Button: ReactButton
};

export const VueComponents = {
  Button: VueButton
};

// export default {
//   ReactComponents,
//   VueComponents
// };
