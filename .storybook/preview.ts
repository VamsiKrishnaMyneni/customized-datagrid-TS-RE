import type { Preview } from '@storybook/react'
import "@fortawesome/fontawesome-free/js/all.js";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;