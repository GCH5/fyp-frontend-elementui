<template>
  <div id="background">
    <el-row
      justify="space-around"
      :gutter="10"
    >
      <el-col :span="1" />
      <el-col
        id="imgcol"
        :span="11"
      >
        <img src="src/assets/img/queue.gif">
      </el-col>
      <el-col
        :span="11"
        style="font-size: 18px"
      >
        <div id="textbox">
          <h2>Awesome Queue Analysis: Start your queue analysis in one minute</h2>
          <p>
            Queue analysis is the study of a queue. There are two essential
            characteristics of a queue, the current waiting time of a queue, and
            the queue length. To analyze a queue, the observer needs to track
            every person in the queue, to record their position and waiting time.
          </p>
          <p>
            Recent developments in Computer Vision and Deep Learning makes it
            possible to perform queue analysis, and all it costs is simply a
            surveillance camera. With queue analysis, the true status of a queue
            could be visually revealed for store owners, station managers, and
            event organizers, which could help them make more statistically
            sensible choices, and allocate resources more appropriately.
          </p>
          <p>Our project has two main contributions:</p>
          <ul>
            <li>
              A robust queue analysis algorithm designed for single-viewed
              surveillance camera
            </li>
            <li>
              A user-friendly web application with the corresponding API server,
              which the user could easily interacted with to perform the queue
              analysis and get the analysis results
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="1" />
    </el-row>
  </div>
</template>

<style lang="css" scoped>
h2 {
  font-family: Poppins, sans-serif;
  color: #1d2026;
}

p {
  line-height: 1.7;
  font-family: Poppins, sans-serif;
  color: #1d2026;
  margin-block-start: 1.3em;
  margin-block-end: 1.3em;
}

#textbox {
  background-color: #fff;
  box-shadow: 0 0 37px rgb(80 94 100 / 7%);
  padding: 2em 4em;
}

li {
  font-family: Poppins, sans-serif;
  color: #1d2026;
  margin-block-start: 1.3em;
  margin-block-end: 1.3em;
}

#background {
  background: linear-gradient(90deg, transparent 4em, #f9fafe 0);
}

#imgcol {
  text-align: center;
  padding-top: 10em;
}
</style>
