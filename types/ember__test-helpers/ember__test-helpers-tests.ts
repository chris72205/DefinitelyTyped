/// <reference types="ember-qunit" />

import { test } from 'qunit';
import Application from '@ember/application';
import hbs from 'htmlbars-inline-precompile';
import {
    click,
    doubleClick,
    tap,
    focus,
    blur,
    triggerEvent,
    triggerKeyEvent,
    fillIn,
    render,
    find,
    findAll,
    getRootElement,
    pauseTest,
    resumeTest,
    waitFor,
    waitUntil,
    settled,
    isSettled,
    getSettledState,
    visit,
    currentURL,
    currentRouteName,
    setApplication
} from '@ember/test-helpers';

const MyApp = Application.extend({ modulePrefix: 'my-app' });

setApplication(MyApp.create());

test('DOM interactions', async () => {
    await render(hbs`<div class="message">Hello, world</div>`);

    await click('.message');
    await doubleClick('.message');
    await tap('.message');
    await focus('.message');
    await blur('.message');
    await triggerEvent('.message', 'custom-event');
    await triggerKeyEvent('.message', 'keydown', 'Enter', { ctrlKey: true });
    await fillIn('.message', 'content');

    const messageElement = find('.message')!;
    await click(messageElement);
    await doubleClick(messageElement);
    await tap(messageElement);
    await focus(messageElement);
    await blur(messageElement);
    await triggerEvent(messageElement, 'custom-event');
    await triggerKeyEvent(messageElement, 'keydown', 'Enter', { ctrlKey: true });
    await fillIn(messageElement, 'content');

    const allMessages = findAll('.message');
    for (const element of allMessages) {
        await click(element);
    }

    const root = getRootElement();
    await click(root);
});

test('routing helpers', async (assert) => {
    await visit('/foo');

    assert.equal(currentURL(), '/foo');
    assert.equal(currentRouteName(), 'foo');
});

test('pause and resume', async () => {
    await pauseTest();
    setTimeout(resumeTest, 1000);
});

test('wait helpers', async (assert) => {
    await render(hbs`<div class="message">Hello</div>`);

    await waitFor('.message', { count: 1, timeout: 10, timeoutMessage: 'uh oh' });
    await waitUntil(() => 'hello', { timeout: 1000, timeoutMessage: 'boom' });

    await settled();
    assert.ok(isSettled());

    const {
        hasPendingRequests,
        hasPendingTimers,
        hasPendingWaiters,
        hasRunLoop,
        pendingRequestCount
    } = getSettledState();
});
