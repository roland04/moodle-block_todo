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
 * Todo list reactive component.
 *
 * @module     block_todo/local/components/todolistitem
 * @copyright  2023 Mikel Martín <mikel@moodle.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {BaseComponent} from 'core/reactive';
import {todoReactive} from 'block_todo/local/todo';

export default class extends BaseComponent {
    /**
     * Create the todo list component.
     */
    create() {
        this.name = 'todolistitem';
        this.selectors = {
            TODO: `[data-for='todo']`,
            TODONAME: `[data-for='todo-name']`,
            TODOCHECK: `[data-for='todo-check']`,
            DELETEBUTTON: `[data-action='delete-todo']`,
        };
        this.classes = {
            DONE: `todo-done`,
        };
        // We need our id to watch specific events.
        this.id = this.element.dataset.id;
    }

    /**
     * Create a component instance from the mustache template.
     *
     * @param {string} target the DOM main element selector
     * @param {object} selectors optional css selector overrides
     * @return {Component}
     */
    static init(target, selectors) {
        return new this({
            element: document.querySelector(target),
            reactive: todoReactive,
            selectors,
        });
    }

    /**
     * Initial state ready method.
     *
     * @param {object} state the initial state
     */
    stateReady(state) {
        this.addEventListener(this.getElement(this.selectors.DELETEBUTTON), 'click', this._deleteTodoListener);
        this.addEventListener(this.getElement(this.selectors.TODOCHECK), 'click', this._toggleTodoListener);
        // TODO: Probably this is not necessary.
        const todo = state.todos.get(this.id);
        this._refreshTodo({element: todo});
    }

    /**
     * Define the component watchers.
     *
     * @returns {Array} the list of watchers
     */
    getWatchers() {
        return [
            {watch: `todos[${this.id}]:updated`, handler: this._refreshTodo},
            {watch: `todos[${this.id}]:deleted`, handler: this.remove},
        ];
    }

    /**
     * Refresh the todo element.
     *
     * @param {object} param the watcher param
     * @param {object} param.element the todo structure to refresh
     */
    _refreshTodo({element}) {
        this.element.classList.toggle(this.classes.DONE, element.done ?? false);
        this.getElement(this.selectors.TODOCHECK).checked = element.done ?? false;
        this.getElement(this.selectors.TODONAME).textContent = element.name;
    }

    /**
     * Delete todo.
     * @param {Event} event the event
     */
    _deleteTodoListener(event) {
        event.preventDefault();
        this.reactive.dispatch('deleteTodo', this.getElement().dataset.id);
    }

    /**
     * Toggle todo "done" status.
     */
    _toggleTodoListener() {
        this.reactive.dispatch('toggleTodo', this.getElement().dataset.id);
    }
}
