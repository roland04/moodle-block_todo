// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Mutations class.
 *
 * @module     block_todo/local/mutations
 * @copyright  2023 Mikel Martín <mikel@moodle.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class Mutations {
    /**
     * Add a new todo.
     *
     * @param {StateManager} stateManager the current state
     * @param {object} todo the todo to add
     */
    addTodo(stateManager, todo) {
        const state = stateManager.state;
        stateManager.setReadOnly(false);
        // TODO: Generate a propper id.
        const id = Math.floor(Math.random() * 1000);
        state.todos.add({id, ...todo});
        stateManager.setReadOnly(true);
    }

    /**
     * Add a new todo.
     *
     * @param {StateManager} stateManager the current state
     * @param {Number} todoId the todo to add
     */
    deleteTodo(stateManager, todoId) {
        const state = stateManager.state;
        stateManager.setReadOnly(false);
        state.todos.delete(todoId);
        stateManager.setReadOnly(true);
    }

    /**
     * Toggle todo "done" status.
     *
     * @param {StateManager} stateManager the current state
     * @param {Number} todoId the todo to add
     */
    toggleTodo(stateManager, todoId) {
        const state = stateManager.state;
        stateManager.setReadOnly(false);
        const todo = state.todos.get(todoId);
        todo.done = !todo.done;
        stateManager.setReadOnly(true);
    }
}

export const mutations = new Mutations();
