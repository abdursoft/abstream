<template>
  <div class="p-1 w-full">
    <label :for="model" class="my-2">{{ label }}</label>
    <InputText :type="type" :id="model" v-model="model" :placeholder="placeholder" class="w-full rounded-[12px] p-3 border border-black-500" />
    <div class="small-text text-red-500" v-if="msg">{{ msg }}</div>
  </div>
</template>

<script setup>
const model = defineModel({
  type: null,
  required: true,
})

defineProps({
  label: {
    type: String,
  },
  type: {
    type: String,
    default: 'text'
  },
  icon: {
    type: String,
  },
  placeholder: String,
  msg: String
});
</script>
