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
 * @module     block_todo/local/components/todomessage
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
        this.name = 'todomessage';
        this.selectors = {
            TODOMESSAGE: `[data-for='todo-message']`,
        };
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
        this._refreshTodoMessage({state});
    }

    /**
     * Define the component watchers.
     *
     * @returns {Array} the list of watchers
     */
    getWatchers() {
        return [
            {watch: `todos:updated`, handler: this._refreshTodoMessage},
            {watch: `todos:deleted`, handler: this._refreshTodoMessage},
            {watch: `todos:created`, handler: this._refreshTodoMessage},
        ];
    }

    /**
     * Refresh the todo element.
     *
     * @param {object} param the watcher param
     * @param {object} param.state the state
     */
    _refreshTodoMessage({state}) {
        // TODO: Better way to do this?
        const todosLeft = [...state.todos].filter(todo => !todo[1].done) ?? [];
        // TODO: Get the strings from the language pack.
        const messageContainer = this.getElement(this.selectors.TODOMESSAGE);
        if (todosLeft.length > 1) {
            messageContainer.innerHTML = 'Still a lot to do 😅';
        } else if (todosLeft.length === 1) {
            messageContainer.innerHTML = 'You are almost there! 🏁';
        } else {
            messageContainer.innerHTML = 'Nothing left. Time to relax 🏖️';
        }
    }
}
