import { defineNuxtModule, createResolver, addComponentsDir } from '@nuxt/kit';

export default defineNuxtModule({
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    addComponentsDir({
      extensions: ['vue'],
      path: resolve('./src/components'),
      prefix: 'kx'
    });
  }
});
