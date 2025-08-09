<script lang="ts">
  import { clamp, to_progress_percent } from "../utils/time";

  interface Props {
    current_seconds: number;
    duration_seconds: number;
    on_seek?: (seconds: number) => void;
  }

  let { current_seconds, duration_seconds, on_seek }: Props = $props();

  let bar: HTMLDivElement | null = null;
  let drag = $state(false);

  const progress = $derived(
    to_progress_percent(current_seconds, duration_seconds)
  );

  function seek_ratio(ratio: number) {
    if (duration_seconds <= 0) return;
    const seconds = clamp(ratio, 0, 1) * duration_seconds;
    on_seek?.(seconds);
  }

  function ratio_from(e: PointerEvent): number {
    if (!bar) return 0;
    const rect = bar.getBoundingClientRect();
    return rect.width > 0
      ? clamp(e.clientX - rect.left, 0, rect.width) / rect.width
      : 0;
  }

  function on_bar_down(e: PointerEvent) {
    e.preventDefault();
    seek_ratio(ratio_from(e));
    drag = true;
  }

  function on_knob_down(e: PointerEvent) {
    e.preventDefault();
    e.stopPropagation();
    drag = true;
  }

  function on_move(e: PointerEvent) {
    if (!drag) return;
    seek_ratio(ratio_from(e));
  }

  function on_up() {
    if (!drag) return;
    drag = false;
  }
</script>

<svelte:window onpointermove={on_move} onpointerup={on_up} />

<div
  class="relative w-full h-1.5 rounded-full bg-neutral-200 cursor-pointer select-none"
  bind:this={bar}
  onpointerdown={on_bar_down}
>
  <div
    class="absolute left-0 inset-y-0 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full pointer-events-none"
    style="width: {progress}%;"
  ></div>

  <button
    type="button"
    class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 size-3 rounded-full bg-gradient-to-t from-rose-500 to-orange-500 ring ring-neutral-100 shadow"
    style="left: {progress}%;"
    onpointerdown={on_knob_down}
    aria-label="Seek"
  ></button>
</div>
