<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition || 'fade'">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style lang="scss">
@import './styles/_variables.scss';
@import './styles/reset.scss';
@import './styles/z-indices.scss';
@import './styles/transitions.scss';

body,
HTML {
  font-family: $font-family-primary;
  color: $black;
  font-size: 14px;
}

p, button, span, a, input, h1, h2, h3, h4, h5, h6 {
  font-family: $font-family-primary;
  line-height: 1;
}
</style>
