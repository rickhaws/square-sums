function removeUsedNodesFromMap(map, sequence) {
  sequence = Array.isArray(sequence) ? sequence : [];
  map = new Map(map);
  for (const used of sequence) {
    const neighbors = map.get(used);
    if (neighbors === undefined) { continue; }
    for (const neighbor of neighbors) {
      const neighborPairs = map.get(neighbor);
      if (neighborPairs === undefined) { continue; }
      map.set(neighbor, neighborPairs.filter(n => n !== used));
    }
    map.delete(used);
  }
  return map;
}

function sieve(pairs, sequence) {
  let candidates;
  if (!sequence || sequence.length === 0) {
    sequence = [];
    candidates = [...pairs.keys()];
  }
  else {
    const last = sequence.slice(-1)[0];
    candidates = pairs.get(last).filter(c => c !== last);
    pairs = removeUsedNodesFromMap(pairs, sequence);
  }
  
  // Base case -- all numbers are in the sequence
  if (pairs.size === 0) {
//       /* */ console.log("****  ", JSON.stringify(sequence))
    return [...sequence];
  }
  
  //Optimizations
  // Don't consider candidates without additional neighbors unless this is the last sequence item
  if (pairs.size !== 1) { // Not the last candidate
    candidates = [...candidates].filter(c => pairs.get(c).length !== 0)
    
    // Sort to test nodes with fewest neighbors first
    candidates.sort((a,b) => pairs.get(a).length - pairs.get(b).length);
  }
  
  // Sort to test nodes with fewest neighbors first
  candidates.sort((a,b) => pairs.get(a).length - pairs.get(b).length);
  // If more than one candidate has no neighbors, the sequence is impossible
  if (candidates.length > 1 && pairs.get(candidates[1]).length === 0) {
    return false;
  }
  
  // Find solution
  let solution = false;
  for (let p of candidates) {
    sequence.push(p);
    let newSequence = sieve(pairs, sequence);
    if (newSequence) {
      solution = newSequence;
     break; // comment this line to find all solutions
    }

    sequence.pop();
  }
  
  return solution;
}

function square_sums_row(n) {
  const allSquares = [];
  for (let i = 2 ; i*i < 2*n; i++) {
    allSquares.push(i*i);
  }
  const pairs = new Map();
  for (let i = 1; i<=n; i++) {
    let pairsToI = allSquares.filter(q => 
      q <= i+n && // Max sum is this number plus n
      q > i && // Min square is this number plus 1
      q !== 2 * i) // Can't be i + i: each number used exactly once
    .map(qI => qI - i);
    pairs.set(i, pairsToI);
  }
  
  return sieve(pairs)
}
