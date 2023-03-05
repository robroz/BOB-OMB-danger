//scoreThreshold = score at wich fireballs gets given properties. spawnRate = amount of fireballs that spawn in seconds. 
const homingFireballControlls = [ 
    { scoreThreshold: 0, spawnRate: 1, Speed:2, homingTime: 5, homingSpeed: 0.01, Radius:10, Color: "#1822ed", customEffects: "null"},
    // { scoreThreshold: 5, spawnRate: 1, Speed:1, HomingTime: 5, Radius:10, Color: "#1822ed", customEffects: "null"},
  ];
  
export  function homingFireballControll(score) {
    // Loop through the fireballControlls array to find the correct controlls based on the score
    for (let i = homingFireballControlls.length - 1; i >= 0; i--) {
      if (score >= homingFireballControlls[i].scoreThreshold) {
        return homingFireballControlls[i];
      }
    }

  }