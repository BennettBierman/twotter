<template>
    <div class='twoot-item'>
        <div class='twoot'>
            <div class='user'>
                @{{username}}
            </div>
            <div class='content'>
                {{twoot.content}}
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'TwootItem',
    props: {
        username: {
            type: String,
            required: true
        },
        twoot: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.twoot-item{
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    border: solid 1px #DFE3E8;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.25 ease;
    margin-left: 20px;
    width: 85%;

    &:hover{
        transform: scale(1.1, 1.1);
    }

    .user{
        font-weight: bold;
    }
}
</style>