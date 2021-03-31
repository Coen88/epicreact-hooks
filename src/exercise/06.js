// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

// extra credit 7 reset the error boundary
// useEffect: HTTP requests
// 💯 create an ErrorBoundary component
// http://localhost:3000/isolated/final/06.extra-4.js

import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    status: pokemonName ? 'pending' : 'idle',
    pokemon: null,
    error: null,
  })
  const {status, pokemon, error} = state

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setState({status: 'pending'})
    fetchPokemon(pokemonName).then(
      pokemon => {
        setState({status: 'resolved', pokemon})
      },
      error => {
        setState({status: 'rejected', error})
      },
    )
  }, [pokemonName])

  if (status === 'idle') {
    return 'Submit a pokemon'
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
    // this will be handled by an error boundary
    throw error
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }

  throw new Error('This should be impossible')
}

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App

// // extra credit 5 and 6 re-mount the error boundary
// // useEffect: HTTP requests
// // 💯 create an ErrorBoundary component
// // http://localhost:3000/isolated/final/06.extra-4.js

// import * as React from 'react'
// import {
//   fetchPokemon,
//   PokemonInfoFallback,
//   PokemonForm,
//   PokemonDataView,
// } from '../pokemon'

// class ErrorBoundary extends React.Component {
//   state = {error: null}
//   static getDerivedStateFromError(error) {
//     return {error}
//   }
//   render() {
//     const {error} = this.state
//     if (error) {
//       return <this.props.FallbackComponent error={error} />
//     }

//     return this.props.children
//   }
// }

// function PokemonInfo({pokemonName}) {
//   const [state, setState] = React.useState({
//     status: 'idle',
//     pokemon: null,
//     error: null,
//   })
//   const {status, pokemon, error} = state

//   React.useEffect(() => {
//     if (!pokemonName) {
//       return
//     }
//     setState({status: 'pending'})
//     fetchPokemon(pokemonName).then(
//       pokemon => {
//         setState({status: 'resolved', pokemon})
//       },
//       error => {
//         setState({status: 'rejected', error})
//       },
//     )
//   }, [pokemonName])

//   if (status === 'idle') {
//     return 'Submit a pokemon'
//   } else if (status === 'pending') {
//     return <PokemonInfoFallback name={pokemonName} />
//   } else if (status === 'rejected') {
//     // this will be handled by an error boundary
//     throw error
//   } else if (status === 'resolved') {
//     return <PokemonDataView pokemon={pokemon} />
//   }

//   throw new Error('This should be impossible')
// }

// function ErrorFallback({error}) {
//   return (
//     <div role="alert">
//       There was an error:{' '}
//       <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
//     </div>
//   )
// }

// function App() {
//   const [pokemonName, setPokemonName] = React.useState('')

//   function handleSubmit(newPokemonName) {
//     setPokemonName(newPokemonName)
//   }

//   return (
//     <div className="pokemon-info-app">
//       <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
//       <hr />
//       <div className="pokemon-info">
//         <ErrorBoundary key={pokemonName} FallbackComponent={ErrorFallback}>
//           <PokemonInfo pokemonName={pokemonName} />
//         </ErrorBoundary>
//       </div>
//     </div>
//   )
// }

// export default App

// // extra credit 4 ErrorBoundary
// // useEffect: HTTP requests
// // 💯 create an ErrorBoundary component
// // http://localhost:3000/isolated/final/06.extra-4.js

// import * as React from 'react'
// import {
//   fetchPokemon,
//   PokemonInfoFallback,
//   PokemonForm,
//   PokemonDataView,
// } from '../pokemon'

// class ErrorBoundary extends React.Component {
//   state = {error: null}
//   static getDerivedStateFromError(error) {
//     return {error}
//   }
//   render() {
//     const {error} = this.state
//     if (error) {
//       return <this.props.FallbackComponent error={error} />
//     }

//     return this.props.children
//   }
// }

// function PokemonInfo({pokemonName}) {
//   const [state, setState] = React.useState({
//     status: 'idle',
//     pokemon: null,
//     error: null,
//   })
//   const {status, pokemon, error} = state

