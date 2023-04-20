square_sums_row = square_sums_row || squareSumsRow

describe('Verify sequences', function() {
  function verify(n, r) {
    if (!Array.isArray(r)) {
      Test.expect(false, 'Not an array');
      return
    }
    let act_sorted = JSON.stringify(r.slice(0).sort((a, b)=>a-b))
    let exp_sorted = JSON.stringify(Array(n).fill(0).map((a,i)=>i+1))
    Test.assertEquals(act_sorted, exp_sorted, 'Some numbers are missing')
    if (act_sorted !== exp_sorted) {
      return;
    }
    for (let i = 1; i < n; ++i) {
      let sum = r[i - 1] + r[i]
      let not_sq = 0 !== Math.sqrt(sum) % 1
      if (not_sq) {
        Test.expect(false, `Pair sum is not a square: ${r[i - 1]}+${r[i]}=${sum}`)
      }
    }
  }
  
  function check(n) {
    return verify(n, square_sums_row(n))
  }
  
  it('Tests removing used nodes', function() {
    let pairs = new Map([
      [1, [2,5]],
      [2, [1,3]],
      [3, [2,4]],
      [4, [3,5]],
      [5, [4,1]]
    ]);
    let sequence = [1,2,3];
    let filtered = removeUsedNodesFromMap(pairs, sequence);
    sequence.forEach(used => {
      Test.assertEquals(filtered.get(used), undefined);
      for (let [k, v] of filtered) {
//         console.log(k, v, used)
        Test.assertNotContains(v, used);
      }
    });
  });
  
  it('Tests sieve', function() {
    let pairs = new Map([
      [1, [2,5]],
      [2, [1,3]],
      [3, [2,4]],
      [4, [3,5]],
      [5, [4,1]]
    ]);
    Test.assertEquals(JSON.stringify(sieve(pairs)), JSON.stringify([1,2,3,4,5]));
  });
 
  it('Basic test', function() {
    check(15)
    check(23)
  })
  
  it('No solution', function() {
//     for (let n of [2,14,18]) {
    for (let n of [...Array(12).fill(0).map((x, i) => i+2), 18, 19, 20, 21, 22, 24]) {
      Test.assertEquals(square_sums_row(n), false)
    }
  });
  
  it('Small numbers', function() {
    for (let n = 25; n <= 80; ++n) {
      check(n)
    }
  });

 // for extra challenge uncomment this (780 is NOT tested in final tests)
  it('780', function() {
    check(780)
  })
  
 // My test to see how big it can go
  it('BIG', function() {
    check(6450);
  })
})
