<template>
    <div class='user-profile'>
        <div class="sidebar">
            <div class='user-panel'>
                <h1 class='username'>@{{state.user.username}}</h1>
                <div class='admin-badge' v-if="state.user.isAdmin">
                    Admin
                </div>
                <div class='follow-count'><strong>Followers: </strong> {{followers}}</div> 
            </div>
            <CreateTwootPanel @add-twoot="addTwoot"/>
        </div>
        <div class='twoots-wrapper'>
            <TwootItem 
                v-for="twoot in state.user.twoots" 
                :key="twoot.id" 
                :username="state.user.username" 
                :twoot="twoot"
                @favorite="toggleFavorite"
            />
        </div>
    </div>
</template>

<script>
import {reactive, onMounted, computed} from 'vue';
import {useRoute} from 'vue-router';
import {users} from '../assets/users';
import TwootItem from '../components/TwootItem';
import CreateTwootPanel from '../components/CreateTwootPanel';

export default {
  name: 'UserProfile',
  components: { TwootItem, CreateTwootPanel},

//setup(props, ctx) is the full setup but you can't define var and not use them
  setup(){
      const route = useRoute();
      const userId = computed(() => route.params.userId);


      const state = reactive({
        followers: 0,
        user: users[userId.value - 1] || users[0]
      });

      function addTwoot(twoot){
          // state.user.twoots.push({...}) adds twoot to end of the list rather than the front
          state.user.twoots.unshift({id: state.user.twoots.length + 1, content: twoot});
      }

      const mounted = onMounted(() => console.log('MOUNTED'));

      return{
          state,
          addTwoot,
          mounted,
          userId
      };
    }
}
</script>

<style lang="scss" scoped>
.user-profile {
    display: grid;
    grid-template-columns: 1fr 3fr;
    width: 100%;
    padding: 50px 5%;

    .user-panel{
        display: flex;
        flex-direction: column;
        margin-right: 50px;
        padding: 20px;
        background-color: white;
        border-radius: 5px;
        border: 1px solid #DFE3E8;
        align-items: flex-start;

        h1 {
            margin: 0;
        }
        
        .admin-badge{
            background-color: rebeccapurple;
            color: white;
            border-radius: 5px;
            margin-right: auto;
            padding: 0 10px;
            font-weight: bold;

        }
    }
    .twoots-wrapper{
        display: grid;
        grid-gap:10px;
    }
}
</style>