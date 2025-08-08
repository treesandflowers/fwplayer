<script lang="ts">
  interface VideoTiming {
    current_seconds: number;
    duration_seconds: number;
  }

  interface Data {
    file: File | null;
    video: VideoTiming;
  }

  let data: Data = $state({
    file: null,
    video: {
      current_seconds: 1234,
      duration_seconds: 4845,
    },
  });

  import { clamp, to_progress_percent, format_time } from "../utils/time";
  import ProgressBar from "../components/progress-bar.svelte";
</script>

<!-- window handlers removed; handled inside ProgressBar component -->

<div class="flex flex-col justify-between gap-2 h-screen w-screen p-2">
  <main class="flex-1">
    {#if !data.file}
      <div class="flex flex-col items-center justify-center h-full">
        <h1 class="text-2xl font-semibold text-neutral-400">
          No video selected
        </h1>
        <p class="text-sm text-neutral-400">Select a video to play</p>

        <!-- temp -->
        <input type="file" />
      </div>
    {:else}
      <!-- Video -->
    {/if}
  </main>

  <aside
    class="flex flex-row items-center gap-4 backdrop-blur shadow bg-white/5 py-2 px-4 rounded-xl"
  >
    {#snippet time(s: number)}
      {@const f = format_time(s)}
      <p class="flex flex-row items-center text-xs text-neutral-100 font-mono">
        {f.hour}
        <span class="text-neutral-400">:</span>
        {f.minute}
        <span class="text-neutral-400">:</span>
        {f.second}
      </p>
    {/snippet}
    <!-- current time -->
    {@render time(data.video.current_seconds)}

    <!-- progress bar -->
    <ProgressBar
      current_seconds={data.video.current_seconds}
      duration_seconds={data.video.duration_seconds}
      on_seek={(s) => (data.video.current_seconds = s)}
    />

    {@render time(data.video.duration_seconds)}
  </aside>
</div>