//   React.useEffect(() => {
//     if (!pokemonName) {
//       return
//     }
//     setState({status: 'pending'})
//     fetchPokemon(pokemonName).then(
//       pokemon => {
//         setState({status: 'resolved', pokemon})
//       },
//       error => {
//         setState({status: 'rejected', error})
//       },
//     )
//   }, [pokemonName])

//   if (status === 'idle') {
//     return 'Submit a pokemon'
//   } else if (status === 'pending') {
//     return <PokemonInfoFallback name={pokemonName} />
//   } else if (status === 'rejected') {
//     // this will be handled by an error boundary
//     throw error
//   } else if (status === 'resolved') {
//     return <PokemonDataView pokemon={pokemon} />
//   }

//   throw new Error('This should be impossible')
// }

// function ErrorFallback({error}) {
//   return (
//     <div role="alert">
//       There was an error:{' '}
//       <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
//     </div>
//   )
// }

// function App() {
//   const [pokemonName, setPokemonName] = React.useState('')

//   function handleSubmit(newPokemonName) {
//     setPokemonName(newPokemonName)
//   }

//   return (
//     <div className="pokemon-info-app">
//       <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
//       <hr />
//       <div className="pokemon-info">
//         <ErrorBoundary FallbackComponent={ErrorFallback}>
//           <PokemonInfo pokemonName={pokemonName} />
//         </ErrorBoundary>
//       </div>
//     </div>
//   )
// }

// export default App

// // extra credit 3
// import * as React from 'react'
// import {
//   PokemonForm,
//   fetchPokemon,
//   PokemonInfoFallback,
//   PokemonDataView,
// } from '../pokemon'

// function PokemonInfo({pokemonName}) {
//   const [state, setState] = React.useState({
//     status: 'idle',
//     pokemon: null,
//     error: null,
//   })
//   const {status, pokemon, error} = state

//   React.useEffect(() => {
//     if (!pokemonName) {
//       return
//     }
//     setState({status: 'pending'})
//     fetchPokemon(pokemonName)
//       .then(pokemon => {
//         setState({status: 'resolved', pokemon})
//       })
//       .catch(error => {
//         setState({status: 'rejected', error})
//       })
//   }, [pokemonName])

//   if (status === 'idle') {
//     return <div>submit a pokemon</div>
//   } else if (status === 'pending') {
//     return <PokemonInfoFallback name={pokemonName} />
//   } else if (status === 'rejected') {
//     return (
//       <div role="alert">
//         There was na error:{' '}
//         <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
//       </div>
//     )
//   } else if (status === 'resolved') {
//     return <PokemonDataView pokemon={pokemon} />
//   }

//   throw new Error('This should be impossible')
// }
// function App() {
//   const [pokemonName, setPokemonName] = React.useState('')

//   function handleSubmit(newPokemonName) {
//     setPokemonName(newPokemonName)
//   }

//   return (
//     <div className="pokemon-info-app">
//       <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
//       <hr />
//       <div className="pokemon-info">
//           <PokemonInfo pokemonName={pokemonName} />
//       </div>
//     </div>
//   )
// }

// export default App

// // extra credit 2 use a status
// import * as React from 'react'
// import {
//   PokemonForm,
//   fetchPokemon,
//   PokemonInfoFallback,
//   PokemonDataView,
// } from '../pokemon'

// function PokemonInfo({pokemonName}) {
//   const [status, setStatus] = React.useState('idle')
//   const [pokemon, setPokemon] = React.useState(null)
//   const [error, setError] = React.useState(null)

//   React.useEffect(() => {
//     if (!pokemonName) {
//       setStatus('idle')
//       return
//     }
//     setStatus('pending')
//     fetchPokemon(pokemonName)
//       .then(pokemon => {
//         setPokemon(pokemon)
//         setStatus('resolved')
//       })
//       .catch(error => {
//         setError(error)
//         setStatus('rejected')
//       })
//   }, [pokemonName])
//   console.log(error)

//   if (status === 'idle') {
//     return <div>submit a pokemon</div>
//   } else if (status === 'pending') {
//     return <PokemonInfoFallback name={pokemonName} />
//   } else if (status === 'rejected') {
//     return (
//       <div role="alert">
//         There was na error:{' '}
//         <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
//       </div>
//     )
//   } else if (status === 'resolved') {
//     return <PokemonDataView pokemon={pokemon} />
//   }

