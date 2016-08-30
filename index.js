/** @jsx html */
import {html} from 'snabbdom-jsx'
import xs from 'xstream'
import {run} from '@cycle/xstream-run'
import {makeDOMDriver} from '@cycle/dom'
import isolate from '@cycle/isolate'

function Counter({DOM}) {
  const action$ = DOM.select('.counter').events('click')
  const count$ = action$
    .fold(count => count + 1, 0)

  const view$ = count$
    .map(count =>
      <button className="counter">count: {count}</button>
    )

  return {
    DOM: view$,
    count$,
  }
}

function main({DOM}) {
  const counter1 = isolate(Counter, 'counter1')({DOM})
  const counter2 = isolate(Counter, 'counter2')({DOM})

  const view$ = xs.combine(counter1.count$, counter1.DOM, counter2.DOM)
    .map(([count1, counter1DOM, counter2DOM]) =>
      <div>
        <h1>Isolate event listener loss demo:</h1>
        <h2>The button below has a parent with a key that changes on every click. After two clicks it will stop responding to events.</h2>
        <div key={`test-${count1}`}>
          {counter1DOM}
        </div>
        <h2>This counter does not have a keyed parent.</h2>
        {counter2DOM}
      </div>
    )

  return {
    DOM: view$,
  }
}

const drivers = {
  DOM: makeDOMDriver('#app'),
}

run(main, drivers)
