<template>
  <footer>
    <el-row>
      <AppLink
        name="home"
        class="logo-font"
      >
        Awesome Queue Analysis
      </AppLink>
      <span class="attribution">
        An interactive queue analysis application from
        <a href="https://thinkster.io">TODO</a>. Code &amp; design licensed under GPL-3.0.
      </span>
    </el-row>
  </footer>
</template>

<style lang="css" scoped>
.logo-font {
    font-family: "Titillium Web", sans-serif;
}
footer {
    background: #f3f3f3;
    margin-top: 3rem;
    padding: 1rem 0;
    position: absolute;
    bottom: 0;
    width: 100%;
}
footer .logo-font {
    vertical-align: middle;
}
footer .attribution {
    vertical-align: middle;
    margin-left: 10px;
    font-size: 0.8rem;
    color: #bbb;
    font-weight: 300;
}

a {
    background-color: transparent;
}

a:active {
    outline: 0;
}

a:hover {
    outline: 0;
}
a {
    color: #409EFF;
    text-decoration: none;
}
a:focus,
a:hover {
    color: #3e88d8;
    text-decoration: underline;
}
a:focus {
    outline: thin dotted;
    outline: 5px auto -webkit-focus-ring-color;
    outline-offset: -2px;
}

a:not([href]) {
    color: inherit;
    text-decoration: none;
}
a:not([href]):focus,
a:not([href]):hover {
    color: inherit;
    text-decoration: none;
}
a:not([href]):focus {
    outline: none;
}
</style>
