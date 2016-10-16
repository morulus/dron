export function search(packageName) {
  return fetch('http://npmsearch.com/query?q='+packageName+'&fields=name,description,version,author,keywords,url')
  .then((res) => res.json());
}

export function getDrons() {
  return search('dron-')
  .then(function(res) {
    return res.results
    .filter((p) => p.name[0].indexOf('dron-')===0)
    .filter((p) => p.name[0]!=='dron-cli')
    .map((p) => Object.assign({}, p, {
      name: [p.name[0].substr(5)]
    }))
  });
}
