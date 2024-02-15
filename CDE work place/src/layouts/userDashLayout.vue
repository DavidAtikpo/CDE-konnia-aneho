<template>
  <div class="main">
    <div class="side-bar">
      <slot name="sidebar"></slot>
    </div>
    <div class="container">
      <div class="top-bar"><slot name="topbar"></slot></div>
      <div class="dashboard"><slot name = "dashboard"></slot>
      </div>
      </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="css" scoped>
body{
  body{
  height: 100vh;
}
}
.main {
  display: flex;
  width: 100%;
  height: 100vh;
}
.side-bar {
  width: 15%;
  height: 100vh;
}
.container {
  width: 85%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.top-bar {
  width: 100%;
  height: 3rem;
  background-color: rgb(239, 238, 238);
}
.dashboard {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
}
</style>