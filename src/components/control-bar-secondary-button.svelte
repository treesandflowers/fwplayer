<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children?: Snippet<[]>;
  }

  let { children }: Props = $props();
</script>

<button class="hover:bg-white/5 rounded-md p-2">
  {@render children?.()}
</button>
