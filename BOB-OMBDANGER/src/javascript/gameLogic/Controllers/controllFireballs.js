//scoreThreshold = score at wich fireballs gets given properties. spawnRate = amount of fireballs that spawn in seconds. 
const fireballControlls = [ 
    { scoreThreshold: 0, spawnRate: 20 ,fireballSpeed:1, fireballRadius:10, fireballColor: "#000"},
    { scoreThreshold: 5, spawnRate: 0 ,fireballSpeed:1, fireballRadius:10, fireballColor: "#000"},
    { scoreThreshold: 10, spawnRate: 10 ,fireballSpeed:3, fireballRadius:10, fireballColor: "#000"},
    { scoreThreshold: 12, spawnRate: 0 ,fireballSpeed:6, fireballRadius:10, fireballColor: "#000"},
    { scoreThreshold: 14, spawnRate: 1 ,fireballSpeed:5, fireballRadius:300, fireballColor: "#000"},
    { scoreThreshold: 15, spawnRate: 4 ,fireballSpeed:4, fireballRadius:10, fireballColor: "#000"},
    { scoreThreshold: 18, spawnRate: 12 ,fireballSpeed:2, fireballRadius:11, fireballColor: "#000"},
    { scoreThreshold: 22, spawnRate: 14 ,fireballSpeed:2, fireballRadius:9, fireballColor: "#000"},
    { scoreThreshold: 25, spawnRate: 16 ,fireballSpeed:1.8, fireballRadius:7, fireballColor: "#000"},
    { scoreThreshold: 28, spawnRate: 50 ,fireballSpeed:1, fireballRadius:100, fireballColor: "#000"},
  ];
  
export  function fireballControll(score) {
    // Loop through the fireballControlls array to find the correct controlls based on the score
    for (let i = fireballControlls.length - 1; i >= 0; i--) {
      if (score >= fireballControlls[i].scoreThreshold) {
        return fireballControlls[i];
      }
    }
    
    // Return the default controll 
    return fireballSpawnRates[0].spawnRate;
  }
  