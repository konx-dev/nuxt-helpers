<!-- 

Nuxt-Link extended description:

- Accepts an 'to' prop, the assumption is this a valid link from the data layer
- 'isInternal' computed property establishes link validity (internal / external)
- Utilises .env to reference urls to check against (example below)
- Builds the internal link by stripping matched domains and slash prop if specified
- Reassigns any invalid URLs to null to prevent active link creation

Props:

Required - to
Optional - rel, target, slash, ariaLabel

Required config layout for project urls:

runtimeConfig: {
  public: {
    urls: {
      dev: process.env.DEV_URL,
      test: process.env.TEST_URL,
      staging: process.env.STAGING_URL,
      live: process.env.LIVE_URL
    }
  }
}

-->

<template>
  <nuxt-link v-if="isInternal" class="is-internal" :to="buildInternalLink(link)" :aria-label="ariaLabel">
    <slot />
  </nuxt-link>

  <a v-else class="is-external" :rel="rel" :href="link" :target="target" :aria-label="ariaLabel">
    <slot />
  </a>
</template>
<script setup>
const props = defineProps({
  to: {
    type: String,
    required: true
  },
  ariaLabel: {
    type: String,
    required: false // i.e 'Read more about X's new Y'
  },
  rel: {
    type: String,
    default: 'noopener noreferrer'
  },
  target: {
    type: String,
    default: '_blank'
  },
  slash: {
    type: String,
    default: 'prepend' // 'prepend', 'append', 'none'
  }
});

const config = useRuntimeConfig();
const linkIsValid = isValidUrl(props.to);

const link = computed(() => {
  const projectUrls = retrieveProjectUrls();
  const collapsedUrls = projectUrls.join('|');

  const regex = new RegExp(collapsedUrls, 'g');

  // If its determined not to be a valid link, reassign to null and gracefully fail making the button unclickable
  if (linkIsValid) {
    return props.to.replace(regex, '').replace(/^\/+/g, '');
  } else {
    return null;
  }
});

const isInternal = computed(() => {
  // Wrapper for url check to catch numbers, strings, null, undefined, object objects
  if (linkIsValid) {
    // Step 1. check for mailto:/tel: here, short circuit if found
    if (props.to.includes('mailto') || props.to.includes('tel:')) {
      return false;
    }
    // Step 2. check against .env projectUrls here
    if (checkProjectUrls()) {
      return true;
    }
    // Step 3. nothing left, has to be a external url
    return false;
  }
});

// Check if props.to is a valid url
function isValidUrl(string) {
  let url;
  try {
    url = new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

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
    if (props.to.includes(url)) {
      matchFound = true;
    }
  });

  return matchFound;
}

function buildInternalLink(link) {
  if (props.slash === 'prepend') {
    return `/${link}`;
  } else if (props.slash === 'append') {
    return `${link}/`;
  } else {
    return link;
  }
}
</script>

<!-- 

todo:

[ ] - what happens if the env variables are missing from the project?

-->
