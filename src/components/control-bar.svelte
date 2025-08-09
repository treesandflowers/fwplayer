<script lang="ts">
  import {
    Info,
    Pause,
    Play,
    VolumeOff,
    Volume1,
    Volume2,
    Captions,
  } from "@lucide/svelte";
  import ControlBarSecondaryButton from "./control-bar-secondary-button.svelte";

  interface Props {
    playing: boolean;
    volume: number;
  }

  let { playing = $bindable(), volume = $bindable() }: Props = $props();

  const toggle = () => {
    playing = !playing;
  };
</script>

{#snippet volume_icon(v: number)}
  {#if v === 0}
    <VolumeOff class="size-5 text-neutral-200" />
  {:else if v < 50}
    <Volume1 class="size-5 text-neutral-200" />
  {:else}
    <Volume2 class="size-5 text-neutral-200" />
  {/if}
{/snippet}

<!-- controls -->
<div class="flex flex-row items-center gap-4 justify-between w-full">
  <!-- alignment -->
  <div class="w-full"></div>

  <!-- controls -->
  <div class="w-full items-center justify-center flex">
    <button
      class="flex items-center justify-center size-10 relative bg-gradient-to-t from-rose-500 to-orange-500 rounded-full"
      onclick={toggle}
    >
      <div
        class="rounded-full border-2 border-white/20 absolute size-full"
      ></div>

      {#if playing}
        <Pause class="size-6 text-neutral-100" />
      {:else}
        <Play class="size-6 text-neutral-100" />
      {/if}
    </button>
  </div>

  <!-- secondary controls -->
  <div class="w-full items-center justify-end flex">
    <ControlBarSecondaryButton
      ><Captions class="size-5 text-neutral-200" />
    </ControlBarSecondaryButton>

    <ControlBarSecondaryButton>
      {@render volume_icon(volume)}
    </ControlBarSecondaryButton>

    <ControlBarSecondaryButton
      ><Info class="size-5 text-neutral-200" />
    </ControlBarSecondaryButton>
  </div>
</div>
