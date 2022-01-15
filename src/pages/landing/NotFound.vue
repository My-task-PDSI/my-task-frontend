<template>
<div class="notFound-container">
  <div id="main">
      <div id="img-logo"></div>
      
      <div id="content">
          <div class="content-body">
              <h1>Not Found</h1>
              
              <p>Desculpe, essa página não foi encontrada :/</p>
          </div>
      </div>
  </div>
</div>
</template>
<script>
export default {
  name: "NotFound",
};
</script>

<style>
.notFound-container {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

#main {
    overflow-x: hidden;
    display: flex;
    height: 100vh;
    gap: .5em;
}

#img-logo, #content {
    height: 100%;
    width: 50%;
}

#img-logo {
    background-image: url('../../assets/octopus_grande.jpg');
    background-repeat: no-repeat;
}

#content {
    display: flex;
    align-items: center;
    justify-content: center;
}

.content-body {
    width: 450px;
    text-align: center;
}

.content-body h1 {
    font-size: 2em;
    margin-bottom: .5em;
    color: rgba(0, 0, 0, 0.85);
}

.content-body p {
    font-size: 1.5em;
    color: rgba(0, 0, 0, 0.8);
    margin-bottom: 1em;
}

/* Responsivo 1240px */

@media(max-width: 1240px) {
    #main {
        flex-direction: column;
        gap: 4.5em;
    }

    #img-logo, #content {
        width: 100%;
    }

    #img-logo {
        height: 369px;
        background-image: url('../../assets/octopus_medio.jpg');
    }

    #content {
        height: max-content;
        padding: 0 10px;
    }
}
/* Responsivo 470px */

@media(max-width: 470px) {
    #img-logo {
        height: 281px;
        background-image: url('../../assets/octopus_pequeno.jpg');
    }
}
</style>