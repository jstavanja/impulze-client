<script setup lang="ts">
import useSWRV from 'swrv'

import { ImpulzeResponse } from '../types/Impulze'
import ImpulzeList from '../components/ImpulzeList.vue'
import ActionBar from '../components/ActionBar.vue'
import ActiveImpulzeList from '../components/ActiveImpulzeList.vue'
import Header from '../components/Header.vue'
import ImpulzeModal from '../components/ImpulzeModal.vue'
import Pill from '../components/atoms/Pill.vue'
import Loader from '../components/atoms/Loader.vue'
import API_ROUTES from '../constants/api-routes'
import axiosFetcher from '../utils/fetchers/axios'

const { data: impulzes } = useSWRV<ImpulzeResponse[]>(
  API_ROUTES.IMPULZE.INDEX,
  axiosFetcher
)
</script>

<template>
  <div>
    <Header />
    <main class="app-content">
      <template v-if="impulzes">
        <div class="no-impulzes" v-if="impulzes.length === 0">
          🙈 <span>No impulzes yet.</span>
          Create your first impulze using the
          <Pill variant="secondary">Add an Impulze</Pill>
          button above.
        </div>
        <template v-else>
          <ActiveImpulzeList :active-impulzes="impulzes" />
          <ActionBar :impulzes="impulzes" />
          <ImpulzeList :impulzes="impulzes" />
        </template>
      </template>
      <Loader v-else />
    </main>
    <ImpulzeModal />
  </div>
</template>

<style lang="scss">
@import '../styles/_variables.scss';
@import '../styles/mixins.scss';

.app-content {
  @include limit-max-width;
  padding: $spacing-2;
}

.no-impulzes {
  padding: $spacing-8;
  background-color: $gray-50;
  border-radius: $border-radius;
  font-size: $font-size-md;
}
</style>
