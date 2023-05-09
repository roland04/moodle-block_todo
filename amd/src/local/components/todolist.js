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
 * @module     block_todo/local/components/todolist
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
        this.name = 'todolist';
        this.selectors = {
            TODOLIST: `[data-for='todo-list']`,
            TODOS: `[data-for='todos']`,
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
     * Define the component watchers.
     *
     * @returns {Array} the list of watchers
     */
    getWatchers() {
        return [
            {watch: `todos:created`, handler: this._addTodo},
        ];
    }

    /**
     * Add a todo element.
     *
     * @param {object} param the watcher param
     * @param {object} param.element the todo structure to refresh
     */
    async _addTodo({element}) {
        // Create a fake element to render the component.
        const fakeElement = document.createElement('li');
        fakeElement.classList.add('d-none');
        this.getElement(this.selectors.TODOS).appendChild(fakeElement);
        // Render the component.
        const data = { // TODO: Better way to create data?
            'id': element.id,
            'name': element.name,
            'done': false,
        };
        const newcomponent = await this.renderComponent(fakeElement, 'block_todo/local/todolistitem', data);
        fakeElement.parentNode.replaceChild(newcomponent.getElement(), fakeElement);
    }
}