//   throw new Error('This should be impossible')
// if (error) {
//   return (
//     <div role="alert">
//       There was na error:{' '}
//       <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
//     </div>
//   )
// }
// if (!pokemonName) {
//   return <div>submit a pokemon</div>
// } else if (!pokemon) {
//   return <PokemonInfoFallback name={pokemonName} />
// } else {
//   return <PokemonDataView pokemon={pokemon} />
// }

// if (error) {
//   return <div role="alert">
//     There was na error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
//   </div>
// }
// if (!pokemonName) {
//   return <div>submit a pokemon</div>
// } else if (!pokemon) {
//   return <PokemonInfoFallback name={pokemonName}/>
// } else {
//   return <PokemonDataView pokemon={pokemon}/>
// }
// }

// function App() {
//   const [pokemonName, setPokemonName] = React.useState('')

//   function handleSubmit(newPokemonName) {
//     setPokemonName(newPokemonName)
//   }

//   return (
//     <div className="pokemon-info-app">
//       <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
//       <hr />
//       <div className="pokemon-info">
//         <PokemonInfo pokemonName={pokemonName} />
//       </div>
//     </div>
//   )
// }

// export default App

// // extra credit 1
// import * as React from 'react'
// import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'

// function PokemonInfo({pokemonName}) {
//   const [pokemon, setPokemon] = React.useState(null)
//   const [error, setError] = React.useState(null)
//   React.useEffect(() => {
//     if(!pokemonName) {
//       return
//     }
//     setPokemon(null)
//     fetchPokemon(pokemonName).then(pokemon => setPokemon(pokemon)).catch(error => setError(error))
//   },[pokemonName])
//   console.log(error)

//   if (error) {
//     return <div role="alert">
//       There was na error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
//     </div>
//   }
//   if (!pokemonName) {
//     return <div>submit a pokemon</div>
//   } else if (!pokemon) {
//     return <PokemonInfoFallback name={pokemonName}/>
//   } else {
//     return <PokemonDataView pokemon={pokemon}/>
//   }
// }

// function App() {
//   const [pokemonName, setPokemonName] = React.useState('')

//   function handleSubmit(newPokemonName) {
//     setPokemonName(newPokemonName)
//   }

//   return (
//     <div className="pokemon-info-app">
//       <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
//       <hr />
//       <div className="pokemon-info">
//         <PokemonInfo pokemonName={pokemonName} />
//       </div>
//     </div>
//   )
// }

// export default App

// // Exercise
// import * as React from 'react'
// // 🐨 you'll want the following additional things from '../pokemon':
// // fetchPokemon: the function we call to get the pokemon info
// // PokemonInfoFallback: the thing we show while we're loading the pokemon info
// // PokemonDataView: the stuff we use to display the pokemon info
// import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'

// function PokemonInfo({pokemonName}) {
//   // 🐨 Have state for the pokemon (null)
//   const [pokemon, setPokemon] = React.useState(null)
//   // 🐨 use React.useEffect where the callback should be called whenever the
//   // pokemon name changes.
//   React.useEffect(() => {
//     if(!pokemonName) {
//       return
//     }
//     setPokemon(null)
//     fetchPokemon(pokemonName).then(pokemon => setPokemon(pokemon))
//   },[pokemonName])
//   console.log(pokemon)
//   // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
//   // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
//   // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null
//   // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
//   //   fetchPokemon('Pikachu').then(
//   //     pokemonData => { /* update all the state here */},
//   //   )
//   // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
//   //   1. no pokemonName: 'Submit a pokemon'
//   //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
//   //   3. pokemon: <PokemonDataView pokemon={pokemon} />

//   // 💣 remove this

//   if (!pokemonName) {
//     return <div>submit a pokemon</div>
//   } else if (!pokemon) {
//     return <PokemonInfoFallback name={pokemonName}/>
//   } else {
//     return <PokemonDataView pokemon={pokemon}/>
//   }
// }

// function App() {
//   const [pokemonName, setPokemonName] = React.useState('')

//   function handleSubmit(newPokemonName) {
//     setPokemonName(newPokemonName)
//   }

//   return (
//     <div className="pokemon-info-app">
//       <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
//       <hr />
//       <div className="pokemon-info">
//         <PokemonInfo pokemonName={pokemonName} />
//       </div>
//     </div>
//   )
// }

// export default App
