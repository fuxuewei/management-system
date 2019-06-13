<template>
    <component :is="currentComp"></component>
</template>
<script>
import compA from './compA'
export default {
    data () {
      return {
        currentComp: compA
      }
    },
    methods: {
      changeComp (name) {
        switch (name) {
          case 'compA' : 
            this.currentComp = compA; 
            break;
          case 'compB' : 
            this.currentComp = compA; 
            break;
          case 'compC' : 
            this.currentComp = compA; 
            break;
          default :
            this.currentComp = compA;
            break;
        }
      }
    }
  }
</script>

