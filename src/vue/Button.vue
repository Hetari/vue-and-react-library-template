<!-- src/vue/Button.vue -->
<template>
  <button>{{ label }}</button>
</template>

<script setup lang="ts">
  import { defineComponent } from 'vue';

  defineComponent({
    name: 'Button',
    props: {
      label: String
    }
  });

  defineProps<{
    label: string;
  }>();
</script>
