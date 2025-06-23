<template>
  <!-- payment status start  -->
   <div class="w-full h-auto min-h-[400px] flex items-center justify-center p-[30px]">
    <div class="w-full md:w-1/2 py-[50px] px-[50px] border-[10px] border-[var(--dark-primary-500)] rounded-md mt-[40px]" v-if="$route.query?.status == 'success'">
      <h3 class="text-xl md:text-3xl text-[var(--dark-primary-600)] font-bold text-center">Payment Has Been Completed</h3>
      <h3 class="text-xl md:text-2xl font-bold text-center mt-2">Thanks for subscribing</h3>
    </div>

    <div class="w-full md:w-1/2 py-[50px] px-[50px] border-[10px] border-red-600 rounded-md mt-[40px]" v-if="$route.query?.status != 'success'">
      <h3 class="text-xl md:text-3xl text-red-500 font-bold text-center">{{ $route.query?.msg }}</h3>
      <h3 class="text-xl md:text-2xl font-bold text-center mt-2">Please try again later!</h3>
    </div>
   </div>
  <!-- payment status end -->
</template>
