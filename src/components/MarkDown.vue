<script setup lang="ts">

defineProps<{
  data: any
}>();

const observer = new MutationObserver(addPreCopyButton);
observer.observe(document.body, { childList: true, subtree: true });

document.addEventListener("DOMContentLoaded", addPreCopyButton);

function addPreCopyButton() {
  observer.disconnect();

  let codeBlocks = Array.from(document.querySelectorAll("pre"));

  for (let codeBlock of codeBlocks) {
    if (codeBlock.parentElement?.nodeName === "DIV" && codeBlock.parentElement?.classList.contains("code-block")) continue

    let wrapper = document.createElement("div");
    wrapper.className = "relative code-block my-3";

    let copyButton = document.createElement("button");
    copyButton.className = "copy-btn text-white btn-regular-dark absolute active:scale-90 h-8 w-8 top-2 right-2 opacity-75 text-sm p-1.5 rounded-lg transition-all ease-in-out";

    if (codeBlock.parentNode) {
      codeBlock.parentNode.insertBefore(wrapper, codeBlock);
    }

    let copyIcon = `<svg class="copy-btn-icon copy-icon" fill='white'  xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"><path d="M368.37-237.37q-34.48 0-58.74-24.26-24.26-24.26-24.26-58.74v-474.26q0-34.48 24.26-58.74 24.26-24.26 58.74-24.26h378.26q34.48 0 58.74 24.26 24.26 24.26 24.26 58.74v474.26q0 34.48-24.26 58.74-24.26 24.26-58.74 24.26H368.37Zm0-83h378.26v-474.26H368.37v474.26Zm-155 238q-34.48 0-58.74-24.26-24.26-24.26-24.26-58.74v-515.76q0-17.45 11.96-29.48 11.97-12.02 29.33-12.02t29.54 12.02q12.17 12.03 12.17 29.48v515.76h419.76q17.45 0 29.48 11.96 12.02 11.97 12.02 29.33t-12.02 29.54q-12.03 12.17-29.48 12.17H213.37Zm155-238v-474.26 474.26Z"/></svg>`
    let successIcon = `<svg class="copy-btn-icon success-icon" fill='white' xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"><path d="m389-377.13 294.7-294.7q12.58-12.67 29.52-12.67 16.93 0 29.61 12.67 12.67 12.68 12.67 29.53 0 16.86-12.28 29.14L419.07-288.41q-12.59 12.67-29.52 12.67-16.94 0-29.62-12.67L217.41-430.93q-12.67-12.68-12.79-29.45-.12-16.77 12.55-29.45 12.68-12.67 29.62-12.67 16.93 0 29.28 12.67L389-377.13Z"/></svg>`

    copyButton.innerHTML = `${copyIcon}`

    wrapper.appendChild(codeBlock);
    wrapper.appendChild(copyButton);

    let timeout: ReturnType<typeof setTimeout>;
    copyButton.addEventListener("click", async () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      let text = codeBlock?.querySelector("code")?.innerText;
      if (text === undefined) return;
      await navigator.clipboard.writeText(text);
      copyButton.innerHTML = `<div>${successIcon}</div>`
      timeout = setTimeout(() => {
        copyButton.innerHTML = `<div>${copyIcon}</div>`
      }, 1000);
    });
  }

  observer.observe(document.body, { childList: true, subtree: true });
}

const { params } = useRoute()

</script>

<template>
  <div class="my-6 highlight-code" v-motion="{
    initial: {
      y: 100,
      opacity: 0
    },
    enter: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 200
      }
    },
    leave: {
      y: -100,
      opacity: 0,
    }
  }">
    <ContentRenderer :value="data" />
  </div>
</template>

<style>
.highlight-code {

  p,
  ul,
  li {
    @apply text-xs sm:text-base md:text-base
  }


  h1 {
    @apply text-[1.1rem] sm:text-[1.5rem] md:text-[2rem];
    font-weight: bolder;
  }

  pre {
    overflow-x: auto;
  }

  code {
    @apply text-slate-400;
  }

  h2 {
    font-weight: bolder;
    @apply text-[1.2rem] md:text-[1.5rem];
  }

  h3 {
    @apply text-[1rem] md:text-[1.3rem];
    font-weight: bolder;
  }

  h4 {
    font-weight: bolder;
    @apply text-[1rem] md:text-[1.2rem];
  }

  ul {
    list-style: inside;
    padding-left: 24px;
  }

  ol {
    list-style: decimal;
    padding-left: 16px;
  }

  p {
    @apply text-[.8rem] md:text-[1rem]
  }

  pre {
    @apply p-4 rounded-md bg-[#141617];

    code {
      @apply text-xs sm:text-sm md:text-base
    }
  }


  blockquote {
    @apply border-l-4 pl-4 py-2 border-cyan-300 text-cyan-300;
  }

  .line-code {
    @apply bg-cyan-800/50 py-0 px-1 rounded-md text-cyan-300;
  }

  img {
    @apply w-auto sm:w-[500px] md:w-[600px] my-3 object-cover rounded-md;
  }

}
</style>
