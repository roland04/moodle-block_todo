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
 * TODO reactive.
 *
 * @module     block_todo/local/todo
 * @copyright  2023 Mikel Martín <mikel@moodle.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {Reactive} from 'core/reactive';
import {eventTypes, notifyBlockTodoStateUpdated} from 'block_todo/events';
import {mutations} from 'block_todo/local/mutations';

// Initial state.
const state = {
    'todos': [
        {
            id: 1,
            name: 'Wake up',
            done: true,
        },
        {
            id: 2,
            name: 'Coffee at 10:00',
            done: false,
        },
        {
            id: 3,
            name: 'Coffee at 11:00',
            done: false,
        },
    ],
};

class Todo extends Reactive {
}

export const todoReactive = new Todo({
    name: 'block_todo',
    eventName: eventTypes.blockTodoStateUpdated,
    eventDispatch: notifyBlockTodoStateUpdated,
    mutations,
    state,
});

/**
 * Load the initial state.
 */
export const init = () => {
    // TODO: load initial state asynchronously
};