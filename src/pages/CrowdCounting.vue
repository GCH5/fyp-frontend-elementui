<template>
  <div class="bgimg">
    <div class="middle">
      <hr>
      <h1>Coming Soon!</h1>
      <hr>
    </div>
  </div>
</template>
<style lang="css" scoped>
.middle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

h1 {
  font-size: 6em;
}

.bgimg {
  background-image: url('src/assets/img/comingSoon.jpg');
  background-position: center;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  font-family: "Titillium Web", sans-serif;
  margin: 0;
  color: white;
  padding: 0;
}
</style>
