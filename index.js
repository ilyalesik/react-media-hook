var React = require('react')

function omitMatchMediaResult (matchMediaResult) {
  return { media: matchMediaResult.media, matches: matchMediaResult.matches }
}

function useMedia (query) {
  var result = React.useState(omitMatchMediaResult(matchMedia(query)))
  var setResult = result[1]

  var callback = React.useCallback(function (matchMediaResult) {
    return setResult(omitMatchMediaResult(matchMediaResult))
  }, [setResult])

  React.useEffect(
    function () {
      var matchMediaResult = matchMedia(query)
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
