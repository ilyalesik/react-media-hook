var React = require('react')

function fallbackMatchMedia (query) {
  if (typeof matchMedia !== 'function') {
    return null
  }
  return matchMedia(query)
}

function omitMatchMediaResult (matchMediaResult) {
  if (!matchMediaResult) {
    return null
  }
  return { media: matchMediaResult.media, matches: matchMediaResult.matches }
}

function useMedia (query) {
  var mounted = React.useState(false)
  var setMounted = mounted[1]

  React.useEffect(function () {
    setMounted(true)
  }, [setMounted])

  var result = React.useState(function () {
    return omitMatchMediaResult(fallbackMatchMedia(query))
  })
  var setResult = result[1]

  var callback = React.useCallback(function (matchMediaResult) {
    return setResult(omitMatchMediaResult(matchMediaResult))
  }, [setResult])

  React.useEffect(
    function () {
      var matchMediaResult = fallbackMatchMedia(query)
      callback(matchMediaResult)
      if (matchMediaResult) {
        matchMediaResult.addEventListener('change', callback)
      }
      return function () {
        if (matchMediaResult) {
          matchMediaResult.removeEventListener('change', callback)
        }
      }
    },
    [callback, query]
  )

  if (!mounted[0]) {
    return null
  }

  return result[0]
}

function useMediaPredicate (query) {
  var result = useMedia(query)
  return (result && result.matches) || false
}

module.exports = {
  useMedia: useMedia,
  useMediaPredicate: useMediaPredicate
}
