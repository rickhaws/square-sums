function sieve(pairs, sequence) {
//   console.log('current sequence', sequence);
//   console.log(pairs);
  sequence = Array.isArray(sequence) ? sequence : [];
  
  // Base case
  if (sequence.length === pairs.size) {
    return sequence;
  }
  
  let candidates = [];
  if (sequence.length === 0) {
    candidates = pairs.keys();
  }
  else {
    const previous = sequence.slice(-1)[0];
    candidates = pairs.get(previous)
      .filter(c => !sequence.includes(c));
  }
  
  for (let p of candidates) {
    sequence.push(p);
    let newSequence = sieve(pairs, sequence);
    if (newSequence) {
      /* */ sequence.length === 0 && console.log('found', newSequence);
      return newSequence;
    }
    else (sequence.pop());
  }
  
  return false;
}

function square_sums_row(n) {
  const pairs = new Map();
  let result = false;
  
  for (let i = 1; i <= n; i++) {
    pairs.set(i, []);
    for (let j = 1; j <= n; j++) {
      const pair = j * j - i;
      if (pair > 0 && pair <= n) {
//         console.log(`Adding ${pair} to pairs[${i}]`);
        pairs.get(i).push(pair);
//         console.log(pairs.get(i));
      }
    }
  }
  
  // Sort keys by number of pairs
  const keys = [...pairs.keys()].sort((a,b) => pairs.get(a).length - pairs.get(b).length);
//   keys.forEach(key => console.log(key, pairs.get(key).length, pairs.get(key)));
  
  // If any number has no pairs, the square sums sequence is impossible
  if (pairs.get(keys[0]).length === 0) {
    return false;
  }
  
  // If more than two numbers have only one pair, the sequence is impossible
  if (pairs.get(keys[2]).length === 1) {
    return false;
  }
  
  return sieve(pairs);
}
