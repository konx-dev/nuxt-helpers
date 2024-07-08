<template>
  <div class="container px-4">
    <h1>@konx-dev helper components</h1>
    <div class="flex flex-col gap-4 my-20">
      <kx-link v-for="(link, index) in testData" :aria-label="`link to ${link.title}`" :to="link.value" :key="index">{{
        link.title
      }}</kx-link>
    </div>
    <div class="flex flex-col gap-4 my-20">
      <kx-link v-for="(link, index) in testData" :to="link.value" :key="index">{{ link.title }}</kx-link>
    </div>
  </div>
</template>
<script setup>
const testData = [
  { title: 'google (external with http)', value: 'http://google.com' },
  { title: 'google (external with https)', value: 'https://google.com' },
  { title: 'env:live (home)', value: 'http://konx.dev' },
  { title: 'env:dev (news)', value: 'http://dev.konx.dev/news' },
  { title: 'env:live (about)', value: 'http://konx.dev/about' },
  { title: 'env:test (privacy policy)', value: 'http://test.konx.dev/privacy-policy' },
  { title: 'env:staging (terms & conditions)', value: 'http://staging.konx.dev/terms-conditions' },
  { title: 'env:dev (our team)', value: 'http://dev.konx.dev/our-team' },
  { title: 'mailto', value: 'mailto:person@email.com' },
  { title: 'tel', value: 'tel:123456789' },
  { title: 'null', value: null }
  //{ title: 'undefined', value: undefined },
  //{ title: 'empty object', value: {} },
  //{ title: 'simple string', value: 'a string' },
  //{ title: 'number', value: 123 }
];
</script>
