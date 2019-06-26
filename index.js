var React = require('react')

function fallbackMathMedia (query) {
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
  var result = React.useState(function () {
    return omitMatchMediaResult(fallbackMathMedia(query))
  })
  var setResult = result[1]

  var callback = React.useCallback(function (matchMediaResult) {
    return setResult(omitMatchMediaResult(matchMediaResult))
  }, [setResult])

  React.useEffect(
    function () {
      var matchMediaResult = fallbackMathMedia(query)
      callback(matchMediaResult)
      matchMediaResult.addListener(callback)
      return function () { return matchMediaResult.removeListener(callback) }
    },
    [callback, query]
  )

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
