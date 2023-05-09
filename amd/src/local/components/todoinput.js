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
 * Todo input reactive component.
 *
 * @module     block_todo/local/components/todoinput
 * @copyright  2023 Mikel Martín <mikel@moodle.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {BaseComponent} from 'core/reactive';
import {todoReactive} from 'block_todo/local/todo';

export default class extends BaseComponent {
    /**
     * Create the todo input component.
     */
    create() {
        this.name = 'todoinput';
        this.selectors = {
            ADDBUTTON: `[data-action='addtodo']`,
            INPUTTEXT: `[data-for='todo-input']`,
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
     */
    stateReady() {
        this.addEventListener(this.getElement(this.selectors.ADDBUTTON), 'click', this._addTodoListener);
        this.addEventListener(this.getElement(this.selectors.INPUTTEXT), 'keyup', this._addTodoListener);
    }

    /**
     * Add a new todo.
     * @param {Event} event the event
     */
    _addTodoListener(event) {
        event.preventDefault();
        if (event.type === 'keyup' && event.keyCode !== 13) {
            return;
        }
        const input = this.getElement(this.selectors.INPUTTEXT);
        if (input.value.length === 0) {
            return;
        }
        this.reactive.dispatch('addTodo', {name: input.value, done: false});
        input.value = '';
    }
}
