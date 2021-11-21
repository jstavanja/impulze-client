<script setup lang="ts">
const currentlyLoggedInUser = 'Jaka' // TODO: useUser
</script>

<template>
  <header>
    <div>
      <span>Impulze</span>

      <button type="button">Add an Impulze</button>
    </div>

    <div>Welcome back, {{ currentlyLoggedInUser }}!</div>
    <button type="button">Log out</button>
  </header>
</template>
