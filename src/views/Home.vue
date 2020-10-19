<template>
    <div class="home">
        <h1>ToDoリスト</h1>
        <div class="radio-group">
            <label v-for="label in this.$store.state.options" :key="label.length">
                <input
                    type="radio"
                    v-model="this.$store.state.current"
                    :value="label.value">
                {{ label.label }}
            </label>
        </div>
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>コメント</th>
                <th>状態</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="todo in currentTodos" :key="todo.id">
                <td>{{ todo.id }}</td>
                <td>{{ todo.todo }}</td>
                <td>
                    <button @click="changeState(todo)">{{ todoLabel[todo.state] }}</button>
                </td>
                <td>
                    <button @click="removeTodo(todo.id)">削除</button>
                </td>
            </tr>
            </tbody>
        </table>
        <h2>新規タスクの追加</h2>
        <form @submit.prevent="addTask">
            <label for="add-task">
                <input type="text" id="add-task" ref="todo">
            </label>
            <button type="submit" class="button">追加</button>
        </form>
    </div>

</template>

<script>
export default {
    name: 'Home',
    computed: {
        currentTodos () {
            return this.$store.getters.currentTodos
        },
        todoLabel () {
            return this.$store.getters.todoLabel
        }
    },
    methods: {
        addTask () {
            if (this.$refs.todo.value === '') return;
            this.$store.dispatch('addTask', {todoItem: this.$refs.todo.value})
            this.$refs.todo.value = ''
        },
        changeState (todo) {
            this.$store.dispatch('changeState', todo)
        },
        removeTodo (id) {
            this.$store.dispatch('removeTodo', id)
        }
    }
}
</script>
