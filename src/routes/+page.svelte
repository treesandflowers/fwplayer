<script lang="ts">
  import { getCurrentWindow } from "@tauri-apps/api/window";

  import { format_time } from "../utils/time";
  import ProgressBar from "../components/progress-bar.svelte";
  import ControlBar from "../components/control-bar.svelte";
  import { fly, slide } from "svelte/transition";
  import { HoverDetector } from "../components/hover-detector.svelte";
  import { invoke } from "@tauri-apps/api/core";
  import { listen } from "@tauri-apps/api/event";

  const hover = new HoverDetector();
  const window = getCurrentWindow();
  const actions = {
    close: async () => await window.close(),
    minimize: async () => await window.minimize(),
    maximize: async () =>
      (await window.isMaximized())
        ? await window.unmaximize()
        : await window.maximize(),
  };

  const file_selector = async () => await invoke("select_file");

  let src = $state("");
</script>

<header
  class="drag flex flex-row items-center justify-between gap-2 h-8 bg-white/1 border-white/20"
>
  <!-- logo -->
  <div class="ml-2 h-full flex items-center flex-row gap-2">
    <img src="/fwplayer.png" alt="logo" class="size-6" />
  </div>

  <!-- actions -->
  <div class="flex items-center h-full z-10">
    {#snippet action({
      icon,
      danger,
      fn,
    }: {
      icon: string;
      danger?: boolean;
      fn: () => void;
    })}
      <button
        class="{danger
          ? 'hover:bg-rose-600'
          : 'hover:bg-white/5'} text-neutral-200 h-full px-4 aspect-square text-xs hover:text-neutral-200 icons"
        onclick={fn}
      >
        {@html icon}
      </button>
    {/snippet}

    {@render action({ icon: "&#xE921;", fn: actions.minimize })}
    {@render action({ icon: "&#xE922;", fn: actions.maximize })}
    {@render action({ icon: "&#xE8BB;", fn: actions.close, danger: true })}
  </div>
</header>

<main class="absolute inset-0 flex items-center justify-center flex-col gap-2">
  <button
    onclick={file_selector}
    class="relative bg-gradient-to-t from-neutral-400 to-neutral-200 rounded-md py-2 px-4"
  >
    <div
      class="absolute h-full w-full border-1 border-neutral-500 shadow inset-0 rounded-md py-2 px-4"
    ></div>
    <p class="text-sm text-neutral-900">Select a video</p>
  </button>
</main>

<!-- mouse area trigger -->
<div
  bind:this={hover.element}
  class="absolute h-24 bottom-2 left-2 right-2 invisible pointer-events-none"
></div>

{#if hover.hovering}
  <aside
    in:slide={{ duration: 300 }}
    out:fly={{ y: 50, duration: 300 }}
    class="absolute h-24 bottom-2 left-2 right-2 z-10 flex flex-col items-center backdrop-blur shadow bg-gradient-to-t from-neutral-900 to-neutral-800 rounded-xl"
  >
    <!-- border -->
    <div
      class="absolute inset-0 w-full border border-white/25 rounded-xl pointer-events-none"
    ></div>

    <div class="w-full p-4 flex flex-col gap-2">
      <!-- time-->
      <div class="flex flex-row items-center gap-2.5 w-full">
        {#snippet time(s: number)}
          {@const f = format_time(s)}
          <p
            class="flex flex-row items-center text-xs text-neutral-200 font-mono"
          >
            {f.hour}
            <span class="text-neutral-400">:</span>
            {f.minute}
            <span class="text-neutral-400">:</span>
            {f.second}
          </p>
        {/snippet}
        <!-- current time -->
        {@render time(0)}

        <!-- progress bar -->
        <ProgressBar
          current_seconds={0}
          duration_seconds={0}
          on_seek={(s) => {}}
        />

        <!-- duration -->
        {@render time(0)}
      </div>

      <!-- control bar -->
      <ControlBar playing={false} volume={0} />
    </div>
  </aside>
{/if}
