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
  <main>
    <h1>Impulzes</h1>
    <ActiveImpulzeList :activeImpulzes="impulzes" />
    <ActionBar />
    <ImpulzeList :impulzes="impulzes" />
  </main>
  <ImpulzeModal />
</template>

<style></style>
