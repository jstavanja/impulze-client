<template>
  <div class="layout-auth">
    <div class="layout-auth__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@import '../styles/mixins';
.layout-auth {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.layout-auth__content {
  flex: 1;
  @include limit-max-width;
}
</style>
