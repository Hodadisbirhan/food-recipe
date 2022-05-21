<script setup>
const props = defineProps({
  like: Number,
  timer: String,
  comment: Number,
});
</script>
<template>
  <div class="flex gap-4 drop-shadow-2xl">
    <div class="flex items-center justify-center gap-1">
      <svg
        class="w-6 h-5 fill-blue-700"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="ThumbUpAltIcon"
      >
        <path
          d="M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2v11zm19.83-7.12c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66-.23-.45-.52-.86-.88-1.22L14 2 7.59 8.41C7.21 8.79 7 9.3 7 9.83v7.84C7 18.95 8.05 20 9.34 20h8.11c.7 0 1.36-.37 1.72-.97l2.66-6.15z"
        ></path>
      </svg>

      <span class="text-sm">{{ like }}</span>
    </div>

    <div class="flex items-center justify-center gap-1">
      <svg
        class="w-6 h-5 fill-slate-400"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="ChatBubbleIcon"
        tabindex="-1"
        title="ChatBubble"
      >
        <path
          d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
        ></path>
      </svg>
      <span>{{ comment }}</span>
    </div>

    <div class="flex items-center justify-center gap-1">
      <svg
        class="w-6 h-5"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="AccessTimeIcon"
        tabindex="-1"
        title="AccessTime"
      >
        <path
          d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
        ></path>
        <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
      </svg>

      <span class="text-sm"> {{ timer }} </span>
    </div>
  </div>
</template>
