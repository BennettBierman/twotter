<template>
    <form class='create-twoot' @submit.prevent="createNewTwoot" :class="{'--exceeded': newTwootCharacterCount > 180}">
        <label for="newTwoot"><strong>New Twoot</strong> ({{newTwootCharacterCount}}/180)</label>
        <textarea id="newTwoot" row="4" v-model="state.newTwootContent"/>

        <div class="submit">
            <div class='create-twoot-type'>
                <label for="newTwootType"><strong>Type: </strong></label>
                <select id="newTwootType" v-model="state.selectedTwootType">
                    <option 
                        v-for="(option, index) in state.twootTypes"
                        :key="index"
                        :value="option.value"
                    >
                        {{option.name}}
                    </option>
                </select>
            </div>
            <button>Twoot!</button>
        </div>
    </form>  
</template>

<script>
import {reactive, computed} from 'vue';

export default {
    name:"CreateTwootPanel",
    setup(props, ctx){
        const state = reactive({
            newTwootContent: '',
            selectedTwootType: 'instant',
            twootTypes:[
                {value: 'draft', name: 'Draft'},
                {value: 'instant', name: 'Instant Twoot'}
            ]
        });

        //These methods compute things like FullName and NumberOfCharacters
        const newTwootCharacterCount = computed(() => state.newTwootContent.length);

        function createNewTwoot(){
            if(state.newTwootContent && state.selectedTwootType !== 'draft'){
                ctx.emit('add-twoot', state.newTwootContent);
                state.newTwootContent = '';
            }
        }

        return {
            state,
            newTwootCharacterCount,
            createNewTwoot
        };
    },
}
</script>

<style lang="scss" scoped>

.create-twoot {
    display: flex;
    flex-direction: column;
    padding-top: 20px 0;
    margin-top: 20px;
    
    textarea{
        border: 1px solid #dfe3e8;
        border-radius: 5px;
    }

     .submit{
        display: flex;
        justify-content: space-between;

        .create-twoot-type{
            padding: 10px 0;
        }

        button{
            padding: 5px 20px;
            margin: auto 0;
            border-radius: 5px;
            border: none;
            background-color: deeppink;
            color: white;
            font-weight: bold;
        }
    }

    &.--exceeded{
        color: red;
        border-color: red; 

        .submit{
            button{
                background-color:red;
                border:none;
                color:white
            }
        }
    }
}

</style>