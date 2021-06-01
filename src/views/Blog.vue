<template>
  <div>
    <header>
      <menuList></menuList>
    </header>
    <section style="background: #f0f0f0;height: 100%">
      <div class="container">
        <div class="contentArea">
          <blogList></blogList>
        </div>
        <div class="right">
          <personalInfo class="personalCard"></personalInfo>
        </div>
      </div>
    </section>
    <footer></footer>
  </div>
</template>

<script>
import menuList from "../components/Menu";
import blogList from "../components/BlogList";
import personalInfo from "../components/PersonalInfo";
require("../viewStyle/blog.scss");
export default {
  components: {
    menuList,
    blogList,
    personalInfo,
  }
};
</script>