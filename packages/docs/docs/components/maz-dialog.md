---
title: MazDialog
description: MazDialog is a standalone dialog component to show important informations to the user or propose specific action. Many options are available. You can hide the header or the footer, full-size layout, differents states etc.
---

<!-- markdownlint-disable MD033 -->

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

<!--@include: ./../.vitepress/mixins/getting-started.md-->

::: tip
This component usex `<Teleport to="body">` with [MazBackdrop](./maz-backdrop.md), so you can implement this component anywhere and it inherits all its props
:::

## Basic usage

<MazBtn @click="isOpen = true">Open Dialog</MazBtn>

<MazDialog v-model="isOpen" title="Dialog Title">
  <p>
    Your content
  </p>
  <template #footer="{ close }">
    <MazBtn @click="close">
      Confirm
    </MazBtn>
  </template>
</MazDialog>

```vue
<template>
  <MazBtn @click="isOpen = true">Open Dialog</MazBtn>

  <MazDialog v-model="isOpen" title="Dialog Title">
    <p>
      Your content
    </p>
    <template #footer="{ close }">
      <MazBtn @click="close">
        Confirm
      </MazBtn>
    </template>
  </MazDialog>
</template>

<script setup>
  import { ref } from 'vue'
  import MazDialog from 'maz-ui/components/MazDialog'

  const isOpen = ref(false)
</script>
```

## Scrollable

For long content, you can enable scrolling in content part (Header and footer slot remain visible at top and bottom)

::: warning
With this option, an overflow is applied: So, some problems with absolute content may appear - such as `<MazSelect />` opened list can not be visible outside the dialog content part, you should scroll again to show the full content - **Check example below**
:::

<MazBtn @click="scollableOpened = true">Open Scrollable Dialog</MazBtn>

<MazDialog v-model="scollableOpened" title="Dialog Title" max-height="400px" scrollable>
  <template #title>
    Scrollable Dialog Title
  </template>

  <template #default>
    <p class="maz-py-4">
      Scroll
    </p>
    <p class="maz-py-4">
      Scroll
    </p>
    <p class="maz-py-4">
      Scroll
    </p>
    <p class="maz-py-4">
      Scroll
    </p>
    <p class="maz-py-4">
      Scroll
    </p>
    <p class="maz-py-4">
      Scroll
    </p>
    <p class="maz-py-4">
      Scroll
    </p>
    <MazSelect
      :model-value="1"
      :options="[
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 },
        { value: 6, label: 6 },
      ]"
    />
  </template>
  <template #footer>
    <MazBtn @click="scollableOpened = false">
      Confirm
    </MazBtn>
  </template>
</MazDialog>

```html
<MazDialog v-model="scollableOpened" title="Dialog Title" max-height="400px" scrollable>
  <template #title>
    Scrollable Dialog Title
  </template>

  <template #default>
    <p class="maz-py-4">
      Scroll
    </p>
    <p class="maz-py-4">
      Scroll
    </p>
    <p class="maz-py-4">
      Scroll
    </p>
    <p class="maz-py-4">
      Scroll
    </p>
    <p class="maz-py-4">
      Scroll
    </p>
    <p class="maz-py-4">
      Scroll
    </p>
    <p class="maz-py-4">
      Scroll
    </p>
    <MazSelect
      :model-value="1"
      :options="[
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 },
        { value: 6, label: 6 },
      ]"
    />
  </template>
  <template #footer>
    <MazBtn @click="scollableOpened = false">
      Confirm
    </MazBtn>
  </template>
</MazDialog>
```

<!--@include: ./../.vitepress/generated-docs/maz-dialog.doc.md-->

<script setup>
  import { ref } from 'vue'
  const isOpen = ref(false)
  const scollableOpened = ref(false)
</script>
