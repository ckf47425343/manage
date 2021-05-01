<template>
    <div class="main">
     <header class="header">
       <div class="change_bg">

       </div>
      <div class="user_nav">
          <UserNav>
        
            
          </UserNav>
        </div>

     </header>
      <div class="aside ">
       
        <div class="aside_box">
          <MenuList>


          </MenuList>
        </div>
      </div>
      <div class="main_content">
        
         <div class="content">
             <router-view></router-view>
         </div>
      </div>
    
     
      
    </div>
</template>

<script>
 import MenuList from '../components/MenuList.vue'
 
 import UserNav from '../components/UserNav.vue'
 import '../assets/less/main.less'
    export default {
        name:'Main',
         components:{
          MenuList,
          UserNav,
        
        },
        created() {
          // this.$router.push({name:'Home'})
        },
    }
</script>

<style lang="less" scoped>

</style>