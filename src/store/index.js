import { createStore } from 'vuex'

export default createStore({
    state: {
        id: 0,
        todos: [],
        options: [
            {value: -1, label: 'すべて'},
            {value: 0, label: '作業中'},
            {value: 1, label: '完了'}
        ],
        current: -1
    },
    mutations: {
        addTask (state, payload) {
            state.todos.push({
                id: state.id,
                todo: payload.todoItem,
                state: 0
            })
            state.id++
        },
        changeState (state, payload) {
            const todoItem = state.todos.find(el => el.id === payload.id)
            todoItem.state = payload.state ? 0 : 1
        },
        removeTodo (state, payload) {
            const removeTodoItem = state.todos.indexOf(state.todos.find(el => el.id === payload))
            state.todos.splice(removeTodoItem, 1)
        }
    },
    actions: {
        addTask ({commit}, payload) {
            commit('addTask', payload)
        },
        changeState ({commit}, payload) {
            commit('changeState', payload)
        },
        removeTodo ({commit}, payload) {
            commit('removeTodo', payload)
        }
    },
    getters: {
        currentTodos: state => state.todos.filter(el => {
            return state.current < 0 ? true : state.current === el.state
        }),
        todoLabel: state => state.options.reduce((a, b) => {
            return Object.assign(a, {[b.value]: b.label})
        })
    },
    modules: {}
})
