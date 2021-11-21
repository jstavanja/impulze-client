<script setup lang="ts">
import useSWRV from 'swrv'

import { Impulze } from './types/Impulze'
import ImpulzeList from './components/ImpulzeList.vue'
import ActionBar from './components/ActionBar.vue'
import ActiveImpulzeList from './components/ActiveImpulzeList.vue'
import Header from './components/Header.vue'
import ImpulzeModal from './components/ImpulzeModal.vue'

const { data: impulzes } = useSWRV<Impulze[]>('http://localhost:8080/impulzes')
</script>

<template>
  <Header />
  <main class="app-content">
    <ActiveImpulzeList :active-impulzes="impulzes" v-if="impulzes" />
    <ActionBar />
    <ImpulzeList :impulzes="impulzes" v-if="impulzes" />
  </main>
  <ImpulzeModal />
</template>

<style lang="scss">
@import './styles/_variables.scss';
@import './styles/mixins.scss';
@import './styles/reset.scss';
@import './styles/z-indices.scss';

body,
HTML {
  font-family: 'Poppins', sans-serif;
  color: $black;
  font-size: 14px;
}

.app-content {
  @include limit-max-width;
  padding: $spacing-2;
}
</style>
