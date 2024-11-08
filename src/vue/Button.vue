<template>
  <button>{{ label }}</button>
</template>

<script setup lang="ts">
  import { defineComponent } from 'vue';

  defineComponent({
    name: 'Button',
    props: {
      label: String
    },
    setup(props) {
      return {
        label: props.label
      };
    }
  });

  defineProps<{
    label: String;
  }>();
</script>
