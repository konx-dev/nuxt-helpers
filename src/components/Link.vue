<template>
  <nuxt-link v-if="isInternal" class="is-internal" :to="'/' + link" :alt="'link to ' + link">
    <slot />
  </nuxt-link>

  <a v-else class="is-external" :href="to" target="_blank">
    <slot />
  </a>
</template>
<script setup>
const props = defineProps({
  to: {
    type: String,
    required: true
  }
});

// Check if props.to is a valid url - not sure what this script does.
// function isValidUrl(string) {
//   let url;

//   try {
//     url = new URL(string);
//   } catch (_) {
//     return false;
//   }

//   console.log(url);

//   return url.protocol === 'http:' || url.protocol === 'https:';
// }

// onMounted(() => {
//   isValidUrl(props.to);
// });

const link = computed(() => {
  const projectUrls = retrieveProjectUrls();
  const collapsedUrls = projectUrls.join('|');

  const regex = new RegExp(collapsedUrls, 'g');

  return props.to.replace(regex, '').replace(/^\/+/g, '');
});

const isInternal = computed(() => {
  // Step 1. check for mailto:/tel: here, short circuit if found
  if (props.to?.includes('mailto') || props.to?.includes('tel:')) {
    //console.log('reached step 1', props.to);
    return false;
  }

  // Step 2. check against projectUrls here
  if (checkProjectUrls()) {
    //console.log('reached step 2', props.to);
    return true;
  }

  // Step 3. nothing left, has to be a external url
  //console.log('reached step 3', props.to);
  return false;
});

const config = useRuntimeConfig();

function retrieveProjectUrls() {
  // check to make sure the urls object exists in the runtimeConfig
  if ('urls' in config.public) {
    const availableUrls = config.public.urls;
    const extractedValues = [];

    for (const key in availableUrls) {
      extractedValues.push(availableUrls[key]);
    }

    return extractedValues;
  }
}

function checkProjectUrls() {
  const projectUrls = retrieveProjectUrls();

  let matchFound = false;

  projectUrls.forEach((url) => {
    if (props.to?.includes(url)) {
      matchFound = true;
    }
  });

  return matchFound;
}
</script>

<!-- 

todo:

[ ] - handle anything being passed as props and fail gracefully (strings, numbers, empty objects etc)
[ ] - look at the docs to see what other props could be supported (custom target sets etc, aria labels, alt text)

-->
